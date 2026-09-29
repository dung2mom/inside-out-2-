import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SlideIntro } from './components/slides/SlideIntro';
import { SlideVideoQuiz } from './components/slides/SlideVideoQuiz';
import { SlideListeningFillIn } from './components/slides/SlideListeningFillIn';
import { SlideExpressions } from './components/slides/SlideExpressions';
import { SlideVirtualDialogue } from './components/slides/SlideVirtualDialogue';
import { SlideTopicSelection } from './components/slides/SlideTopicSelection';
import { SlideWrapUp } from './components/slides/SlideWrapUp';
import { Film, CheckCircle2, ChevronLeft, ChevronRight, Layers, Users, BookOpen } from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C'>>({});
  const [userFillIns, setUserFillIns] = useState<Record<number, string>>({});
  const [showSlideTray, setShowSlideTray] = useState(false);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlide((prev) => Math.min(prev + 1, 20));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlide((prev) => Math.max(prev - 1, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectAnswer = (qId: string, answer: 'A' | 'B' | 'C') => {
    setUserAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleFillWord = (itemId: number, word: string) => {
    setUserFillIns((prev) => ({ ...prev, [itemId]: word }));
  };

  // Slide Meta for quick tray preview
  const slideList = [
    { num: 1, title: 'Title: Inside Out 2', category: 'Intro', tag: '표지' },
    { num: 2, title: "Today's Plan (80 min)", category: 'Intro', tag: '계획' },
    { num: 3, title: "Warm-up: Riley's Feelings", category: 'Intro', tag: '도입' },
    { num: 4, title: 'Key Vocabulary (6 words)', category: 'Intro', tag: '어휘' },
    { num: 5, title: 'Video 1: Anxiety Projections', category: 'Video 1', tag: '영상 1' },
    { num: 6, title: 'Q1: What does Anxiety ask?', category: 'Video 1', tag: 'Q1 클립' },
    { num: 7, title: 'Q2: What does Joy draw?', category: 'Video 1', tag: 'Q2 클립' },
    { num: 8, title: 'Q3: Why does Anxiety do this?', category: 'Video 1', tag: 'Q3 클립' },
    { num: 9, title: 'Q4: What does Disgust say?', category: 'Video 1', tag: 'Q4 클립' },
    { num: 10, title: 'Q5: How does the scene end?', category: 'Video 1', tag: 'Q5 클립' },
    { num: 11, title: 'Video 1 Check the Answers', category: 'Video 1', tag: '정답 확인' },
    { num: 12, title: 'Video 2: Riley Says Sorry', category: 'Video 2', tag: '영상 2' },
    { num: 13, title: 'Listening Round 1 (1–4)', category: 'Video 2', tag: '듣기 1' },
    { num: 14, title: 'Listening Round 2 (5–8)', category: 'Video 2', tag: '듣기 2' },
    { num: 15, title: 'Answers & Say It Aloud', category: 'Video 2', tag: '섀도잉' },
    { num: 16, title: 'Useful Expressions: Sorry', category: 'Expressions', tag: '표현' },
    { num: 17, title: "Group Work: Riley's Future", category: 'Dialogue', tag: '활동 안내' },
    { num: 18, title: 'Sample Dialogue (Leo & Emma)', category: 'Dialogue', tag: '가상 인물' },
    { num: 19, title: 'Your Turn: Pick a Topic', category: 'Topics', tag: '주제 선택' },
    { num: 20, title: 'Wrap-up & Exit Ticket', category: 'Wrap-up', tag: '마무리' },
  ];

  return (
    <div className="min-h-screen bg-[#0e1915] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentSlide={currentSlide}
        onNavigateSlide={setCurrentSlide}
        totalSlides={20}
      />

      {/* Main Slide Presentation Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 flex flex-col justify-start">
        {/* Progress Bar */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex-1 h-2 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-900/60">
            <div
              className="h-full bg-linear-to-r from-amber-400 via-orange-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${(currentSlide / 20) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 shrink-0">
            Slide {currentSlide} / 20
          </span>
          <button
            onClick={() => setShowSlideTray(!showSlideTray)}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
              showSlideTray
                ? 'bg-amber-400 text-slate-950 border-amber-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="모든 슬라이드 한눈에 보기"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">슬라이드 목록</span>
          </button>
        </div>

        {/* Quick Slide Tray Drawer (Collapsible) */}
        {showSlideTray && (
          <div className="mb-6 p-4 rounded-3xl bg-slate-900/95 border border-emerald-800/60 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="font-bold text-amber-300">
                전체 20개 슬라이드 바로가기 (클릭하여 이동)
              </span>
              <button
                onClick={() => setShowSlideTray(false)}
                className="hover:text-white"
              >
                닫기 ✕
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {slideList.map((s) => {
                const isActive = s.num === currentSlide;
                return (
                  <button
                    key={s.num}
                    onClick={() => {
                      setCurrentSlide(s.num);
                      setShowSlideTray(false);
                    }}
                    className={`p-2 rounded-xl text-left transition-all border text-xs ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-slate-800/70 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[11px]">#{s.num}</span>
                      <span className="text-[10px] opacity-75">{s.tag}</span>
                    </div>
                    <p className="truncate font-medium mt-1 text-[11px]" title={s.title}>
                      {s.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Slide Content Container */}
        <div className="flex-1 transition-all duration-200">
          {currentSlide >= 1 && currentSlide <= 4 && (
            <SlideIntro
              currentSlide={currentSlide}
              onNavigateSlide={setCurrentSlide}
            />
          )}

          {currentSlide >= 5 && currentSlide <= 11 && (
            <SlideVideoQuiz
              currentSlide={currentSlide}
              onNavigateSlide={setCurrentSlide}
              userAnswers={userAnswers}
              onSelectAnswer={handleSelectAnswer}
            />
          )}

          {currentSlide >= 12 && currentSlide <= 15 && (
            <SlideListeningFillIn
              currentSlide={currentSlide}
              onNavigateSlide={setCurrentSlide}
              userFillIns={userFillIns}
              onFillWord={handleFillWord}
            />
          )}

          {currentSlide === 16 && (
            <SlideExpressions onNavigateSlide={setCurrentSlide} />
          )}

          {(currentSlide === 17 || currentSlide === 18) && (
            <SlideVirtualDialogue
              currentSlide={currentSlide}
              onNavigateSlide={setCurrentSlide}
            />
          )}

          {currentSlide === 19 && (
            <SlideTopicSelection onNavigateSlide={setCurrentSlide} />
          )}

          {currentSlide === 20 && (
            <SlideWrapUp onNavigateSlide={setCurrentSlide} />
          )}
        </div>

        {/* Global Bottom Slide Controller Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 1))}
            disabled={currentSlide <= 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 font-semibold transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전 슬라이드</span>
          </button>

          <div className="flex items-center gap-2 text-slate-400">
            <span>키보드 방향키(←, →)로 슬라이드를 넘길 수 있습니다</span>
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, 20))}
            disabled={currentSlide >= 20}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md"
          >
            <span>다음 슬라이드</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
