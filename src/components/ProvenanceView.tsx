import React from 'react';
import { Award, ShieldCheck, Check, Heart, Globe, ArrowUpRight, TrendingUp, Sparkles, MapPin } from 'lucide-react';
import { ARTISANS } from '../data/mockData';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

export const ProvenanceView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52] mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          The Humane Economic Covenant
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C1810] tracking-tight">
          Radical Fair Wage Transparency &amp; Provenance
        </h1>
        <p className="text-sm sm:text-base text-[#2C1810]/70 mt-2 leading-relaxed">
          Traditional craft distribution robs rural creators of dignity, keeping up to 92% in middlemen markups.
          Earth &amp; Craft inverts the model — 85% goes directly to the master artisan before the kiln cools.
        </p>
      </div>

      {/* Comparison Grid: Traditional vs Earth & Craft */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Traditional Luxury & Retail */}
        <div className="bg-[#F5EFEB]/50 border border-[#E6DDD4] rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/60">
              Conventional Luxury &amp; Retail Model
            </span>
            <span className="text-xs font-extrabold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-0.5 rounded-full">
              Extractive
            </span>
          </div>

          <div className="text-3xl font-extrabold text-[#2C1810] mb-2">
            8% <span className="text-sm font-normal text-[#2C1810]/60">to Artisan</span>
          </div>
          <p className="text-xs text-[#2C1810]/70 mb-6 leading-relaxed">
            Wholesale brokers, import tariffs, multi-tier brand markups, and flagship boutique rents consume 92% of the price paid by the conscious buyer.
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-[#2C1810]/70">
              <span>Artisan Labor</span>
              <span className="font-bold">8% ($8 on $100)</span>
            </div>
            <div className="w-full bg-[#E6DDD4] h-2 rounded-full overflow-hidden">
              <div className="bg-[#ba1a1a] h-full w-[8%]" />
            </div>

            <div className="flex justify-between items-center text-[#2C1810]/70">
              <span>Wholesale Intermediaries</span>
              <span className="font-bold">42%</span>
            </div>
            <div className="w-full bg-[#E6DDD4] h-2 rounded-full overflow-hidden">
              <div className="bg-[#8a726a] h-full w-[42%]" />
            </div>

            <div className="flex justify-between items-center text-[#2C1810]/70">
              <span>Retailer Markup &amp; Advertising</span>
              <span className="font-bold">50%</span>
            </div>
            <div className="w-full bg-[#E6DDD4] h-2 rounded-full overflow-hidden">
              <div className="bg-[#57423b] h-full w-[50%]" />
            </div>
          </div>
        </div>

        {/* Right: Earth & Craft Humane Model */}
        <div className="bg-[#F5EFEB] border-2 border-[#3D6B52] rounded-2xl p-6 relative shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3D6B52]">
              Earth &amp; Craft Direct Covenant
            </span>
            <span className="text-xs font-extrabold text-[#3D6B52] bg-[#3D6B52]/15 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" /> Certified Fair
            </span>
          </div>

          <div className="text-3xl font-extrabold text-[#3D6B52] mb-2">
            85% <span className="text-sm font-normal text-[#2C1810]/70">Direct to Maker</span>
          </div>
          <p className="text-xs text-[#2C1810]/80 mb-6 leading-relaxed">
            Funds disburse straight to the artisan's community credit union. Zero middlemen markups. The remainder funds raw regenerative materials and carbon-neutral transit.
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-[#2C1810]">
              <span className="font-bold text-[#3D6B52]">Artisan Direct Payout</span>
              <span className="font-extrabold text-[#3D6B52]">85% ($85 on $100)</span>
            </div>
            <div className="w-full bg-[#E6DDD4] h-3 rounded-full overflow-hidden flex">
              <div className="bg-[#3D6B52] h-full w-[85%]" />
              <div className="bg-[#2C1810] h-full w-[8%]" />
              <div className="bg-[#C85A32] h-full w-[7%]" />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-[#E6DDD4]">
              <div className="p-2.5 rounded-xl bg-white border border-[#E6DDD4]">
                <span className="text-[11px] text-[#2C1810]/60 block">8% Materials Sourcing</span>
                <span className="text-xs font-bold text-[#2C1810]">Wild clay, native seeds, indigo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E6DDD4]">
                <span className="text-[11px] text-[#2C1810]/60 block">7% Eco Logistics</span>
                <span className="text-xs font-bold text-[#2C1810]">Recycled wool packing, carbon neutral</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Guilds & Cooperative Impact */}
      <div className="bg-[#FDFBF7] border border-[#E6DDD4] rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#2C1810]">
              Verified Guilds &amp; Cooperatives
            </h3>
            <p className="text-xs text-[#2C1810]/70 mt-0.5">
              Autonomous artisan associations democratically managing shared kilns and natural reserves.
            </p>
          </div>
          <div className="text-xs font-bold text-[#3D6B52] bg-[#3D6B52]/10 px-3 py-1.5 rounded-full self-start">
            5 Active Guilds • 140+ Artisans
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(ARTISANS).map((artisan) => (
            <div
              key={artisan.id}
              className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-4 flex flex-col justify-between hover:border-[#C85A32]/40 transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#E6DDD4]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#2C1810]">{artisan.name}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-[#3D6B52] font-semibold">
                      <MapPin className="w-3 h-3" />
                      <span>{artisan.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#2C1810]/80 leading-relaxed font-sans mb-3">
                  <span className="font-semibold text-[#2C1810] block mb-0.5">{artisan.communityCoop}</span>
                  {artisan.lineage}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6DDD4] flex items-center justify-between text-xs">
                <span className="text-[#2C1810]/60">Direct Fair Wage Rating:</span>
                <span className="font-extrabold text-[#3D6B52]">{artisan.fairWageRating}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collective Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#F5EFEB] border border-[#E6DDD4] text-center">
          <div className="text-3xl font-extrabold text-[#C85A32] mb-1">$48,250</div>
          <div className="text-xs font-bold text-[#2C1810]">Direct Payouts in 2026</div>
          <p className="text-[11px] text-[#2C1810]/60 mt-1">Directly into artisan-owned rural savings funds</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#F5EFEB] border border-[#E6DDD4] text-center">
          <div className="text-3xl font-extrabold text-[#3D6B52] mb-1">0%</div>
          <div className="text-xs font-bold text-[#2C1810]">Intermediary Commission</div>
          <p className="text-[11px] text-[#2C1810]/60 mt-1">No brokers, no auction markups, no hidden fees</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#F5EFEB] border border-[#E6DDD4] text-center">
          <div className="text-3xl font-extrabold text-[#2C1810] mb-1">100%</div>
          <div className="text-xs font-bold text-[#2C1810]">Ancestral Traceability</div>
          <p className="text-[11px] text-[#2C1810]/60 mt-1">Full spoken voice stories recorded in workshops</p>
        </div>
      </div>
    </div>
  );
};
