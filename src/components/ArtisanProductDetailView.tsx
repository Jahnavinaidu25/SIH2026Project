import React, { useState } from 'react';
import {
  ArrowLeft,
  Mic,
  Edit3,
  Package,
  Globe,
  Save,
  Sparkles,
  CheckCircle2,
  Tag,
  AlertTriangle,
  Layers,
  Clock,
  Coins,
} from 'lucide-react';
import { ArtisanProduct } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  product: ArtisanProduct;
  onBack: () => void;
  onSave?: (updated: ArtisanProduct) => void;
  onSaveProduct?: (updated: ArtisanProduct) => void;
  onOpenVoiceStock?: (product?: ArtisanProduct) => void;
  onOpenSellEverywhere?: (product?: ArtisanProduct) => void;
}

export const ArtisanProductDetailView: React.FC<Props> = ({
  product,
  onBack,
  onSave,
  onSaveProduct,
  onOpenVoiceStock,
  onOpenSellEverywhere,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name || '');
  const [price, setPrice] = useState(product.price || 0);
  const [stock, setStock] = useState(product.stock || 0);
  const [category, setCategory] = useState(product.category || 'Craft');
  const [material, setMaterial] = useState(product.material || product.materials?.join(', ') || 'Natural clay');
  const [craftType, setCraftType] = useState(product.craftType || product.category || 'Handcrafted');
  const [description, setDescription] = useState(product.description || '');
  const [tags, setTags] = useState<string[]>(product.tags || ['Handmade', 'Terracotta']);
  const [newTagInput, setNewTagInput] = useState('');
  const [isVoiceEditingDesc, setIsVoiceEditingDesc] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleVoiceEditDescription = () => {
    audioService.playCeramicChime(350);
    setIsVoiceEditingDesc(true);

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setDescription((prev) => `${prev} ${text}`);
        setIsVoiceEditingDesc(false);
        audioService.playCeramicChime(440);
      };
      recognition.onerror = () => setIsVoiceEditingDesc(false);
      recognition.onend = () => setIsVoiceEditingDesc(false);
      recognition.start();
    } else {
      setTimeout(() => {
        setDescription(
          (prev) => `${prev} Hand-coiled with sacred red clay from the village riverbed, dried in shaded outdoor huts.`
        );
        setIsVoiceEditingDesc(false);
        audioService.playCeramicChime(440);
      }, 1500);
    }
  };

  const handleAddTag = () => {
    const cleanTag = newTagInput.trim();
    if (cleanTag && !(tags || []).includes(cleanTag)) {
      setTags([...(tags || []), cleanTag]);
      setNewTagInput('');
      audioService.playTactileTap();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((tags || []).filter((t) => t !== tagToRemove));
    audioService.playTactileTap();
  };

  const handleSave = () => {
    const updated: ArtisanProduct = {
      ...product,
      name,
      price: Number(price),
      stock: Number(stock),
      status: Number(stock) === 0 ? 'Out of Stock' : Number(stock) <= 10 ? 'Low Stock' : 'Active',
      category,
      material,
      craftType,
      description,
      tags: tags || [],
    };
    (onSaveProduct || onSave)?.(updated);
    setIsEditing(false);
    setSaveSuccess(true);
    audioService.playCeramicChime(520);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6 animate-fadeIn">
      {/* Top Bar with Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          id="product-detail-back-btn"
          onClick={() => {
            audioService.playTactileTap();
            onBack();
          }}
          className="h-10 px-3 rounded-xl bg-white border border-[#E6DDD4] hover:bg-[#F5EFEB] text-xs font-bold text-[#2C1810] flex items-center gap-2 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Products</span>
        </button>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#3D6B52] bg-[#3D6B52]/10 px-3 py-1.5 rounded-xl animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>Changes Saved!</span>
            </div>
          )}
          <button
            id="product-detail-edit-toggle-btn"
            onClick={() => {
              audioService.playTactileTap();
              setIsEditing(!isEditing);
            }}
            className={`h-10 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isEditing
                ? 'bg-[#2C1810] text-[#FDFBF7]'
                : 'bg-white border border-[#E6DDD4] text-[#2C1810] hover:bg-[#F5EFEB]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Product'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Card */}
      <div className="bg-white rounded-3xl border border-[#E6DDD4] overflow-hidden shadow-xs">
        {/* Large Product Image */}
        <div className="relative aspect-16/9 sm:aspect-21/9 bg-[#EDE7E3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2C1810]/80 text-[#FDFBF7] backdrop-blur-xs">
              {product.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                product.status === 'Active'
                  ? 'bg-[#3D6B52] text-white'
                  : product.status === 'Low Stock'
                  ? 'bg-amber-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              {product.status}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-[#E6DDD4] text-xs font-bold text-[#2C1810] shadow-sm">
            <span>Current Stock: </span>
            <strong className="text-[#C85A32] text-sm">{product.stock} units</strong>
          </div>
        </div>

        {/* Product Details & Form */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* AI Review Banner */}
          <div className="bg-[#F5EFEB] p-4 rounded-2xl border border-[#E6DDD4] flex items-start gap-3 text-xs text-[#2C1810]">
            <Sparkles className="w-5 h-5 text-[#C85A32] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#C85A32] block">
                AI-Generated Catalog Specification
              </span>
              <p className="text-[#2C1810]/70 mt-0.5">
                This listing was automatically synthesized from workshop voice notes and photos. As the master artisan, you can review, adjust pricing, or refine specifications below.
              </p>
            </div>
          </div>

          {/* Primary Info Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider mb-1">
                Product Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-[#C85A32] text-base font-extrabold text-[#2C1810] focus:outline-none bg-[#FDFBF7]"
                />
              ) : (
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
                  {product.name}
                </h1>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider mb-1">
                Price (₹ INR)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-12 px-4 rounded-xl border-2 border-[#C85A32] text-base font-bold text-[#2C1810] focus:outline-none bg-[#FDFBF7]"
                />
              ) : (
                <div className="text-xl font-extrabold text-[#2C1810]">
                  ₹{product.price.toLocaleString()}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider mb-1">
                Inventory Stock
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full h-12 px-4 rounded-xl border-2 border-[#C85A32] text-base font-bold text-[#2C1810] focus:outline-none bg-[#FDFBF7]"
                />
              ) : (
                <div className="text-xl font-extrabold text-[#2C1810]">
                  {product.stock} Units
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider mb-1">
                Category
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E6DDD4] text-sm text-[#2C1810] focus:outline-none bg-[#FDFBF7]"
                />
              ) : (
                <div className="text-sm font-semibold text-[#2C1810]">
                  {product.category}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider mb-1">
                Raw Material
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E6DDD4] text-sm text-[#2C1810] focus:outline-none bg-[#FDFBF7]"
                />
              ) : (
                <div className="text-sm font-semibold text-[#2C1810]">
                  {product.material}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider mb-1">
                Craft Technique
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={craftType}
                  onChange={(e) => setCraftType(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E6DDD4] text-sm text-[#2C1810] focus:outline-none bg-[#FDFBF7]"
                />
              ) : (
                <div className="text-sm font-semibold text-[#2C1810]">
                  {product.craftType}
                </div>
              )}
            </div>

            {/* Description with Voice Edit Option */}
            <div className="sm:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider">
                  AI Generated Description
                </label>
                {isEditing && (
                  <button
                    onClick={handleVoiceEditDescription}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                      isVoiceEditingDesc
                        ? 'bg-[#C85A32] text-white animate-pulse'
                        : 'bg-[#F5EFEB] text-[#C85A32] hover:bg-[#EDE7E3]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isVoiceEditingDesc ? 'Listening...' : '🎙️ Edit with Voice'}</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-[#C85A32] text-sm text-[#2C1810] focus:outline-none bg-[#FDFBF7]"
                />
              ) : (
                <p className="text-sm text-[#2C1810]/80 leading-relaxed bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6DDD4]">
                  {product.description}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="sm:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider">
                Product Tags &amp; Search Keywords
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5EFEB] text-xs font-semibold text-[#2C1810] border border-[#E6DDD4]"
                  >
                    <Tag className="w-3 h-3 text-[#C85A32]" />
                    <span>{tag}</span>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 font-bold ml-1 text-sm"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-1 max-w-sm">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="Add new tag..."
                    className="h-10 px-3 rounded-xl border border-[#E6DDD4] text-xs text-[#2C1810] flex-1 focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <button
                    onClick={handleAddTag}
                    className="h-10 px-4 rounded-xl bg-[#2C1810] text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#E6DDD4] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {/* Voice Stock Update CTA */}
              <button
                id="product-detail-voice-stock-btn"
                onClick={() => {
                  audioService.playCeramicChime(350);
                  onOpenVoiceStock(product);
                }}
                className="h-12 px-4 rounded-xl bg-[#F5EFEB] hover:bg-[#EDE7E3] text-[#2C1810] text-xs font-bold transition-all flex items-center gap-2 border border-[#E6DDD4]"
              >
                <Mic className="w-4 h-4 text-[#C85A32]" />
                <span>🎙️ Voice Stock Update</span>
              </button>

              {/* Sell Everywhere CTA */}
              <button
                id="product-detail-sell-everywhere-btn"
                onClick={() => {
                  audioService.playCeramicChime(420);
                  onOpenSellEverywhere(product);
                }}
                className="h-12 px-4 rounded-xl bg-[#F5EFEB] hover:bg-[#EDE7E3] text-[#2C1810] text-xs font-bold transition-all flex items-center gap-2 border border-[#E6DDD4]"
              >
                <Globe className="w-4 h-4 text-[#3D6B52]" />
                <span>Sell Everywhere</span>
              </button>
            </div>

            {/* Save Changes button */}
            {isEditing && (
              <button
                id="product-detail-save-btn"
                onClick={handleSave}
                className="h-12 px-6 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] active:scale-95 transition-all shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
