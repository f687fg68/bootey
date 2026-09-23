import React, { useState, useMemo } from 'react';
import { Toolkit } from '../types';
import { TOOLKITS } from '../data/toolkitsData';
import { AestheticCover } from './AestheticCover';
import { getPolarCheckoutUrl } from '../utils/orderVerification';
import { downloadToolkitZip } from '../utils/zipDownloader';
import {
  HeartPulse,
  Brain,
  DollarSign,
  Briefcase,
  Users,
  Heart,
  Scale,
  Search,
  Download,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  FolderArchive,
  Clock,
  Layers,
  Zap,
} from 'lucide-react';

interface DigitalProductsPageProps {
  onSelectProduct: (toolkit: Toolkit) => void;
  onAddToCart?: (toolkit: Toolkit) => void;
  cartItemIds?: string[];
  unlockedProductIds?: string[];
}

interface CategoryDefinition {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  itemCodes: string[]; // exact BT codes or IDs
}

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: 'health-wellness',
    title: 'Health & Wellness',
    description: 'Evidence-informed protocols and tracking frameworks for metabolic health, hormone balance, and family wellness.',
    icon: HeartPulse,
    itemCodes: ['bt-01', 'bt-02', 'bt-03', 'bt-04', 'bt-05'],
  },
  {
    id: 'mental-health-recovery',
    title: 'Mental Health & Recovery',
    description: 'Structured journals, resilience systems, and self-care toolkits for life transitions and healing.',
    icon: Brain,
    itemCodes: ['bt-06', 'bt-07', 'bt-08', 'bt-09', 'bt-10'],
  },
  {
    id: 'finance-business',
    title: 'Finance & Business',
    description: 'Automated spreadsheets, tax engines, and financial command centers for debt, pricing, and revenue.',
    icon: DollarSign,
    itemCodes: ['bt-11', 'bt-12', 'bt-13', 'bt-14', 'bt-15', 'bt-16'],
  },
  {
    id: 'career-creator',
    title: 'Career & Creator',
    description: 'Content generation packs, brand partnership managers, pitch packages, and career win logs.',
    icon: Briefcase,
    itemCodes: ['bt-17', 'bt-18', 'bt-19', 'bt-20'],
  },
  {
    id: 'family-parenting',
    title: 'Family & Parenting',
    description: 'School IEP communication packs, ADHD routine dashboards, and fertility treatment journey companions.',
    icon: Users,
    itemCodes: ['bt-21', 'bt-22', 'bt-23'],
  },
  {
    id: 'caregiving',
    title: 'Caregiving',
    description: 'Medical treatment coordinators and symptom command centers built to support dedicated caregivers.',
    icon: Heart,
    itemCodes: ['bt-24'],
  },
  {
    id: 'legal-life-events',
    title: 'Legal & Life Events',
    description: 'Financial asset splitting planners, immigration deadline trackers, and complete wedding stationery bundles.',
    icon: Scale,
    itemCodes: ['bt-25', 'bt-26', 'bt-27', 'bt-28'],
  },
];

