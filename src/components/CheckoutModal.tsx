import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Lock, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'concierge', // 'concierge' (White glove concierge invoice) | 'stripe-demo'
    agreeTerms: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 300 ? 0 : 35;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `AL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      onOrderSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative bg-[#F7F5F1] rounded-2xl max-w-3xl w-full border border-[#D8C9B8] shadow-2xl overflow-hidden my-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 text-[#85817B] hover:text-[#292929] rounded-full hover:bg-[#EEEAE3] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {orderComplete ? (
          <div className="p-8 sm:p-12 text-center bg-white space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C98755]">
                Order Confirmed
              </span>
              <h2 className="font-serif text-3xl text-[#292929] mt-1">
                Thank you, {formData.firstName || 'Valued Client'}
              </h2>
              <p className="text-xs sm:text-sm text-[#85817B] mt-2 font-mono">
                Order Reference: <strong>#{orderId}</strong>
              </p>
            </div>

            <div className="p-5 bg-[#F7F5F1] rounded-xl border border-[#D8C9B8]/40 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between font-semibold text-[#292929] pb-2 border-b border-[#D8C9B8]/40">
                <span>White Glove Delivery Destination:</span>
                <span>{formData.city || 'Your Address'}</span>
              </div>
              <p className="text-[#85817B]">
                A dedicated Aurelia Living logistics manager will contact you at <strong>{formData.email}</strong> within 24 hours to schedule white glove appointment delivery and room placement.
              </p>
              <div className="pt-2 flex justify-between font-mono font-medium text-[#292929]">
                <span>Total Settled:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-[#85817B] max-w-sm mx-auto">
              (Demonstration checkout completed safely. In production on Hostinger, connect this form to Stripe Elements or PayPal API).
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#292929] text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#493326] transition-colors cursor-pointer"
            >
              Return to Aurelia Living
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Form Side */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-white space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C98755] font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
                <h2 className="font-serif text-2xl text-[#292929] mt-1">Shipping &amp; Delivery</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292929] mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Suite, apartment, street address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-2 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Germany</option>
                      <option>Denmark</option>
                    </select>
                  </div>
                </div>

                {/* Payment Selection with Clear Sandbox Disclosure */}
                <div className="pt-3 border-t border-[#EEEAE3]">
                  <label className="block text-xs font-semibold text-[#292929] mb-2">
                    Payment Preference (Demo Mode)
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-[#D8C9B8] rounded-xs bg-[#F7F5F1] cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'concierge'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'concierge' })}
                        className="accent-[#C98755]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#292929] block">
                          White Glove Concierge Invoice (Recommended)
                        </span>
                        <span className="text-[#85817B]">
                          No card entered now. Our team reviews your floor plan and provides an official escrow invoice.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-[#D8C9B8]/60 rounded-xs bg-white cursor-pointer opacity-80">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'stripe-demo'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'stripe-demo' })}
                        className="accent-[#C98755]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#292929] block">
                          Stripe / Credit Card (Sandbox Simulated)
                        </span>
                        <span className="text-[#85817B]">
                          Secure client simulated gateway test mode.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#C98755] hover:bg-[#b57544] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    <span>{isSubmitting ? 'Finalizing Order...' : `Confirm Order · $${total.toLocaleString()}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Summary Side */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F7F5F1] border-t lg:border-t-0 lg:border-l border-[#D8C9B8]/50 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-medium text-[#292929] mb-4">
                  Order Summary ({items.reduce((sum, i) => sum + i.quantity, 0)})
                </h3>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-xs bg-white shrink-0 border border-[#D8C9B8]/40"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#292929] truncate">{item.product.name}</p>
                        <p className="text-[#85817B]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-mono text-[#292929] font-medium">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#D8C9B8]/40 space-y-2 text-xs text-[#85817B]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#292929] font-mono">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>White Glove Shipping</span>
                    <span className="font-medium text-[#292929] font-mono">
                      {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#D8C9B8]/40 text-sm font-semibold text-[#292929]">
                    <span className="font-serif text-base">Total Due</span>
                    <span className="font-serif text-lg font-mono">${total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D8C9B8]/40 space-y-2 text-[11px] text-[#85817B]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C98755]" />
                  <span>30-Day in-home trial &amp; free returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C98755]" />
                  <span>Fully insured transit by specialized art carriers</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
