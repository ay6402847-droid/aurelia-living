import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/mockData';

interface CategoryCardsProps {
  onSelectCategory: (category: string) => void;
  onOpenJournal: () => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  onSelectCategory,
  onOpenJournal,
}) => {
  const cards = [
    {
      id: 'modern-furniture',
      title: 'Modern Furniture',
      description: 'Comfort and craftsmanship for everyday living.',
      image: ASSETS.havenLoungeChair,
      ctaText: 'Shop Furniture',
      action: () => onSelectCategory('Living Room'),
      alt: 'Sculptural boucle lounge chair with solid oak legs',
    },
    {
      id: 'decor-accents',
      title: 'Decor & Accents',
      description: 'Thoughtful details that make a space special.',
      image: ASSETS.formaCeramicVases,
      ctaText: 'Shop Decor',
      action: () => onSelectCategory('Decor & Accents'),
      alt: 'Artisanal stoneware ceramic vessels on travertine stone',
    },
    {
      id: 'inspired-living',
      title: 'Inspired Interiors',
      description: 'Discover beautiful ideas for your home.',
      image: ASSETS.editorialInteriors,
      ctaText: 'Get Inspired',
      action: onOpenJournal,
      alt: 'Warm sunlit living room with linen drapes and oak furniture',
    },
  ];

  return (
    <section id="categories" className="py-8 bg-[#F7F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={card.action}
              className="group cursor-pointer bg-white rounded-xl p-5 sm:p-6 border border-[#D8C9B8]/40 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-[#EEEAE3] shrink-0 border border-[#D8C9B8]/30">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#292929] group-hover:text-[#C98755] transition-colors truncate">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#85817B] line-clamp-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#EEEAE3] flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#292929] group-hover:text-[#C98755] transition-colors">
                  {card.ctaText}
                </span>
                <div className="w-7 h-7 rounded-full bg-[#F7F5F1] group-hover:bg-[#C98755] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#292929] group-hover:text-white transition-colors group-hover:translate-x-0.5 duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
