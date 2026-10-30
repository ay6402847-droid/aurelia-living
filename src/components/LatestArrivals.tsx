import React from 'react';
import { ArrowRight, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { ASSETS } from '../data/mockData';

interface LatestArrivalsProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAll: () => void;
}

export const LatestArrivals: React.FC<LatestArrivalsProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onViewAll,
}) => {
  // Take the 3 designated arrival products: Haven Lounge Chair, Forma Ceramic Vases, Solace Table Lamp
  const arrivalProducts = products.filter((p) =>
    ['haven-lounge-chair', 'forma-ceramic-vases', 'solace-table-lamp'].includes(p.id)
  );

  return (
    <section id="latest-arrivals" className="relative py-20 lg:py-28 overflow-hidden bg-[#2D211A] text-white">
      {/* Background Walnut Wood Planks Texture with Cinematic Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.walnutTextureBg}
          alt="Dark walnut wood grain texture"
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211712]/95 via-[#2C1F18]/90 to-[#211712]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-4 max-w-lg">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-0.5 bg-[#C98755]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D8C9B8]">
                Just Arrived
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F5F1] leading-[1.15] tracking-tight">
              New Pieces, <br />
              <span className="italic font-normal text-[#E2D2BE]">Timeless Character.</span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#D8C9B8]/80 leading-relaxed">
              Discover our latest additions, thoughtfully selected to bring warmth, character, and effortless elegance into your home.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onViewAll}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-white bg-[#C98755] hover:bg-[#b57544] transition-all duration-200 rounded-sm shadow-md cursor-pointer"
              >
                <span>View All Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-12 pt-6 border-t border-[#D8C9B8]/20 flex items-center gap-4 text-xs text-[#D8C9B8]/60">
              <span>Handcrafted in small batches</span>
              <span>·</span>
              <span>Limited seasonal stock</span>
            </div>
          </div>

          {/* Right Column: 3 Pristine Product Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {arrivalProducts.map((product) => {
                const isFavorited = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-xl border border-[#EEEAE3] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                  >
                    {/* Product Image Box */}
                    <div className="relative aspect-square w-full bg-[#F7F5F1] p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product);
                        }}
                        aria-label="Toggle Wishlist"
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#292929] hover:text-[#C98755] transition-colors shadow-xs cursor-pointer z-10"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isFavorited ? 'fill-[#C98755] text-[#C98755]' : 'text-[#292929]'
                          }`}
                        />
                      </button>

                      {/* Quick View Floating Action */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                        <button
                          onClick={() => onQuickView(product)}
                          className="flex-1 py-2 bg-white/95 hover:bg-white text-[#292929] text-xs font-medium rounded-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-[#292929]">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#85817B]">
                          <span>{product.category}</span>
                          <span className="font-semibold text-[#292929] font-mono tabular-nums">
                            ${product.price}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-medium text-[#292929] mt-1 group-hover:text-[#C98755] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#85817B] mt-1 line-clamp-1">
                          {product.subtitle || product.materials}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#EEEAE3] flex items-center gap-2">
                        <button
                          onClick={() => onQuickView(product)}
                          className="flex-1 py-2 text-xs uppercase tracking-wider font-semibold text-center border border-[#D8C9B8] text-[#292929] hover:bg-[#F7F5F1] transition-colors rounded-xs cursor-pointer"
                        >
                          View Product
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3 py-2 text-xs uppercase tracking-wider font-semibold bg-[#C98755] text-white hover:bg-[#b57544] transition-colors rounded-xs cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
