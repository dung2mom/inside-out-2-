import React, { useState } from 'react';
import { Volume2, HeartHandshake, Sparkles, MessageCircle, ArrowRight, ArrowLeft, Mic } from 'lucide-react';
import { speakText } from '../../utils/speech';

interface SlideExpressionsProps {
  onNavigateSlide: (slide: number) => void;
}

export const SlideExpressions: React.FC<SlideExpressionsProps> = ({ onNavigateSlide }) => {
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);

  const sorryExpressions = [
    {
      en: "I'm so sorry.",
      ko: '정말 미안해.',
      nuance: '가장 보편적이고 진심 어린 사과 표현',
    },
    {
      en: "I shouldn't have said that.",
      ko: '내가 그런 말을 하지 말았어야 했어.',
      nuance: '경솔한 말이나 상처 주는 말을 후회할 때',
    },
    {
      en: 'Can you forgive me?',
      ko: '날 용서해 줄 수 있겠니?',
      nuance: '상대방에게 용서를 간곡히 구할 때',
    },
  ];

  const respondingExpressions = [
    {
      en: "It's okay.",
      ko: '괜찮아.',
      nuance: '부담 없이 사과를 받아주는 따뜻한 표현',
    },
    {
      en: 'No worries.',
      ko: '걱정 마 / 괜찮아.',
      nuance: '친근하고 가벼운 일상적 화답 표현',
    },
    {
      en: "I get it. Let's move on.",
      ko: '이해해. 훌훌 털고 넘어가자.',
      nuance: '상황을 쿨하게 털어내고 미래를 바라볼 때',
    },
  ];

  const handleSpeak = (text: string, voiceType: 'male' | 'female' = 'female') => {
    setActiveSpeech(text);
    speakText(text, {
      voiceType,
      onEnd: () => setActiveSpeech(null),
    });
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold">
              Slide 16 · Expressions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
            Useful Expressions: Sorry &amp; Forgive <HeartHandshake className="w-8 h-8 text-amber-400" />
          </h2>
          <p className="text-sm text-emerald-200/80 mt-1">
            사과할 때(Saying sorry)와 그 사과에 화답할 때(Responding) 사용하는 핵심 표현입니다.
          </p>
        </div>

        <button
          onClick={() => onNavigateSlide(17)}
          className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg flex items-center gap-2"
        >
          <span>Group Work (Slide 17) 이동</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Saying Sorry Card */}
        <div className="p-6 rounded-3xl bg-[#fef8e2] text-slate-900 border border-amber-200 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-amber-950 font-serif border-b border-amber-300/80 pb-2 flex items-center justify-between">
              <span>Saying sorry</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-200/70 text-amber-900">
                사과할 때
              </span>
            </h3>

            <div className="space-y-3.5 mt-4">
              {sorryExpressions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSpeak(item.en, 'female')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeSpeech === item.en
                      ? 'bg-amber-200/90 border-amber-400 shadow-md ring-2 ring-amber-400'
                      : 'bg-white/80 border-amber-200/60 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div>
                    <p className="text-lg font-bold text-slate-950 font-serif">
                      "{item.en}"
                    </p>
                    <p className="text-sm font-semibold text-emerald-800 mt-0.5">
                      {item.ko}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.nuance}
                    </p>
                  </div>
                  <button
                    className="p-2.5 rounded-xl bg-amber-200/70 hover:bg-amber-300 text-slate-900 transition-colors shrink-0 ml-3"
                    title="소리 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Responding Card */}
        <div className="p-6 rounded-3xl bg-[#f0fdf4] text-slate-900 border border-emerald-200 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-emerald-950 font-serif border-b border-emerald-300/80 pb-2 flex items-center justify-between">
              <span>Responding</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-200/70 text-emerald-900">
                사과를 받아줄 때
              </span>
            </h3>

            <div className="space-y-3.5 mt-4">
              {respondingExpressions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSpeak(item.en, 'male')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeSpeech === item.en
                      ? 'bg-emerald-200/90 border-emerald-400 shadow-md ring-2 ring-emerald-400'
                      : 'bg-white/80 border-emerald-200/60 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div>
                    <p className="text-lg font-bold text-slate-950 font-serif">
                      "{item.en}"
                    </p>
                    <p className="text-sm font-semibold text-emerald-800 mt-0.5">
                      {item.ko}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.nuance}
                    </p>
                  </div>
                  <button
                    className="p-2.5 rounded-xl bg-emerald-200/70 hover:bg-emerald-300 text-slate-900 transition-colors shrink-0 ml-3"
                    title="소리 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
