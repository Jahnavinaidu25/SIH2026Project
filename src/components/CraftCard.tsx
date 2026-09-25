import React from 'react';
import { Volume2, Sparkles, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { CraftItem } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { formatPrice } from '../utils/currency';

interface Props {
  craft: CraftItem;
  onSelect: (craft: CraftItem) => void;
  onPlayAudio: (craft: CraftItem) => void;
  onAddToCart: (craft: CraftItem) => void;
  isAudioPlaying?: boolean;
}

export const CraftCard: React.FC<Props> = ({
  craft,
  onSelect,
  onPlayAudio,
  onAddToCart,
  isAudioPlaying = false,
}) => {
  const { t } = useTranslation();
  const fairWageDollar = Math.round((craft.price * craft.fairWagePercentage) / 100);

  return (
    <div
      id={`craft-card-${craft.id}`}
      className="group bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#C85A32]/40 relative"
      style={{
        boxShadow: '0 2px 6px -1px rgba(44, 24, 16, 0.05), 0 1px 3px -1px rgba(44, 24, 16, 0.03)',
      }}
    >
      <div>
        {/* Inset Image Container with 12px Radius & Warm Tint */}
        <div
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#EDE7E3] cursor-pointer"
          onClick={() => onSelect(craft)}
        >
          <img
            src={craft.images[0]}
            alt={craft.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 filter saturate-[0.92] contrast-[1.03]"
            loading="lazy"
          />
          {/* Warm Tint Overlay */}
          <div className="absolute inset-0 bg-[#C85A32]/5 pointer-events-none mix-blend-multiply" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            {craft.verifiedLineage && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#3D6B52]/90 backdrop-blur-sm text-white shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.common.verifiedArtisan}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#2C1810]/80 backdrop-blur-sm text-[#FDFBF7]">
              {craft.category}
            </span>
          </div>

          {/* Audio Story Quick Node */}
          <button
            id={`play-story-btn-${craft.id}`}
            onClick={(e) => {
              e.stopPropagation();
              audioService.playTactileTap();
              onPlayAudio(craft);
            }}
            className={`absolute bottom-2.5 left-2.5 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md ${
              isAudioPlaying
                ? 'bg-[#C85A32] text-white voice-pulse ring-2 ring-white/50'
                : 'bg-[#FDFBF7]/90 text-[#2C1810] hover:bg-white'
            }`}
            aria-label={`Listen to ${craft.artisan.name}'s story`}
          >
            <Volume2 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'animate-bounce' : ''}`} />
            <span>{isAudioPlaying ? 'Playing...' : `${t.marketplace.listenStory} (${craft.audioStory.duration})`}</span>
          </button>
        </div>

        {/* Artisan Info Line */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={craft.artisan.avatar}
            alt={craft.artisan.name}
            className="w-6 h-6 rounded-full object-cover border border-[#E6DDD4]"
          />
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[#2C1810] block truncate">
              {craft.artisan.name}
            </span>
            <span className="text-[11px] text-[#2C1810]/60 block truncate">
              {craft.artisan.location}, {craft.artisan.country}
            </span>
          </div>
        </div>

        {/* Titles */}
        <h3
          onClick={() => onSelect(craft)}
          className="text-lg font-bold text-[#2C1810] hover:text-[#C85A32] cursor-pointer transition-colors leading-snug line-clamp-2 mb-1"
        >
          {craft.title}
        </h3>
        <p className="text-xs italic text-[#2C1810]/60 font-serif mb-3 line-clamp-1">
          {craft.vernacularTitle}
        </p>

        {/* Materials Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {craft.materials.slice(0, 2).map((mat, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-[#EDE7E3] text-[#2C1810]/80 font-medium truncate max-w-[180px]"
            >
              {mat}
            </span>
          ))}
          {craft.materials.length > 2 && (
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-[#EDE7E3] text-[#2C1810]/60">
              +{craft.materials.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Pricing & Fair Wage Transparency Block */}
      <div className="pt-3 border-t border-[#E6DDD4]">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-xs text-[#2C1810]/60 font-medium">Conscious Price</span>
            <div className="text-base sm:text-lg font-extrabold text-[#2C1810]">
              {formatPrice(craft.price)}
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3D6B52] bg-[#3D6B52]/10 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              {craft.fairWagePercentage}% to Maker
            </span>
            <div className="text-[11px] text-[#2C1810]/60 mt-0.5">
              {formatPrice(fairWageDollar)} direct payout
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            id={`view-craft-details-${craft.id}`}
            onClick={() => onSelect(craft)}
            className="h-11 px-3 rounded-xl border border-[#E6DDD4] bg-[#FDFBF7] text-[#2C1810] text-xs font-bold hover:bg-white hover:border-[#C85A32]/50 active:scale-[0.98] transition-all flex items-center justify-center gap-1"
          >
            <span>{t.buyerHome.viewCraft}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            id={`acquire-craft-btn-${craft.id}`}
            onClick={() => onAddToCart(craft)}
            className="h-11 px-3 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>{t.buyerHome.addToBag}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
