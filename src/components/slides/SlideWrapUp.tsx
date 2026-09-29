import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, BookOpen, Sparkles, Download, RotateCcw, Copy, Check } from 'lucide-react';

interface SlideWrapUpProps {
  onNavigateSlide: (slide: number) => void;
}

export const SlideWrapUp: React.FC<SlideWrapUpProps> = ({ onNavigateSlide }) => {
  const [exitTicketAction, setExitTicketAction] = useState('');
  const [exitTicketReason, setExitTicketReason] = useState('');
  const [exitSubmitted, setExitSubmitted] = useState(false);

  const [hw1, setHw1] = useState('');
  const [hw2, setHw2] = useState('');
  const [hw3, setHw3] = useState('');
  const [copiedHw, setCopiedHw] = useState(false);

  const handleSubmitExit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitTicketAction.trim() || !exitTicketReason.trim()) return;
    setExitSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleCopyHomework = () => {
    const text = `[Inside Out 2 Lesson Homework: 3 Predictions for Next Year]\n1. I think I'll ${hw1 || '...'}\n2. I think I'll ${hw2 || '...'}\n3. I think I'll ${hw3 || '...'}\n\n[Exit Ticket]\nI think Riley will ${exitTicketAction} because ${exitTicketReason}.`;
    navigator.clipboard.writeText(text);
    setCopiedHw(true);
    setTimeout(() => setCopiedHw(false), 2000);
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
              Slide 20 · Wrap-up
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-400 flex items-center gap-3">
            Wrap-up: Exit Ticket &amp; Homework <Sparkles className="w-8 h-8 text-amber-400" />
          </h2>
          <p className="text-sm text-emerald-200/80 mt-1">
            오늘 수업의 배움을 정리하는 마무리 티켓(Exit Ticket)과 과제를 작성해 보세요.
          </p>
        </div>

        <button
          onClick={() => onNavigateSlide(1)}
          className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>처음(Slide 1)으로 이동</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Exit Ticket Card */}
        <div className="p-6 rounded-3xl bg-[#fef8e2] text-slate-900 border border-amber-200 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-amber-950 font-serif border-b border-amber-300 pb-2 flex items-center justify-between">
              <span>Exit ticket</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-200/70 text-amber-900">
                수업 퇴장 미션
              </span>
            </h3>

            <p className="text-xs text-slate-600 mt-3 mb-4">
              오늘 배운 예측 문장 구조를 사용해 빈칸을 완성하세요.
            </p>

            <form onSubmit={handleSubmitExit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-3">
                <div className="text-base sm:text-lg font-bold text-slate-950 font-serif leading-relaxed">
                  I think Riley will{' '}
                  <input
                    type="text"
                    value={exitTicketAction}
                    onChange={(e) => setExitTicketAction(e.target.value)}
                    placeholder="make the high school team"
                    className="border-b-2 border-amber-400 font-mono text-sm sm:text-base font-semibold px-2 py-0.5 text-amber-950 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-600 bg-amber-50/50 rounded-sm"
                  />{' '}
                  because{' '}
                  <input
                    type="text"
                    value={exitTicketReason}
                    onChange={(e) => setExitTicketReason(e.target.value)}
                    placeholder="she practiced all summer and has true friends"
                    className="border-b-2 border-amber-400 font-mono text-sm sm:text-base font-semibold px-2 py-0.5 text-amber-950 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-600 bg-amber-50/50 rounded-sm w-full mt-2"
                  />
                  .
                </div>
              </div>

              {exitSubmitted ? (
                <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Exit ticket 제출이 완료되었습니다! 수고하셨습니다.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!exitTicketAction.trim() || !exitTicketReason.trim()}
                  className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Exit Ticket 제출하기</span>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Homework Card */}
        <div className="p-6 rounded-3xl bg-[#f0fdf4] text-slate-900 border border-emerald-200 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-emerald-950 font-serif border-b border-emerald-300 pb-2 flex items-center justify-between">
              <span>Homework</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-200/70 text-emerald-900">
                과제
              </span>
            </h3>

            <p className="text-sm font-semibold text-slate-800 mt-3 mb-3">
              Write 3 predictions about your own next year: <strong className="text-emerald-800 font-mono">"I think I'll..."</strong>
            </p>
            <p className="text-xs text-slate-600 mb-4">
              자신의 내년에 대해 3가지 긍정적이고 현실적인 예측 문장을 작성하세요.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-300">
                <span className="text-xs font-bold text-emerald-800 font-mono">1.</span>
                <span className="text-sm font-bold text-slate-800 font-mono">I think I'll</span>
                <input
                  type="text"
                  value={hw1}
                  onChange={(e) => setHw1(e.target.value)}
                  placeholder="read 10 good books and make new friends."
                  className="flex-1 bg-transparent text-sm font-medium border-0 focus:ring-0 text-slate-950 placeholder:text-slate-400 px-1 py-0.5"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-300">
                <span className="text-xs font-bold text-emerald-800 font-mono">2.</span>
                <span className="text-sm font-bold text-slate-800 font-mono">I think I'll</span>
                <input
                  type="text"
                  value={hw2}
                  onChange={(e) => setHw2(e.target.value)}
                  placeholder="improve my English speaking skills like Riley."
                  className="flex-1 bg-transparent text-sm font-medium border-0 focus:ring-0 text-slate-950 placeholder:text-slate-400 px-1 py-0.5"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-300">
                <span className="text-xs font-bold text-emerald-800 font-mono">3.</span>
                <span className="text-sm font-bold text-slate-800 font-mono">I think I'll</span>
                <input
                  type="text"
                  value={hw3}
                  onChange={(e) => setHw3(e.target.value)}
                  placeholder="stay calm even when I feel anxious."
                  className="flex-1 bg-transparent text-sm font-medium border-0 focus:ring-0 text-slate-950 placeholder:text-slate-400 px-1 py-0.5"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleCopyHomework}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {copiedHw ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copiedHw ? '과제 & Exit Ticket 복사 완료!' : '과제 복사하여 저장하기'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
