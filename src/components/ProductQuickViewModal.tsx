import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorited: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isFavorited,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions?.[0]?.name || ''
  );

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative bg-[#F7F5F1] rounded-2xl max-w-4xl w-full border border-[#D8C9B8] shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#292929] hover:bg-white shadow-xs transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Preview */}
          <div className="relative bg-[#EEEAE3] aspect-square md:aspect-auto h-full min-h-[340px] flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 bg-[#292929] text-white text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-xs">
                Bestseller
              </span>
            )}
          </div>

          {/* Right Column: Specifications & Purchasing Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-white max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#85817B]">
                <span className="uppercase tracking-wider font-semibold">{product.category}</span>
                <div className="flex items-center gap-1.5 text-[#292929]">
                  <Star className="w-4 h-4 fill-[#C98755] text-[#C98755]" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-[#85817B]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#292929] leading-tight">
                  {product.name}
                </h2>
                {product.subtitle && (
                  <p className="text-xs sm:text-sm text-[#85817B] mt-1 font-sans">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#292929] font-mono tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#85817B] line-through font-mono tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-medium">In Stock · Ready to Ship</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#4A4744] leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colorOptions && product.colorOptions.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-[#292929] block mb-2">
                    Finish / Fabric: <span className="font-normal text-[#85817B]">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    {product.colorOptions.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor === color.name ? 'border-[#C98755] scale-110 shadow-xs' : 'border-transparent'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions and Materials */}
              <div className="pt-4 border-t border-[#EEEAE3] space-y-2 text-xs text-[#85817B]">
                <div>
                  <strong className="text-[#292929]">Dimensions: </strong>
                  <span>{product.dimensions}</span>
                </div>
                <div>
                  <strong className="text-[#292929]">Materials: </strong>
                  <span>{product.materials}</span>
                </div>
              </div>
            </div>

            {/* Purchase CTA and Quantity */}
            <div className="pt-6 mt-6 border-t border-[#EEEAE3] space-y-4">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D8C9B8] rounded-xs bg-[#F7F5F1]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-xs text-[#292929] hover:bg-white transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-medium text-[#292929]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-xs text-[#292929] hover:bg-white transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 bg-[#C98755] hover:bg-[#b57544] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · ${(product.price * quantity).toLocaleString()}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Wishlist"
                  className="p-3 border border-[#D8C9B8] rounded-xs text-[#292929] hover:text-[#C98755] hover:bg-[#F7F5F1] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorited ? 'fill-[#C98755] text-[#C98755]' : ''}`}
                  />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-[#85817B] text-center border-t border-[#EEEAE3]">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#C98755]" />
                  <span>White Glove Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#C98755]" />
                  <span>10-Yr Guarantee</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-[#C98755]" />
                  <span>30-Day Trial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
