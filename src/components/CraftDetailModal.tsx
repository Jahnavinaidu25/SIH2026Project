import React, { useState } from 'react';
import { X, Volume2, ShieldCheck, MapPin, Sparkles, Clock, Check, Heart, Share2, Compass, Award } from 'lucide-react';
import { CraftItem } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { formatPrice } from '../utils/currency';

interface Props {
  craft: CraftItem | null;
  onClose: () => void;
  onAddToCart: (craft: CraftItem) => void;
  onPlayAudio: (craft: CraftItem) => void;
  isAudioPlaying?: boolean;
}

export const CraftDetailModal: React.FC<Props> = ({
  craft,
  onClose,
  onAddToCart,
  onPlayAudio,
  isAudioPlaying = false,
}) => {
  const { t } = useTranslation();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!craft) return null;

  const artisanPayout = Math.round((craft.price * craft.fairWagePercentage) / 100);
  const materialsPayout = Math.round((craft.price * craft.rawMaterialsPercentage) / 100);
  const logisticsPayout = Math.round((craft.price * craft.ecoLogisticsPercentage) / 100);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="craft-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#2C1810]/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id={`craft-modal-content-${craft.id}`}
        className="bg-[#FDFBF7] border border-[#E6DDD4] rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto text-[#2C1810]"
        style={{
          boxShadow: '0 20px 32px -8px rgba(44, 24, 16, 0.24)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          id="close-craft-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#F5EFEB] border border-[#E6DDD4] flex items-center justify-center text-[#2C1810] hover:bg-[#EDE7E3] transition-colors"
          aria-label="Close craft modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Visual Gallery & Provenance Badges (5 cols) */}
          <div className="md:col-span-5 p-5 sm:p-6 bg-[#F5EFEB] border-b md:border-b-0 md:border-r border-[#E6DDD4] flex flex-col justify-between">
            <div>
              {/* Main Image Container with warm tone overlay */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#EDE7E3] mb-3 relative border border-[#E6DDD4] shadow-inner">
                <img
                  src={craft.images[selectedImgIndex] || craft.images[0]}
                  alt={craft.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#C85A32]/5 pointer-events-none mix-blend-multiply" />
                <div className="absolute bottom-3 left-3 bg-[#2C1810]/80 text-[#FDFBF7] text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {craft.status === 'ready' ? 'Finished Piece • Ready' : craft.status}
                </div>
              </div>

              {/* Thumbnails */}
              {craft.images.length > 1 && (
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                  {craft.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImgIndex === idx
                          ? 'border-[#C85A32] ring-2 ring-[#C85A32]/30'
                          : 'border-[#E6DDD4] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Artisan Bio Card */}
              <div className="bg-[#FDFBF7] border border-[#E6DDD4] rounded-2xl p-4 mt-2">
                <div className="flex items-center gap-3 mb-2.5">
                  <img
                    src={craft.artisan.avatar}
                    alt={craft.artisan.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#C85A32]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#2C1810]">{craft.artisan.name}</h4>
                    <p className="text-xs text-[#2C1810]/60 italic">{craft.artisan.lineage}</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#3D6B52] font-semibold mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{craft.artisan.location}, {craft.artisan.country}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#2C1810]/80 leading-relaxed font-sans line-clamp-3">
                  {craft.artisan.bio}
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#E6DDD4] flex items-center justify-between text-[11px] text-[#2C1810]/70">
                  <span>Cooperative Guild:</span>
                  <span className="font-semibold text-[#2C1810] truncate max-w-[170px]">
                    {craft.artisan.communityCoop}
                  </span>
                </div>
              </div>
            </div>

            {/* Listen to Voice Story Prompt */}
            <div className="mt-4 pt-3 border-t border-[#E6DDD4]">
              <button
                id="modal-play-story-btn"
                onClick={() => onPlayAudio(craft)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isAudioPlaying
                    ? 'bg-[#C85A32] text-white voice-pulse'
                    : 'bg-[#EDE7E3] text-[#2C1810] hover:bg-[#e2dcd7]'
                }`}
              >
                <Volume2 className="w-4 h-4 text-[#C85A32] group-hover:text-white" />
                <span>{isAudioPlaying ? 'Playing Spoken Story...' : `Listen to ${craft.artisan.name} (${craft.audioStory.duration})`}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Narrative, Origin Steps, Fair Wage Transparency (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Category & Verified Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Ancestral Lineage
                  </span>
                  <span className="text-xs font-medium text-[#2C1810]/60">
                    {craft.category}
                  </span>
                </div>
                <button
                  onClick={handleShare}
                  className="text-xs text-[#2C1810]/60 hover:text-[#C85A32] flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
                </button>
              </div>

              {/* Title & Vernacular Name */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight leading-tight">
                  {craft.title}
                </h2>
                <p className="text-sm italic font-serif text-[#C85A32] mt-1">
                  {craft.vernacularTitle}
                </p>
              </div>

              {/* Spoken Audio Story Transcript block */}
              <div className="p-4 rounded-xl bg-[#F5EFEB] border border-[#E6DDD4]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C1810] mb-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Spoken Words by {craft.artisan.name}:</span>
                </div>
                <p className="text-sm italic font-serif text-[#2C1810] leading-relaxed">
                  {craft.audioStory.transcript}
                </p>
              </div>

              {/* Provenance Narrative */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 mb-1.5">
                  The Craft Journey & Material Lineage
                </h4>
                <p className="text-sm text-[#2C1810]/80 leading-relaxed font-sans">
                  {craft.provenanceStory}
                </p>
              </div>

              {/* Physical Specifications */}
              <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-[#F5EFEB]/60 border border-[#E6DDD4] text-xs">
                <div>
                  <span className="text-[#2C1810]/50 block">Dimensions</span>
                  <span className="font-bold text-[#2C1810]">{craft.dimensions}</span>
                </div>
                <div>
                  <span className="text-[#2C1810]/50 block">Weight</span>
                  <span className="font-bold text-[#2C1810]">{craft.weight}</span>
                </div>
                <div>
                  <span className="text-[#2C1810]/50 block">Handcraft Time</span>
                  <span className="font-bold text-[#2C1810]">{craft.handcraftHours} hours</span>
                </div>
              </div>

              {/* Provenance Steps Timeline */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 mb-2.5 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#3D6B52]" />
                  Generational Creation Journey
                </h4>
                <div className="space-y-2 border-l-2 border-[#E6DDD4] ml-2 pl-3">
                  {craft.originSteps.map((step, idx) => (
                    <div key={idx} className="relative text-xs">
                      <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#C85A32]" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2C1810]">{step.stage}</span>
                        <span className="text-[11px] text-[#2C1810]/50">{step.duration}</span>
                      </div>
                      <p className="text-[#2C1810]/70 mt-0.5">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAIR WAGE TRANSPARENCY METER - Crucial Design Feature */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F5EFEB] border border-[#E6DDD4]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-[#2C1810] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#3D6B52]" />
                    Fair Wage Transparency Meter
                  </span>
                  <span className="text-xs font-bold text-[#3D6B52] bg-[#3D6B52]/10 px-2.5 py-0.5 rounded-full">
                    {craft.fairWagePercentage}% Direct to Maker
                  </span>
                </div>

                {/* Segmented meter bar */}
                <div className="h-3 w-full rounded-full overflow-hidden flex my-2 border border-[#E6DDD4]">
                  <div
                    style={{ width: `${craft.fairWagePercentage}%` }}
                    className="bg-[#3D6B52] h-full"
                    title={`${craft.fairWagePercentage}% Artisan Compensation`}
                  />
                  <div
                    style={{ width: `${craft.rawMaterialsPercentage}%` }}
                    className="bg-[#2C1810] h-full"
                    title={`${craft.rawMaterialsPercentage}% Raw Materials`}
                  />
                  <div
                    style={{ width: `${craft.ecoLogisticsPercentage}%` }}
                    className="bg-[#C85A32] h-full"
                    title={`${craft.ecoLogisticsPercentage}% Carbon-neutral Shipping`}
                  />
                </div>

                {/* Financial breakdown */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="p-2 rounded-lg bg-white border border-[#E6DDD4]">
                    <span className="text-[11px] text-[#2C1810]/60 block">Direct to Artisan</span>
                    <span className="font-extrabold text-sm text-[#3D6B52]">${artisanPayout}</span>
                    <span className="text-[10px] text-[#2C1810]/50 block">({craft.fairWagePercentage}%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#E6DDD4]">
                    <span className="text-[11px] text-[#2C1810]/60 block">Raw Materials</span>
                    <span className="font-extrabold text-sm text-[#2C1810]">${materialsPayout}</span>
                    <span className="text-[10px] text-[#2C1810]/50 block">({craft.rawMaterialsPercentage}%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#E6DDD4]">
                    <span className="text-[11px] text-[#2C1810]/60 block">Eco Logistics</span>
                    <span className="font-extrabold text-sm text-[#C85A32]">${logisticsPayout}</span>
                    <span className="text-[10px] text-[#2C1810]/50 block">({craft.ecoLogisticsPercentage}%)</span>
                  </div>
                </div>

                <div className="mt-2.5 text-[11px] text-[#3D6B52] font-semibold text-center flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>0% Middleman extraction • Guaranteed local cooperative bank transfer</span>
                </div>
              </div>
            </div>

            {/* Bottom Checkout / Acquisition Bar */}
            <div className="pt-6 border-t border-[#E6DDD4] mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#2C1810]/60">Total Value to Maker</span>
                <div className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
                  {formatPrice(craft.price)}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  id="acquire-modal-submit-btn"
                  onClick={() => {
                    audioService.playTactileTap();
                    onAddToCart(craft);
                    onClose();
                  }}
                  className="h-12 px-6 rounded-xl bg-[#C85A32] text-white text-sm font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.buyerHome.addToBag} ({craft.artisan.name})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
