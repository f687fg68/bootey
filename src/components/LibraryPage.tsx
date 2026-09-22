import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowDown,
  Info,
  Check,
  Download,
  ShoppingBag,
  Sparkles,
  FileArchive,
  ArrowRight,
  SlidersHorizontal,
  Lock,
} from 'lucide-react';
import { Toolkit, CategoryType } from '../types';
import { TOOLKITS } from '../data/toolkitsData';
import { AestheticCover } from './AestheticCover';
import { downloadToolkitZip } from '../utils/zipDownloader';

interface LibraryPageProps {
  onSelectProduct: (toolkit: Toolkit) => void;
  onAddToCart: (toolkit: Toolkit) => void;
  cartItemIds: string[];
  unlockedProductIds: string[];
}

interface CategoryFilterTab {
  id: CategoryType;
  label: string;
  count: number;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({
  onSelectProduct,
  onAddToCart,
  cartItemIds,
  unlockedProductIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name' | 'code'>('featured');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Define Category Tabs with exact counts matching Screenshot 1
  const categories: CategoryFilterTab[] = useMemo(() => {
    return [
      { id: 'all', label: 'All', count: TOOLKITS.length },
      { id: 'health', label: 'Health & Wellness', count: TOOLKITS.filter((t) => t.category === 'health').length },
      { id: 'mental-health', label: 'Mental Health', count: TOOLKITS.filter((t) => t.category === 'mental-health').length },
      { id: 'finance', label: 'Finance & Business', count: TOOLKITS.filter((t) => t.category === 'finance').length },
      { id: 'career', label: 'Career & Creator', count: TOOLKITS.filter((t) => t.category === 'career').length },
      { id: 'family', label: 'Family & Parenting', count: TOOLKITS.filter((t) => t.category === 'family').length },
      { id: 'caregiving', label: 'Caregiving', count: TOOLKITS.filter((t) => t.category === 'caregiving').length },
      { id: 'legal', label: 'Legal & Life Events', count: TOOLKITS.filter((t) => t.category === 'legal').length },
    ];
  }, []);

  // Filter and sort toolkits
  const filteredToolkits = useMemo(() => {
    let list = [...TOOLKITS];

    // Filter by Category
    if (activeCategory !== 'all') {
      list = list.filter((t) => t.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.categoryLabel.toLowerCase().includes(q) ||
          t.highlightMechanisms.some((m) => m.toLowerCase().includes(q)) ||
          t.formats.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sorting Logic
    list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'code') {
        const numA = parseInt(a.code.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.code.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      }
      // Default: 'featured' preserves catalog ordering
      return 0;
    });

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // Handle direct ZIP download from card button
  const handleDirectDownload = async (e: React.MouseEvent, toolkit: Toolkit) => {
    e.stopPropagation();
    if (!unlockedProductIds.includes(toolkit.id)) {
      onSelectProduct(toolkit);
      window.history.pushState({ product: toolkit.id }, '', `${window.location.pathname}?product=${toolkit.id}`);
      return;
    }
    setDownloadingId(toolkit.id);
    try {
      await downloadToolkitZip(toolkit);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#181614] pb-24">
      {/* ======================================================== */}
      {/* 1. LIBRARY HEADER SECTION (MATCHING SCREENSHOT 1) */}
      {/* ======================================================== */}
      <section className="pt-12 sm:pt-16 pb-8 border-b border-[#EBE4D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Tracked Supertitle */}
          <div className="flex items-center gap-2 text-xs font-mono-code tracking-[0.2em] text-[#a8422b] uppercase font-bold">
            <span>THE LIBRARY</span>
            <span>—</span>
            <span>28 DIGITAL TOOLKITS</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-bold text-[#181614] leading-[1.1] max-w-4xl">
            Curated <span className="italic text-[#a8422b] font-normal">digital</span> toolkits.{' '}
            <span className="block sm:inline">Purchase them today.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#756F66] leading-relaxed max-w-3xl">
            Every toolkit is crafted with AI assistance, thoughtfully organized, and delivered as a
            single zip file the second you purchase. No subscriptions, no accounts, no waiting.
          </p>

          {/* AI-Assisted Content Disclaimer Notice (Exact text from Screenshot 1) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EBE4D8] flex items-start gap-3.5 text-xs text-[#524c44] leading-relaxed shadow-2xs">
            <Info className="w-5 h-5 text-[#a8422b] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-[#181614]">AI-Assisted Content — </strong>
              All toolkits in this library were created with the assistance of artificial
              intelligence. They are intended for informational, educational, and organizational
              purposes only and do not constitute professional advice. Please consult a qualified
              professional before acting on any information provided.
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CATEGORY FILTER TABS & SEARCH / SORT BAR */}
      {/* ======================================================== */}
      <section className="sticky top-16 sm:top-20 z-20 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          {/* Scrollable Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 sm:py-2 rounded-full text-xs font-mono-code whitespace-nowrap transition-all cursor-pointer min-h-[44px] active:scale-95 ${
                    isActive
                      ? 'bg-[#181614] text-white font-bold shadow-xs'
                      : 'bg-white text-[#524c44] border border-[#d8cebe] hover:border-[#181614] hover:text-[#181614]'
                  }`}
                  id={`cat-filter-${tab.id}`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#FAF7F2] text-[#756F66]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#756F66] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, format, or mechanism..."
                className="w-full pl-10 pr-8 py-2.5 sm:py-2 bg-white rounded-full border border-[#d8cebe] focus:border-[#181614] focus:outline-hidden text-base sm:text-xs font-sans text-[#181614] placeholder-[#a0988c] min-h-[44px] sm:min-h-0"
                id="library-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-xs font-mono-code text-[#756F66] hover:text-[#181614]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-start gap-2 text-xs font-mono-code">
              <span className="text-[#756F66] uppercase">SORT BY:</span>
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full sm:w-auto appearance-none bg-white border border-[#d8cebe] rounded-full px-4 py-2.5 sm:py-2 pr-8 text-xs font-mono-code font-bold text-[#181614] hover:border-[#181614] focus:outline-hidden cursor-pointer min-h-[44px] sm:min-h-0"
                  id="library-sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Title: A to Z</option>
                  <option value="code">Code: BT-01 to BT-28</option>
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#756F66] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PRODUCT CATALOG GRID WITH AESTHETIC COVER PAGES */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {filteredToolkits.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="text-4xl">📂</div>
            <h3 className="text-xl font-editorial font-bold text-[#181614]">
              No toolkits match your search.
            </h3>
            <p className="text-sm text-[#756F66]">
              Try searching for different terms or reset the filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#181614] text-white text-xs font-mono-code font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredToolkits.map((toolkit) => {
              const inCart = cartItemIds.includes(toolkit.id);
              const isDownloading = downloadingId === toolkit.id;

              return (
                <div
                  key={toolkit.id}
                  onClick={() => onSelectProduct(toolkit)}
                  className="group flex flex-col justify-between cursor-pointer space-y-4"
                  id={`toolkit-card-${toolkit.id}`}
                >
                  {/* ======================================================== */}
                  {/* THE AESTHETIC COVER PAGE (HERO PROMINENCE ON EVERY CARD) */}
                  {/* ======================================================== */}
                  <div className="relative overflow-hidden rounded-2xl bg-white border border-[#EBE4D8] p-3 sm:p-4 group-hover:border-[#181614] transition-all group-hover:shadow-xl">
                    <AestheticCover toolkit={toolkit} size="grid" />

                    {/* Quick View Button on Hover */}
                    <div className="absolute inset-0 z-30 bg-black/55 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 pointer-events-none">
                      <span className="px-4 py-2.5 rounded-full bg-white text-[#181614] font-mono-code text-xs font-bold shadow-2xl tracking-wider text-center whitespace-nowrap transform scale-95 group-hover:scale-100 transition-all duration-200">
                        VIEW PRODUCT PAGE →
                      </span>
                    </div>
                  </div>

                  {/* Card Metadata & Action Strip */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono-code font-bold text-[#a8422b]">
                        {toolkit.code}
                      </span>
                      <span className="text-[11px] font-mono-code text-[#756F66]">
                        {toolkit.formats[0]}
                      </span>
                    </div>

                    <h3 className="font-editorial font-bold text-xl sm:text-2xl text-[#181614] group-hover:text-[#a8422b] transition-colors leading-tight">
                      {toolkit.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#756F66] line-clamp-1">
                      {toolkit.subtitle}
                    </p>

                    {/* Bottom Pricing & Instant Action Row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-editorial font-bold text-[#181614]">
                          ${toolkit.price.toFixed(2)}
                        </span>
                        {toolkit.regularPrice > toolkit.price && (
                          <span className="text-xs font-mono-code text-[#a0988c] line-through">
                            ${toolkit.regularPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Circular Download / Bag Action Button (Matching Screenshots) */}
                      <div className="flex items-center gap-2">
                        {/* Direct ZIP download button */}
                        <button
                          onClick={(e) => handleDirectDownload(e, toolkit)}
                          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-2xs group/btn ${
                            unlockedProductIds.includes(toolkit.id)
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                              : 'border-[#d8cebe] hover:border-[#181614] bg-[#181614] text-white hover:bg-[#a8422b]'
                          }`}
                          title={unlockedProductIds.includes(toolkit.id) ? "Download ZIP (Purchased)" : "Locked · Purchase Required to Download"}
                          aria-label={`Download ${toolkit.title} ZIP`}
                        >
                          {unlockedProductIds.includes(toolkit.id) ? (
                            <ArrowDown
                              className={`w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform ${
                                isDownloading ? 'animate-bounce text-emerald-700' : 'text-emerald-700'
                              }`}
                            />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 4. ZIP FILES INTEGRATION CALLOUT FOR THE STORE OWNER */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="p-8 rounded-3xl bg-[#F4EDE5] border border-[#E0D7C8] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#181614] text-white flex items-center justify-center">
              <FileArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-editorial font-bold text-[#181614]">
                Digital ZIP File Integration Ready
              </h3>
              <p className="text-xs font-mono-code text-[#756F66]">
                All 28 toolkits are pre-configured for automated single .zip file delivery.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#524c44] leading-relaxed">
            When you're ready to integrate your real digital product zip files, place your files in{' '}
            <code className="bg-white px-2 py-0.5 rounded text-[#a8422b] font-mono-code text-xs">
              /public/downloads/
            </code>{' '}
            and specify the filename or URL in{' '}
            <code className="bg-white px-2 py-0.5 rounded text-[#181614] font-mono-code text-xs">
              src/data/toolkitsData.ts
            </code>
            . The instant download buttons and purchase fulfillment will immediately deliver your
            real files!
          </p>
        </div>
      </section>
    </div>
  );
};
