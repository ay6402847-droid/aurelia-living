import React, { useState, useMemo } from 'react';
import { Heart, Eye, ShoppingBag, Star, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';

interface BestsellersProps {
  products: Product[];
  wishlist: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({
  products,
  wishlist,
  activeCategory,
  onSelectCategory,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = ['All', 'Living Room', 'Bedroom', 'Home Office', 'Lighting', 'Decor & Accents'];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, sortBy]);

  return (
    <section id="bestsellers" className="py-20 bg-[#F7F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98755]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#85817B]">
                Most Loved
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292929] tracking-tight">
              Customer Favorites
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#85817B] max-w-xl">
              The pieces our customers love most, selected for their lasting style, tactile comfort, and timeless presence.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <SlidersHorizontal className="w-4 h-4 text-[#85817B]" />
            <span className="text-xs text-[#85817B]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#D8C9B8] text-xs font-medium text-[#292929] px-3 py-2 rounded-sm focus:outline-none focus:border-[#C98755] cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs (Interactive Segmented Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#292929] text-white shadow-xs'
                  : 'bg-white text-[#85817B] hover:text-[#292929] border border-[#D8C9B8]/40 hover:border-[#D8C9B8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isFavorited = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden border border-[#D8C9B8]/40 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full bg-[#EEEAE3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Badges (Unboxed / Clean Subtle Tag) */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isBestseller && (
                      <span className="bg-[#292929]/90 text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs backdrop-blur-xs">
                        Bestseller
                      </span>
                    )}
                    {product.isNew && !product.isBestseller && (
                      <span className="bg-[#C98755] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
                        New
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label="Save to Wishlist"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#292929] hover:text-[#C98755] transition-colors shadow-xs cursor-pointer z-10"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorited ? 'fill-[#C98755] text-[#C98755]' : 'text-[#292929]'
                      }`}
                    />
                  </button>

                  {/* Quick View Hover Strip */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onQuickView(product)}
                      className="w-full py-2 bg-white/95 hover:bg-white text-[#292929] text-xs font-semibold rounded-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xs transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#85817B]">
                      <span>{product.category}</span>
                      <div className="flex items-center gap-1 text-[#292929]">
                        <Star className="w-3.5 h-3.5 fill-[#C98755] text-[#C98755]" />
                        <span className="font-semibold">{product.rating}</span>
                        <span className="text-[#85817B]">({product.reviewCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-serif text-lg font-medium text-[#292929] mt-2 group-hover:text-[#C98755] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#85817B] mt-1 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#EEEAE3] flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-lg font-semibold text-[#292929] font-mono tabular-nums">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#85817B] line-through font-mono tabular-nums">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#C98755] hover:bg-[#b57544] rounded-xs transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
