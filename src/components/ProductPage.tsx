import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Download,
  Check,
  FileText,
  ShieldCheck,
  Sparkles,
  FileArchive,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  ExternalLink,
  Share2,
  CheckCircle2,
  FileSpreadsheet,
  FileCode,
  File,
  HelpCircle,
  Lock,
  Key,
} from 'lucide-react';
import { Toolkit } from '../types';
import { TOOLKITS } from '../data/toolkitsData';
import { AestheticCover } from './AestheticCover';
import { downloadToolkitZip } from '../utils/zipDownloader';
import { getPolarCheckoutUrl, revokePayment } from '../utils/orderVerification';

interface ProductPageProps {
  toolkit: Toolkit;
  onBackToLibrary: () => void;
  onAddToCart: (toolkit: Toolkit) => void;
  onSelectProduct: (toolkit: Toolkit) => void;
  isInCart: boolean;
  unlockedProductIds: string[];
  onRevokeVerification?: (id: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  toolkit,
  onBackToLibrary,
  onAddToCart,
  onSelectProduct,
  isInCart,
  unlockedProductIds,
  onRevokeVerification,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showManifest, setShowManifest] = useState(true);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);
  const [isFullscreenCover, setIsFullscreenCover] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const isVerified = unlockedProductIds.includes(toolkit.id);

  // Monitor scroll position to reveal sticky bottom bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset download status when toolkit changes
  useEffect(() => {
    setDownloadSuccess(false);
  }, [toolkit]);

  // Find index and previous/next toolkits for rapid navigation across all 28 products
  const currentIndex = TOOLKITS.findIndex((t) => t.id === toolkit.id);
  const prevToolkit = currentIndex > 0 ? TOOLKITS[currentIndex - 1] : TOOLKITS[TOOLKITS.length - 1];
  const nextToolkit = currentIndex < TOOLKITS.length - 1 ? TOOLKITS[currentIndex + 1] : TOOLKITS[0];

  // Related products from the same category or other toolkits
  const relatedToolkits = TOOLKITS.filter(
    (item) => item.id !== toolkit.id && (item.category === toolkit.category || item.coverBadge)
  ).slice(0, 3);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      await downloadToolkitZip(toolkit);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRevoke = () => {
    revokePayment(toolkit.id);
    if (onRevokeVerification) {
      onRevokeVerification(toolkit.id);
    }
  };

  const handleCopyProductLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?product=${toolkit.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // Helper to render appropriate file format icon
  const renderFileIcon = (fileName: string, type: string) => {
    const lower = fileName.toLowerCase();
    if (lower.endsWith('.pdf')) return <FileText className="w-4 h-4 text-rose-600 shrink-0" />;
    if (lower.endsWith('.xlsx') || lower.endsWith('.csv')) return <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />;
    if (lower.endsWith('.md') || lower.endsWith('.txt')) return <FileCode className="w-4 h-4 text-amber-600 shrink-0" />;
    if (lower.endsWith('.html')) return <FileCode className="w-4 h-4 text-blue-600 shrink-0" />;
    return <File className="w-4 h-4 text-[#756F66] shrink-0" />;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#181614] pb-28">
      {/* Fullscreen Cover Zoom Modal */}
      {isFullscreenCover && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsFullscreenCover(false)}
        >
          <button
            onClick={() => setIsFullscreenCover(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close fullscreen cover"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="w-full max-w-lg sm:max-w-xl max-h-[90vh] aspect-[3/4]"
            onClick={(e) => e.stopPropagation()}
          >
            <AestheticCover toolkit={toolkit} size="fullscreen" />
          </div>
        </div>
      )}

      {/* Top Breadcrumb & Product Switcher Bar */}
      <div className="border-b border-[#EBE4D8] bg-[#FAF7F2]/95 backdrop-blur-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2">
          {/* Back to Library */}
          <button
            onClick={onBackToLibrary}
            className="flex items-center gap-2 text-xs font-mono-code font-bold text-[#181614] hover:text-[#a8422b] transition-colors cursor-pointer group shrink-0"
            id="back-to-library-btn"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">BACK TO LIBRARY</span>
            <span className="sm:hidden">LIBRARY</span>
          </button>

          {/* Product Switcher Dropdown (Browse all 28 products directly) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectProduct(prevToolkit)}
              className="p-1.5 rounded-lg hover:bg-[#EBE4D8] text-[#756F66] hover:text-[#181614] transition-colors cursor-pointer text-xs font-mono-code"
              title={`Previous: ${prevToolkit.code} - ${prevToolkit.title}`}
              aria-label="Previous Product"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            <select
              value={toolkit.id}
              onChange={(e) => {
                const target = TOOLKITS.find((t) => t.id === e.target.value);
                if (target) onSelectProduct(target);
              }}
              className="bg-white border border-[#EBE4D8] text-xs font-mono-code font-semibold text-[#181614] rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-[#a8422b] cursor-pointer max-w-[180px] sm:max-w-[260px] truncate"
              aria-label="Switch product"
            >
              {TOOLKITS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code} — {t.title} (${t.price})
                </option>
              ))}
            </select>

            <button
              onClick={() => onSelectProduct(nextToolkit)}
              className="p-1.5 rounded-lg hover:bg-[#EBE4D8] text-[#756F66] hover:text-[#181614] transition-colors cursor-pointer text-xs font-mono-code"
              title={`Next: ${nextToolkit.code} - ${nextToolkit.title}`}
              aria-label="Next Product"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Share / Copy Link */}
          <button
            onClick={handleCopyProductLink}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#EBE4D8] hover:border-[#181614] text-xs font-mono-code text-[#756F66] hover:text-[#181614] transition-colors cursor-pointer shrink-0"
            title="Copy direct product page link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Hero & Aesthetic Cover Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN: THE AESTHETIC COVER PAGE (HERO PROMINENCE) */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4">
            <div className="relative group">
              {/* The Aesthetic Cover Page */}
              <AestheticCover
                toolkit={toolkit}
                size="large"
                className="shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all cursor-zoom-in"
                onClick={() => setIsFullscreenCover(true)}
              />

              {/* Hover Zoom Prompt */}
              <button
                onClick={() => setIsFullscreenCover(true)}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181614]/80 hover:bg-[#181614] text-white text-[11px] font-mono-code tracking-wider backdrop-blur-xs transition-opacity cursor-pointer"
                title="View full cover page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>EXPAND COVER</span>
              </button>
            </div>

            {/* Cover Quick Info / Specs Strip */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBE4D8] flex items-center justify-between text-xs font-mono-code text-[#756F66]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#a8422b]" />
                <span>{toolkit.pages} Pages Guide</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2">
                <FileArchive className="w-4 h-4 text-[#a8422b]" />
                <span>{toolkit.zipFile.fileSize} ZIP</span>
              </div>
              <span>·</span>
              <div className="font-bold text-[#181614]">
                {toolkit.zipFile.filesCount} Verified Assets
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: PRODUCT DETAILS & PURCHASE ACTIONS */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header & Badges */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#EBE4D8] text-xs font-mono-code font-bold tracking-wider text-[#181614]">
                  {toolkit.code}
                </span>
                <span className="text-xs font-mono-code font-semibold tracking-wider text-[#a8422b] uppercase">
                  {toolkit.categoryLabel}
                </span>
                {toolkit.coverBadge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#181614] text-white text-[10px] font-mono-code font-bold tracking-wider">
                    {toolkit.coverBadge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono-code font-bold">
                  ZIP ARCHIVE ATTACHED
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#181614] leading-[1.1]">
                {toolkit.title}
              </h1>

              <p className="text-base sm:text-lg text-[#756F66] font-medium leading-snug">
                {toolkit.subtitle}
              </p>
            </div>

            {/* Pricing & Primary Purchase Action Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EBE4D8] shadow-sm space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="text-xs font-mono-code text-[#756F66] uppercase tracking-wider">
                    Official Product Pricing · Instant Digital Delivery
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl sm:text-5xl font-editorial font-bold text-[#181614]">
                      ${toolkit.price.toFixed(2)}
                    </span>
                    {toolkit.regularPrice > toolkit.price && (
                      <span className="text-base font-mono-code text-[#a0988c] line-through">
                        ${toolkit.regularPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono-code font-bold">
                      SAVE ${(toolkit.regularPrice - toolkit.price).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono-code text-emerald-700 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Single-Seat Lifetime License</span>
                  </div>
                  <div className="text-[11px] font-mono-code text-[#756F66] mt-0.5">
                    No recurring fees · Perpetual access
                  </div>
                </div>
              </div>

              {/* Action Buttons: Purchase via Polar Checkout or Verified ZIP Download */}
              <div className="space-y-3 pt-2">
                {isVerified ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-mono-code text-emerald-900 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Payment Verified · Lifetime License Active</span>
                        </div>
                        {onRevokeVerification && (
                          <button
                            onClick={handleRevoke}
                            title="Reset purchase status (test re-locking)"
                            className="text-[10px] text-emerald-700/60 hover:text-rose-700 underline cursor-pointer"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <div className="text-[11px] text-emerald-800/80">
                        Payment on Polar has been confirmed. You have perpetual commercial access to download this package.
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono-code text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md"
                      id="product-instant-download-btn"
                    >
                      <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                      <span>{isDownloading ? 'Downloading ZIP Archive...' : `Download Complete ZIP Package (${toolkit.zipFile.fileSize})`}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Primary Polar Checkout Button */}
                    <a
                      href={getPolarCheckoutUrl(toolkit)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#181614] hover:bg-[#a8422b] text-white font-mono-code text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md hover:shadow-lg group text-center"
                      id="product-purchase-btn"
                    >
                      <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                      <span>Buy with Polar · ${toolkit.price.toFixed(2)} USD</span>
                    </a>

                    {/* Download Gated Lock Notice */}
                    <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#F5EFE6] border border-[#EBE4D8] text-xs text-center">
                      <Lock className="w-3.5 h-3.5 text-[#a8422b] shrink-0" />
                      <span className="text-[11px] font-mono-code text-[#756F66]">
                        ZIP archive is locked. Instant download unlocks upon confirmed Polar payment.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Download Success Confirmation */}
              {downloadSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono-code text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Successfully verified and downloaded <strong>{toolkit.zipFile.fileName}</strong>!
                  </span>
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#EBE4D8] text-center">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold font-mono-code text-[#181614]">
                    INSTANT ACCESS
                  </div>
                  <div className="text-[10px] text-[#756F66]">Direct .ZIP Download</div>
                </div>
                <div className="space-y-0.5 border-x border-[#EBE4D8]">
                  <div className="text-[11px] font-bold font-mono-code text-[#181614]">
                    SECURE SYSTEM
                  </div>
                  <div className="text-[10px] text-[#756F66]">SSL Encrypted Payment</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold font-mono-code text-[#181614]">
                    COMMERCIAL USE
                  </div>
                  <div className="text-[10px] text-[#756F66]">Perpetual Rights</div>
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] font-mono-code text-[#8c857b]">
                Instant digital fulfillment · All digital sales are final · Support: o88gfdde@gmail.com
              </div>
            </div>

            {/* ======================================================== */}
            {/* DESIGNATED DIGITAL ZIP ARCHIVE INSPECTOR & MANIFEST */}
            {/* ======================================================== */}
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EBE4D8] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0E8DC] border border-[#E0D7C8] flex items-center justify-center text-[#a8422b]">
                    <FileArchive className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono-code font-bold uppercase tracking-wider text-[#181614]">
                      Attached Digital Package (.ZIP)
                    </h3>
                    <div className="text-xs font-mono-code text-[#756F66]">
                      {toolkit.zipFile.fileName} · {toolkit.zipFile.fileSize}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isVerified) {
                        handleDownload();
                      } else {
                        window.open(getPolarCheckoutUrl(toolkit), '_blank');
                      }
                    }}
                    disabled={isDownloading}
                    className="p-2 rounded-lg bg-white border border-[#EBE4D8] hover:border-[#181614] text-[#181614] text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
                    title={isVerified ? "Download ZIP package" : "Purchase on Polar to unlock download"}
                  >
                    {isVerified ? (
                      <>
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="hidden sm:inline">Download</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#a8422b]" />
                        <span className="hidden sm:inline">Locked (Buy to Unlock)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowManifest(!showManifest)}
                    className="p-2 rounded-lg hover:bg-[#EBE4D8] text-[#756F66] transition-colors cursor-pointer"
                    title="Toggle file manifest"
                  >
                    {showManifest ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Formats Tags Strip */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono-code text-[#756F66]">Included formats:</span>
                {toolkit.zipFile.fileTypes.map((ft) => (
                  <span
                    key={ft}
                    className="px-2 py-0.5 rounded-md bg-white border border-[#EBE4D8] text-[10px] font-mono-code font-bold text-[#181614]"
                  >
                    {ft}
                  </span>
                ))}
                <span className="ml-auto text-[11px] font-mono-code text-[#a8422b] font-semibold">
                  {toolkit.zipFile.filesCount} total assets
                </span>
              </div>

              {/* Included Files Manifest List */}
              {showManifest && (
                <div className="space-y-2 pt-2 border-t border-[#EBE4D8]">
                  <div className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#756F66] flex justify-between">
                    <span>Archive Contents Breakdown</span>
                    <span>{toolkit.zipFile.manifest.length} Files</span>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {toolkit.zipFile.manifest.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-[#EBE4D8] flex items-start justify-between gap-3 text-xs hover:border-[#181614]/30 transition-colors"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          {renderFileIcon(file.name, file.type)}
                          <div className="space-y-0.5 min-w-0">
                            <div className="font-mono-code font-bold text-[#181614] truncate">
                              {file.name}
                            </div>
                            <div className="text-[#756F66] text-[11px] leading-relaxed line-clamp-2">
                              {file.description}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono-code text-[11px] text-[#756F66]">{file.size}</span>
                          <div className="text-[10px] font-mono-code text-[#a8422b] font-medium">{file.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Secure Payment & Delivery Guide Accordion */}
              <div className="pt-2 border-t border-[#EBE4D8]">
                <button
                  onClick={() => setShowIntegrationGuide(!showIntegrationGuide)}
                  className="flex items-center justify-between w-full text-left text-xs font-mono-code text-[#756F66] hover:text-[#181614] transition-colors cursor-pointer py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#a8422b]" />
                    <span className="font-bold text-[#181614]">How digital checkout & ZIP delivery work</span>
                  </span>
                  <span>{showIntegrationGuide ? 'Hide Guide' : 'Show Instructions'}</span>
                </button>

                {showIntegrationGuide && (
                  <div className="mt-3 p-4 rounded-2xl bg-white border border-[#EBE4D8] space-y-2.5 text-xs text-[#524c44] leading-relaxed">
                    <div className="font-bold font-mono-code text-[#181614]">
                      Payment & Digital ZIP Delivery Setup:
                    </div>
                    <ul className="list-disc pl-5 space-y-1.5 font-mono-code text-[11px]">
                      <li>
                        <strong>Polar.sh Checkout:</strong> All 28 digital toolkits are purchased securely through Polar.sh checkout links.
                      </li>
                      <li>
                        <strong>Gated Downloads:</strong> Direct ZIP file downloads are strictly gated. In order to download any package, customers must make a payment on Polar.
                      </li>
                      <li>
                        <strong>Verified Digital ZIP Delivery:</strong> All 28 digital toolkits are served as authentic physical `.zip` packages loaded straight from <code>/public/downloads/{toolkit.zipFile.fileName}</code>.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Documented Mechanisms / Focus Pillars */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#a8422b]">
                Core Documented Mechanisms & Interventions
              </h3>
              <div className="flex flex-wrap gap-2">
                {toolkit.highlightMechanisms.map((mech) => (
                  <span
                    key={mech}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#EBE4D8] text-xs font-mono-code font-bold text-[#181614]"
                  >
                    {mech}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Description & Methodology */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#a8422b]">
                Methodology & System Architecture
              </h3>
              <p className="text-base text-[#181614] leading-relaxed font-sans">{toolkit.description}</p>
            </div>

            {/* Table of Contents / Modules Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#a8422b]">
                Table of Contents & Execution Modules
              </h3>
              <div className="space-y-2">
                {toolkit.tableOfContents.map((module, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-[#EBE4D8] flex items-center justify-between text-xs sm:text-sm font-mono-code text-[#181614]"
                  >
                    <span className="font-semibold">{module}</span>
                    <span className="text-[#a0988c] text-xs">Section {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Excerpt Preview */}
            <div className="p-6 rounded-3xl bg-[#F5EFE6] border border-[#EBE4D8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#a8422b]">
                  Excerpt Preview · From Chapter One
                </span>
                <span className="text-[11px] font-mono-code text-[#756F66]">Unedited Draft</span>
              </div>
              <blockquote className="text-sm sm:text-base font-editorial italic text-[#181614] leading-relaxed border-l-2 border-[#a8422b] pl-4 py-1">
                "{toolkit.excerpt}"
              </blockquote>
            </div>

            {/* Licensing & Guarantee Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#EBE4D8] space-y-3 text-xs text-[#756F66]">
              <div className="flex items-center gap-2 font-mono-code font-bold text-[#181614] uppercase">
                <ShieldCheck className="w-4 h-4 text-[#a8422b]" />
                <span>Single-Seat Commercial Rights</span>
              </div>
              <p className="leading-relaxed">
                Purchasing this toolkit grants you perpetual, non-exclusive rights to read, print, and implement all
                materials for your personal and internal commercial workflows. Resale or unauthorized redistribution of
                the raw digital ZIP package is prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMPLEMENTARY TOOLKITS SECTION */}
        {/* ======================================================== */}
        {relatedToolkits.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#EBE4D8] space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs font-mono-code tracking-[0.2em] text-[#a8422b] uppercase">
                  COMPLEMENTARY TOOLKITS
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#181614] mt-1">
                  You might also need.
                </h2>
              </div>

              <button
                onClick={onBackToLibrary}
                className="text-xs font-mono-code font-bold text-[#181614] hover:text-[#a8422b] transition-colors cursor-pointer"
              >
                BROWSE ALL 28 →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedToolkits.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectProduct(item)}
                  className="p-4 rounded-2xl bg-white border border-[#EBE4D8] hover:border-[#181614] transition-all cursor-pointer group shadow-2xs hover:shadow-md"
                >
                  <div className="aspect-[3/4] mb-3 overflow-hidden rounded-xl">
                    <AestheticCover toolkit={item} size="grid" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono-code text-[#a8422b] font-bold">
                      {item.code} · ${item.price.toFixed(2)}
                    </div>
                    <h4 className="font-editorial font-bold text-base text-[#181614] group-hover:text-[#a8422b] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#756F66] line-clamp-1">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar when scrolled */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EBE4D8] py-3 px-4 shadow-lg animate-in slide-in-from-bottom duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-[#EBE4D8] text-[11px] font-mono-code font-bold text-[#181614] shrink-0">
                {toolkit.code}
              </span>
              <div className="min-w-0">
                <div className="font-editorial font-bold text-sm sm:text-base text-[#181614] truncate">
                  {toolkit.title}
                </div>
                <div className="text-xs font-mono-code text-[#756F66] flex items-center gap-2">
                  <span className="font-bold text-[#181614]">${toolkit.price.toFixed(2)} USD</span>
                  <span>·</span>
                  <span className="truncate">{toolkit.zipFile.fileName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {isVerified ? (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono-code text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm"
                >
                  <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
                  <span>Download ZIP</span>
                </button>
              ) : (
                <a
                  href={getPolarCheckoutUrl(toolkit)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181614] hover:bg-[#a8422b] text-white font-mono-code text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Buy with Polar · ${toolkit.price.toFixed(2)}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
