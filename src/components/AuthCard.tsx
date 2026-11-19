import React from 'react';
import { X, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

interface AuthCardProps {
  onGoogleLogin?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
}

const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

export const AuthCard: React.FC<AuthCardProps> = ({
  onGoogleLogin,
  onClose,
  showCloseButton = false,
  isLoading = false,
  errorMessage = null,
}) => {
  return (
    <div className="w-full max-w-md rounded-3xl bg-[#14231e] border border-emerald-900/70 shadow-2xl p-7 sm:p-9 text-slate-100 relative overflow-hidden">
      {/* Subtle decorative glow matching main cover slide */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Top Emotion Orbs + Close Button */}
      <div className="relative flex items-center justify-between mb-7">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.45)]" />
          <div className="w-5 h-5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.45)]" />
          <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]" />
        </div>

        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-emerald-950/80 border border-transparent hover:border-emerald-800/70 transition-colors cursor-pointer"
            aria-label="로그인 창 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Title & Branding matching Slide 1 */}
      <div className="relative text-center space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-amber-400 tracking-tight">
          Inside Out 2
        </h1>
        <p className="text-base font-bold text-white">
          영화로 배우는 생활영어
        </p>
        <p className="text-xs text-emerald-200/80 font-serif italic">
          Riley's What-Ifs: Worry, Sorry &amp; the Future
        </p>
      </div>

      {/* Divider */}
      <div className="relative h-px bg-linear-to-r from-transparent via-emerald-800/80 to-transparent mb-7" />

      {/* Google-only Login Action */}
      <div className="relative space-y-4">
        <div className="text-center space-y-1">
          <h2 id="login-modal-title" className="text-lg font-bold text-white">
            간편 로그인
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            별도의 회원가입 없이 Google 계정으로 바로 시작하세요.
          </p>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={onGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-[#fef8e2] hover:bg-white disabled:opacity-60 text-slate-900 font-bold text-sm sm:text-base border border-amber-200 shadow-lg hover:shadow-amber-400/15 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-slate-700 shrink-0" />
          ) : (
            <GoogleLogo className="w-5 h-5 shrink-0" />
          )}
          <span>{isLoading ? 'Google 로그인 중...' : 'Google 계정으로 계속하기'}</span>
        </button>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-emerald-300/75">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Google 계정 인증을 통해 안전하게 로그인됩니다.</span>
        </div>
      </div>
    </div>
  );
};
