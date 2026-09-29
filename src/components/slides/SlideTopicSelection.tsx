import React, { useState } from 'react';
import { Users, Trophy, HeartHandshake, Sparkles, Volume2, ArrowRight, ArrowLeft, Copy, Check, MessageSquare, Plus } from 'lucide-react';
import { TOPIC_CARDS, VIRTUAL_CHARACTERS } from '../../data/lessonData';
import { speakText } from '../../utils/speech';

interface SlideTopicSelectionProps {
  onNavigateSlide: (slide: number) => void;
}

export const SlideTopicSelection: React.FC<SlideTopicSelectionProps> = ({ onNavigateSlide }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('friendship');
  const [customDialogue, setCustomDialogue] = useState<Array<{ role: 'A' | 'B'; speaker: string; text: string }>>([
    { role: 'A', speaker: 'Leo (민호)', text: 'What do you think will happen with Riley and Val?' },
    { role: 'B', speaker: 'Emma (지우)', text: "I think Val will help Riley become a better hockey player." },
    { role: 'A', speaker: 'Leo (민호)', text: "What if Riley feels too much pressure to fit in?" },
    { role: 'B', speaker: 'Emma (지우)', text: "She might feel stressed, but her friends will support her." },
  ]);
  const [copied, setCopied] = useState(false);
  const [activeSpeechIdx, setActiveSpeechIdx] = useState<number | null>(null);

  const activeTopic = TOPIC_CARDS.find((t) => t.id === selectedTopicId) || TOPIC_CARDS[0];

  const handleCopyScript = () => {
    const text = customDialogue
      .map((line) => `${line.role} (${line.speaker}): ${line.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayLine = (idx: number) => {
    setActiveSpeechIdx(idx);
    const line = customDialogue[idx];
    const voiceType = line.role === 'A' ? 'male' : 'female';
    speakText(line.text, {
      voiceType,
      onEnd: () => setActiveSpeechIdx(null),
    });
  };

  const handleUpdateLine = (idx: number, newText: string) => {
    const updated = [...customDialogue];
    updated[idx].text = newText;
    setCustomDialogue(updated);
  };

  const handleAddLine = () => {
    if (customDialogue.length >= 8) return;
    const lastRole = customDialogue[customDialogue.length - 1]?.role || 'B';
    const nextRole = lastRole === 'A' ? 'B' : 'A';
    const nextSpeaker = nextRole === 'A' ? 'Leo (민호)' : 'Emma (지우)';
    setCustomDialogue([...customDialogue, { role: nextRole, speaker: nextSpeaker, text: '' }]);
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-[#14231e] border border-emerald-900/60 shadow-2xl relative space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold">
              Slide 19 · Topic Cards
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
            Your Turn: Pick a Topic <Sparkles className="w-8 h-8 text-amber-400" />
          </h2>
          <p className="text-sm text-emerald-200/80 mt-1">
            4가지 주제 중 하나를 선택하고, 파트너와 함께 대화문을 구성해 보세요.
          </p>
        </div>

        <button
          onClick={() => onNavigateSlide(20)}
          className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg flex items-center gap-2"
        >
          <span>Wrap-up &amp; Exit Ticket (Slide 20)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Topic Cards from Slide 19 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOPIC_CARDS.map((topic) => {
          const isSelected = topic.id === selectedTopicId;

          return (
            <div
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border shadow-md flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#fef8e2] text-slate-950 border-amber-400 ring-4 ring-amber-400/40 -translate-y-1'
                  : 'bg-slate-900/70 text-slate-200 border-slate-700/70 hover:bg-slate-900 hover:border-slate-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-xl font-black font-serif ${isSelected ? 'text-amber-950' : 'text-white'}`}>
                    {topic.title}
                  </h3>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-300 text-amber-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {topic.koreanTitle}
                  </span>
                </div>

                <p className={`text-base font-bold leading-snug ${isSelected ? 'text-slate-900' : 'text-slate-300'}`}>
                  {topic.prompt}
                </p>
                <p className={`text-xs mt-1 font-medium ${isSelected ? 'text-emerald-800' : 'text-emerald-400'}`}>
                  {topic.koreanPrompt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/10">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">아이디어 힌트:</span>
                <p className="text-xs italic text-slate-600 truncate" title={topic.sampleIdeas[0]}>
                  • {topic.sampleIdeas[0]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 8-Line Dialogue Builder Worksheet */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-800/50 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/70 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              선택한 주제 ({activeTopic.title}): 8줄 대화문 작성하기
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료!' : '대본 복사하기'}</span>
            </button>
            {customDialogue.length < 8 && (
              <button
                onClick={handleAddLine}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>대사 추가 ({customDialogue.length}/8)</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {customDialogue.map((line, idx) => {
            const isSpeakerA = line.role === 'A';
            const char = isSpeakerA ? VIRTUAL_CHARACTERS.characterA : VIRTUAL_CHARACTERS.characterB;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  isSpeakerA
                    ? 'bg-[#fef8e2] border-amber-200 text-slate-900'
                    : 'bg-[#f0fdf4] border-emerald-200 text-slate-900 ml-4 sm:ml-8'
                }`}
              >
                <div className="flex flex-col items-center shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                      isSpeakerA ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {line.role}
                  </span>
                  <span className="text-[10px] text-slate-600 font-bold mt-0.5">
                    {char.name.split(' ')[0]}
                  </span>
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={line.text}
                    onChange={(e) => handleUpdateLine(idx, e.target.value)}
                    placeholder={
                      isSpeakerA
                        ? '예: What do you think will happen...?'
                        : "예: I think she'll make the team..."
                    }
                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-amber-500 focus:ring-0 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 px-1 py-1"
                  />
                </div>

                <button
                  onClick={() => handlePlayLine(idx)}
                  className="p-2 rounded-xl bg-black/5 hover:bg-black/10 text-slate-700 shrink-0"
                  title="가상 인물 목소리로 듣기"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
