import React, { useEffect, useState } from 'react';
import { Play, Pause, Volume2, X } from 'lucide-react';
import { audioService } from '../utils/audioService';
import { AudioStory } from '../types';

interface Props {
  activeStory: AudioStory | null;
  onClose: () => void;
}

export const AudioPlayerBanner: React.FC<Props> = ({ activeStory, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!activeStory) {
      setIsPlaying(false);
      setProgress(0);
      return;
    }

    setIsPlaying(true);
    audioService.playAudioStory(
      activeStory.id,
      activeStory.transcript,
      activeStory.artisanName,
      activeStory.durationSeconds || 60,
      (prog) => {
        setProgress(prog);
      },
      () => {
        setIsPlaying(false);
        setProgress(100);
      }
    );

    return () => {
      audioService.stopAudioStory();
    };
  }, [activeStory]);

  if (!activeStory) return null;

  const togglePlay = () => {
    if (isPlaying) {
      audioService.stopAudioStory();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audioService.playAudioStory(
        activeStory.id,
        activeStory.transcript,
        activeStory.artisanName,
        activeStory.durationSeconds || 60,
        (prog) => setProgress(prog),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <div
      id="ambient-audio-player-banner"
      className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-50 bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl shadow-xl p-4 transition-all duration-300"
      style={{
        boxShadow: '0 20px 32px -8px rgba(44, 24, 16, 0.16)',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Play/Pause action */}
        <button
          id="toggle-audio-story-btn"
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#C85A32] text-white flex items-center justify-center shrink-0 hover:bg-[#b54f2a] active:scale-95 transition-all shadow-md"
          aria-label={isPlaying ? 'Pause artisan voice story' : 'Play artisan voice story'}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        {/* Story details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#3D6B52]/10 text-[#3D6B52]">
              <Volume2 className="w-3 h-3" />
              Artisan Voice
            </span>
            <span className="text-xs text-[#2C1810]/70 font-medium truncate">
              {activeStory.artisanName}
            </span>
            <span className="text-xs text-[#2C1810]/40">• {activeStory.duration}</span>
          </div>
          <h4 className="text-sm font-bold text-[#2C1810] truncate">
            {activeStory.title}
          </h4>

          {/* Animated voice soundbars */}
          <div className="flex items-center gap-1 mt-1.5 h-3">
            {[40, 75, 95, 60, 85, 45, 90, 65, 35, 70].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full transition-all duration-200"
                style={{
                  height: isPlaying ? `${Math.max(4, (h * (0.4 + (i % 3) * 0.3)))}px` : '3px',
                  backgroundColor: i % 2 === 0 ? '#C85A32' : '#3D6B52',
                  animation: isPlaying ? `waveBar 0.9s infinite ease-in-out ${i * 0.1}s` : 'none',
                }}
              />
            ))}
            <div className="w-full bg-[#E6DDD4] h-1.5 rounded-full ml-2 overflow-hidden">
              <div
                className="bg-[#C85A32] h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          id="close-audio-banner-btn"
          onClick={() => {
            audioService.stopAudioStory();
            onClose();
          }}
          className="p-2 text-[#2C1810]/60 hover:text-[#2C1810] hover:bg-[#E6DDD4]/50 rounded-full transition-colors shrink-0"
          aria-label="Close audio player"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Spoken transcript snippet with terracotta active caret */}
      <div className="mt-3 pt-2.5 border-t border-[#E6DDD4]/70 text-xs italic text-[#2C1810]/80 leading-relaxed font-serif flex items-center gap-1.5">
        <span className="truncate">{activeStory.transcript}</span>
        {isPlaying && <span className="inline-block w-1.5 h-3 bg-[#C85A32] animate-pulse shrink-0" />}
      </div>
    </div>
  );
};
