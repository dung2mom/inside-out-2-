import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, Volume2, ArrowRight, ArrowLeft, RefreshCw, Eye, Lightbulb } from 'lucide-react';
import { QUIZ_QUESTIONS, VIDEO_1 } from '../../data/lessonData';
import { VideoClipPlayer } from '../VideoClipPlayer';
import { speakText } from '../../utils/speech';

interface SlideVideoQuizProps {
  currentSlide: number; // 5 to 11
  onNavigateSlide: (slide: number) => void;
  userAnswers: Record<string, 'A' | 'B' | 'C'>;
  onSelectAnswer: (questionId: string, answer: 'A' | 'B' | 'C') => void;
}

export const SlideVideoQuiz: React.FC<SlideVideoQuizProps> = ({
  currentSlide,
  onNavigateSlide,
  userAnswers,
  onSelectAnswer,
}) => {
  const [showKorean, setShowKorean] = useState(false);
  const [activeReviewClip, setActiveReviewClip] = useState<{ start: number; end: number; title: string } | null>(null);

  // Slide 5: Video 1 Overview
  if (currentSlide === 5) {
    return (
      <div className="p-5 sm:p-8 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                Video 1
              </span>
              <span className="text-xs text-emerald-300 font-medium">Imagination Land scene</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-400">
              Video 1 · Anxiety's Projections
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-serif italic">
              {VIDEO_1.koreanTitle} (영상 길이: {VIDEO_1.duration})
            </p>
          </div>

          <button
            onClick={() => onNavigateSlide(6)}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Q1 문제 풀러 가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Step Guidance Cards from Slide 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 font-bold text-center flex flex-col justify-center shadow-md">
            <span className="text-xs uppercase tracking-wider text-slate-800">Step 1</span>
            <span className="text-lg">Watch 1: 전체 흐름 파악</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-orange-500 text-white font-bold text-center flex flex-col justify-center shadow-md">
            <span className="text-xs uppercase tracking-wider text-orange-200">Step 2</span>
            <span className="text-lg">Read Q1–Q5</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-center flex flex-col justify-center shadow-md">
            <span className="text-xs uppercase tracking-wider text-emerald-900">Step 3</span>
            <span className="text-lg">Watch 2: 답 확인</span>
          </div>
        </div>

        {/* Full Video Player for First Overview */}
        <VideoClipPlayer
          videoId={VIDEO_1.id}
          videoTitle={VIDEO_1.title}
          clipStart={0}
          clipEnd={VIDEO_1.totalSeconds}
          clueHint="상상 랜드에서 일어나는 기쁨이와 불안이의 대립 및 생각 일꾼들의 행동을 주의 깊게 관찰해 보세요!"
        />
      </div>
    );
  }

  // Slide 6 to 10: Individual Questions Q1 to Q5
  if (currentSlide >= 6 && currentSlide <= 10) {
    const questionIndex = currentSlide - 6;
    const q = QUIZ_QUESTIONS[questionIndex];
    const selectedAnswer = userAnswers[q.id];
    const isAnswered = !!selectedAnswer;
    const isCorrect = selectedAnswer === q.correctAnswer;

    const handleChoiceClick = (choiceKey: 'A' | 'B' | 'C') => {
      onSelectAnswer(q.id, choiceKey);
      if (choiceKey === q.correctAnswer) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
        });
      }
    };

    return (
      <div className="p-4 sm:p-7 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
              Q{q.questionNumber}
            </div>
            <div>
              <span className="text-xs text-orange-400 font-bold tracking-wider uppercase">
                Video 1 · Comprehension ({q.questionNumber}/5)
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-slate-200">
                영상의 클립을 보고 정답을 맞춰보세요!
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKorean(!showKorean)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showKorean
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showKorean ? '한국어 번역 숨기기' : '한국어 번역 보기'}</span>
            </button>

            <button
              onClick={() => speakText(q.question)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title="질문 영어로 듣기"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Extracted Video Clip on Left/Top, Question & Choices on Right/Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Extracted Clip Player */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 px-1">
              <span className="font-semibold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Q{q.questionNumber} 전용 추출 영상 클립
              </span>
              <span className="text-slate-400">정답 구간이 포함된 클립입니다</span>
            </div>

            <VideoClipPlayer
              key={`clip-${q.id}`}
              videoId={VIDEO_1.id}
              videoTitle={`Q${q.questionNumber} - ${q.question}`}
              clipStart={q.clipStart}
              clipEnd={q.clipEnd}
              clueTimestamp={q.clueTimestamp}
              clueHint={q.clueHint}
              transcriptSnippet={q.transcriptSnippet}
              autoPlay={false}
            />
          </div>

          {/* Quiz Question & Interactive Choices */}
          <div className="lg:col-span-6 space-y-4">
            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-800/40">
              <p className="text-lg sm:text-xl font-bold text-white leading-snug">
                {q.question}
              </p>
              {showKorean && q.koreanQuestion && (
                <p className="text-sm font-medium text-emerald-300 mt-2 pt-2 border-t border-emerald-900/50">
                  {q.koreanQuestion}
                </p>
              )}
            </div>

            {/* Options A, B, C */}
            <div className="space-y-3">
              {q.options.map((opt) => {
                const isSelected = selectedAnswer === opt.key;
                const isThisCorrect = opt.key === q.correctAnswer;

                let cardStyle =
                  'bg-[#f0f9f3] text-slate-900 border-transparent hover:bg-white hover:shadow-md';
                let badgeStyle = 'bg-emerald-600 text-white';

                if (isAnswered) {
                  if (isSelected && isThisCorrect) {
                    cardStyle = 'bg-emerald-100 text-emerald-950 border-2 border-emerald-500 shadow-md';
                    badgeStyle = 'bg-emerald-600 text-white';
                  } else if (isSelected && !isThisCorrect) {
                    cardStyle = 'bg-rose-100 text-rose-950 border-2 border-rose-500';
                    badgeStyle = 'bg-rose-600 text-white';
                  } else if (isThisCorrect) {
                    cardStyle = 'bg-emerald-50/90 text-emerald-900 border-2 border-dashed border-emerald-500';
                    badgeStyle = 'bg-emerald-600 text-white';
                  } else {
                    cardStyle = 'bg-slate-200/60 text-slate-500 opacity-60';
                    badgeStyle = 'bg-slate-400 text-slate-800';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleChoiceClick(opt.key)}
                    className={`w-full p-4 rounded-2xl flex items-start gap-3.5 text-left transition-all active:scale-[0.99] border ${cardStyle}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm ${badgeStyle}`}
                    >
                      {opt.key}
                    </span>

                    <div className="flex-1">
                      <p className="text-base sm:text-lg font-bold leading-snug">
                        {opt.text}
                      </p>
                      {showKorean && opt.koreanText && (
                        <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                          {opt.koreanText}
                        </p>
                      )}
                    </div>

                    {isAnswered && isThisCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !isThisCorrect && (
                      <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation Card */}
            {isAnswered && (
              <div
                className={`p-4 rounded-2xl border text-sm animate-fadeIn space-y-2 ${
                  isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                    : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-base">
                  {isCorrect ? (
                    <>
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-300">정답입니다! Perfect!</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      <span className="text-amber-300">
                        아쉬워요! 정답은 {q.correctAnswer}번 입니다.
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-200">{q.explanation}</p>
                <p className="text-xs sm:text-sm text-emerald-300/90 font-medium">
                  {q.koreanExplanation}
                </p>

                {/* Direct dialogue citation */}
                <div className="mt-2 p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <span className="text-amber-300 font-bold block mb-1">🎬 영상 속 일치 대사:</span>
                  <span className="font-mono text-white italic">"{q.transcriptSnippet}"</span>
                </div>
              </div>
            )}

            {/* Bottom Question Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onNavigateSlide(currentSlide - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 (Slide {currentSlide - 1})</span>
              </button>

              <button
                onClick={() => onNavigateSlide(currentSlide + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md"
              >
                <span>
                  {currentSlide === 10 ? '정답 확인 (Slide 11)' : `다음 Q${q.questionNumber + 1}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 11: Check the Answers (Summary with jump to clip)
  if (currentSlide === 11) {
    const totalAnswered = QUIZ_QUESTIONS.filter((q) => userAnswers[q.id]).length;
    const totalCorrect = QUIZ_QUESTIONS.filter((q) => userAnswers[q.id] === q.correctAnswer).length;

    return (
      <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative space-y-6">
        {/* Top Slide 11 Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              Check the Answers <Sparkles className="w-8 h-8 text-amber-400" />
            </h2>
            <p className="text-sm text-emerald-200/80 mt-1">
              Video 1의 5가지 문제 정답을 종합 확인하고, 각 장면 클립을 바로 다시 복습할 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold text-sm">
              내 점수: {totalCorrect} / 5 정답 ({totalAnswered}문제 완료)
            </span>
            <button
              onClick={() => onNavigateSlide(12)}
              className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg"
            >
              Video 2로 이동하기 →
            </button>
          </div>
        </div>

        {/* Answers List identical to Slide 11 layout */}
        <div className="space-y-3">
          {QUIZ_QUESTIONS.map((q) => {
            const isUserCorrect = userAnswers[q.id] === q.correctAnswer;
            const correctOpt = q.options.find((o) => o.key === q.correctAnswer);

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#fef8e2] text-slate-900 shadow-md border border-amber-200 flex flex-wrap items-center justify-between gap-4 transition-all hover:bg-white"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-[280px]">
                  <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono">
                    Q{q.questionNumber}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-amber-500 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-sm">
                    {q.correctAnswer}
                  </span>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      {correctOpt?.text}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-0.5">
                      {q.koreanExplanation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {userAnswers[q.id] ? (
                    isUserCorrect ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 맞춤
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> 오답 (선택: {userAnswers[q.id]})
                      </span>
                    )
                  ) : null}

                  <button
                    onClick={() =>
                      setActiveReviewClip({
                        start: q.clipStart,
                        end: q.clipEnd,
                        title: `Q${q.questionNumber} 장면 복습: ${correctOpt?.text}`,
                      })
                    }
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>🎬 해당 클립 확인</span>
                  </button>

                  <button
                    onClick={() => onNavigateSlide(q.slideNumber)}
                    className="p-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-slate-900 text-xs font-semibold"
                    title="문제 페이지로 다시 가기"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal / In-page player for clip review */}
        {activeReviewClip && (
          <div className="p-4 rounded-3xl bg-slate-950/80 border border-amber-400/40 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-amber-300 text-sm font-bold">
              <span>{activeReviewClip.title}</span>
              <button
                onClick={() => setActiveReviewClip(null)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                닫기 ✕
              </button>
            </div>
            <VideoClipPlayer
              videoId={VIDEO_1.id}
              videoTitle={activeReviewClip.title}
              clipStart={activeReviewClip.start}
              clipEnd={activeReviewClip.end}
              autoPlay={true}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};
