import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materials.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q))
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#D8C9B8] shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EEEAE3] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#85817B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chairs, lamps, ceramics, white oak..."
            className="flex-1 text-base text-[#292929] placeholder-[#85817B] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#85817B] hover:text-[#292929] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#85817B] hover:text-[#292929] hover:bg-[#EEEAE3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!query && (
          <div className="p-6 space-y-4">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#85817B] block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Haven Lounge Chair', 'Ceramic Vases', 'Table Lamp', 'Oak Coffee Table', 'Boucle', 'Bedroom'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 text-xs bg-[#F7F5F1] hover:bg-[#EEEAE3] text-[#292929] rounded-xs transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {searchResults.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#85817B]">
                No pieces found matching &ldquo;{query}&rdquo;. Try &ldquo;oak&rdquo; or &ldquo;lamp&rdquo;.
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 hover:bg-[#F7F5F1] rounded-lg transition-colors cursor-pointer group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-xs bg-[#EEEAE3]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-base text-[#292929] group-hover:text-[#C98755] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#85817B]">{product.category} · {product.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-[#292929]">
                      ${product.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#85817B] group-hover:text-[#C98755] group-hover:translate-x-1 transition-all mt-1 ml-auto" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
