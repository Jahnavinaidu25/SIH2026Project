import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Check, Sparkles, Heart, ArrowRight, Award, Mic } from 'lucide-react';
import { CartItem } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { formatPrice } from '../utils/currency';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (craftId: string) => void;
  onUpdateQuantity: (craftId: string, quantity: number) => void;
  onClearCart: () => void;
  onCheckoutSuccess?: (items: CartItem[], patronNote: string, provId: string) => void;
  onNavigateToPatronVault?: () => void;
}

export const CartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onCheckoutSuccess,
  onNavigateToPatronVault,
}) => {
  const { t } = useTranslation();
  const [patronNote, setPatronNote] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [provenanceId, setProvenanceId] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.craft.price * item.quantity, 0);
  const totalToArtisans = items.reduce(
    (sum, item) =>
      sum + Math.round((item.craft.price * item.craft.fairWagePercentage) / 100) * item.quantity,
    0
  );
  const totalToMaterials = items.reduce(
    (sum, item) =>
      sum + Math.round((item.craft.price * item.craft.rawMaterialsPercentage) / 100) * item.quantity,
    0
  );
  const totalToLogistics = totalAmount - totalToArtisans - totalToMaterials;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    audioService.playCeramicChime(350);

    setTimeout(() => {
      const generatedProvId = `PROV-${Date.now().toString().slice(-6)}`;
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setProvenanceId(generatedProvId);
      audioService.playCeramicChime(520);
      if (onCheckoutSuccess) {
        onCheckoutSuccess(items, patronNote, generatedProvId);
      }
    }, 1200);
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutComplete(false);
    onClose();
  };

  const handleGoToVault = () => {
    onClearCart();
    setCheckoutComplete(false);
    onClose();
    if (onNavigateToPatronVault) {
      onNavigateToPatronVault();
    }
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#2C1810]/60 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FDFBF7] h-full flex flex-col justify-between shadow-2xl border-l border-[#E6DDD4] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E6DDD4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏺</span>
            <div>
              <h3 className="text-base font-extrabold text-[#2C1810]">{t.cart.drawerTitle}</h3>
              <span className="text-[11px] text-[#3D6B52] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {t.cart.fairWageContribution}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F5EFEB] border border-[#E6DDD4] flex items-center justify-center text-[#2C1810] hover:bg-[#EDE7E3]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {checkoutComplete ? (
            /* Success & Certificate View */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#3D6B52]/15 text-[#3D6B52] flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-[#2C1810]">
                {t.common.confirmed}
              </h4>
              <p className="text-xs text-[#2C1810]/70 leading-relaxed max-w-xs mx-auto">
                Your direct contribution of <strong className="text-[#3D6B52]">{formatPrice(totalToArtisans)}</strong> has been dispatched straight to the artisans' community credit guild.
              </p>

              {/* Certificate Box */}
              <div className="p-4 rounded-2xl bg-[#F5EFEB] border border-[#E6DDD4] text-left text-xs space-y-2">
                <div className="flex justify-between text-[#2C1810]/60 text-[11px]">
                  <span>Certificate ID</span>
                  <span className="font-mono font-bold text-[#2C1810]">{provenanceId}</span>
                </div>
                <div className="flex justify-between text-[#2C1810]">
                  <span>{t.cart.directArtisanShare}:</span>
                  <span className="font-bold text-[#3D6B52]">{formatPrice(totalToArtisans)} (85%)</span>
                </div>
                <div className="flex justify-between text-[#2C1810]/60">
                  <span>{t.common.directFairWage}:</span>
                  <span className="font-bold text-[#3D6B52]">₹0 INR</span>
                </div>
                {patronNote && (
                  <div className="pt-2 border-t border-[#E6DDD4] italic text-[11px] text-[#2C1810]/80">
                    "Your note has been queued for transmission to the maker's workshop."
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <button
                  id="go-to-patron-vault-btn"
                  onClick={handleGoToVault}
                  className="w-full h-12 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Award className="w-4 h-4" />
                  <span>Inspect Passport in Patron Vault</span>
                </button>
                <button
                  onClick={handleFinish}
                  className="w-full h-10 rounded-xl bg-[#F5EFEB] border border-[#E6DDD4] text-[#2C1810] text-xs font-bold hover:bg-[#EDE7E3] transition-all"
                >
                  Return to Conscious Marketplace
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center space-y-3">
              <span className="text-4xl block">🏺</span>
              <h4 className="text-base font-bold text-[#2C1810]">{t.cart.emptyMessage}</h4>
              <p className="text-xs text-[#2C1810]/60 max-w-xs mx-auto">
                Explore hand-coiled pottery, natural fermented textiles, and woodcraft with verified ancestral lineages.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#C85A32] text-white text-xs font-bold rounded-xl"
              >
                {t.cart.continueShopping}
              </button>
            </div>
          ) : (
            /* Itemized Cart Items */
            <>
              <div className="space-y-3">
                {items.map(({ craft, quantity }) => (
                  <div
                    key={craft.id}
                    className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-3 flex gap-3 relative"
                  >
                    <img
                      src={craft.images[0]}
                      alt={craft.title}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E6DDD4] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#2C1810] truncate">
                        {craft.title}
                      </h4>
                      <span className="text-[11px] text-[#C85A32] font-serif italic block">
                        By {craft.artisan.name}
                      </span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-extrabold text-[#2C1810]">
                          {formatPrice(craft.price * quantity)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#3D6B52] font-semibold">
                            Qty: {quantity}
                          </span>
                          <button
                            onClick={() => onRemoveItem(craft.id)}
                            className="text-[#2C1810]/40 hover:text-[#ba1a1a] transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note to the Artisan */}
              <div className="p-3.5 rounded-2xl bg-[#F5EFEB] border border-[#E6DDD4]">
                <label className="text-xs font-bold text-[#2C1810] flex items-center gap-1.5 mb-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#C85A32]" />
                  Add a Personal Note to the Artisan
                </label>
                <textarea
                  value={patronNote}
                  onChange={(e) => setPatronNote(e.target.value)}
                  placeholder="Share how this piece will live in your home or express gratitude to the master maker..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E6DDD4] text-xs text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#C85A32] resize-none h-18"
                />
              </div>

              {/* Fair Wage Disbursement Calculation Box */}
              <div className="p-4 rounded-2xl bg-[#F5EFEB] border border-[#E6DDD4] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 block mb-1">
                  Transparent Fund Disbursement
                </span>
                <div className="flex justify-between text-xs text-[#3D6B52] font-bold">
                  <span>Direct to Artisans (85%):</span>
                  <span>{formatPrice(totalToArtisans)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#2C1810]/70">
                  <span>Raw Materials Fund (8%):</span>
                  <span>{formatPrice(totalToMaterials)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#2C1810]/70">
                  <span>Carbon-Neutral Logistics (7%):</span>
                  <span>{formatPrice(totalToLogistics)}</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-[#3D6B52] pt-1.5 border-t border-[#E6DDD4]">
                  <span>Middleman Extraction:</span>
                  <span>₹0 INR (0%)</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Checkout Trigger */}
        {!checkoutComplete && items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E6DDD4] bg-[#FDFBF7]">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-xs text-[#2C1810]/70">Total Conscious Price</span>
              <span className="text-xl font-extrabold text-[#2C1810]">{formatPrice(totalAmount)}</span>
            </div>

            <button
              id="confirm-conscious-checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full h-12 rounded-xl bg-[#C85A32] text-white text-xs sm:text-sm font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <span>Certifying Direct Disbursement...</span>
              ) : (
                <>
                  <span>{t.cart.checkoutBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
