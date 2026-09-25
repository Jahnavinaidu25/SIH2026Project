import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Mic,
  Package,
  AlertTriangle,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  Edit2,
} from 'lucide-react';
import { ArtisanProduct } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  products: ArtisanProduct[];
  onSelectProduct: (product: ArtisanProduct) => void;
  onAddProduct: () => void;
  onOpenVoiceStock?: (product: ArtisanProduct) => void;
  onOpenVoiceStockModal?: (product?: ArtisanProduct) => void;
}

export const ArtisanProductsView: React.FC<Props> = ({
  products = [],
  onSelectProduct,
  onAddProduct,
  onOpenVoiceStock,
  onOpenVoiceStockModal,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Low Stock'>('All');

  const handleOpenVoiceStock = (prod: ArtisanProduct) => {
    if (onOpenVoiceStock) {
      onOpenVoiceStock(prod);
    } else if (onOpenVoiceStockModal) {
      onOpenVoiceStockModal(prod);
    }
  };

  const safeProducts = Array.isArray(products) ? products : [];

  const filtered = safeProducts.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (p.name || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.material || '').toLowerCase().includes(q);

    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && p.status === statusFilter;
  });

  const filterOptions = [
    { key: 'All' as const, label: t.artisanProducts.filterAll },
    { key: 'Active' as const, label: t.artisanProducts.filterActive },
    { key: 'Low Stock' as const, label: t.artisanProducts.filterLowStock },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>{t.artisanProducts.title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
            {t.artisanProducts.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1">
            {t.artisanProducts.subtitle}
          </p>
        </div>

        {/* Add Product Button */}
        <button
          id="artisan-add-product-btn"
          onClick={() => {
            audioService.playCeramicChime(420);
            onAddProduct();
          }}
          className="h-12 px-5 rounded-2xl bg-[#C85A32] text-white text-xs sm:text-sm font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.artisanProducts.addProduct}</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#2C1810]/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.buyerHome.searchPlaceholder}
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-[#E6DDD4] text-xs sm:text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#C85A32]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setStatusFilter(opt.key);
                audioService.playTactileTap();
              }}
              className={`h-12 px-4 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                statusFilter === opt.key
                  ? 'bg-[#2C1810] text-[#FDFBF7]'
                  : 'bg-white border border-[#E6DDD4] text-[#2C1810] hover:bg-[#F5EFEB]'
              }`}
            >
              {opt.key === 'Low Stock' && <AlertTriangle className="w-3.5 h-3.5 inline mr-1 text-amber-500" />}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-3xl border border-[#E6DDD4] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Product Card Image */}
              <div
                className="relative aspect-16/10 bg-[#EDE7E3] cursor-pointer overflow-hidden"
                onClick={() => {
                  audioService.playTactileTap();
                  onSelectProduct(prod);
                }}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#2C1810]/80 text-white backdrop-blur-xs">
                  {prod.category}
                </span>
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    prod.status === 'Active'
                      ? 'bg-[#3D6B52] text-white'
                      : prod.status === 'Low Stock'
                      ? 'bg-amber-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {prod.status === 'Active' ? t.artisanProducts.filterActive : prod.status === 'Low Stock' ? t.artisanProducts.filterLowStock : prod.status}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h3
                    onClick={() => onSelectProduct(prod)}
                    className="font-extrabold text-base text-[#2C1810] hover:text-[#C85A32] cursor-pointer line-clamp-1"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#2C1810]/60 mt-0.5 line-clamp-1">
                    {prod.material} • {prod.craftType}
                  </p>
                </div>

                {/* Stock & Price Pill */}
                <div className="bg-[#FDFBF7] p-3 rounded-2xl border border-[#E6DDD4] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#2C1810]/50 uppercase font-bold block">
                      {t.artisanProductDetail.priceLabel}
                    </span>
                    <span className="text-base font-extrabold text-[#2C1810]">
                      ₹{prod.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#2C1810]/50 uppercase font-bold block">
                      {t.artisanProducts.stockLevel}
                    </span>
                    <span
                      className={`text-base font-extrabold ${
                        prod.stock <= 10 ? 'text-amber-600' : 'text-[#3D6B52]'
                      }`}
                    >
                      {prod.stock} {t.common.units}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                id={`manage-prod-btn-${prod.id}`}
                onClick={() => {
                  audioService.playTactileTap();
                  onSelectProduct(prod);
                }}
                className="flex-1 h-11 rounded-xl bg-[#F5EFEB] hover:bg-[#EDE7E3] text-[#2C1810] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{t.artisanProducts.manageProduct}</span>
              </button>

              <button
                id={`voice-stock-prod-btn-${prod.id}`}
                onClick={() => {
                  audioService.playCeramicChime(350);
                  handleOpenVoiceStock(prod);
                }}
                className="h-11 px-3.5 rounded-xl bg-[#C85A32] hover:bg-[#b54f2a] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                title={t.artisanProducts.quickStockUpdate}
              >
                <Mic className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.artisanProducts.quickStockUpdate}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
