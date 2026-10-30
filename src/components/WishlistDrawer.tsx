import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F1] shadow-2xl flex flex-col justify-between border-l border-[#D8C9B8]/40 animate-fade-in">
          {/* Header */}
          <div className="p-6 border-b border-[#D8C9B8]/40 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C98755] fill-[#C98755]" />
              <h2 className="font-serif text-xl font-medium text-[#292929]">
                Saved Pieces ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#85817B] hover:text-[#292929] hover:bg-[#EEEAE3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Saved Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EEEAE3] flex items-center justify-center mx-auto text-[#85817B]">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#292929]">No saved items yet</h3>
                <p className="text-xs text-[#85817B] max-w-xs mx-auto">
                  Click the heart icon on any piece to save your favorite designs for later.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#292929] text-white rounded-sm hover:bg-[#493326] transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 bg-white rounded-lg border border-[#D8C9B8]/40 shadow-xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md bg-[#EEEAE3] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-medium text-[#292929] truncate">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-[#85817B] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#85817B]">{product.category}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-serif text-sm font-semibold text-[#292929] font-mono tabular-nums">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart(product);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C98755] hover:bg-[#b57544] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t border-[#D8C9B8]/40">
            <button
              onClick={onClose}
              className="w-full py-3 border border-[#292929] text-[#292929] hover:bg-[#292929] hover:text-white text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
