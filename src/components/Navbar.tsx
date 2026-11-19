import React, { useState, useEffect } from 'react';
import {
  Film,
  Play,
  CheckCircle,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  Sparkles,
  Maximize2,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentSlide: number;
  onNavigateSlide: (slide: number) => void;
  totalSlides?: number;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSlide,
  onNavigateSlide,
  totalSlides = 20,
  onOpenLogin,
}) => {
  const { isAuthenticated, profile, user, signOut } = useAuth();
  const [avatarError, setAvatarError] = useState(false);

  // Reset avatar fallback state if avatar_url changes
  useEffect(() => {
    setAvatarError(false);
  }, [profile?.avatar_url]);
  // 80 min classroom timer
  const [secondsRemaining, setSecondsRemaining] = useState(80 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const sections = [
    { label: 'Intro & Vocab', range: [1, 4], target: 1 },
    { label: 'Video 1 (Q1-Q5)', range: [5, 11], target: 5 },
    { label: 'Video 2 (Listening)', range: [12, 15], target: 12 },
    { label: 'Expressions', range: [16, 16], target: 16 },
    { label: 'Virtual Dialogue', range: [17, 18], target: 18 },
    { label: 'Topics & Wrap-up', range: [19, 20], target: 19 },
  ];

  const handlePrev = () => {
    if (currentSlide > 1) onNavigateSlide(currentSlide - 1);
  };

  const handleNext = () => {
    if (currentSlide < totalSlides) onNavigateSlide(currentSlide + 1);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0e1915]/95 backdrop-blur-md border-b border-emerald-900/60 shadow-lg px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Slide Title */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onNavigateSlide(1)}
            className="cursor-pointer flex items-center gap-2 group"
          >
            {/* Emotion Orbs */}
            <div className="flex items-center -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-amber-400 group-hover:scale-110 transition-transform shadow-xs" />
              <div className="w-4 h-4 rounded-full bg-orange-500 shadow-xs" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-xs" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-amber-400 tracking-tight">
                Inside Out 2
              </span>
              <span className="hidden md:inline text-xs text-emerald-200/80 ml-2 font-medium">
                Riley's What-Ifs
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 ml-4 text-xs font-semibold">
            {sections.map((sec, idx) => {
              const isActive = currentSlide >= sec.range[0] && currentSlide <= sec.range[1];
              return (
                <button
                  key={idx}
                  onClick={() => onNavigateSlide(sec.target)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Section: Slide Stepper & 80min Lesson Timer */}
        <div className="flex items-center gap-3">
          {/* 80 min Lesson Timer */}
          <div
            onClick={() => setTimerRunning(!timerRunning)}
            className={`cursor-pointer px-2.5 py-1 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              timerRunning
                ? 'bg-amber-950/60 border-amber-400 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="클릭하여 80분 수업 타이머 시작/일시정지"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          {/* Slide Navigation Stepper */}
          <div className="flex items-center gap-1 bg-slate-800/90 rounded-2xl p-1 border border-slate-700/80 shadow-inner">
            <button
              onClick={handlePrev}
              disabled={currentSlide <= 1}
              className="p-1.5 rounded-xl hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors"
              title="이전 슬라이드 (← 키)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Jump dropdown */}
            <select
              value={currentSlide}
              onChange={(e) => onNavigateSlide(Number(e.target.value))}
              className="bg-transparent text-xs font-bold text-amber-300 border-0 focus:ring-0 cursor-pointer px-1 py-0.5 text-center font-mono"
            >
              {Array.from({ length: totalSlides }, (_, i) => i + 1).map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  Slide {s}
                </option>
              ))}
            </select>

            <span className="text-[11px] text-slate-400 font-mono pr-1.5">
              / {totalSlides}
            </span>

            <button
              onClick={handleNext}
              disabled={currentSlide >= totalSlides}
              className="p-1.5 rounded-xl hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors"
              title="다음 슬라이드 (→ 키)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Top-right Login Link or Profile Avatar Hover Popover */}
          {isAuthenticated ? (
            <div className="relative group pl-2 border-l border-emerald-900/70">
              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden ring-2 ring-amber-400/70 group-hover:ring-amber-300 bg-emerald-900/80 text-amber-300 transition-all cursor-pointer focus:outline-hidden focus:ring-amber-300"
                aria-label="사용자 프로필 메뉴"
              >
                {profile?.avatar_url && !avatarError ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || profile.email || 'User profile'}
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-extrabold uppercase flex items-center justify-center w-full h-full">
                    {(profile?.full_name || profile?.email || user?.email || '')
                      .trim()
                      .charAt(0) || <UserIcon className="w-4 h-4" />}
                  </span>
                )}
              </button>

              {/* Hover Popover Card */}
              <div className="absolute right-0 top-full pt-2 w-56 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-150 z-50">
                <div className="rounded-2xl bg-[#14231e] border border-emerald-800/80 shadow-2xl p-3 space-y-2.5">
                  <div className="px-1">
                    {profile?.full_name && (
                      <p className="text-xs font-bold text-white truncate">
                        {profile.full_name}
                      </p>
                    )}
                    <p
                      className="text-[11px] text-emerald-200/80 truncate"
                      title={profile?.email || user?.email || ''}
                    >
                      {profile?.email || user?.email}
                    </p>
                  </div>

                  <div className="h-px bg-emerald-900/80" />

                  <button
                    type="button"
                    onClick={() => {
                      void signOut();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-amber-300 hover:bg-emerald-950/90 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                onOpenLogin();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>로그인</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
