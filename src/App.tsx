import React, { useState, useEffect } from 'react';
import { PRODUCTS, COLLECTIONS } from './data/mockData';
import { Product, CartItem } from './types';

// Core Sections
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryCards } from './components/CategoryCards';
import { CollectionGrid } from './components/CollectionGrid';
import { LatestArrivals } from './components/LatestArrivals';
import { Bestsellers } from './components/Bestsellers';
import { BrandStory } from './components/BrandStory';
import { JournalSection } from './components/JournalSection';
import { TrustSection } from './components/TrustSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { PolicyModal } from './components/PolicyModal';

export default function App() {
  // --- Persistent Cart State ---
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // --- Persistent Wishlist State ---
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // --- UI State & Modals ---
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'shipping' | null>(null);

  // Quick View Product
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Active Category Filter for Bestsellers
  const [activeCategory, setActiveCategory] = useState('All');

  // Interactive Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurelia_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Storage sync issue:', e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Storage sync issue:', e);
    }
  }, [wishlistIds]);

  // --- Cart Actions ---
  const handleAddToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, selectedColor: selectedColor || item.selectedColor }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: selectedColor || product.colorOptions?.[0]?.name }];
    });
    showToast(`Added "${product.name}" to your bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // --- Wishlist Actions ---
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed "${product.name}" from saved list`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  // --- Navigation & Section Scrolling ---
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromHeroOrCard = (category: string) => {
    setActiveCategory(category);
    scrollToSection('bestsellers');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F1] text-[#292929] relative">
      {/* 1. Header & Navigation */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onExplore={() => scrollToSection('bestsellers')}
          onStory={() => scrollToSection('brand-story')}
        />

        {/* 3. Featured Promotional Category Cards */}
        <CategoryCards
          onSelectCategory={handleSelectCategoryFromHeroOrCard}
          onOpenJournal={() => scrollToSection('journal')}
        />

        {/* 4. Featured Collections Grid */}
        <CollectionGrid
          onSelectCollection={(categoryFilter) => {
            setActiveCategory(categoryFilter);
            scrollToSection('bestsellers');
          }}
        />

        {/* 5. Latest Arrivals with Dark Walnut Background */}
        <LatestArrivals
          products={PRODUCTS}
          wishlist={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onViewAll={() => scrollToSection('bestsellers')}
        />

        {/* 6. Customer Favorites (Bestsellers with Filter & Sort) */}
        <Bestsellers
          products={PRODUCTS}
          wishlist={wishlistIds}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
        />

        {/* 7. Brand Story & Craftsmanship */}
        <BrandStory />

        {/* 8. Editorial Journal */}
        <JournalSection />

        {/* 9. Customer Trust & Guarantees */}
        <TrustSection />

        {/* 10. Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* 11. Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenContact={() => setContactOpen(true)}
        onOpenPolicy={(type) => setPolicyType(type)}
      />

      {/* --- Floating Interactive Drawers & Modals --- */}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        products={PRODUCTS}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p, 1);
        }}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isFavorited={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Contact Concierge Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Shipping / Terms / Privacy Policy Modal */}
      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292929] text-white px-5 py-3 rounded-md shadow-xl border border-[#D8C9B8]/40 text-xs flex items-center gap-3 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#C98755]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
