import React, { useState } from 'react';
import { Search, Mic, Sparkles, Filter, SlidersHorizontal, ShieldCheck, Heart } from 'lucide-react';
import { CraftItem } from '../types';
import { CraftCard } from './CraftCard';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  crafts: CraftItem[];
  onSelectCraft: (craft: CraftItem) => void;
  onPlayAudio: (craft: CraftItem) => void;
  onAddToCart: (craft: CraftItem) => void;
  playingStoryId: string | null;
  onOpenVoiceStudio: () => void;
  onOpenPatronVault?: () => void;
}

export const MarketplaceView: React.FC<Props> = ({
  crafts = [],
  onSelectCraft,
  onPlayAudio,
  onAddToCart,
  playingStoryId,
  onOpenVoiceStudio,
  onOpenPatronVault,
}) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVoiceSearching, setIsVoiceSearching] = useState<boolean>(false);

  const categories = [
    { key: 'All', label: t.buyerHome.catAll },
    { key: 'Ceramics & Pottery', label: t.buyerHome.catPottery },
    { key: 'Handwoven Textiles', label: t.buyerHome.catTextiles },
    { key: 'Basketry & Reed', label: t.buyerHome.catHandicrafts },
    { key: 'Woodcraft & Carving', label: t.buyerHome.catWood },
  ];

  // Voice search trigger: simulate or use Web Speech
  const triggerVoiceSearch = () => {
    audioService.playCeramicChime(350);
    setIsVoiceSearching(true);

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setSearchQuery(text);
        setIsVoiceSearching(false);
      };
      recognition.onerror = () => {
        simulateVoiceSearchFallback();
      };
      try {
        recognition.start();
      } catch {
        simulateVoiceSearchFallback();
      }
    } else {
      simulateVoiceSearchFallback();
    }
  };

  const simulateVoiceSearchFallback = () => {
    const samples = ['clay', 'textiles', 'Elena', 'Bizen', 'indigo'];
    const chosen = samples[Math.floor(Math.random() * samples.length)];
    setTimeout(() => {
      setSearchQuery(chosen);
      setIsVoiceSearching(false);
    }, 700);
  };

  const safeCrafts = Array.isArray(crafts) ? crafts : [];

  const filteredCrafts = safeCrafts.filter((c) => {
    const matchesCategory =
      selectedCategory === 'All' || c.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      c.title.toLowerCase().includes(query) ||
      c.artisan.name.toLowerCase().includes(query) ||
      c.materials.some((m) => m.toLowerCase().includes(query)) ||
      c.category.toLowerCase().includes(query) ||
      c.artisan.location.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Editorial Hero Statement with Warm Earth Tones */}
      <div className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle background clay warmth */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C85A32]/5 blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.marketplace.provenancePassport}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight leading-tight">
            {t.marketplace.title}
          </h1>
          <p className="text-sm sm:text-base text-[#2C1810]/75 mt-3 leading-relaxed font-sans">
            {t.marketplace.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={onOpenVoiceStudio}
              className="h-12 px-5 rounded-xl bg-[#C85A32] text-white text-xs sm:text-sm font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              <span>{t.nav.voiceStudio}</span>
            </button>
            {onOpenPatronVault && (
              <button
                onClick={onOpenPatronVault}
                className="h-12 px-4 rounded-xl bg-[#2C1810] text-[#FDFBF7] text-xs sm:text-sm font-bold hover:bg-black active:scale-[0.98] transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C85A32]" />
                <span>{t.nav.patronVault}</span>
              </button>
            )}
            <div className="flex items-center gap-2 text-xs font-bold text-[#3D6B52] bg-[#3D6B52]/10 px-3.5 py-3 rounded-xl">
              <span>{t.marketplace.fairWageDirect}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input with Embedded Field Voice Trigger (as specified in Design System) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar Container */}
        <div className="relative w-full md:max-w-xl">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#2C1810]/40 absolute left-4 pointer-events-none" />
            <input
              id="marketplace-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.marketplace.searchCrafts}
              className="w-full h-[52px] pl-12 pr-16 rounded-xl bg-white border-[1.5px] border-[#E6DDD4] text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#C85A32] focus:ring-3 focus:ring-[#C85A32]/15 transition-all"
            />
            {/* Embedded 44px x 44px Field Voice Trigger */}
            <button
              id="embedded-search-voice-trigger"
              onClick={triggerVoiceSearch}
              title={t.voiceStudio.recordVoiceStory}
              className={`absolute right-1.5 w-[44px] h-[44px] rounded-lg flex items-center justify-center transition-all ${
                isVoiceSearching
                  ? 'bg-[#9f3c16] text-white voice-pulse'
                  : 'bg-[#C85A32] text-white hover:bg-[#b54f2a]'
              }`}
              aria-label="Speak into search field"
            >
              <Mic className={`w-5 h-5 ${isVoiceSearching ? 'animate-bounce' : ''}`} />
            </button>
          </div>
          {isVoiceSearching && (
            <span className="text-[11px] text-[#C85A32] font-semibold mt-1 block pl-2">
              {t.voiceStock.listening}
            </span>
          )}
        </div>

        {/* Total pieces available indicator */}
        <div className="text-xs font-semibold text-[#2C1810]/60 shrink-0">
          {t.marketplace.itemsCount}: <span className="text-[#2C1810] font-bold">{filteredCrafts.length}</span>
        </div>
      </div>

      {/* Filter Chips Styled Strictly to Design Tokens */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              audioService.playTactileTap();
              setSelectedCategory(cat.key);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat.key
                ? 'bg-[#2C1810] text-[#FDFBF7] border border-[#2C1810] shadow-sm'
                : 'bg-[#F5EFEB] text-[#2C1810] border border-[#E6DDD4] hover:border-[#C85A32]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="px-3 py-1.5 rounded-full text-xs text-[#C85A32] hover:underline"
          >
            {t.common.cancel}
          </button>
        )}
      </div>

      {/* Grid of Product & Story Cards */}
      {filteredCrafts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrafts.map((craft) => (
            <CraftCard
              key={craft.id}
              craft={craft}
              onSelect={onSelectCraft}
              onPlayAudio={onPlayAudio}
              onAddToCart={onAddToCart}
              isAudioPlaying={playingStoryId === craft.audioStory.id}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-3xl p-12 text-center max-w-md mx-auto my-12">
          <span className="text-4xl block mb-3">🏺</span>
          <h3 className="text-lg font-bold text-[#2C1810]">{t.artisanProducts.noProductsFound}</h3>
          <p className="text-xs text-[#2C1810]/70 mt-1 mb-4">
            {t.marketplace.filterByCategory}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#2C1810] text-white rounded-xl text-xs font-bold"
          >
            {t.artisanProducts.filterAll}
          </button>
        </div>
      )}
    </div>
  );
};
