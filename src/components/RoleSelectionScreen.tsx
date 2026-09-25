import React from 'react';
import { UserRole, AppLanguage } from '../types';
import { Sparkles, ArrowRight, Globe, ShieldCheck } from 'lucide-react';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  onSelectRole: (role: UserRole) => void;
  onOpenLanguageModal: () => void;
  currentLanguage?: AppLanguage;
  selectedRole?: UserRole;
  onContinue?: () => void;
}

export const RoleSelectionScreen: React.FC<Props> = ({
  onSelectRole,
  onOpenLanguageModal,
  currentLanguage,
}) => {
  const { t, language } = useTranslation();

  const handlePick = (role: UserRole) => {
    audioService.playCeramicChime(role === 'artisan' ? 380 : 440);
    onSelectRole(role);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto">
      {/* Top Bar: Brand and Language Toggle */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#C85A32] text-white flex items-center justify-center text-lg shadow-sm">
            🏺
          </div>
          <div>
            <span className="text-base font-extrabold text-[#2C1810] block leading-none">
              {t.common.brandName}
            </span>
            <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">
              {t.roleSelection.makersTag}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            audioService.playTactileTap();
            onOpenLanguageModal();
          }}
          className="h-9 px-3 rounded-xl border border-[#E6DDD4] bg-[#F5EFEB] text-[#2C1810] text-xs font-bold hover:bg-white transition-all flex items-center gap-1.5"
          title={t.nav.changeLanguage}
        >
          <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
          <span className="uppercase">{language || currentLanguage}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52]">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.roleSelection.empoweringMakers}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
            {t.roleSelection.heading}
          </h1>
          <p className="text-xs sm:text-sm text-[#2C1810]/70 max-w-xs mx-auto">
            {t.roleSelection.subheading}
          </p>
        </div>

        {/* Two Large Distinct Cards */}
        <div className="space-y-4">
          {/* Artisan Card */}
          <button
            id="role-btn-artisan"
            onClick={() => handlePick('artisan')}
            className="w-full p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#E6DDD4] hover:border-[#C85A32] hover:bg-[#FDFBF7] transition-all text-left group shadow-sm hover:shadow-md active:scale-[0.99] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#C85A32]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C85A32]/10 border border-[#C85A32]/20 flex items-center justify-center text-3xl shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                👩‍🎨
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#C85A32]">
                    {t.roleSelection.makersTag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C85A32] group-hover:translate-x-1 transition-transform" />
                </div>
                <h2 className="text-xl font-extrabold text-[#2C1810] group-hover:text-[#C85A32] transition-colors">
                  {t.roleSelection.artisanTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed font-sans">
                  {t.roleSelection.artisanDesc}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#2C1810]/60">
                  <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg">{t.roleSelection.badgeVoiceStudio}</span>
                  <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg">{t.roleSelection.badgeInventoryAi}</span>
                  <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg">{t.roleSelection.badgeSmartLedger}</span>
                </div>
              </div>
            </div>
          </button>

          {/* Buyer Card */}
          <button
            id="role-btn-buyer"
            onClick={() => handlePick('buyer')}
            className="w-full p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#E6DDD4] hover:border-[#3D6B52] hover:bg-[#FDFBF7] transition-all text-left group shadow-sm hover:shadow-md active:scale-[0.99] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#3D6B52]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#3D6B52]/10 border border-[#3D6B52]/20 flex items-center justify-center text-3xl shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                🛍️
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#3D6B52]">
                    {t.roleSelection.patronsTag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#3D6B52] group-hover:translate-x-1 transition-transform" />
                </div>
                <h2 className="text-xl font-extrabold text-[#2C1810] group-hover:text-[#3D6B52] transition-colors">
                  {t.roleSelection.buyerTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed font-sans">
                  {t.roleSelection.buyerDesc}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#2C1810]/60">
                  <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg">{t.roleSelection.badgePostRequirement}</span>
                  <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg">{t.roleSelection.badgeProvenance}</span>
                  <span className="bg-[#F5EFEB] px-2.5 py-1 rounded-lg">{t.roleSelection.badgeDirectChat}</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-[11px] text-[#2C1810]/50 pb-2">
        {t.roleSelection.footerNote}
      </div>
    </div>
  );
};
