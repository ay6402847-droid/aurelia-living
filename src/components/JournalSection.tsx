import React, { useState } from 'react';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/mockData';

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="journal" className="py-20 bg-[#F7F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98755]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#85817B]">
                The Aurelia Journal
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292929] tracking-tight">
              Find Your Inspiration
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#85817B] max-w-xl">
              Editorial reflections on architectural simplicity, organic materiality, and the art of deliberate living.
            </p>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#D8C9B8]/40 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EEEAE3]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-wider font-semibold text-[#292929]">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  {/* Metadata (Unboxed, clean typographic separators) */}
                  <div className="flex items-center gap-2 text-xs text-[#85817B] mb-2.5">
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#292929] group-hover:text-[#C98755] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#85817B] line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-[#EEEAE3] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#292929] group-hover:text-[#C98755] transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-10 border border-[#D8C9B8] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EEEAE3] text-[#292929] transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C98755]">
                {selectedArticle.category}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#292929] leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-[#85817B] pb-4 border-b border-[#EEEAE3]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>By {selectedArticle.author}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedArticle.date}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden aspect-16/9 my-6">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-base text-[#3E3A36] leading-relaxed font-sans">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="first-letter:font-serif first-letter:text-3xl first-letter:float-left first-letter:mr-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#EEEAE3] flex justify-between items-center">
                <span className="text-xs text-[#85817B]">Aurelia Living Editorial Archive</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-[#292929] text-white rounded-sm hover:bg-[#493326] transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
