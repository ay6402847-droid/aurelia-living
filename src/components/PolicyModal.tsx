import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'shipping' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-[#D8C9B8] shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#85817B] hover:text-[#292929] rounded-full hover:bg-[#EEEAE3] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'shipping' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C98755]">
              <Truck className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-semibold">Logistics Policy</span>
            </div>
            <h3 className="font-serif text-2xl text-[#292929]">White Glove Delivery &amp; Transit</h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#4A4744] leading-relaxed">
              <p>
                <strong>Complimentary Delivery:</strong> Orders exceeding $300 qualify for complimentary specialized white glove delivery across continental regions.
              </p>
              <p>
                <strong>Appointment Scheduling:</strong> Once your hand-crafted pieces leave our central timber facility, our logistics concierge contacts you to schedule an exact 2-hour delivery window.
              </p>
              <p>
                <strong>Room of Choice Placement:</strong> Our two-person white glove team uncrates, inspects, positions, and clears all packaging material from your residence.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C98755]">
              <RotateCcw className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-semibold">Trial &amp; Guarantees</span>
            </div>
            <h3 className="font-serif text-2xl text-[#292929]">30-Day In-Home Trial &amp; Craft Warranty</h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#4A4744] leading-relaxed">
              <p>
                <strong>In-Home Trial:</strong> We invite you to experience our furniture in your living space for 30 days. If the proportion, texture, or light interaction does not harmonize with your home, we arrange return pickup with zero restocking fees.
              </p>
              <p>
                <strong>10-Year Structural Guarantee:</strong> Every piece of solid timber furniture is covered against joint failure, wood warping, and structural hardware defects for a decade.
              </p>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C98755]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-semibold">Privacy Commitment</span>
            </div>
            <h3 className="font-serif text-2xl text-[#292929]">Discretion &amp; Data Protection</h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#4A4744] leading-relaxed">
              <p>
                Aurelia Living operates under strict European GDPR standards. We do not sell, rent, or distribute client contact credentials or residential addresses to any third-party marketing brokers.
              </p>
              <p>
                All browser-stored information (cart and saved favorites) is retained locally in your client device browser storage for seamless persistence.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#EEEAE3] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#292929] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#493326] transition-colors cursor-pointer"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
