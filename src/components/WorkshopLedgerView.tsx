import React from 'react';
import { Hammer, Sparkles, Clock, CheckCircle, MessageSquare, ArrowUpRight, Plus, Mic } from 'lucide-react';
import { CraftItem } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  crafts: CraftItem[];
  onOpenVoiceStudio: () => void;
  onSelectCraft: (craft: CraftItem) => void;
}

export const WorkshopLedgerView: React.FC<Props> = ({
  crafts,
  onOpenVoiceStudio,
  onSelectCraft,
}) => {
  const { t } = useTranslation();

  const patronLetters = [
    {
      id: 'letter-1',
      patron: 'Sarah Jenkins',
      location: 'Kyoto, Japan',
      artisanName: 'Elena Ramos',
      craftTitle: 'Obsidian Sheen Barro Negro Water Vessel',
      date: 'Yesterday',
      message: 'The cantaro arrived securely packed in dry river grass. Every dawn when I pour water, the smooth black surface reminds me of the river stone you spoke of in your audio story.',
    },
    {
      id: 'letter-2',
      patron: 'Mateo Silva',
      location: 'Lisbon, Portugal',
      artisanName: 'Amina Diallo',
      craftTitle: 'Wild River Mud Fermented Textile Runner',
      date: '3 days ago',
      message: 'The indigo and mud patterns have such deep spiritual presence. Thank you and the Ségou women weavers for keeping this sacred knowledge alive.',
    },
    {
      id: 'letter-3',
      patron: 'Julian Chen',
      location: 'Vancouver, Canada',
      artisanName: 'Kenji Takahashi',
      craftTitle: 'Pine-Ash Wood-Fired Bizen Yunomi',
      date: '1 week ago',
      message: 'The red flame lines from the rice straw are mesmerizing. You can genuinely feel the 14 days of mountain pine fire in the cup.',
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-2">
            <Hammer className="w-3.5 h-3.5" />
            {t.artisanHome.tagline}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
            {t.artisanHome.myProducts}
          </h1>
          <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1">
            {t.artisanHome.myProductsDesc}
          </p>
        </div>

        <button
          onClick={() => {
            audioService.playCeramicChime(320);
            onOpenVoiceStudio();
          }}
          className="h-12 px-5 rounded-xl bg-[#C85A32] text-white text-xs sm:text-sm font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center gap-2 self-start"
        >
          <Mic className="w-4 h-4" />
          <span>{t.artisanHome.voiceStudio}</span>
        </button>
      </div>

      {/* Workshop Bench Cards */}
      <div>
        <h3 className="text-base font-bold text-[#2C1810] mb-3">
          {t.artisanHome.activeCatalogTitle} ({crafts.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crafts.map((craft) => (
            <div
              key={craft.id}
              onClick={() => onSelectCraft(craft)}
              className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-4 cursor-pointer hover:border-[#C85A32]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={craft.images[0]}
                    alt={craft.title}
                    className="w-16 h-16 rounded-xl object-cover border border-[#E6DDD4]"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#3D6B52]/10 text-[#3D6B52] inline-block mb-1">
                      {craft.status === 'ready' ? t.artisanProducts.filterActive : craft.status}
                    </span>
                    <h4 className="text-xs font-bold text-[#2C1810] truncate">
                      {craft.title}
                    </h4>
                    <span className="text-[11px] text-[#2C1810]/60 block truncate">
                      By {craft.artisan.name}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-[#2C1810]/80 space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span>{t.common.directFairWage}:</span>
                    <span className="font-bold text-[#3D6B52]">${Math.round(craft.price * 0.85)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.common.hoursOfCraft}:</span>
                    <span className="font-semibold text-[#2C1810]">{craft.handcraftHours} hours</span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#E6DDD4] flex items-center justify-between text-xs font-bold text-[#C85A32]">
                <span>{t.buyerHome.viewCraft}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Letters from Conscious Patrons */}
      <div className="bg-[#FDFBF7] border border-[#E6DDD4] rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#C85A32]" />
            <h3 className="text-lg font-bold text-[#2C1810]">
              {t.nav.patronVault}
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#3D6B52]">3 New Messages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patronLetters.map((letter) => (
            <div
              key={letter.id}
              className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#2C1810]/60 mb-2">
                  <span className="font-bold text-[#2C1810]">{letter.patron}</span>
                  <span>{letter.location}</span>
                </div>
                <div className="text-[11px] font-semibold text-[#C85A32] mb-2">
                  To {letter.artisanName} • {letter.craftTitle}
                </div>
                <p className="text-xs italic text-[#2C1810]/80 leading-relaxed font-serif">
                  "{letter.message}"
                </p>
              </div>
              <div className="mt-3 pt-2 text-[10px] text-[#2C1810]/40 text-right">
                {letter.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
