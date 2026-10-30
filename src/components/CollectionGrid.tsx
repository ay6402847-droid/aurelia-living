import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../data/mockData';

interface CollectionGridProps {
  onSelectCollection: (categoryFilter: string) => void;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ onSelectCollection }) => {
  return (
    <section id="collections" className="py-16 sm:py-20 bg-[#F7F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#85817B]">
              Curated Living Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292929] mt-2 tracking-tight">
              Explore Our Collections
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#85817B]">
              Beautifully curated pieces for every corner of your home, thoughtfully crafted to endure.
            </p>
          </div>

          <button
            onClick={() => onSelectCollection('All')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#292929] hover:text-[#C98755] transition-colors group cursor-pointer self-start md:self-end pb-1 border-b border-[#292929]/30 hover:border-[#C98755]"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.categoryFilter)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#D8C9B8]/40 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EEEAE3]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-sm text-[11px] font-medium text-[#292929] shadow-xs">
                  {col.itemCount} Pieces
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#292929] group-hover:text-[#C98755] transition-colors">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#85817B] line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EEEAE3] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#C98755] group-hover:underline">
                    Explore Collection
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C98755] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
