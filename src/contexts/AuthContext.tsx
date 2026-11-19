import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { createClient } from '../../lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  provider: string | null;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSigningIn: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function extractMetadataProfile(authUser: User): UserProfile {
  const meta = authUser.user_metadata ?? {};
  const appMeta = authUser.app_metadata ?? {};
  return {
    id: authUser.id,
    email: authUser.email ?? meta.email ?? null,
    full_name: meta.full_name ?? meta.name ?? null,
    avatar_url: meta.avatar_url ?? meta.picture ?? null,
    provider: appMeta.provider ?? 'google',
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const syncedUserIdRef = useRef<string | null>(null);

  const syncUserToDatabase = useCallback(async (authUser: User) => {
    const fallbackProfile = extractMetadataProfile(authUser);
    setProfile((prev) => prev ?? fallbackProfile);

    if (syncedUserIdRef.current === authUser.id) return;
    syncedUserIdRef.current = authUser.id;

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('users')
        .upsert(
          {
            id: authUser.id,
            email: fallbackProfile.email,
            full_name: fallbackProfile.full_name ?? '',
            avatar_url: fallbackProfile.avatar_url ?? '',
            provider: fallbackProfile.provider ?? 'google',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
        .select('id, email, full_name, avatar_url, provider')
        .single();

      if (!error && data) {
        setProfile({
          id: data.id,
          email: data.email ?? fallbackProfile.email,
          full_name: data.full_name || fallbackProfile.full_name,
          avatar_url: data.avatar_url || fallbackProfile.avatar_url,
          provider: data.provider ?? fallbackProfile.provider,
        });
      }
    } catch {
      // Keep fallback profile from Google metadata if public.users is not yet migrated
    }
  }, []);

  const redirectToMainIfNeeded = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (
      window.location.pathname !== '/' ||
      window.location.search.includes('code=') ||
      window.location.hash.includes('access_token=')
    ) {
      window.history.replaceState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let subscription: { unsubscribe: () => void } | null = null;

    const initAuth = async () => {
      try {
        const supabase = createClient();

        // Handle PKCE ?code= redirect when returning directly in a full browser tab
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const oauthError =
          params.get('error_description') || params.get('error');

        if (oauthError) {
          setAuthError(oauthError);
          window.history.replaceState({}, '', window.location.pathname);
        } else if (code) {
          const { error: exchangeErr } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeErr) {
            setAuthError(exchangeErr.message);
          } else {
            redirectToMainIfNeeded();
          }
        }

        const { data } = await supabase.auth.getSession();
        if (!mounted) return;

        const currentSession = data.session ?? null;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await syncUserToDatabase(currentSession.user);
          if (window.location.pathname === '/auth') {
            redirectToMainIfNeeded();
          }
        }

        const listener = supabase.auth.onAuthStateChange(
          (_event, nextSession) => {
            if (!mounted) return;
            setSession(nextSession);
            setUser(nextSession?.user ?? null);

            if (nextSession?.user) {
              setIsSigningIn(false);
              setAuthError(null);
              void syncUserToDatabase(nextSession.user);
              redirectToMainIfNeeded();
            } else {
              syncedUserIdRef.current = null;
              setProfile(null);
            }
          }
        );
        subscription = listener.data.subscription;
      } catch (err) {
        if (mounted) {
          setAuthError(
            err instanceof Error
              ? err.message
              : '인증 초기화 중 오류가 발생했습니다.'
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void initAuth();

    // Listen for postMessage from the /auth/callback OAuth popup window
    const handleOAuthMessage = async (event: MessageEvent) => {
      const origin = event.origin;
      const isAllowedOrigin =
        origin === window.location.origin ||
        origin.endsWith('.run.app') ||
        origin.includes('localhost');

      if (!isAllowedOrigin || event.data?.type !== 'SUPABASE_OAUTH_CALLBACK') {
        return;
      }

      const { code, access_token, refresh_token, error, error_description } =
        event.data;

      if (error || error_description) {
        setAuthError(error_description || error);
        setIsSigningIn(false);
        return;
      }

      try {
        const supabase = createClient();

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setAuthError(exchangeError.message);
          } else {
            redirectToMainIfNeeded();
          }
        } else if (access_token && refresh_token) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (sessionError) {
            setAuthError(sessionError.message);
          } else {
            redirectToMainIfNeeded();
          }
        }
      } catch (err) {
        setAuthError(
          err instanceof Error
            ? err.message
            : 'Google 로그인 완료 처리 중 오류가 발생했습니다.'
        );
      } finally {
        setIsSigningIn(false);
      }
    };

    window.addEventListener('message', handleOAuthMessage);

    return () => {
      mounted = false;
      subscription?.unsubscribe();
      window.removeEventListener('message', handleOAuthMessage);
    };
  }, [syncUserToDatabase, redirectToMainIfNeeded]);

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    setIsSigningIn(true);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (error || !data?.url) {
        setAuthError(
          error?.message || 'Google 로그인 URL을 생성하지 못했습니다.'
        );
        setIsSigningIn(false);
        return;
      }

      const isInIframe = window.self !== window.top;

      if (isInIframe) {
        const width = 520;
        const height = 650;
        const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
        const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);

        const popup = window.open(
          data.url,
          'supabase_google_oauth',
          `width=${width},height=${height},left=${left},top=${top},noopener=no`
        );

        if (!popup) {
          setAuthError(
            '브라우저에서 팝업이 차단되었습니다. 팝업을 허용한 뒤 다시 시도해 주세요.'
          );
          setIsSigningIn(false);
          return;
        }

        // Reset loading indicator if the user manually closes the popup
        const pollClosed = window.setInterval(() => {
          if (popup.closed) {
            window.clearInterval(pollClosed);
            setIsSigningIn(false);
          }
        }, 500);
      } else {
        window.location.assign(data.url);
      }
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : 'Google 로그인을 시작하는 중 오류가 발생했습니다.'
      );
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setAuthError(null);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      syncedUserIdRef.current = null;
      setSession(null);
      setUser(null);
      setProfile(null);
    }
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isAuthenticated: Boolean(user),
        isLoading,
        isSigningIn,
        authError,
        clearAuthError,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
