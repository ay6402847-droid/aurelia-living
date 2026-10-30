import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/mockData';

interface HeroSectionProps {
  onExplore: () => void;
  onStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onStory }) => {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#F7F5F1] pt-6 pb-12 sm:pt-10 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden min-h-[540px] lg:min-h-[620px] flex items-center shadow-lg bg-[#EEEAE3]">
          {/* Background Lifestyle Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={ASSETS.heroLivingRoom}
              alt="Scandinavian minimalist living room with curved linen sofa and oak table"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out hover:scale-102"
              loading="eager"
            />
            {/* Measured Scrim & Subtle Gradient Overlay for High Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5F1]/95 via-[#F7F5F1]/80 to-transparent sm:w-3/5 lg:w-1/2" />
            <div className="absolute inset-0 bg-[#292929]/5 pointer-events-none" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-xl p-6 sm:p-12 lg:p-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98755]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#85817B]">
                Thoughtfully Designed Living
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[#292929] tracking-tight text-balance">
              Create a Home That <span className="italic font-normal">Feels Like You.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-[#4A4744] leading-relaxed max-w-md">
              Discover timeless furniture and thoughtfully curated details that transform everyday spaces into extraordinary living experiences.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs uppercase tracking-widest font-semibold text-white bg-[#C98755] hover:bg-[#b57544] active:scale-[0.99] transition-all duration-200 rounded-sm shadow-md cursor-pointer whitespace-nowrap"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStory}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-medium text-[#292929] bg-white/80 hover:bg-white border border-[#D8C9B8] backdrop-blur-xs transition-colors rounded-sm cursor-pointer whitespace-nowrap"
              >
                <span>Discover Our Story</span>
              </button>
            </div>

            {/* Subtle editorial trust footnote */}
            <div className="mt-10 pt-6 border-t border-[#D8C9B8]/50 flex items-center gap-6 text-xs text-[#85817B]">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-sm font-semibold text-[#292929]">100%</span>
                <span>Solid Timber</span>
              </div>
              <span className="text-[#D8C9B8]">·</span>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-sm font-semibold text-[#292929]">10-Yr</span>
                <span>Craft Guarantee</span>
              </div>
              <span className="text-[#D8C9B8]">·</span>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-sm font-semibold text-[#292929]">Carbon</span>
                <span>Neutral Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
