import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenContact,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F5F1]/95 backdrop-blur-md shadow-xs border-b border-[#D8C9B8]/40 py-4'
          : 'bg-[#F7F5F1] border-b border-[#D8C9B8]/30 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-10">
          {/* Zone 1: Brand Wordmark (Single element) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-left"
          >
            <span className="w-5 h-5 rounded-full border border-[#292929] flex items-center justify-center text-[10px] text-[#292929] group-hover:rotate-45 transition-transform duration-300">
              ✦
            </span>
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.2em] text-[#292929] uppercase">
              Aurelia Living
            </span>
          </a>

          {/* Zone 2: Navigation Links (single line, clean typography) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#292929]/80">
            <button
              onClick={() => handleLinkClick('home')}
              className="hover:text-[#292929] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C98755] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('categories')}
              className="hover:text-[#292929] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C98755] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={() => handleLinkClick('collections')}
              className="hover:text-[#292929] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C98755] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Collections
            </button>
            <button
              onClick={() => handleLinkClick('latest-arrivals')}
              className="hover:text-[#292929] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C98755] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleLinkClick('bestsellers')}
              className="hover:text-[#292929] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C98755] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Bestsellers
            </button>
            <button
              onClick={() => handleLinkClick('brand-story')}
              className="hover:text-[#292929] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C98755] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => handleLinkClick('journal')}
              className="hover:text-[#292929] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C98755] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Journal
            </button>
          </nav>

          {/* Zone 3: Actions & Shopping Bag */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search Catalog"
              className="p-2 text-[#292929] hover:text-[#C98755] transition-colors rounded-full hover:bg-[#EEEAE3] cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenWishlist}
              aria-label="Saved Wishlist"
              className="p-2 text-[#292929] hover:text-[#C98755] transition-colors rounded-full hover:bg-[#EEEAE3] relative cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C98755] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              className="p-2 text-[#292929] hover:text-[#C98755] transition-colors rounded-full hover:bg-[#EEEAE3] relative cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#292929] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleLinkClick('bestsellers')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#C98755] hover:bg-[#b57544] transition-colors rounded-sm cursor-pointer whitespace-nowrap shadow-xs"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="lg:hidden p-2 text-[#292929] hover:text-[#C98755] transition-colors rounded-md cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-[#F7F5F1] z-50 border-t border-[#D8C9B8]/40 px-6 py-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-widest text-[#85817B]">Navigation</span>
              <div className="flex flex-col gap-4 text-lg font-serif">
                <button
                  onClick={() => handleLinkClick('home')}
                  className="text-left text-[#292929] hover:text-[#C98755] py-1 border-b border-[#EEEAE3]"
                >
                  Home
                </button>
                <button
                  onClick={() => handleLinkClick('categories')}
                  className="text-left text-[#292929] hover:text-[#C98755] py-1 border-b border-[#EEEAE3]"
                >
                  Featured Categories
                </button>
                <button
                  onClick={() => handleLinkClick('collections')}
                  className="text-left text-[#292929] hover:text-[#C98755] py-1 border-b border-[#EEEAE3]"
                >
                  Collections
                </button>
                <button
                  onClick={() => handleLinkClick('latest-arrivals')}
                  className="text-left text-[#292929] hover:text-[#C98755] py-1 border-b border-[#EEEAE3]"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => handleLinkClick('bestsellers')}
                  className="text-left text-[#292929] hover:text-[#C98755] py-1 border-b border-[#EEEAE3]"
                >
                  Bestsellers
                </button>
                <button
                  onClick={() => handleLinkClick('brand-story')}
                  className="text-left text-[#292929] hover:text-[#C98755] py-1 border-b border-[#EEEAE3]"
                >
                  Our Philosophy
                </button>
                <button
                  onClick={() => handleLinkClick('journal')}
                  className="text-left text-[#292929] hover:text-[#C98755] py-1 border-b border-[#EEEAE3]"
                >
                  Design Journal
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 text-xs uppercase tracking-wider font-medium text-center border border-[#292929] text-[#292929] hover:bg-[#292929] hover:text-white transition-colors"
              >
                Contact Concierge
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLinkClick('bestsellers');
                }}
                className="w-full py-3 text-xs uppercase tracking-wider font-medium text-center bg-[#C98755] text-white hover:bg-[#b57544] transition-colors"
              >
                Shop All Furniture
              </button>
            </div>
          </div>

          <div className="pt-8 text-xs text-[#85817B] border-t border-[#D8C9B8]/40">
            <p>© 2026 Aurelia Living. All rights reserved.</p>
            <p className="mt-1">Handcrafted luxury interior furnishings.</p>
          </div>
        </div>
      )}
    </header>
  );
};
