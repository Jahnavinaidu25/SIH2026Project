import React, { useState } from 'react';
import {
  Search,
  Mic,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Heart,
  Star,
  MessageSquare,
  Compass,
  ShoppingBag,
  User,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  Clock,
  MapPin,
} from 'lucide-react';
import { CraftItem, ArtisanMatch, Artisan } from '../types';
import { INITIAL_ARTISAN_MATCHES, ARTISANS, INITIAL_CRAFTS } from '../data/mockData';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  crafts?: CraftItem[];
  onSelectCraft?: (craft: CraftItem) => void;
  onAddToCart?: (craft: CraftItem) => void;
  onPostRequirement?: () => void;
  onOpenConversation?: (artisanId: string) => void;
  onOpenPatronVault?: () => void;
  onSwitchToArtisan?: () => void;
  onOpenLanguageModal?: () => void;
  activeBuyerNavTab?: 'home' | 'discover' | 'requirements' | 'messages' | 'profile';
  onChangeBuyerNavTab?: (tab: 'home' | 'discover' | 'requirements' | 'messages' | 'profile') => void;
  // Dynamic compatibility props
  onSelectProduct?: (product: any) => void;
  onOpenPostRequirement?: () => void;
  onNavigate?: (view: string) => void;
}

export const BuyerHomeView: React.FC<Props> = ({
  crafts = INITIAL_CRAFTS,
  onSelectCraft,
  onAddToCart,
  onPostRequirement,
  onOpenConversation,
  onOpenPatronVault,
  onSwitchToArtisan,
  onOpenLanguageModal,
  activeBuyerNavTab = 'home',
  onChangeBuyerNavTab,
  onSelectProduct,
  onOpenPostRequirement,
  onNavigate,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVoiceSearching, setIsVoiceSearching] = useState(false);

  const handlePostReq = onPostRequirement || onOpenPostRequirement || (() => {});
  const handleSelect = (craft: CraftItem) => {
    onSelectCraft?.(craft);
    onSelectProduct?.(craft);
  };
  const handleNav = (tab: any) => {
    onChangeBuyerNavTab?.(tab);
    onNavigate?.(tab);
  };

  const categories = [
    { key: 'all', name: t.buyerHome.catAll, filter: 'All', icon: '🏺' },
    { key: 'pottery', name: t.buyerHome.catPottery, filter: 'Pottery', icon: '🍶' },
    { key: 'textiles', name: t.buyerHome.catTextiles, filter: 'Textiles', icon: '🧶' },
    { key: 'leather', name: t.buyerHome.catLeather, filter: 'Leather', icon: '👞' },
    { key: 'wood', name: t.buyerHome.catWood, filter: 'Wood Crafts', icon: '🪵' },
    { key: 'handicrafts', name: t.buyerHome.catHandicrafts, filter: 'Handicrafts', icon: '🧺' },
  ];

  // Voice Search simulation/web speech
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
      recognition.onerror = () => setIsVoiceSearching(false);
      recognition.onend = () => setIsVoiceSearching(false);
      recognition.start();
    } else {
      setTimeout(() => {
        setSearchQuery('Handmade clay');
        setIsVoiceSearching(false);
      }, 1500);
    }
  };

  const safeCraftsList = Array.isArray(crafts) && crafts.length > 0 ? crafts : INITIAL_CRAFTS;

  const filteredCrafts = safeCraftsList.filter((craft) => {
    const matchesSearch =
      craft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      craft.artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (craft.materials || []).some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Pottery') {
      return matchesSearch && (craft.category || '').toLowerCase().includes('ceramic');
    }
    if (selectedCategory === 'Textiles') {
      return matchesSearch && (craft.category || '').toLowerCase().includes('textile');
    }
    if (selectedCategory === 'Wood Crafts') {
      return matchesSearch && (craft.category || '').toLowerCase().includes('wood');
    }
    if (selectedCategory === 'Handicrafts') {
      return matchesSearch && ((craft.category || '').toLowerCase().includes('basket') || (craft.category || '').toLowerCase().includes('metal'));
    }
    return matchesSearch;
  });

  const featuredCrafts = filteredCrafts.slice(0, 4);
  const recommendedCrafts = [...filteredCrafts].reverse().slice(0, 3);
  const trendingCrafts = filteredCrafts.slice(1, 4);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-8 animate-fadeIn">
      {/* 1. Header Greeting & Primary CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-br from-[#F5EFEB] via-white to-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#E6DDD4] shadow-xs relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52]">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.buyerHome.fairWageBadge}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2C1810] tracking-tight">
            {t.buyerHome.heroTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed font-sans">
            {t.buyerHome.heroSubtitle}
          </p>
        </div>

        {/* Primary CTA: Post a Requirement */}
        <div className="z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            id="buyer-post-requirement-cta"
            onClick={() => {
              audioService.playCeramicChime(440);
              handlePostReq();
            }}
            className="h-14 px-6 rounded-2xl bg-[#C85A32] text-white text-sm font-extrabold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2.5 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.buyerHome.postRequirementCTA}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Decorative clay vessel backdrop */}
        <div className="absolute right-4 -bottom-6 text-7xl opacity-15 pointer-events-none select-none hidden sm:block">
          🏺
        </div>
      </div>

      {/* 2. Search Products with Voice Trigger */}
      <div className="space-y-3">
        <div className="relative w-full">
          <Search className="w-5 h-5 text-[#2C1810]/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="buyer-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.buyerHome.searchPlaceholder}
            className="w-full h-14 pl-12 pr-16 rounded-2xl bg-white border-2 border-[#E6DDD4] text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#C85A32] focus:ring-3 focus:ring-[#C85A32]/15 transition-all shadow-2xs"
          />
          <button
            id="buyer-voice-search-btn"
            onClick={triggerVoiceSearch}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isVoiceSearching
                ? 'bg-[#C85A32] text-white animate-pulse'
                : 'bg-[#F5EFEB] text-[#C85A32] hover:bg-[#EDE7E3]'
            }`}
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* 3. Browse Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.filter;
            return (
              <button
                key={cat.key}
                id={`cat-filter-${cat.key}`}
                onClick={() => {
                  setSelectedCategory(cat.filter);
                  audioService.playTactileTap();
                }}
                className={`h-11 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 border ${
                  isSelected
                    ? 'bg-[#2C1810] text-[#FDFBF7] border-[#2C1810] shadow-xs'
                    : 'bg-white text-[#2C1810] border-[#E6DDD4] hover:border-[#C85A32]/50 hover:bg-[#FDFBF7]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Featured Products Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#2C1810] tracking-tight">
              {t.buyerHome.featuredCraftsTitle}
            </h2>
            <p className="text-xs text-[#2C1810]/60">
              {t.buyerHome.featuredCraftsSubtitle}
            </p>
          </div>
          <button
            onClick={() => handleNav('discover')}
            className="text-xs font-bold text-[#C85A32] hover:underline flex items-center gap-1"
          >
            <span>{t.artisanHome.manageAllBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCrafts.map((craft) => (
            <div
              key={craft.id}
              className="bg-white rounded-2xl border border-[#E6DDD4] overflow-hidden hover:shadow-md transition-all flex flex-col group"
            >
              <div
                className="relative aspect-4/3 overflow-hidden bg-[#EDE7E3] cursor-pointer"
                onClick={() => handleSelect(craft)}
              >
                <img
                  src={craft.images[0]}
                  alt={craft.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#2C1810]/80 text-[#FDFBF7] backdrop-blur-xs">
                  {craft.category}
                </span>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3D6B52] text-white">
                  {craft.fairWagePercentage}% {t.common.directFairWage}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3
                    onClick={() => handleSelect(craft)}
                    className="font-bold text-sm text-[#2C1810] line-clamp-1 hover:text-[#C85A32] cursor-pointer"
                  >
                    {craft.title}
                  </h3>
                  <p className="text-xs text-[#2C1810]/60 mt-0.5 line-clamp-1">
                    By {craft.artisan.name} • {craft.artisan.location}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E6DDD4]/50">
                  <div>
                    <span className="text-base font-extrabold text-[#2C1810]">
                      ₹{craft.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#2C1810]/50 block">{t.cart.shippingFree}</span>
                  </div>

                  <button
                    onClick={() => onAddToCart?.(craft)}
                    className="h-9 px-3.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t.buyerHome.addToBag}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Artisans Section */}
      <section className="space-y-4 bg-[#F5EFEB] p-6 rounded-3xl border border-[#E6DDD4]">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#C85A32]/10 text-[#C85A32] mb-1">
              <span>{t.buyerHome.masterArtisansSubtitle}</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#2C1810] tracking-tight">
              {t.buyerHome.masterArtisansTitle}
            </h2>
            <p className="text-xs text-[#2C1810]/60">
              {t.buyerHome.masterArtisansSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INITIAL_ARTISAN_MATCHES.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white p-5 rounded-2xl border border-[#E6DDD4] shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.artisanName}
                  className="w-12 h-12 rounded-xl object-cover border border-[#E6DDD4]"
                />
                <div>
                  <h3 className="font-extrabold text-sm text-[#2C1810]">
                    {artisan.artisanName}
                  </h3>
                  <p className="text-xs text-[#C85A32] font-semibold">
                    {artisan.craftSpecialization}
                  </p>
                  <p className="text-[11px] text-[#2C1810]/60 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{artisan.location}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#2C1810]/70 line-clamp-2">
                {artisan.bio}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#E6DDD4] text-[11px]">
                <span className="font-bold text-[#3D6B52] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#3D6B52]" />
                  <span>{artisan.rating} (50+ orders)</span>
                </span>

                <button
                  onClick={() => {
                    audioService.playTactileTap();
                    onOpenConversation?.(artisan.artisanId);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#2C1810] text-white text-xs font-bold hover:bg-black transition-all flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{t.buyerHome.connectWithArtisan}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Trending Crafts & Recommended */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#C85A32]" />
            <h2 className="text-xl font-extrabold text-[#2C1810] tracking-tight">
              {t.buyerHome.trendingTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trendingCrafts.map((craft) => (
            <div
              key={craft.id}
              onClick={() => handleSelect(craft)}
              className="bg-white p-3 rounded-2xl border border-[#E6DDD4] hover:border-[#C85A32] cursor-pointer transition-all flex items-center gap-3.5 group"
            >
              <img
                src={craft.images[0]}
                alt={craft.title}
                className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-[#2C1810] truncate group-hover:text-[#C85A32]">
                  {craft.title}
                </h4>
                <p className="text-[11px] text-[#2C1810]/60 truncate">
                  {craft.materials.slice(0, 2).join(', ')}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-extrabold text-[#2C1810]">
                    ₹{craft.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#3D6B52] font-semibold">
                    {craft.inStock} {t.common.inStock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom Navigation for Buyer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E6DDD4] px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            id="buyer-nav-home"
            onClick={() => {
              audioService.playTactileTap();
              handleNav('home');
            }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              activeBuyerNavTab === 'home' ? 'text-[#C85A32] font-bold' : 'text-[#2C1810]/60'
            }`}
          >
            <span className="text-lg">🏠</span>
            <span className="text-[10px]">{t.nav.home}</span>
          </button>

          <button
            id="buyer-nav-discover"
            onClick={() => {
              audioService.playTactileTap();
              handleNav('discover');
            }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              activeBuyerNavTab === 'discover' ? 'text-[#C85A32] font-bold' : 'text-[#2C1810]/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[10px]">{t.nav.discover}</span>
          </button>

          {/* Center Prominent Requirement Button */}
          <button
            id="buyer-nav-requirements"
            onClick={() => {
              audioService.playCeramicChime(420);
              handlePostReq();
            }}
            className="flex flex-col items-center -mt-5"
          >
            <div className="w-12 h-12 rounded-full bg-[#C85A32] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#C85A32] mt-0.5">{t.nav.requirements}</span>
          </button>

          <button
            id="buyer-nav-messages"
            onClick={() => {
              audioService.playTactileTap();
              onOpenConversation?.('ravi-kumar');
            }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              activeBuyerNavTab === 'messages' ? 'text-[#C85A32] font-bold' : 'text-[#2C1810]/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[10px]">{t.nav.messages}</span>
          </button>

          <button
            id="buyer-nav-profile"
            onClick={() => {
              audioService.playTactileTap();
              onOpenPatronVault?.();
            }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              activeBuyerNavTab === 'profile' ? 'text-[#C85A32] font-bold' : 'text-[#2C1810]/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px]">{t.nav.patronVault}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
