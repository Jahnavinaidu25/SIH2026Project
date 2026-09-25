import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Package,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle,
  BarChart2,
  Mic,
} from 'lucide-react';
import { DUMMY_BUSINESS_METRICS } from '../data/mockData';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  onOpenAssistant: () => void;
  onOpenMyProducts?: () => void;
  onOpenInventory?: () => void;
  onOpenVoiceStockModal?: () => void;
}

export const ArtisanBusinessDashboardView: React.FC<Props> = ({
  onOpenAssistant,
  onOpenMyProducts,
  onOpenInventory,
  onOpenVoiceStockModal,
}) => {
  const { t } = useTranslation();
  const metrics = DUMMY_BUSINESS_METRICS;

  const handleOpenProducts = () => {
    if (onOpenMyProducts) onOpenMyProducts();
    else if (onOpenInventory) onOpenInventory();
  };

  const handleOpenVoiceStock = () => {
    if (onOpenVoiceStockModal) onOpenVoiceStockModal();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6 animate-fadeIn">
      {/* Top Header & Assistant CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52] mb-2">
            <BarChart2 className="w-3.5 h-3.5" />
            Live Workshop Ledger &amp; Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
            {t.businessDashboard.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1">
            {t.businessDashboard.subtitle}
          </p>
        </div>

        {/* Primary CTA: Open CraftBridge AI Assistant */}
        <button
          id="dashboard-open-assistant-btn"
          onClick={() => {
            audioService.playCeramicChime(460);
            onOpenAssistant();
          }}
          className="h-12 px-5 rounded-2xl bg-[#C85A32] text-white text-xs sm:text-sm font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Bot className="w-4 h-4" />
          <span>{t.businessAssistant.title}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* AI Insight Card (Prompt requirement: Terracotta products are receiving increased demand. Consider increasing production.) */}
      <div className="bg-gradient-to-r from-[#F5EFEB] via-white to-[#FDFBF7] p-5 sm:p-6 rounded-3xl border-2 border-[#C85A32]/30 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C85A32]/10 border border-[#C85A32]/20 flex items-center justify-center text-2xl flex-shrink-0">
            💡
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C85A32] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {t.businessDashboard.demandAlertTitle}
              </span>
              <span className="text-[11px] font-semibold text-[#2C1810]/50">
                {t.businessDashboard.demandAlertDesc}
              </span>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#2C1810] leading-snug">
              "{metrics.aiInsight}"
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  audioService.playTactileTap();
                  onOpenAssistant();
                }}
                className="text-xs font-bold text-[#C85A32] hover:underline flex items-center gap-1"
              >
                <span>{t.businessDashboard.askAiBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-[#E6DDD4] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider">
              {t.businessDashboard.monthlyRevenue}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#3D6B52]/10 text-[#3D6B52] flex items-center justify-center text-sm">
              ₹
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2C1810]">
            ₹{metrics.monthlyRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] font-bold text-[#3D6B52] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{metrics.salesGrowth}% vs last month</span>
          </div>
        </div>

        {/* Estimated Profit */}
        <div className="bg-white p-5 rounded-3xl border border-[#E6DDD4] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider">
              {t.businessDashboard.netProfit}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center text-sm">
              💰
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#C85A32]">
            ₹{metrics.estimatedProfit.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#2C1810]/60">
            Net after materials &amp; fair wage
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-[#E6DDD4] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider">
              {t.businessDashboard.ordersCompleted}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] text-[#2C1810] flex items-center justify-center text-sm">
              📦
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2C1810]">
            {metrics.totalOrders}
          </div>
          <div className="text-[11px] font-semibold text-[#3D6B52]">
            100% On-time rural dispatch
          </div>
        </div>

        {/* Top Selling Product */}
        <div className="bg-white p-5 rounded-3xl border border-[#E6DDD4] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider">
              Top Selling Product
            </span>
            <span className="text-base">🏆</span>
          </div>
          <div className="text-sm font-extrabold text-[#2C1810] line-clamp-2 leading-snug">
            {metrics.topSellingProduct}
          </div>
          <div className="text-[11px] text-[#C85A32] font-bold">
            24 Units sold this cycle
          </div>
        </div>
      </div>

      {/* Row: Sales Trend & Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Visual Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#E6DDD4] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#2C1810]">
                {t.businessDashboard.salesTrendTitle}
              </h3>
              <p className="text-xs text-[#2C1810]/60">
                Daily sales volume generated across direct and marketplace orders
              </p>
            </div>
            <span className="text-xs font-bold text-[#3D6B52] bg-[#3D6B52]/10 px-2.5 py-1 rounded-lg">
              Peak: Friday ₹5,800
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-[#E6DDD4]">
            {metrics.salesTrend.map((item) => {
              const maxVal = 6000;
              const heightPercent = Math.round((item.sales / maxVal) * 100);
              const isPeak = item.day === 'Fri';
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-[#2C1810]/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{item.sales}
                  </span>
                  <div
                    className={`w-full max-w-[40px] rounded-t-xl transition-all duration-300 ${
                      isPeak
                        ? 'bg-[#C85A32] shadow-sm'
                        : 'bg-[#E6DDD4] group-hover:bg-[#2C1810]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs font-bold text-[#2C1810]">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alert & Quick Voice Actions */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6DDD4] shadow-2xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-extrabold text-[#2C1810]">
                {t.artisanHome.lowStockAlertTitle}
              </h3>
            </div>

            <div className="bg-amber-500/10 border border-amber-200 p-4 rounded-2xl space-y-2 text-xs">
              <div className="font-extrabold text-sm text-amber-900">
                {metrics.lowStockProduct}
              </div>
              <p className="text-amber-800">
                Only <strong>8 units</strong> remaining in workshop storage. Restock recommended within 4 days.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E6DDD4]">
            <button
              id="dashboard-voice-stock-btn"
              onClick={() => {
                audioService.playCeramicChime(350);
                handleOpenVoiceStock();
              }}
              className="w-full h-11 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>{t.artisanHome.quickStockVoiceBtn}</span>
            </button>

            <button
              onClick={() => {
                audioService.playTactileTap();
                handleOpenProducts();
              }}
              className="w-full h-11 rounded-xl bg-[#F5EFEB] hover:bg-[#EDE7E3] text-[#2C1810] text-xs font-bold transition-all cursor-pointer"
            >
              {t.artisanHome.manageAllBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
