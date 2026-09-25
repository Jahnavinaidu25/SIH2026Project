import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Globe, ArrowRight, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { ArtisanProduct } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: ArtisanProduct | null;
}

type PlatformTab = 'craftbridge' | 'amazon' | 'flipkart';

export const SellEverywhereModal: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PlatformTab>('amazon');
  const [preparedPlatforms, setPreparedPlatforms] = useState<Record<string, boolean>>({
    craftbridge: true,
    amazon: false,
    flipkart: false,
  });
  const [isPreparing, setIsPreparing] = useState(false);

  if (!isOpen || !product) return null;

  const handlePrepareListing = (platform: PlatformTab) => {
    setIsPreparing(true);
    audioService.playCeramicChime(380);

    setTimeout(() => {
      setIsPreparing(false);
      setPreparedPlatforms((prev) => ({ ...prev, [platform]: true }));
      audioService.playCeramicChime(520);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C1810]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-3xl border border-[#E6DDD4] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E6DDD4] bg-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C85A32]/10 text-[#C85A32] mb-1">
              <Globe className="w-3.5 h-3.5" />
              Multi-Channel Smart Catalog
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
              Sell Everywhere — Integration Preview
            </h2>
            <p className="text-xs text-[#2C1810]/70 mt-0.5">
              AI transforms your voice-generated catalog into platform-compliant listings.
            </p>
          </div>
          <button
            onClick={() => {
              audioService.playTactileTap();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-[#F5EFEB] hover:bg-[#EDE7E3] text-[#2C1810] flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Switcher Tabs */}
        <div className="flex border-b border-[#E6DDD4] bg-[#F5EFEB] px-4 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => {
              audioService.playTactileTap();
              setActiveTab('craftbridge');
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'craftbridge'
                ? 'bg-white text-[#2C1810] border-t-2 border-[#C85A32] shadow-xs'
                : 'text-[#2C1810]/60 hover:text-[#2C1810]'
            }`}
          >
            <span>🏺 CraftBridge Direct</span>
            <span className="w-2 h-2 rounded-full bg-[#3D6B52]" />
          </button>

          <button
            onClick={() => {
              audioService.playTactileTap();
              setActiveTab('amazon');
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'amazon'
                ? 'bg-white text-[#2C1810] border-t-2 border-[#C85A32] shadow-xs'
                : 'text-[#2C1810]/60 hover:text-[#2C1810]'
            }`}
          >
            <span>📦 Amazon Karigar Preview</span>
            {preparedPlatforms.amazon ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3D6B52]" />
            ) : (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                Draft
              </span>
            )}
          </button>

          <button
            onClick={() => {
              audioService.playTactileTap();
              setActiveTab('flipkart');
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'flipkart'
                ? 'bg-white text-[#2C1810] border-t-2 border-[#C85A32] shadow-xs'
                : 'text-[#2C1810]/60 hover:text-[#2C1810]'
            }`}
          >
            <span>🛍️ Flipkart Samarth Preview</span>
            {preparedPlatforms.flipkart ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3D6B52]" />
            ) : (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                Draft
              </span>
            )}
          </button>
        </div>

        {/* Modal Body & Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Important Clarity Banner as instructed */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-900 flex items-start gap-3 text-xs">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-700 mt-0.5" />
            <div>
              <strong className="block font-bold">Marketplace Listing Preview &amp; Integration Architecture</strong>
              This screen illustrates how your AI Smart Catalog converts unstructured voice data into marketplace-ready format for future direct API channel export.
            </div>
          </div>

          {/* Architectural Transformation Visual */}
          <div className="bg-white p-4 rounded-2xl border border-[#E6DDD4] flex items-center justify-between text-xs font-semibold text-[#2C1810] gap-2 overflow-x-auto">
            <div className="text-center px-3 py-2 bg-[#F5EFEB] rounded-xl flex-1 min-w-[120px]">
              <span className="block text-[10px] text-[#C85A32] uppercase font-extrabold">Step 1</span>
              <span>🎙️ Voice Smart Catalog</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#2C1810]/40 flex-shrink-0" />
            <div className="text-center px-3 py-2 bg-[#F5EFEB] rounded-xl flex-1 min-w-[140px] border border-[#C85A32]/30">
              <span className="block text-[10px] text-[#3D6B52] uppercase font-extrabold">Step 2 (Active)</span>
              <span>Platform Spec Mapping</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#2C1810]/40 flex-shrink-0" />
            <div className="text-center px-3 py-2 bg-[#F5EFEB] rounded-xl flex-1 min-w-[120px]">
              <span className="block text-[10px] text-[#2C1810]/40 uppercase font-extrabold">Step 3</span>
              <span>1-Click Sync (Future)</span>
            </div>
          </div>

          {/* Product Data Spec Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E6DDD4] space-y-4">
            <div className="flex items-start gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover border border-[#E6DDD4]"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#C85A32]">
                    Target: {activeTab === 'craftbridge' ? 'Direct Platform' : activeTab === 'amazon' ? 'Amazon Karigar' : 'Flipkart Samarth'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3D6B52] bg-[#3D6B52]/10 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Listing Information Ready
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#2C1810]">
                  {product.name}
                </h3>
                <p className="text-xs text-[#2C1810]/60 line-clamp-1">
                  Category: {product.category} • Material: {product.material}
                </p>
              </div>
            </div>

            {/* Field-by-field transformed specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-[#E6DDD4]">
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E6DDD4]">
                <span className="text-[10px] text-[#2C1810]/50 uppercase font-bold block">
                  Marketplace Price &amp; GST
                </span>
                <span className="font-extrabold text-sm text-[#2C1810]">
                  ₹{product.price} (Inclusive of Fair Wage)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E6DDD4]">
                <span className="text-[10px] text-[#2C1810]/50 uppercase font-bold block">
                  Allocated Inventory
                </span>
                <span className="font-extrabold text-sm text-[#2C1810]">
                  {product.stock} Units ready to ship
                </span>
              </div>

              <div className="sm:col-span-2 p-3 rounded-xl bg-[#FDFBF7] border border-[#E6DDD4]">
                <span className="text-[10px] text-[#2C1810]/50 uppercase font-bold block mb-1">
                  SEO Bullet Points (AI Optimized from Voice)
                </span>
                <ul className="list-disc list-inside space-y-1 text-[#2C1810]/80">
                  <li>Handcrafted using 100% genuine {product.material || product.materials?.join(', ') || 'clay & earth'}</li>
                  <li>Traditional craft technique: {product.craftType || product.category || 'Handmade Heritage'}</li>
                  <li>Sustains rural artisan livelihood with 88% direct fair-wage remittance</li>
                </ul>
              </div>

              <div className="sm:col-span-2 p-3 rounded-xl bg-[#FDFBF7] border border-[#E6DDD4]">
                <span className="text-[10px] text-[#2C1810]/50 uppercase font-bold block mb-1">
                  Search &amp; Catalog Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(product.tags || ['Handmade', 'Terracotta', 'VillageCraft']).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-[#F5EFEB] text-[#2C1810] text-[11px] font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded-md bg-[#F5EFEB] text-[#2C1810] text-[11px] font-semibold">
                    #IndianArtisans
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F5EFEB] text-[#2C1810] text-[11px] font-semibold">
                    #VocalForLocal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-[#E6DDD4] bg-white flex items-center justify-between gap-3">
          <div className="text-xs text-[#2C1810]/60 hidden sm:block">
            Status:{' '}
            <strong className="text-[#3D6B52]">
              {preparedPlatforms[activeTab] ? 'Prepared & Validated' : 'Ready for Transformation'}
            </strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onClose()}
              className="flex-1 sm:flex-none h-12 px-4 rounded-xl bg-[#F5EFEB] hover:bg-[#EDE7E3] text-[#2C1810] text-xs font-bold transition-all"
            >
              Close
            </button>

            <button
              id="prepare-listing-btn"
              onClick={() => handlePrepareListing(activeTab)}
              disabled={isPreparing || preparedPlatforms[activeTab]}
              className={`flex-1 sm:flex-none h-12 px-6 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                preparedPlatforms[activeTab]
                  ? 'bg-[#3D6B52] text-white cursor-default'
                  : 'bg-[#C85A32] hover:bg-[#b54f2a] text-white active:scale-95'
              }`}
            >
              {isPreparing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Formatting for {activeTab}...</span>
                </>
              ) : preparedPlatforms[activeTab] ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Listing Spec Ready</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Prepare Listing</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
