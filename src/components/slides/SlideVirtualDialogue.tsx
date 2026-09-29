import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Users,
  Mic,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Eye,
  Settings,
  MessageSquare
} from 'lucide-react';
import { SAMPLE_DIALOGUE, VIRTUAL_CHARACTERS } from '../../data/lessonData';
import { speakText, stopSpeech } from '../../utils/speech';

interface SlideVirtualDialogueProps {
  currentSlide: number; // 17 or 18
  onNavigateSlide: (slide: number) => void;
}

export const SlideVirtualDialogue: React.FC<SlideVirtualDialogueProps> = ({
  currentSlide,
  onNavigateSlide,
}) => {
  // Slide 18 state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(-1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showKorean, setShowKorean] = useState(true);
  const [highlightPredictions, setHighlightPredictions] = useState(true);
  const [rolePlayMode, setRolePlayMode] = useState<'watch' | 'playA' | 'playB'>('watch');
  const [studentTurnActive, setStudentTurnActive] = useState(false);

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const currentLineRef = useRef(activeLineIndex);
  currentLineRef.current = activeLineIndex;

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Slide 17: Group Work guidelines
  if (currentSlide === 17) {
    const steps = [
      { step: 1, text: 'Pick a topic card (next slides)', ko: '주제 카드(Slide 19) 중 하나를 선택하세요' },
      { step: 2, text: 'Make 3 predictions about Riley', ko: '라일리의 미래에 대해 3가지 예측을 작성하세요' },
      { step: 3, text: 'Write an 8-line dialogue with a partner', ko: '짝과 함께 8줄로 이루어진 대화문을 작성하세요' },
      { step: 4, text: 'Act it out for the class', ko: '완성된 대화문을 반 친구들 앞에서 실감나게 연기하세요' },
    ];

    const predictionPhrases = [
      { en: "I think she'll...", ko: '그녀는 ~할 것 같아...' },
      { en: 'She might...', ko: '그녀는 어쩌면 ~할지도 몰라...' },
      { en: 'She will probably...', ko: '그녀는 아마 ~하게 될 거야...' },
      { en: "I don't think she'll...", ko: '그녀가 ~할 것 같지는 않아...' },
      { en: 'What if she...?', ko: '만약 그녀가 ~하면 어쩌지?' },
    ];

    return (
      <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold">
                Slide 17 · Group Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              Group Work: Riley's Future <Users className="w-8 h-8 text-amber-400" />
            </h2>
            <p className="text-sm text-emerald-200/80 mt-1">
              예측 표현(Prediction language)을 활용하여 파트너와 함께 라일리의 미래 대화문을 만들어보는 시간입니다.
            </p>
          </div>

          <button
            onClick={() => onNavigateSlide(18)}
            className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg flex items-center gap-2"
          >
            <span>가상 인물 샘플 대화문 보기 (Slide 18) →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Steps 1-4 */}
          <div className="lg:col-span-7 space-y-3.5">
            {steps.map((st) => (
              <div
                key={st.step}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/70 border border-emerald-800/40"
              >
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md">
                  {st.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">
                    {st.text}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-300/90 mt-0.5">
                    {st.ko}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Prediction Language Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#fef8e2] text-slate-900 border border-amber-200 shadow-xl space-y-4">
            <h3 className="text-2xl font-black text-amber-950 font-serif border-b border-amber-300 pb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Prediction language</span>
            </h3>

            <p className="text-xs text-slate-600">
              미래를 예측하거나 추측할 때 유용한 핵심 패턴입니다.
            </p>

            <div className="space-y-2.5">
              {predictionPhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  onClick={() => speakText(phrase.en, { voiceType: 'female' })}
                  className="p-3 rounded-xl bg-white/80 border border-amber-200 hover:bg-amber-100/60 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <p className="font-bold text-base text-slate-950 font-mono">
                      {phrase.en}
                    </p>
                    <p className="text-xs text-emerald-800 font-medium">
                      {phrase.ko}
                    </p>
                  </div>
                  <Volume2 className="w-4 h-4 text-amber-700 shrink-0" />
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => onNavigateSlide(18)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-amber-300 hover:bg-slate-800 text-xs font-bold transition-all"
              >
                가상 인물들이 주고받는 샘플 대화문 듣기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 18: Virtual Characters Forming the Sample Dialogue!
  const playLineAudio = (index: number, onComplete?: () => void) => {
    if (index < 0 || index >= SAMPLE_DIALOGUE.length) {
      setIsPlaying(false);
      setActiveLineIndex(-1);
      return;
    }

    setActiveLineIndex(index);
    const line = SAMPLE_DIALOGUE[index];
    const char = line.role === 'A' ? VIRTUAL_CHARACTERS.characterA : VIRTUAL_CHARACTERS.characterB;

    // Check if it's user's turn in roleplay mode
    if (rolePlayMode === 'playA' && line.role === 'A') {
      setStudentTurnActive(true);
      return;
    }
    if (rolePlayMode === 'playB' && line.role === 'B') {
      setStudentTurnActive(true);
      return;
    }

    setStudentTurnActive(false);

    speakText(line.english, {
      voiceType: char.voiceType,
      rate: playbackSpeed,
      onEnd: () => {
        if (onComplete) onComplete();
      },
    });
  };

  const startSequentialPlay = (startIndex = 0) => {
    stopSpeech();
    setIsPlaying(true);

    const playNext = (idx: number) => {
      if (!isPlayingRef.current || idx >= SAMPLE_DIALOGUE.length) {
        setIsPlaying(false);
        setActiveLineIndex(-1);
        return;
      }

      playLineAudio(idx, () => {
        setTimeout(() => {
          if (isPlayingRef.current) {
            playNext(idx + 1);
          }
        }, 500);
      });
    };

    playNext(startIndex);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      const nextIdx = activeLineIndex >= 0 && activeLineIndex < SAMPLE_DIALOGUE.length - 1 ? activeLineIndex : 0;
      startSequentialPlay(nextIdx);
    }
  };

  const handleReset = () => {
    stopSpeech();
    setIsPlaying(false);
    setActiveLineIndex(-1);
    setStudentTurnActive(false);
  };

  const handleSingleLineClick = (idx: number) => {
    stopSpeech();
    setIsPlaying(false);
    playLineAudio(idx);
  };

  const handleStudentFinishedTurn = () => {
    setStudentTurnActive(false);
    const nextIdx = activeLineIndex + 1;
    if (nextIdx < SAMPLE_DIALOGUE.length) {
      playLineAudio(nextIdx, () => {
        // If next is student's turn again or auto continue
        const nextNextIdx = nextIdx + 1;
        if (nextNextIdx < SAMPLE_DIALOGUE.length) {
          playLineAudio(nextNextIdx);
        } else {
          setActiveLineIndex(-1);
        }
      });
    } else {
      setActiveLineIndex(-1);
    }
  };

  return (
    <div className="p-4 sm:p-8 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
              Slide 18 · Virtual Dialogue
            </span>
            <span className="text-xs text-emerald-300 font-medium">가상 인물 대화문 시뮬레이터</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-400">
            Sample Dialogue: Leo &amp; Emma
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            가상의 인물 Leo(A)와 Emma(B)가 라일리의 내년에 대해 나누는 8줄의 대화문입니다.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? '일시정지' : '전체 대화 듣기'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="처음부터 다시"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateSlide(19)}
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md flex items-center gap-1.5 ml-1"
          >
            <span>Topic Cards (Slide 19)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Virtual Character Profile Headers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Character A (Leo) */}
        <div
          className={`flex items-center gap-4 p-4 rounded-3xl border transition-all ${
            activeLineIndex >= 0 && SAMPLE_DIALOGUE[activeLineIndex].role === 'A'
              ? 'bg-amber-950/50 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
              : 'bg-slate-900/60 border-slate-700/60'
          }`}
        >
          <div className="relative">
            <img
              src={VIRTUAL_CHARACTERS.characterA.avatar}
              alt="Leo avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
            />
            {activeLineIndex >= 0 && SAMPLE_DIALOGUE[activeLineIndex].role === 'A' && (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950">
                Speaker A
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {VIRTUAL_CHARACTERS.characterA.name}
              </h3>
            </div>
            <p className="text-xs text-amber-200/90 mt-0.5 font-medium">
              성격: {VIRTUAL_CHARACTERS.characterA.personality} (걱정 &amp; 질문형)
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              "What do you think will happen...?" / "What if she...?"
            </p>
          </div>
        </div>

        {/* Character B (Emma) */}
        <div
          className={`flex items-center gap-4 p-4 rounded-3xl border transition-all ${
            activeLineIndex >= 0 && SAMPLE_DIALOGUE[activeLineIndex].role === 'B'
              ? 'bg-emerald-950/50 border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg'
              : 'bg-slate-900/60 border-slate-700/60'
          }`}
        >
          <div className="relative">
            <img
              src={VIRTUAL_CHARACTERS.characterB.avatar}
              alt="Emma avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            {activeLineIndex >= 0 && SAMPLE_DIALOGUE[activeLineIndex].role === 'B' && (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-400 text-slate-950">
                Speaker B
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {VIRTUAL_CHARACTERS.characterB.name}
              </h3>
            </div>
            <p className="text-xs text-emerald-200/90 mt-0.5 font-medium">
              성격: {VIRTUAL_CHARACTERS.characterB.personality} (긍정 &amp; 격려형)
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              "I think she'll... / Probably! ... She's stronger than she thinks!"
            </p>
          </div>
        </div>
      </div>

      {/* Control Toggles: Roleplay & Display settings */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-xs sm:text-sm">
        {/* Roleplay Mode selector */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">모드:</span>
          <button
            onClick={() => {
              setRolePlayMode('watch');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              rolePlayMode === 'watch'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            둘 다 듣기 (Auto)
          </button>
          <button
            onClick={() => {
              setRolePlayMode('playA');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              rolePlayMode === 'playA'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            내가 Leo(A) 역할
          </button>
          <button
            onClick={() => {
              setRolePlayMode('playB');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              rolePlayMode === 'playB'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            내가 Emma(B) 역할
          </button>
        </div>

        {/* View Options */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKorean(!showKorean)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
              showKorean ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {showKorean ? '한국어 번역 켜짐' : '한국어 번역 꺼짐'}
          </button>

          <button
            onClick={() => setHighlightPredictions(!highlightPredictions)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
              highlightPredictions
                ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {highlightPredictions ? '예측 표현 강조' : '기본 서체'}
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              const speeds = [0.8, 1.0, 1.2];
              const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
              setPlaybackSpeed(next);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-mono text-xs"
            title="재생 속도"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>

      {/* Student Turn Alert (when in roleplay mode) */}
      {studentTurnActive && (
        <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 font-bold flex flex-wrap items-center justify-between gap-3 shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <Mic className="w-6 h-6 animate-pulse" />
            <span className="text-base sm:text-lg">
              여러분의 차례입니다! 화면의 노란색 대사를 소리 내어 읽어보세요!
            </span>
          </div>
          <button
            onClick={handleStudentFinishedTurn}
            className="px-4 py-2 rounded-xl bg-slate-950 text-amber-300 hover:bg-slate-800 text-sm font-extrabold shadow-md"
          >
            말하기 완료 → 다음 대사 진행
          </button>
        </div>
      )}

      {/* Dialogue Chat Feed matching Slide 18 Layout */}
      <div className="space-y-3 pt-2">
        {SAMPLE_DIALOGUE.map((line, idx) => {
          const isLineActive = activeLineIndex === idx;
          const isSpeakerA = line.role === 'A';
          const char = isSpeakerA ? VIRTUAL_CHARACTERS.characterA : VIRTUAL_CHARACTERS.characterB;

          return (
            <div
              key={idx}
              onClick={() => handleSingleLineClick(idx)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isSpeakerA
                  ? isLineActive
                    ? 'bg-amber-100 border-2 border-amber-400 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-[#fef8e2] border-amber-200 text-slate-900 hover:bg-white'
                  : isLineActive
                  ? 'bg-emerald-100 border-2 border-emerald-400 text-slate-950 shadow-md ring-2 ring-emerald-400/40 ml-4 sm:ml-8'
                  : 'bg-[#f0fdf4] border-emerald-200 text-slate-900 hover:bg-white ml-4 sm:ml-8'
              }`}
            >
              {/* Speaker Badge & Avatar Thumbnail */}
              <div className="flex flex-col items-center shrink-0">
                <img
                  src={char.avatar}
                  alt={char.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-300 shadow-sm"
                />
                <span
                  className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-xs ${
                    isSpeakerA ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {line.speaker} ({line.characterName.split(' ')[0]})
                </span>
              </div>

              {/* Line English & Korean */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {line.tone}
                  </span>
                  {line.keyPhrase && highlightPredictions && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/80 text-amber-900 font-mono font-bold border border-amber-300">
                      ★ {line.keyPhrase}
                    </span>
                  )}
                </div>

                <p className="text-base sm:text-lg font-bold font-serif leading-snug mt-1 text-slate-950">
                  {line.english}
                </p>

                {showKorean && (
                  <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
                    {line.korean}
                  </p>
                )}
              </div>

              {/* Individual Speak Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSingleLineClick(idx);
                }}
                className={`p-2 rounded-xl shrink-0 transition-colors ${
                  isLineActive
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-black/5 hover:bg-black/10 text-slate-700'
                }`}
                title="이 대사만 다시 듣기"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
