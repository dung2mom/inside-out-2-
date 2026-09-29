import React, { useState } from 'react';
import { Play, RotateCcw, Sparkles, Film, ExternalLink, HelpCircle, Volume2 } from 'lucide-react';

interface VideoClipPlayerProps {
  videoId: string;
  videoTitle: string;
  clipStart: number;
  clipEnd?: number;
  clueTimestamp?: string;
  clueHint?: string;
  transcriptSnippet?: string;
  autoPlay?: boolean;
}

export const VideoClipPlayer: React.FC<VideoClipPlayerProps> = ({
  videoId,
  videoTitle,
  clipStart,
  clipEnd,
  clueTimestamp,
  clueHint,
  transcriptSnippet,
  autoPlay = false,
}) => {
  const [key, setKey] = useState(0);
  const [showFullVideo, setShowFullVideo] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const startSec = showFullVideo ? 0 : clipStart;
  const endSec = showFullVideo ? undefined : clipEnd;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?start=${startSec}${
    endSec ? `&end=${endSec}` : ''
  }&autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleReplay = () => {
    setShowFullVideo(false);
    setKey((prev) => prev + 1);
  };

  const handlePlayFull = () => {
    setShowFullVideo(true);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl transition-all">
      {/* Top Bar with Clip Range & Quick Controls */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-slate-700/80 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            <Film className="w-3.5 h-3.5" />
            {showFullVideo ? (
              '전체 영상 재생 중'
            ) : (
              <span>
                클립 구간:{' '}
                <strong className="text-white font-mono">
                  {formatTime(clipStart)} ~ {clipEnd ? formatTime(clipEnd) : 'End'}
                </strong>
              </span>
            )}
          </span>
          {clueTimestamp && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
              <Sparkles className="w-3 h-3" /> 정답 단서: {clueTimestamp}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-1 sm:mt-0">
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm active:scale-95"
            title="클립 처음부터 다시 재생"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>클립 다시보기</span>
          </button>

          <button
            onClick={handlePlayFull}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
              showFullVideo
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-700/80 hover:bg-slate-700 text-slate-200'
            }`}
            title="전체 영상 보기"
          >
            <Play className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">전체 영상</span>
          </button>

          <a
            href={`https://www.youtube.com/watch?v=${videoId}${clipStart ? `&t=${clipStart}` : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="YouTube에서 새 창으로 열기"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Video Iframe with 16:9 Aspect Ratio */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          key={key}
          src={embedUrl}
          title={videoTitle}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Clip Guidance & Audio Transcript Helper */}
      <div className="p-3 sm:p-4 bg-slate-800/60 border-t border-slate-700/60 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {clueHint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  showHint
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{showHint ? '힌트 닫기' : '정답 찾는 힌트 보기'}</span>
              </button>
            )}

            {transcriptSnippet && (
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  showTranscript
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>{showTranscript ? '자막 닫기' : '핵심 대사 미리보기'}</span>
              </button>
            )}
          </div>

          <span className="text-[11px] text-slate-400 italic">
            * 영상을 시청하며 질문의 단서를 찾아보세요!
          </span>
        </div>

        {showHint && clueHint && (
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs sm:text-sm text-amber-200 animate-fadeIn flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">힌트: </strong>
              {clueHint}
              {clueTimestamp && (
                <span className="ml-2 font-mono text-amber-400 font-bold">
                  (추천 구간: {clueTimestamp})
                </span>
              )}
            </div>
          </div>
        )}

        {showTranscript && transcriptSnippet && (
          <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-xs sm:text-sm text-indigo-100 animate-fadeIn space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-300 font-bold uppercase tracking-wider text-[11px]">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>영상 속 정답 구간 대사 (Authentic Quote)</span>
            </div>
            <p className="font-mono text-white text-sm sm:text-base leading-relaxed bg-black/30 p-2 rounded-xl border border-indigo-500/20">
              "{transcriptSnippet}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
