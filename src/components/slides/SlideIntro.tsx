import React from 'react';
import { Volume2, Sparkles, MessageCircle, Clock, BookOpen, Smile, AlertCircle, Eye } from 'lucide-react';
import { VOCABULARY_LIST } from '../../data/lessonData';
import { speakText } from '../../utils/speech';

interface SlideIntroProps {
  currentSlide: number;
  onNavigateSlide: (slide: number) => void;
}

export const SlideIntro: React.FC<SlideIntroProps> = ({ currentSlide, onNavigateSlide }) => {
  // Slide 1: Title
  if (currentSlide === 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-6 sm:p-12 relative overflow-hidden rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl">
        {/* Decorative Emotion Orbs like the slide */}
        <div className="absolute top-6 right-8 flex items-center gap-3">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.6)] animate-pulse" title="Joy" />
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]" title="Anxiety" />
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]" title="Disgust" />
        </div>

        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>영화 명장면 클립과 함께하는 영어 수업</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-amber-400 tracking-tight leading-tight">
            Inside Out 2
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            영화로 배우는 생활영어
          </h2>

          <p className="text-lg sm:text-xl text-emerald-200/90 font-medium font-serif italic">
            Riley's What-Ifs: Worry, Sorry &amp; the Future
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-emerald-300">
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-900/40 border border-emerald-700/50">
              <Clock className="w-4 h-4 text-emerald-400" /> 80 min · Offline class
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-950/40 border border-orange-700/50 text-orange-300">
              🎬 2개의 명장면 클립 &amp; 가상 인물 대화문
            </span>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onNavigateSlide(2)}
              className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-lg hover:shadow-amber-400/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              수업 시작하기 (Today's Plan) →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Slide 2: Today's Plan
  if (currentSlide === 2) {
    const plans = [
      { time: '0–5 min', title: "Warm-up: Riley's feelings", color: 'bg-amber-400 text-slate-950', targetSlide: 3 },
      { time: '5–10 min', title: 'Key vocabulary', color: 'bg-amber-400 text-slate-950', targetSlide: 4 },
      { time: '10–30 min', title: 'Video 1 · Comprehension Q 1–5', color: 'bg-orange-500 text-white', targetSlide: 5 },
      { time: '30–47 min', title: 'Video 2 · Listening fill-in', color: 'bg-orange-500 text-white', targetSlide: 12 },
      { time: '47–52 min', title: 'Useful expressions: sorry & forgive', color: 'bg-emerald-500 text-slate-950', targetSlide: 16 },
      { time: '52–75 min', title: "Group work · Riley's future", color: 'bg-emerald-500 text-slate-950', targetSlide: 17 },
      { time: '75–80 min', title: 'Wrap-up & exit ticket', color: 'bg-amber-400 text-slate-950', targetSlide: 20 },
    ];

    return (
      <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative">
        {/* Decorative circles */}
        <div className="absolute top-6 right-8 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-400" />
          <div className="w-5 h-5 rounded-full bg-orange-500" />
          <div className="w-4 h-4 rounded-full bg-emerald-400" />
        </div>

        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
            Today's Plan <span className="text-xl font-normal text-emerald-300">· 80 min</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1">오늘 진행되는 7단계 학습 과정을 확인하고 해당 단계로 바로 이동할 수 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {plans.map((p, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateSlide(p.targetSlide)}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 cursor-pointer transition-all group"
            >
              <span className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 ${p.color}`}>
                {p.time}
              </span>
              <span className="font-semibold text-slate-100 group-hover:text-amber-300 transition-colors text-sm sm:text-base">
                {p.title}
              </span>
              <span className="ml-auto text-xs text-slate-400 group-hover:text-white font-mono">
                Slide {p.targetSlide} →
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Slide 3: Warm-up: Who is in Riley's head?
  if (currentSlide === 3) {
    return (
      <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Warm-up: Who is in Riley's head?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Emotion Profiles */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-amber-500/30">
              <div className="w-12 h-12 rounded-full bg-amber-400 shrink-0 flex items-center justify-center text-slate-950 font-bold shadow-lg">
                <Smile className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-300">Joy (기쁨이)</h3>
                <p className="text-slate-300 font-medium">Riley's happy voice</p>
                <p className="text-xs text-slate-400 mt-0.5">언제나 라일리의 긍정적이고 즐거운 마음을 지키려 노력하는 감정</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-orange-500/30">
              <div className="w-12 h-12 rounded-full bg-orange-500 shrink-0 flex items-center justify-center text-white font-bold shadow-lg">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-400">Anxiety (불안이)</h3>
                <p className="text-slate-300 font-medium">Always planning for the worst</p>
                <p className="text-xs text-slate-400 mt-0.5">미래의 온갖 최악의 상황(worst-case)을 계획하며 불안해하는 감정</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/30">
              <div className="w-12 h-12 rounded-full bg-emerald-400 shrink-0 flex items-center justify-center text-slate-950 font-bold shadow-lg">
                <Eye className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-300">Disgust (까칠이)</h3>
                <p className="text-slate-300 font-medium">Notices everything "off"</p>
                <p className="text-xs text-slate-400 mt-0.5">이상하거나 어색한 것을 예리하게 짚어내며 현실을 일깨워주는 감정</p>
              </div>
            </div>
          </div>

          {/* Talk with a partner card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#fef8e2] text-slate-900 shadow-xl border border-amber-200 space-y-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xl border-b border-amber-300/60 pb-2">
              <MessageCircle className="w-5 h-5 text-amber-700" />
              <span>Talk with a partner</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-100/80 border border-amber-200">
                <p className="font-extrabold text-base sm:text-lg text-slate-950 font-serif">
                  Q1. When do you worry about the future?
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-amber-200/80">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                    Sample Answer:
                  </span>
                  <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
                    "I usually worry about the future when I have to take important exams or when I move to a new school."
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-100/80 border border-amber-200">
                <p className="font-extrabold text-base sm:text-lg text-slate-950 font-serif">
                  Q2. What do you do to feel better?
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-amber-200/80">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                    Sample Answer:
                  </span>
                  <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
                    "I take deep breaths, listen to my favorite music, or talk things through with my close friends."
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => onNavigateSlide(4)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-amber-300 hover:bg-slate-800 text-xs font-bold transition-all"
              >
                다음: 핵심 어휘 (Key Vocabulary) →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 4: Key Vocabulary
  if (currentSlide === 4) {
    return (
      <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              Key Vocabulary <BookOpen className="w-7 h-7 text-amber-400" />
            </h2>
            <p className="text-sm text-emerald-200/80 mt-1">
              영상을 보거나 빈칸을 채울 때 꼭 알아야 할 6가지 핵심 어휘입니다. 클릭하여 발음을 듣고 의미를 확인하세요!
            </p>
          </div>
          <button
            onClick={() => onNavigateSlide(5)}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all"
          >
            Video 1 시작하기 →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOCABULARY_LIST.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#fef8e2] text-slate-900 shadow-md border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-extrabold text-slate-950 font-serif">
                    {item.word}
                  </h3>
                  <button
                    onClick={() => speakText(item.word, { voiceType: 'female' })}
                    className="p-2 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-slate-900 transition-colors"
                    title="발음 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-base font-bold text-emerald-800 mb-2">
                  {item.korean}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {item.definition}
                </p>
              </div>

              <div className="pt-3 border-t border-amber-300/80">
                <span className="text-xs font-black text-amber-950 uppercase tracking-wider block mb-1">
                  예문 (Example):
                </span>
                <p className="text-xl sm:text-2xl font-bold text-slate-950 leading-relaxed font-serif tracking-tight">
                  "{item.example}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
