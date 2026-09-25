import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Mic,
  Plus,
  Minus,
  Sparkles,
  Search,
  Filter,
  RefreshCw,
  History,
  CheckCircle,
} from 'lucide-react';
import { ArtisanProduct, InventoryTransaction } from '../types';
import { audioService } from '../utils/audioService';

interface Props {
  products: ArtisanProduct[];
  onOpenVoiceStockModal: (product?: ArtisanProduct) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  transactions?: InventoryTransaction[];
}

export const ArtisanInventoryView: React.FC<Props> = ({
  products,
  onOpenVoiceStockModal,
  onUpdateStock,
  transactions = [],
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Compute metrics (Screen 20)
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  // Mock initial transactions if none provided
  const [localTransactions, setLocalTransactions] = useState<InventoryTransaction[]>([
    {
      id: 'tx-1',
      productId: 'art-prod-1',
      productName: 'Traditional Terracotta Water Pot',
      type: 'in',
      quantity: 20,
      previousStock: 15,
      newStock: 35,
      reason: 'Batch kiln firing completed',
      timestamp: 'Today, 11:20 AM',
      method: 'voice',
    },
    {
      id: 'tx-2',
      productId: 'art-prod-2',
      productName: 'Handmade Clay Lamp',
      type: 'out',
      quantity: 10,
      previousStock: 44,
      newStock: 34,
      reason: 'B2B Wholesale dispatch',
      timestamp: 'Yesterday, 04:45 PM',
      method: 'manual',
    },
    {
      id: 'tx-3',
      productId: 'art-prod-3',
      productName: 'Traditional Leather Slippers',
      type: 'in',
      quantity: 5,
      previousStock: 3,
      newStock: 8,
      reason: 'Workshop replenishment',
      timestamp: '2 days ago',
      method: 'voice',
    },
  ]);

  const allTransactions = [...transactions, ...localTransactions];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAdjustQuickStock = (prod: ArtisanProduct, delta: number) => {
    const nextStock = Math.max(0, prod.stock + delta);
    onUpdateStock(prod.id, nextStock);
    audioService.playClickSound();

    const newTx: InventoryTransaction = {
      id: `tx-${Date.now()}`,
      productId: prod.id,
      productName: prod.name,
      type: delta > 0 ? 'in' : 'out',
      quantity: Math.abs(delta),
      previousStock: prod.stock,
      newStock: nextStock,
      reason: delta > 0 ? 'Quick stock addition' : 'Stock adjustment',
      timestamp: 'Just now',
      method: 'manual',
    };
    setLocalTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      {/* Header & Voice Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-1.5">
            📦 Screen 20 • Workshop Inventory
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
            Stock & Materials Management
          </h1>
          <p className="text-xs text-[#2C1810]/70 mt-0.5">
            Keep inventory in sync effortlessly. Speak your stock updates in native dialects.
          </p>
        </div>

        {/* Hero Voice Inventory Trigger Button */}
        <button
          onClick={() => {
            audioService.playCeramicChime(380);
            onOpenVoiceStockModal();
          }}
          className="h-12 px-5 rounded-2xl bg-[#C85A32] text-white font-extrabold text-xs hover:bg-[#b04b25] transition-all shadow-md flex items-center justify-center gap-2 group flex-shrink-0 active:scale-95"
        >
          <Mic className="w-4 h-4 animate-pulse" />
          <span>Update Stock by Voice</span>
        </button>
      </div>

      {/* Screen 20: 4 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white border border-[#E6DDD4] shadow-xs">
          <div className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider">
            Total Unique Crafts
          </div>
          <div className="text-2xl font-extrabold text-[#2C1810] mt-1">
            {totalProducts} Items
          </div>
          <div className="text-[11px] text-[#3D6B52] font-semibold mt-1">
            All active in catalog
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6DDD4] shadow-xs">
          <div className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider">
            Total Physical Stock
          </div>
          <div className="text-2xl font-extrabold text-[#C85A32] mt-1">
            {totalStock} Units
          </div>
          <div className="text-[11px] text-[#2C1810]/60 mt-1">
            In Ramanagara workshop
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6DDD4] shadow-xs">
          <div className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider">
            Low Stock Alerts
          </div>
          <div className="text-2xl font-extrabold text-amber-700 mt-1">
            {lowStockProducts.length} Items
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Need kiln replenishment
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6DDD4] shadow-xs">
          <div className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider">
            Voice Update Speed
          </div>
          <div className="text-2xl font-extrabold text-[#3D6B52] mt-1">
            &lt; 5 Seconds
          </div>
          <div className="text-[11px] text-[#3D6B52] font-semibold mt-1">
            Zero typing required
          </div>
        </div>
      </div>

      {/* Main Grid: Products Table + Live Transaction Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Stock List (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-[#E6DDD4] rounded-3xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="text-base font-extrabold text-[#2C1810]">
              Product Stock List
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#2C1810]/40" />
                <input
                  type="text"
                  placeholder="Search craft..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-[#E6DDD4] text-xs bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {filteredProducts.map((prod) => {
              const isLow = prod.stock <= 5 && prod.stock > 0;
              const isOut = prod.stock === 0;

              return (
                <div
                  key={prod.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E6DDD4] gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E6DDD4] flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-extrabold text-[#2C1810] line-clamp-1">
                        {prod.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#2C1810]/60">
                        <span>₹{prod.price}</span>
                        <span>•</span>
                        <span>{prod.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stock count & quick increment */}
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-right">
                      <span
                        className={`text-sm font-extrabold block leading-tight ${
                          isOut
                            ? 'text-red-600'
                            : isLow
                            ? 'text-amber-700'
                            : 'text-[#2C1810]'
                        }`}
                      >
                        {prod.stock} in stock
                      </span>
                      <span className="text-[10px] text-[#2C1810]/60">
                        {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'Optimal'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E6DDD4]">
                      <button
                        onClick={() => handleAdjustQuickStock(prod, -1)}
                        className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[#2C1810]"
                        title="Minus 1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAdjustQuickStock(prod, 1)}
                        className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[#2C1810]"
                        title="Plus 1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenVoiceStockModal(prod)}
                        className="w-7 h-7 rounded-lg bg-[#C85A32]/10 hover:bg-[#C85A32]/20 text-[#C85A32] flex items-center justify-center ml-1"
                        title="Voice Update for this product"
                      >
                        <Mic className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Transaction Ledger (1 Col) */}
        <div className="bg-white border border-[#E6DDD4] rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E6DDD4]">
            <div className="flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#C85A32]" />
              <h3 className="text-sm font-extrabold text-[#2C1810]">
                Stock Ledger Activity
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#3D6B52] bg-[#3D6B52]/10 px-2 py-0.5 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {allTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E6DDD4] text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-[#2C1810] line-clamp-1">{tx.productName}</span>
                  <span
                    className={`flex items-center font-extrabold ${
                      tx.type === 'in' ? 'text-[#3D6B52]' : 'text-[#C85A32]'
                    }`}
                  >
                    {tx.type === 'in' ? '+' : '-'}
                    {tx.quantity}
                  </span>
                </div>
                <div className="text-[11px] text-[#2C1810]/70 flex items-center justify-between">
                  <span>{tx.reason}</span>
                  <span className="capitalize text-[10px] font-semibold text-[#2C1810]/50">
                    {tx.method === 'voice' ? '🎙️ Voice' : '⌨️ Manual'}
                  </span>
                </div>
                <div className="text-[10px] text-[#2C1810]/50">{tx.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
