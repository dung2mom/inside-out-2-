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
  Maximize2
} from 'lucide-react';

interface NavbarProps {
  currentSlide: number;
  onNavigateSlide: (slide: number) => void;
  totalSlides?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSlide,
  onNavigateSlide,
  totalSlides = 20,
}) => {
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
        </div>
      </div>
    </header>
  );
};
