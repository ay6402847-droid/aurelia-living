import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 300;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 35;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'AURELIA10') {
      setDiscountPercent(10);
      setPromoSuccess('10% seasonal discount applied');
    } else if (clean === 'WELCOME15') {
      setDiscountPercent(15);
      setPromoSuccess('15% welcome discount applied');
    } else {
      setPromoError('Invalid code. Try "AURELIA10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F1] shadow-2xl flex flex-col justify-between border-l border-[#D8C9B8]/40 animate-fade-in">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#D8C9B8]/40 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#292929]" />
              <h2 className="font-serif text-xl font-medium text-[#292929]">
                Your Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#85817B] hover:text-[#292929] hover:bg-[#EEEAE3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#EEEAE3] border-b border-[#D8C9B8]/40">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-[#292929] leading-tight mb-2">
                Add <strong className="font-semibold text-[#C98755] font-mono">${remainingForFreeShipping}</strong> more for complimentary white glove shipping.
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-semibold leading-tight mb-2">
                ✦ Complimentary White Glove Shipping unlocked!
              </p>
            )}
            <div className="w-full h-1.5 bg-[#D8C9B8]/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C98755] transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EEEAE3] flex items-center justify-center mx-auto text-[#85817B]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#292929]">Your bag is empty</h3>
                <p className="text-xs text-[#85817B] max-w-xs mx-auto">
                  Explore our handcrafted furniture and curated living collections to begin your space.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#292929] text-white rounded-sm hover:bg-[#493326] transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-[#D8C9B8]/40 shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md bg-[#EEEAE3] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#292929] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#85817B] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#85817B]">
                        {item.selectedColor || item.product.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D8C9B8] rounded-xs bg-[#F7F5F1]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-[#292929] hover:bg-white transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-[#292929]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-[#292929] hover:bg-white transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-[#292929] font-mono tabular-nums">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#D8C9B8]/40 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code (e.g. AURELIA10)"
                  className="flex-1 px-3 py-1.5 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs uppercase tracking-wider focus:outline-none focus:border-[#C98755]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold bg-[#292929] text-white rounded-xs hover:bg-[#493326] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && <p className="text-xs text-emerald-700">{promoSuccess}</p>}
              {promoError && <p className="text-xs text-rose-600">{promoError}</p>}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-[#85817B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#292929] font-mono tabular-nums">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White Glove Shipping</span>
                  <span className="font-medium text-[#292929] font-mono tabular-nums">
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EEEAE3] text-sm text-[#292929] font-semibold">
                  <span className="font-serif text-base">Estimated Total</span>
                  <span className="font-serif text-lg font-mono tabular-nums">${total.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-[#C98755] hover:bg-[#b57544] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#85817B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C98755]" />
                <span>30-Day In-Home Trial &amp; Free Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