export const DigitalProductsPage: React.FC<DigitalProductsPageProps> = ({
  onSelectProduct,
  onAddToCart,
  cartItemIds = [],
  unlockedProductIds = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Available format filters
  const formatOptions = ['all', 'PDF', 'XLSX', 'Notion', 'Templates', 'DOCX'];

  // Handle direct ZIP download for verified orders
  const handleDownload = async (toolkit: Toolkit, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingId(toolkit.id);
    try {
      await downloadToolkitZip(toolkit);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  // Filter toolkits based on search, format, and category
  const filteredToolkits = useMemo(() => {
    return TOOLKITS.filter((tk) => {
      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tk.title.toLowerCase().includes(q) ||
        tk.subtitle.toLowerCase().includes(q) ||
        tk.description.toLowerCase().includes(q) ||
        tk.code.toLowerCase().includes(q) ||
        tk.categoryLabel.toLowerCase().includes(q) ||
        tk.formats.some((f) => f.toLowerCase().includes(q));

      // Format filter
      const matchesFormat =
        selectedFormat === 'all' ||
        tk.formats.some((f) => f.toLowerCase().includes(selectedFormat.toLowerCase())) ||
        tk.subtitle.toLowerCase().includes(selectedFormat.toLowerCase());

      return matchesSearch && matchesFormat;
    });
  }, [searchQuery, selectedFormat]);

  // Group filtered toolkits into categories
  const categoriesWithProducts = useMemo(() => {
    return CATEGORY_DEFINITIONS.map((catDef) => {
      const items = filteredToolkits.filter((tk) => catDef.itemCodes.includes(tk.id));
      return {
        ...catDef,
        items,
      };
    }).filter((cat) => {
      if (activeCategoryTab !== 'all' && cat.id !== activeCategoryTab) {
        return false;
      }
      return cat.items.length > 0;
    });
  }, [filteredToolkits, activeCategoryTab]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#181614] pb-24">
      {/* ======================================================== */}
      {/* 1. HERO HEADER SECTION */}
      {/* ======================================================== */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-[#EBE4D8] bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            {/* Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181614] text-[#FAF7F2] text-[10px] sm:text-xs font-mono-code font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>COMPLETE DIGITAL CATALOG · 28 READY-TO-USE TOOLKITS</span>
            </div>

            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-bold tracking-tight text-[#181614] leading-[1.08]">
              Digital <span className="italic text-[#a8422b]">Products</span> We Sell
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-base sm:text-lg text-[#524c44] leading-relaxed">
              Explore our full collection of 28 expert-crafted, AI-assisted digital toolkits across 7 essential life domains. 
              Instant direct ZIP downloads in open formats — no subscriptions, no accounts required.
            </p>

            {/* Value Counter Stats Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E0D7C8] text-xs font-mono-code">
              <div>
                <span className="text-[#a8422b] font-bold block text-lg">28 Toolkits</span>
                <span className="text-[#756F66]">Ready for Immediate Download</span>
              </div>
              <div>
                <span className="text-[#181614] font-bold block text-lg">7 Categories</span>
                <span className="text-[#756F66]">Health, Finance, Legal & More</span>
              </div>
              <div>
                <span className="text-[#181614] font-bold block text-lg">PDF / XLSX / Notion</span>
                <span className="text-[#756F66]">Universal Open File Formats</span>
              </div>
              <div>
                <span className="text-[#181614] font-bold block text-lg">Lifetime Usage</span>
                <span className="text-[#756F66]">Pay Once, Own Forever</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CATEGORY PILL NAVIGATION & FILTER BAR */}
      {/* ======================================================== */}
      <section className="sticky top-16 sm:top-20 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Scrollable Category Jump Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveCategoryTab('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-code whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
                activeCategoryTab === 'all'
                  ? 'bg-[#181614] text-white font-bold shadow-xs'
                  : 'bg-white text-[#524c44] border border-[#d8cebe] hover:border-[#181614]'
              }`}
            >
              <span>All Categories (28)</span>
            </button>

            {CATEGORY_DEFINITIONS.map((cat) => {
              const isActive = activeCategoryTab === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-code whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
                    isActive
                      ? 'bg-[#a8422b] text-white font-bold shadow-xs'
                      : 'bg-white text-[#524c44] border border-[#d8cebe] hover:border-[#a8422b] hover:text-[#a8422b]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EBE4D8] text-[#181614]'
                  }`}>
                    {cat.itemCodes.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Format Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756F66]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by keyword, mechanism, or format (e.g. GLP-1, Notion, Tax, ADHD)..."
                className="w-full pl-10 pr-8 py-2.5 bg-white rounded-full border border-[#d8cebe] focus:border-[#181614] focus:outline-hidden text-sm font-sans text-[#181614] placeholder-[#a0988c]"
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

            {/* Format Quick Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-mono-code">
              <span className="text-[#756F66] uppercase text-[10px] font-bold mr-1 shrink-0">FORMAT:</span>
              {formatOptions.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-full text-[11px] uppercase transition-all cursor-pointer ${
                    selectedFormat === fmt
                      ? 'bg-[#181614] text-white font-bold'
                      : 'bg-white border border-[#d8cebe] text-[#756F66] hover:text-[#181614]'
                  }`}
                >
                  {fmt === 'all' ? 'All Formats' : fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CATEGORY PRODUCTS SECTIONS */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-16">
        {categoriesWithProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#EBE4D8] p-8 space-y-4 max-w-lg mx-auto">
            <FolderArchive className="w-12 h-12 text-[#a8422b] mx-auto opacity-60" />
            <h3 className="text-xl font-editorial font-bold text-[#181614]">
              No digital products found
            </h3>
            <p className="text-sm text-[#756F66]">
              No products matched your search "{searchQuery}". Try clearing filters or searching for terms like "Tax", "ADHD", "Fitness", or "PDF".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFormat('all');
                setActiveCategoryTab('all');
              }}
              className="px-6 py-2.5 rounded-full bg-[#181614] text-white text-xs font-mono-code font-bold uppercase hover:bg-[#a8422b] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          categoriesWithProducts.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <section
                key={cat.id}
                id={cat.id}
                className="space-y-6 scroll-mt-36"
              >
                {/* Category Heading Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#181614]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#a8422b]/10 text-[#a8422b] flex items-center justify-center shrink-0">
                        <CatIcon className="w-4 h-4" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#181614]">
                        {cat.title}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#181614] text-white text-[11px] font-mono-code font-bold">
                        {cat.items.length} {cat.items.length === 1 ? 'Toolkit' : 'Toolkits'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#756F66] pl-10">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {cat.items.map((toolkit) => {
                    const isUnlocked = unlockedProductIds.includes(toolkit.id);
                    const isInCart = cartItemIds.includes(toolkit.id);

                    return (
                      <div
                        key={toolkit.id}
                        onClick={() => onSelectProduct(toolkit)}
                        className="group bg-white rounded-2xl border border-[#EBE4D8] hover:border-[#181614] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                      >
                        {/* Top Card Banner / Aesthetic Cover */}
                        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#EBE4D8] relative">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-mono-code font-bold tracking-wider text-[#a8422b] bg-[#a8422b]/10 px-2.5 py-0.5 rounded-md">
                              {toolkit.code}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {toolkit.formats.map((fmt) => (
                                <span
                                  key={fmt}
                                  className="text-[10px] font-mono-code font-bold text-[#181614] bg-[#EBE4D8] px-2 py-0.5 rounded"
                                >
                                  {fmt}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Mini Aesthetic Cover Preview */}
                          <div className="transform group-hover:scale-[1.02] transition-transform duration-300">
                            <AestheticCover toolkit={toolkit} size="grid" />
                          </div>
                        </div>

                        {/* Card Body Information */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-editorial font-bold text-[#181614] group-hover:text-[#a8422b] transition-colors leading-snug">
                              {toolkit.title}
                            </h3>

                            {/* Format & Subtitle Badge matching prompt specs */}
                            <p className="text-xs font-mono-code text-[#756F66] font-medium bg-[#F5EFE6] px-2.5 py-1 rounded-lg inline-block border border-[#EBE4D8]">
                              {toolkit.subtitle}
                            </p>

                            <p className="text-xs text-[#524c44] line-clamp-3 leading-relaxed pt-1">
                              {toolkit.description}
                            </p>
                          </div>

                          {/* Mechanisms / Features Bullet Pills */}
                          <div className="pt-2 border-t border-[#F5EFE6] flex flex-wrap gap-1.5">
                            {toolkit.highlightMechanisms.slice(0, 3).map((mech, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono-code text-[#756F66] bg-[#FAF7F2] border border-[#EBE4D8] px-2 py-0.5 rounded"
                              >
                                {mech}
                              </span>
                            ))}
                          </div>

                          {/* Price & Action Row */}
                          <div className="pt-3 border-t border-[#EBE4D8] flex items-center justify-between gap-2">
                            <div>
                              <div className="text-xs text-[#756F66] line-through font-mono-code">
                                ${toolkit.regularPrice.toFixed(2)}
                              </div>
                              <div className="text-base font-mono-code font-bold text-[#181614]">
                                ${toolkit.price.toFixed(2)} <span className="text-[10px] font-normal text-[#756F66]">USD</span>
                              </div>
                            </div>

                            {/* Direct Action Button */}
                            <div className="flex items-center gap-2">
                              {isUnlocked ? (
                                <button
                                  onClick={(e) => handleDownload(toolkit, e)}
                                  className="px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono-code font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                                  title="Download ZIP"
                                >
                                  <Download className={`w-3.5 h-3.5 ${downloadingId === toolkit.id ? 'animate-bounce' : ''}`} />
                                  <span>Download</span>
                                </button>
                              ) : (
                                <a
                                  href={getPolarCheckoutUrl(toolkit)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-3.5 py-2 rounded-full bg-[#181614] hover:bg-[#a8422b] text-white text-xs font-mono-code font-bold flex items-center gap-1 shadow-2xs transition-all active:scale-95"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Buy</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* ======================================================== */}
      {/* 4. VALUE PROPOSITION FOOTER STRIP */}
      {/* ======================================================== */}
      <section className="mt-20 border-t border-[#EBE4D8] bg-[#F5EFE6] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a8422b]/10 text-[#a8422b] flex items-center justify-center shrink-0">
                <FolderArchive className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#181614] font-editorial">Instant Direct ZIP Delivery</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  Every product is packaged as a high-speed .ZIP download containing PDFs, spreadsheets, and open files.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a8422b]/10 text-[#a8422b] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#181614] font-editorial">Open Editable Formats</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  No proprietary lock-in. Open spreadsheets in Excel or Google Sheets, guides in Preview/Adobe, and Notion templates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a8422b]/10 text-[#a8422b] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#181614] font-editorial">Transparent Pricing & Licenses</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  One-time price per toolkit. Commercial reseller and client redistribution upgrades available.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a8422b]/10 text-[#a8422b] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#181614] font-editorial">AI-Assisted Precision</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  Engineered using structured clinical and financial prompt chains to ensure clear actionable execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
