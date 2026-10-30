import React from 'react';
import { Compass, Sparkles, ShieldCheck, Headphones } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const benefits = [
    {
      icon: Compass,
      title: 'Thoughtfully Selected Designs',
      description: 'Architectural silhouettes curated for harmony, warmth, and enduring beauty.',
    },
    {
      icon: Sparkles,
      title: 'Quality You Can Feel',
      description: 'Solid European hardwoods, hand-thrown ceramics, and breathable natural textiles.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Shopping Experience',
      description: 'End-to-end encrypted transactions with comprehensive transit damage insurance.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Concierge',
      description: 'Personal interior consultations and complimentary physical wood & fabric swatch samples.',
    },
  ];

  return (
    <section className="py-16 bg-[#F7F5F1] border-t border-[#D8C9B8]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C98755] border border-[#D8C9B8]/50 shadow-xs mb-4">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#292929]">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#85817B] leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
