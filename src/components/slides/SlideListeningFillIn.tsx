import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft, Mic, Sparkles, Check, HelpCircle, Eye } from 'lucide-react';
import { LISTENING_ROUNDS, VIDEO_2 } from '../../data/lessonData';
import { VideoClipPlayer } from '../VideoClipPlayer';
import { speakText, stopSpeech } from '../../utils/speech';

interface SlideListeningFillInProps {
  currentSlide: number; // 12 to 15
  onNavigateSlide: (slide: number) => void;
  userFillIns: Record<number, string>;
  onFillWord: (itemId: number, word: string) => void;
}

export const SlideListeningFillIn: React.FC<SlideListeningFillInProps> = ({
  currentSlide,
  onNavigateSlide,
  userFillIns,
  onFillWord,
}) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [showTranslations, setShowTranslations] = useState(false);
  const [speakingItemId, setSpeakingItemId] = useState<number | null>(null);

  // Slide 12: Video 2 Overview
  if (currentSlide === 12) {
    return (
      <div className="p-5 sm:p-8 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                Video 2
              </span>
              <span className="text-xs text-emerald-300 font-medium">Reconciling Scene</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-400">
              Video 2 · Riley Says Sorry
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-serif italic">
              {VIDEO_2.koreanTitle} (영상 길이: {VIDEO_2.duration})
            </p>
          </div>

          <button
            onClick={() => onNavigateSlide(13)}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Listening Round 1 시작 →</span>
          </button>
        </div>

        {/* 3 Step Guidance Cards from Slide 12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 font-bold text-center flex flex-col justify-center shadow-md">
            <span className="text-xs uppercase tracking-wider text-slate-800">Step 1</span>
            <span className="text-lg">Listen 1: 흐름 듣기</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-orange-500 text-white font-bold text-center flex flex-col justify-center shadow-md">
            <span className="text-xs uppercase tracking-wider text-orange-200">Step 2</span>
            <span className="text-lg">Listen 2–3: 빈칸 채우기</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-center flex flex-col justify-center shadow-md">
            <span className="text-xs uppercase tracking-wider text-emerald-900">Step 3</span>
            <span className="text-lg">Check with a partner</span>
          </div>
        </div>

        {/* Video 2 Preview Player */}
        <VideoClipPlayer
          videoId={VIDEO_2.id}
          videoTitle={VIDEO_2.title}
          clipStart={0}
          clipEnd={VIDEO_2.totalSeconds}
          clueHint="라일리가 브리와 그레이스에게 다가가 진심으로 사과하는 대사를 귀 기울여 들어보세요!"
        />
      </div>
    );
  }

  // Slide 13 & 14: Listening Round 1 & Round 2 Fill-in
  if (currentSlide === 13 || currentSlide === 14) {
    const roundIdx = currentSlide === 13 ? 0 : 1;
    const round = LISTENING_ROUNDS[roundIdx];

    // Check completion
    const allFilled = round.items.every((it) => !!userFillIns[it.id]);
    const allCorrect = round.items.every((it) => userFillIns[it.id]?.toLowerCase() === it.blankWord.toLowerCase());

    const handleSelectWord = (word: string) => {
      // Find first empty item or active item
      const targetId = activeItemId || round.items.find((it) => !userFillIns[it.id])?.id;
      if (targetId) {
        onFillWord(targetId, word);
        // Advance active item to next empty
        const nextEmpty = round.items.find((it) => it.id !== targetId && !userFillIns[it.id]);
        setActiveItemId(nextEmpty ? nextEmpty.id : null);

        // Check if all correct now
        const tempFilled = { ...userFillIns, [targetId]: word };
        const nowAllCorrect = round.items.every(
          (it) => tempFilled[it.id]?.toLowerCase() === it.blankWord.toLowerCase()
        );
        if (nowAllCorrect) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    };

    const handleClearItem = (id: number) => {
      onFillWord(id, '');
      setActiveItemId(id);
    };

    return (
      <div className="p-4 sm:p-7 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
              R{round.roundNumber}
            </div>
            <div>
              <span className="text-xs text-orange-400 font-bold tracking-wider uppercase">
                Video 2 · Listening Fill-in
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {round.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showTranslations
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showTranslations ? '해석 숨기기' : '한국어 해석 보기'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column: Video Clip on Left/Top, Fill-in Lines on Right/Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Extracted Clip Player for this Listening Round */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 px-1">
              <span className="font-semibold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 라운드 {round.roundNumber} 전용 추출 영상 클립
              </span>
              <span className="text-slate-400">구간을 반복해서 들어보세요</span>
            </div>

            <VideoClipPlayer
              key={`round-clip-${round.roundNumber}`}
              videoId={VIDEO_2.id}
              videoTitle={round.title}
              clipStart={round.clipStart}
              clipEnd={round.clipEnd}
              clueHint={
                round.roundNumber === 1
                  ? '라일리가 "I was such a..." 하고 울먹이며 친구들에게 고백하는 부분을 집중해 보세요.'
                  : '라일리가 "...forgive me"라고 말하고 친구들이 "we\'ve got a game to finish"라고 답하는 순간입니다.'
              }
            />
          </div>

          {/* Interactive Fill-in Sentences & Word Bank */}
          <div className="lg:col-span-6 space-y-4">
            {/* Sentences */}
            <div className="space-y-3">
              {round.items.map((item) => {
                const filledWord = userFillIns[item.id] || '';
                const isItemCorrect = filledWord.toLowerCase() === item.blankWord.toLowerCase();
                const isActive = activeItemId === item.id;

                const fullSentence = `${item.sentenceBefore} ${item.blankWord} ${item.sentenceAfter}`;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-950/40 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-slate-900/70 border-slate-700/70 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-orange-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {item.id}
                      </span>

                      <div className="flex-1">
                        <div className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed flex flex-wrap items-center gap-1.5">
                          <span>{item.sentenceBefore}</span>

                          {/* The Blank Input / Badge */}
                          {filledWord ? (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClearItem(item.id);
                              }}
                              className={`px-3 py-0.5 rounded-lg font-bold font-mono text-sm inline-flex items-center gap-1 cursor-pointer transition-transform hover:scale-105 ${
                                isItemCorrect
                                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                                  : 'bg-rose-500 text-white'
                              }`}
                              title="클릭하여 지우기"
                            >
                              <span>{filledWord}</span>
                              <span className="text-[10px] opacity-75">✕</span>
                            </span>
                          ) : (
                            <span
                              className={`px-4 py-0.5 rounded-lg border-2 border-dashed font-mono text-xs font-semibold ${
                                isActive
                                  ? 'border-amber-400 bg-amber-400/20 text-amber-300 animate-pulse'
                                  : 'border-slate-500 bg-slate-800 text-slate-400'
                              }`}
                            >
                              ____ [빈칸]
                            </span>
                          )}

                          <span>{item.sentenceAfter}</span>
                        </div>

                        {showTranslations && (
                          <p className="text-xs sm:text-sm text-emerald-300/90 font-medium mt-1.5 pt-1.5 border-t border-slate-800">
                            {item.koreanTranslation}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSpeakingItemId(item.id);
                          speakText(fullSentence, {
                            voiceType: 'female',
                            onEnd: () => setSpeakingItemId(null),
                          });
                        }}
                        className={`p-2 rounded-xl transition-colors shrink-0 ${
                          speakingItemId === item.id
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                        title="원어민 발음 듣기"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Word Bank Card matching Slide 13 & 14 */}
            <div className="p-4 rounded-2xl bg-[#fef8e2] text-slate-900 border border-amber-200 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Word Bank (단어 은행)
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  단어를 클릭하면 빈칸에 들어갑니다
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {round.wordBank.map((word) => {
                  const isUsed = round.items.some(
                    (it) => userFillIns[it.id]?.toLowerCase() === word.toLowerCase()
                  );

                  return (
                    <button
                      key={word}
                      disabled={isUsed}
                      onClick={() => handleSelectWord(word)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold font-mono text-sm transition-all shadow-sm ${
                        isUsed
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed line-through opacity-60'
                          : 'bg-white hover:bg-amber-300 text-slate-950 border border-amber-300 active:scale-95'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Completion Status */}
            {allFilled && (
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn ${
                  allCorrect
                    ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                    : 'bg-amber-950/70 border border-amber-500/50 text-amber-200'
                }`}
              >
                {allCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>축하합니다! 모든 빈칸을 완벽하게 맞추셨습니다!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>일부 빈칸이 다릅니다. 영상을 다시 듣고 수정해보세요!</span>
                  </>
                )}
              </div>
            )}

            {/* Navigation buttons */}
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
                <span>{currentSlide === 13 ? 'Listening Round 2로 이동' : '정답 및 섀도잉 (Slide 15)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 15: Answers & Say It Aloud / Shadowing
  if (currentSlide === 15) {
    const answers = [
      { id: 1, word: 'jerk', sentence: 'I was such a jerk to you guys.' },
      { id: 2, word: 'different', sentence: '...you guys told me you were going to a different school.' },
      { id: 3, word: 'freaked', sentence: 'I freaked out and...' },
      { id: 4, word: 'sorry', sentence: "I'm so sorry." },
      { id: 5, word: 'friends', sentence: "If you don't wanna be friends anymore, I get it." },
      { id: 6, word: 'hope', sentence: 'But I really hope that you can...' },
      { id: 7, word: 'forgive', sentence: '...forgive me. Someday.' },
      { id: 8, word: 'game', sentence: "Come on, we've got a game to finish." },
    ];

    const handlePlayAllLines = () => {
      let idx = 0;
      const playNext = () => {
        if (idx < answers.length) {
          setSpeakingItemId(answers[idx].id);
          speakText(answers[idx].sentence, {
            voiceType: 'female',
            onEnd: () => {
              idx++;
              playNext();
            },
          });
        } else {
          setSpeakingItemId(null);
        }
      };
      playNext();
    };

    return (
      <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              Answers &amp; Say It Aloud <Sparkles className="w-8 h-8 text-amber-400" />
            </h2>
            <p className="text-sm text-emerald-200/80 mt-1">
              빈칸 8개의 정답을 확인하고, 라일리의 대사를 섀도잉(Shadowing)하며 따라 말해보세요!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayAllLines}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>전체 대사 연속 듣기</span>
            </button>
            <button
              onClick={() => onNavigateSlide(16)}
              className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg"
            >
              Useful Expressions로 이동 →
            </button>
          </div>
        </div>

        {/* 8 Answer Cards identical to Slide 15 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {answers.map((ans) => {
            const isFilledCorrect = userFillIns[ans.id]?.toLowerCase() === ans.word.toLowerCase();

            return (
              <div
                key={ans.id}
                onClick={() => {
                  setSpeakingItemId(ans.id);
                  speakText(ans.sentence, {
                    voiceType: 'female',
                    onEnd: () => setSpeakingItemId(null),
                  });
                }}
                className={`p-4 rounded-2xl text-center cursor-pointer transition-all shadow-md hover:-translate-y-1 ${
                  speakingItemId === ans.id
                    ? 'bg-amber-300 text-slate-950 ring-4 ring-amber-400/50'
                    : 'bg-[#fef8e2] text-slate-900 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-slate-600 mb-1">
                  <span>{ans.id}.</span>
                  {userFillIns[ans.id] && (
                    <span className={isFilledCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                      {isFilledCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </div>
                <div className="text-xl sm:text-2xl font-black font-serif text-slate-950">
                  {ans.word}
                </div>
                <div className="mt-2 text-[11px] text-slate-500 truncate" title={ans.sentence}>
                  {ans.sentence}
                </div>
              </div>
            );
          })}
        </div>

        {/* Shadowing Banner from Slide 15 */}
        <div className="p-6 rounded-3xl bg-[#1e3a31] border border-emerald-600/40 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Shadowing: listen once more and say Riley's lines together!
                </h3>
                <p className="text-xs text-emerald-200">
                  영상을 다시 들으며 라일리의 호흡과 감정에 맞춰 한 문장씩 큰 소리로 따라 말해봅시다.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateSlide(12)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 text-xs font-bold transition-colors"
            >
              Video 2 전체 다시보기
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {answers.map((ans) => (
              <div
                key={`line-${ans.id}`}
                className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-emerald-800/50 hover:bg-black/30 transition-colors"
              >
                <div className="text-xs sm:text-sm font-medium text-slate-200">
                  <span className="font-bold text-amber-400 mr-2">{ans.id}.</span>
                  <span>{ans.sentence}</span>
                </div>
                <button
                  onClick={() => speakText(ans.sentence, { voiceType: 'female' })}
                  className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 transition-colors ml-2"
                  title="이 문장 듣기"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
