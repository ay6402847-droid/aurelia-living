import React from 'react';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'shipping') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenContact,
  onOpenPolicy,
}) => {
  return (
    <footer className="bg-[#211B17] text-[#D8C9B8] border-t border-[#382F2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#382F2A]">
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-[#D8C9B8] flex items-center justify-center text-[10px] text-[#D8C9B8]">
                ✦
              </span>
              <span className="font-serif text-2xl font-medium tracking-[0.2em] text-[#F7F5F1] uppercase">
                Aurelia Living
              </span>
            </div>

            <p className="text-sm text-[#A89E94] leading-relaxed max-w-sm">
              Thoughtfully curated furniture and decor for beautiful everyday living. Rooted in Scandinavian simplicity, organic materials, and honest craftsmanship.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#2C241F] hover:bg-[#C98755] flex items-center justify-center text-[#D8C9B8] hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-[#2C241F] hover:bg-[#C98755] flex items-center justify-center text-[#D8C9B8] hover:text-white transition-colors font-serif font-bold text-sm"
              >
                P
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#2C241F] hover:bg-[#C98755] flex items-center justify-center text-[#D8C9B8] hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-[#2C241F] hover:bg-[#C98755] flex items-center justify-center text-[#D8C9B8] hover:text-white transition-colors font-sans font-bold text-xs"
              >
                TK
              </a>
            </div>
          </div>

          {/* Column 2: Explore (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base text-[#F7F5F1] tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bestsellers')}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('latest-arrivals')}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bestsellers')}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  Bestsellers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base text-[#F7F5F1] tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  Shipping &amp; White Glove
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  Returns &amp; 30-Day Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#F7F5F1] transition-colors cursor-pointer text-left inline-flex items-center gap-1"
                >
                  <span>Request Timber Swatches</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C98755]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base text-[#F7F5F1] tracking-wide">
              Studio &amp; Hours
            </h4>
            <div className="text-xs text-[#A89E94] space-y-2 leading-relaxed">
              <p>
                <strong className="text-[#F7F5F1] font-medium">Design Studio:</strong><br />
                Kronprinsens Gade 12, Copenhagen, Denmark<br />
                524 Broadway, 4th Floor, New York, NY
              </p>
              <p className="pt-1">
                <strong className="text-[#F7F5F1] font-medium">Concierge Inquiries:</strong><br />
                concierge@aurelialiving.com
              </p>
              <p className="pt-1">
                <strong className="text-[#F7F5F1] font-medium">Opening Hours:</strong><br />
                Monday – Friday: 9:00 AM – 6:00 PM CET<br />
                Saturday: 10:00 AM – 4:00 PM CET
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#857B73]">
          <p>© 2026 Aurelia Living. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-[#D8C9B8] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-[#D8C9B8] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenPolicy('shipping')}
              className="hover:text-[#D8C9B8] transition-colors cursor-pointer"
            >
              Shipping &amp; Returns
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
