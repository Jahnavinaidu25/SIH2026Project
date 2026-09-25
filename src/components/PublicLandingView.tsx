import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Mic, Package, Globe, BarChart3, Users, Store, CheckCircle } from 'lucide-react';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { getLandingTranslation } from '../translations/landingTranslations';

interface Props {
  onJoinAsArtisan?: () => void;
  onNavigateToArtisanLogin?: () => void;
  onContinueAsBuyer?: () => void;
  onNavigateToBuyerLogin?: () => void;
  onAdminLogin?: () => void;
  onNavigateToAdminLogin?: () => void;
  onOpenLanguageModal?: () => void;
  onRoleSelect?: () => void;
  onQuickDemoArtisan?: () => void;
  onQuickDemoBuyer?: () => void;
  onBrowseCatalog?: () => void;
}

export const PublicLandingView: React.FC<Props> = ({
  onJoinAsArtisan,
  onNavigateToArtisanLogin,
  onContinueAsBuyer,
  onNavigateToBuyerLogin,
  onAdminLogin,
  onNavigateToAdminLogin,
  onOpenLanguageModal,
  onRoleSelect,
  onQuickDemoArtisan,
  onQuickDemoBuyer,
  onBrowseCatalog,
}) => {
  const { t, language } = useTranslation();
  const lt = getLandingTranslation(language);

  const handleArtisanClick = () => {
    if (onJoinAsArtisan) {
      onJoinAsArtisan();
    } else if (onNavigateToArtisanLogin) {
      onNavigateToArtisanLogin();
    }
  };

  const handleBuyerClick = () => {
    if (onContinueAsBuyer) {
      onContinueAsBuyer();
    } else if (onNavigateToBuyerLogin) {
      onNavigateToBuyerLogin();
    } else if (onBrowseCatalog) {
      onBrowseCatalog();
    }
  };

  const handleAdminClick = () => {
    if (onAdminLogin) {
      onAdminLogin();
    } else if (onNavigateToAdminLogin) {
      onNavigateToAdminLogin();
    }
  };

  const handleLanguageClick = () => {
    if (onOpenLanguageModal) {
      onOpenLanguageModal();
    }
  };

  const handleRoleSelectClick = () => {
    if (onRoleSelect) {
      onRoleSelect();
    } else {
      handleArtisanClick();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1810]">
      {/* Top Banner & Navigation */}
      <nav className="border-b border-[#E6DDD4] bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#C85A32] text-white flex items-center justify-center text-xl shadow-sm">
              🏺
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-[#2C1810] block leading-none">
                {t.common.brandName}
              </span>
              <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">
                SIH Screening Prototype
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                audioService.playClickSound();
                handleLanguageClick();
              }}
              className="h-9 px-3 rounded-xl border border-[#E6DDD4] bg-[#F5EFEB] text-xs font-bold text-[#2C1810] flex items-center gap-1.5 hover:bg-white transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
              <span className="uppercase">{language}</span>
            </button>

            <button
              onClick={() => {
                audioService.playClickSound();
                handleAdminClick();
              }}
              className="text-xs font-bold text-[#2C1810]/70 hover:text-[#C85A32] px-2.5 py-1.5 transition-colors hidden sm:inline"
            >
              {lt.adminAccess}
            </button>

            <button
              onClick={() => {
                audioService.playClickSound();
                handleArtisanClick();
              }}
              className="h-9 px-3.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b04b25] transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>{lt.artisanLogin}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-6 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lt.heroBadge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C1810] tracking-tight leading-tight sm:leading-none mb-6">
          {lt.heroTitlePart1} <br className="hidden sm:inline" />
          <span className="text-[#C85A32]">{lt.heroTitlePart2}</span>
        </h1>

        <p className="text-base sm:text-lg text-[#2C1810]/75 max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
          {lt.heroDesc}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-6">
          <button
            onClick={() => {
              audioService.playCeramicChime(380);
              handleArtisanClick();
            }}
            className="w-full sm:w-auto h-12 px-6 rounded-2xl bg-[#C85A32] text-white font-extrabold text-sm hover:bg-[#b04b25] transition-all shadow-md flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <span>👩‍🎨 {lt.joinAsArtisan}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              audioService.playCeramicChime(440);
              handleBuyerClick();
            }}
            className="w-full sm:w-auto h-12 px-6 rounded-2xl bg-[#2C1810] text-[#FDFBF7] font-extrabold text-sm hover:bg-black transition-all shadow-md flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <span>🛍️ {lt.continueAsBuyer}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick Demo Access Bar */}
        {(onQuickDemoArtisan || onQuickDemoBuyer) && (
          <div className="flex items-center justify-center gap-2 mb-10 text-xs text-[#2C1810]/70">
            <span>{lt.instantDemo}</span>
            {onQuickDemoArtisan && (
              <button
                onClick={() => {
                  audioService.playClickSound();
                  onQuickDemoArtisan();
                }}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E6DDD4] hover:border-[#C85A32] font-semibold text-[#C85A32] transition-colors"
              >
                ⚡ 1-Click Artisan
              </button>
            )}
            {onQuickDemoBuyer && (
              <button
                onClick={() => {
                  audioService.playClickSound();
                  onQuickDemoBuyer();
                }}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E6DDD4] hover:border-[#3D6B52] font-semibold text-[#3D6B52] transition-colors"
              >
                ⚡ 1-Click Buyer
              </button>
            )}
          </div>
        )}

        {/* Visual Flow Banner (Section 11) */}
        <div className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto shadow-xs">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#2C1810]/60 mb-3">
            {lt.pipelineTitle}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810]">
              📸 CREATE
            </span>
            <span className="text-[#C85A32]">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810]">
              🎙️ DIGITIZE
            </span>
            <span className="text-[#C85A32]">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810]">
              ✨ CATALOG
            </span>
            <span className="text-[#C85A32]">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810]">
              🏷️ PRICE
            </span>
            <span className="text-[#C85A32]">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810]">
              🤝 CONNECT
            </span>
            <span className="text-[#C85A32]">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-[#3D6B52] text-white">
              📦 SELL
            </span>
          </div>
        </div>
      </section>

      {/* 3 User Journeys Feature Cards */}
      <section className="py-12 px-4 sm:px-6 bg-[#F5EFEB] border-y border-[#E6DDD4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
              {lt.sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1 max-w-md mx-auto">
              {lt.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Artisan Journey */}
            <div className="bg-[#FDFBF7] p-6 rounded-3xl border-2 border-[#E6DDD4] hover:border-[#C85A32] transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C85A32]/10 border border-[#C85A32]/20 flex items-center justify-center text-2xl mb-4">
                  👩‍🎨
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#C85A32] mb-1">
                  {lt.artisanCardTag}
                </div>
                <h3 className="text-xl font-extrabold text-[#2C1810] mb-2">
                  {lt.artisanCardTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed mb-4">
                  {lt.artisanCardDesc}
                </p>
                <ul className="space-y-1.5 text-xs text-[#2C1810]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.artisanCardBullet1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.artisanCardBullet2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.artisanCardBullet3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.artisanCardBullet4}</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  audioService.playClickSound();
                  handleArtisanClick();
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b04b25] transition-all cursor-pointer"
              >
                {lt.artisanCardBtn}
              </button>
            </div>

            {/* Buyer Journey */}
            <div className="bg-[#FDFBF7] p-6 rounded-3xl border-2 border-[#E6DDD4] hover:border-[#3D6B52] transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#3D6B52]/10 border border-[#3D6B52]/20 flex items-center justify-center text-2xl mb-4">
                  🛍️
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#3D6B52] mb-1">
                  {lt.buyerCardTag}
                </div>
                <h3 className="text-xl font-extrabold text-[#2C1810] mb-2">
                  {lt.buyerCardTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed mb-4">
                  {lt.buyerCardDesc}
                </p>
                <ul className="space-y-1.5 text-xs text-[#2C1810]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.buyerCardBullet1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.buyerCardBullet2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.buyerCardBullet3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.buyerCardBullet4}</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  audioService.playClickSound();
                  handleBuyerClick();
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-[#2C1810] text-[#FDFBF7] text-xs font-bold hover:bg-black transition-all cursor-pointer"
              >
                {lt.buyerCardBtn}
              </button>
            </div>

            {/* Admin Journey */}
            <div className="bg-[#FDFBF7] p-6 rounded-3xl border-2 border-[#E6DDD4] hover:border-[#2C1810] transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2C1810]/10 border border-[#2C1810]/20 flex items-center justify-center text-2xl mb-4">
                  📊
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#2C1810]/60 mb-1">
                  {lt.adminCardTag}
                </div>
                <h3 className="text-xl font-extrabold text-[#2C1810] mb-2">
                  {lt.adminCardTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed mb-4">
                  {lt.adminCardDesc}
                </p>
                <ul className="space-y-1.5 text-xs text-[#2C1810]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.adminCardBullet1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.adminCardBullet2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.adminCardBullet3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3D6B52]" />
                    <span>{lt.adminCardBullet4}</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  audioService.playClickSound();
                  handleAdminClick();
                }}
                className="mt-6 w-full py-2.5 rounded-xl border border-[#2C1810] text-[#2C1810] text-xs font-bold hover:bg-[#2C1810] hover:text-white transition-all cursor-pointer"
              >
                {lt.adminCardBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Master Maker Banner */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-[#E6DDD4] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80"
            alt="Master Ramesh"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#C85A32]/30 flex-shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3D6B52]/10 text-[#3D6B52]">
              <ShieldCheck className="w-3 h-3" />
              {lt.featuredTag}
            </div>
            <h3 className="text-xl font-extrabold text-[#2C1810]">
              {lt.featuredTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#2C1810]/75">
              {lt.featuredDesc}
            </p>
            <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start text-xs font-bold">
              <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg">{lt.featuredBadge1}</span>
              <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg">{lt.featuredBadge2}</span>
              <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg text-[#C85A32]">{lt.featuredBadge3}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Role Switcher Footer bar */}
      <div className="border-t border-[#E6DDD4] bg-[#F5EFEB] py-6 px-4 text-center">
        <p className="text-xs text-[#2C1810]/60 mb-3">
          {lt.footerText}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleRoleSelectClick}
            className="text-xs font-bold text-[#C85A32] hover:underline cursor-pointer"
          >
            {lt.roleSelectionScreen}
          </button>
          <span>•</span>
          <button
            onClick={handleAdminClick}
            className="text-xs font-bold text-[#2C1810]/70 hover:underline cursor-pointer"
          >
            {lt.adminAccess}
          </button>
        </div>
      </div>
    </div>
  );
};
