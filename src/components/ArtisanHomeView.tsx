import React from 'react';
import {
  Mic,
  Package,
  BarChart2,
  Globe,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Plus,
  Coins,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ArtisanProduct } from '../types';
import { DUMMY_BUSINESS_METRICS } from '../data/mockData';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  products: ArtisanProduct[];
  onOpenCreateProduct: () => void;
  onOpenMyProducts: () => void;
  onOpenDashboard: () => void;
  onOpenAssistant: () => void;
  onOpenVoiceStockModal: () => void;
  onOpenSellEverywhere: (product: ArtisanProduct) => void;
  onSelectProduct: (product: ArtisanProduct) => void;
}

export const ArtisanHomeView: React.FC<Props> = ({
  products = [],
  onOpenCreateProduct,
  onOpenMyProducts,
  onOpenDashboard,
  onOpenAssistant,
  onOpenVoiceStockModal,
  onOpenSellEverywhere,
  onSelectProduct,
}) => {
  const { t } = useTranslation();
  const metrics = DUMMY_BUSINESS_METRICS;
  const safeProducts = Array.isArray(products) ? products : [];
  const lowStockItem = safeProducts.find((p) => p.status === 'Low Stock') || safeProducts[0] || {
    id: 'p1',
    name: 'Terracotta Chai Cups',
    price: 350,
    stock: 8,
    image: '',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-8 animate-fadeIn">
      {/* 1. Artisan Welcome & Identity Banner */}
      <div className="bg-gradient-to-br from-[#2C1810] via-[#3a2016] to-[#4e2c1e] p-6 sm:p-8 rounded-3xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-xs">
            <span>{t.artisanHome.tagline}</span>
            <span className="text-[#C85A32] font-black">•</span>
            <span>{t.common.brandName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {t.artisanHome.welcome}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
            {t.artisanHome.createProductDesc}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="artisan-create-prod-hero-btn"
              onClick={() => {
                audioService.playCeramicChime(420);
                onOpenCreateProduct();
              }}
              className="h-11 px-5 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              <span>{t.artisanHome.createProduct}</span>
            </button>

            <button
              onClick={() => {
                audioService.playCeramicChime(350);
                onOpenVoiceStockModal();
              }}
              className="h-11 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all flex items-center gap-2 backdrop-blur-xs"
            >
              <Mic className="w-4 h-4 text-[#C85A32]" />
              <span>{t.artisanHome.quickStockVoiceBtn}</span>
            </button>
          </div>
        </div>

        {/* Decorative background visual */}
        <div className="absolute right-4 -bottom-6 text-8xl opacity-15 pointer-events-none select-none hidden sm:block">
          🏺
        </div>
      </div>

      {/* 2. Quick Action Tiles */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-[#2C1810]/70 uppercase tracking-wider">
          {t.artisanHome.voiceStudio}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Tile 1: Create Product */}
          <button
            onClick={() => {
              audioService.playCeramicChime(420);
              onOpenCreateProduct();
            }}
            className="p-4 rounded-2xl bg-white border border-[#E6DDD4] hover:border-[#C85A32] hover:shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              🎙️
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#2C1810] group-hover:text-[#C85A32]">
                {t.artisanHome.createProduct}
              </h3>
              <p className="text-[11px] text-[#2C1810]/60 mt-0.5">{t.artisanHome.createProductDesc}</p>
            </div>
          </button>

          {/* Tile 2: My Products & Inventory */}
          <button
            onClick={() => {
              audioService.playTactileTap();
              onOpenMyProducts();
            }}
            className="p-4 rounded-2xl bg-white border border-[#E6DDD4] hover:border-[#C85A32] hover:shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3D6B52]/10 text-[#3D6B52] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              📦
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#2C1810] group-hover:text-[#C85A32]">
                {t.artisanHome.myProducts}
              </h3>
              <p className="text-[11px] text-[#2C1810]/60 mt-0.5">{safeProducts.length} {t.common.units}</p>
            </div>
          </button>

          {/* Tile 3: AI Business Assistant */}
          <button
            onClick={() => {
              audioService.playCeramicChime(460);
              onOpenAssistant();
            }}
            className="p-4 rounded-2xl bg-white border border-[#E6DDD4] hover:border-[#C85A32] hover:shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              💡
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#2C1810] group-hover:text-[#C85A32]">
                {t.artisanHome.aiAssistant}
              </h3>
              <p className="text-[11px] text-[#2C1810]/60 mt-0.5">{t.artisanHome.aiAssistantDesc}</p>
            </div>
          </button>

          {/* Tile 4: Sell Everywhere */}
          <button
            onClick={() => {
              audioService.playCeramicChime(380);
              if (safeProducts[0]) onOpenSellEverywhere(safeProducts[0]);
            }}
            className="p-4 rounded-2xl bg-white border border-[#E6DDD4] hover:border-[#C85A32] hover:shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px]"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              🌐
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#2C1810] group-hover:text-[#C85A32]">
                {t.artisanHome.sellEverywhere}
              </h3>
              <p className="text-[11px] text-[#2C1810]/60 mt-0.5">{t.artisanHome.sellEverywhereDesc}</p>
            </div>
          </button>
        </div>
      </div>

      {/* 3. AI Insight Card */}
      <div className="bg-[#F5EFEB] p-5 sm:p-6 rounded-3xl border border-[#E6DDD4] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C85A32] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t.artisanHome.aiAssistant}
          </span>
          <button
            onClick={onOpenAssistant}
            className="text-xs font-bold text-[#C85A32] hover:underline flex items-center gap-1"
          >
            <span>{t.artisanHome.aiAssistant}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-sm font-bold text-[#2C1810]">
          "{metrics.aiInsight}"
        </p>
      </div>

      {/* 4. Business Summary Snapshot */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#2C1810]">
            {t.businessDashboard.title}
          </h2>
          <button
            onClick={onOpenDashboard}
            className="text-xs font-bold text-[#C85A32] hover:underline flex items-center gap-1"
          >
            <span>{t.artisanHome.viewLedger}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#E6DDD4]">
            <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase block">{t.artisanHome.revenueThisMonth}</span>
            <span className="text-xl font-black text-[#2C1810]">₹{metrics.monthlyRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-[#3D6B52] font-semibold block mt-0.5">+{metrics.salesGrowth}%</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E6DDD4]">
            <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase block">{t.artisanHome.estProfit}</span>
            <span className="text-xl font-black text-[#C85A32]">₹{metrics.estimatedProfit.toLocaleString()}</span>
            <span className="text-[10px] text-[#2C1810]/60 block mt-0.5">{t.common.directFairWage}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E6DDD4]">
            <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase block">{t.artisanHome.totalOrders}</span>
            <span className="text-xl font-black text-[#2C1810]">{metrics.totalOrders}</span>
            <span className="text-[10px] text-[#3D6B52] font-semibold block mt-0.5">{t.common.active}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E6DDD4]">
            <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase block">{t.artisanHome.lowStockAlertTitle}</span>
            <span className="text-sm font-extrabold text-amber-600 truncate block">
              {lowStockItem?.name}
            </span>
            <button
              onClick={() => onOpenVoiceStockModal()}
              className="text-[10px] text-[#C85A32] font-bold hover:underline"
            >
              {t.artisanHome.updateStockBtn} ({lowStockItem?.stock || 0}) →
            </button>
          </div>
        </div>
      </div>

      {/* 5. Recent Products Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#2C1810]">
            {t.artisanHome.activeCatalogTitle}
          </h2>
          <button
            onClick={onOpenMyProducts}
            className="text-xs font-bold text-[#C85A32] hover:underline"
          >
            {t.artisanHome.manageAllBtn} ({safeProducts.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safeProducts.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProduct(p)}
              className="bg-white rounded-2xl border border-[#E6DDD4] overflow-hidden hover:border-[#C85A32] cursor-pointer transition-all p-3 space-y-2 group shadow-2xs"
            >
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#EDE7E3]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-xs text-[#2C1810] line-clamp-1 group-hover:text-[#C85A32]">
                {p.name}
              </h3>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E6DDD4]">
                <span className="font-extrabold text-[#2C1810]">₹{p.price}</span>
                <span
                  className={`font-semibold ${
                    p.stock <= 10 ? 'text-amber-600' : 'text-[#3D6B52]'
                  }`}
                >
                  {p.stock} {t.common.inStock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
