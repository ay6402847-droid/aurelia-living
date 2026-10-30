import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';
import { ASSETS } from '../data/mockData';

export const BrandStory: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="brand-story" className="py-20 lg:py-28 bg-[#EEEAE3]/60 border-y border-[#D8C9B8]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D8C9B8]/50 aspect-4/3 sm:aspect-5/4">
              <img
                src={ASSETS.brandCraftsmanship}
                alt="Artisan woodworker hand-finishing solid oak joint in workshop"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Credential Box */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-[#D8C9B8]/40 max-w-xs">
              <span className="font-serif text-3xl font-bold text-[#292929]">25+ Years</span>
              <p className="text-xs text-[#85817B] mt-1 leading-normal">
                Of artisanal Scandinavian timber joinery and heirloom furniture making.
              </p>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98755]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#85817B]">
                Our Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292929] leading-tight tracking-tight">
              Designed Around the <br />
              <span className="italic font-normal">Way You Live.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#4A4744] leading-relaxed">
              At Aurelia Living, we believe a beautiful home is more than a collection of furniture. It is a reflection of your personality, your comfort, and the moments that matter. We bring together timeless design, thoughtful details, and everyday functionality to help you create spaces that feel truly yours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#D8C9B8]/40 text-[#C98755]">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#292929]">Sustainably Sourced</h4>
                  <p className="text-xs text-[#85817B] mt-0.5">100% FSC-certified European white oak and non-toxic plant lacquers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#D8C9B8]/40 text-[#C98755]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#292929]">Heirloom Durability</h4>
                  <p className="text-xs text-[#85817B] mt-0.5">Traditional mortise-and-tenon joints engineered for generations.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-[#292929] bg-white hover:bg-[#F7F5F1] border border-[#D8C9B8] rounded-sm transition-colors cursor-pointer shadow-xs"
              >
                <span>Discover Our Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C98755]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 border border-[#D8C9B8] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-[#85817B] hover:text-[#292929] text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C98755]">
              The Aurelia Living Manifesto
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#292929] mt-2 mb-4">
              Calm, Materiality &amp; Purpose
            </h3>
            <div className="space-y-4 text-sm text-[#4A4744] leading-relaxed">
              <p>
                Founded on the premise that everyday domestic objects directly shape human state of mind, Aurelia Living partners exclusively with generational timber mills, ceramic workshops, and organic textile weavers across Northern Europe.
              </p>
              <p>
                We reject fast furniture culture and the planned obsolescence of synthetic composites. Every dining table, lounge chair, and lamp in our catalog is engineered using solid hardwoods, honest metals, and chemical-free finishes that patina with grace over decades of tactile use.
              </p>
              <p>
                When you invite an Aurelia piece into your sanctuary, you welcome a slower, more deliberate cadence of living.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#EEEAE3] flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 bg-[#292929] text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#493326] transition-colors cursor-pointer"
              >
                Close Manifesto
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
