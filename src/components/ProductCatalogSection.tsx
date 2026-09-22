import React from 'react';
import { ArrowRight, ShoppingBag, ArrowDown, Sparkles } from 'lucide-react';
import { Toolkit } from '../types';
import { TOOLKITS } from '../data/toolkitsData';
import { AestheticCover } from './AestheticCover';

interface ProductCatalogSectionProps {
  onSelectProduct: (toolkit: Toolkit) => void;
  onAddToCart: (toolkit: Toolkit) => void;
  onOpenFullLibrary: () => void;
  cartItemIds: string[];
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenFullLibrary,
  cartItemIds,
}) => {
  // Select the 3 most popular toolkits from the library, featuring Therapist Carousel Pack
  const featuredToolkits = [
    TOOLKITS.find((t) => t.id === 'bt-19')!,
    TOOLKITS.find((t) => t.id === 'bt-01')!,
    TOOLKITS.find((t) => t.id === 'bt-08')!,
  ].filter(Boolean);

  return (
    <section id="toolkits-library" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 2 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#EBE4D8]">
          <div className="space-y-1">
            <span className="text-xs font-mono-code font-bold tracking-widest text-[#a8422b] uppercase">
              FEATURED DIGITAL TOOLKITS
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#181614]">
              Most Popular Releases
            </h2>
          </div>

          <button
            onClick={onOpenFullLibrary}
            className="flex items-center gap-2 text-xs font-mono-code font-bold text-[#181614] hover:text-[#a8422b] transition-colors cursor-pointer group"
            id="view-all-library-btn"
          >
            <span>VIEW ALL 28 TOOLKITS IN LIBRARY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Products with Aesthetic Covers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredToolkits.map((toolkit) => {
            const inCart = cartItemIds.includes(toolkit.id);

            return (
              <div
                key={toolkit.id}
                onClick={() => onSelectProduct(toolkit)}
                className="group flex flex-col justify-between cursor-pointer space-y-4"
                id={`featured-card-${toolkit.id}`}
              >
                {/* The Aesthetic Cover Page */}
                <div className="relative overflow-hidden rounded-2xl bg-white border border-[#EBE4D8] p-4 group-hover:border-[#181614] transition-all group-hover:shadow-xl">
                  <AestheticCover toolkit={toolkit} size="grid" />

                  {/* Hover prompt */}
                  <div className="absolute inset-0 z-30 bg-black/55 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 pointer-events-none">
                    <span className="px-4 py-2.5 rounded-full bg-white text-[#181614] font-mono-code text-xs font-bold shadow-2xl tracking-wider text-center whitespace-nowrap transform scale-95 group-hover:scale-100 transition-all duration-200">
                      VIEW PRODUCT PAGE →
                    </span>
                  </div>
                </div>

                {/* Metadata & Actions */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#a8422b] font-bold">{toolkit.code}</span>
                    <span className="text-[#756F66]">{toolkit.formats[0]}</span>
                  </div>

                  <h3 className="font-editorial font-bold text-xl sm:text-2xl text-[#181614] group-hover:text-[#a8422b] transition-colors leading-tight">
                    {toolkit.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#756F66] line-clamp-2">
                    {toolkit.subtitle}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-editorial font-bold text-[#181614]">
                        ${toolkit.price.toFixed(2)}
                      </span>
                      {toolkit.regularPrice > toolkit.price && (
                        <span className="text-xs font-mono-code text-[#a0988c] line-through">
                          ${toolkit.regularPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono-code font-bold text-[#a8422b] group-hover:underline flex items-center gap-1">
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Library Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-[#FAF7F2] border border-[#EBE4D8] text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#181614]">
            Looking for all 28 digital toolkits?
          </h3>
          <p className="text-sm text-[#756F66] max-w-xl mx-auto">
            Explore our complete categorized collection across Health & Wellness, Mental Health,
            Finance, Career, Family, Caregiving, and Legal events.
          </p>
          <button
            onClick={onOpenFullLibrary}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#181614] hover:bg-[#a8422b] text-white font-mono-code text-xs font-bold tracking-wider transition-all cursor-pointer shadow-md"
            id="browse-all-library-hero-btn"
          >
            <span>EXPLORE THE LIBRARY (28 TOOLKITS)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
