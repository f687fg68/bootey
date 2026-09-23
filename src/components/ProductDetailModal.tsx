import React from 'react';
import { X, Check, FileText, ArrowRight, ShieldCheck, Download, ExternalLink, FileArchive, Lock, Info } from 'lucide-react';
import { Toolkit } from '../types';
import { AestheticCover } from './AestheticCover';
import { downloadToolkitZip } from '../utils/zipDownloader';
import { getPolarCheckoutUrl } from '../utils/orderVerification';

interface ProductDetailModalProps {
  toolkit: Toolkit | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (toolkit: Toolkit) => void;
  onViewFullPage: (toolkit: Toolkit) => void;
  isInCart: boolean;
  unlockedProductIds: string[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  toolkit,
  isOpen,
  onClose,
  onAddToCart,
  onViewFullPage,
  isInCart,
  unlockedProductIds,
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);

  if (!isOpen || !toolkit) return null;

  const handleDownload = async () => {
    if (!unlockedProductIds.includes(toolkit.id)) {
      onViewFullPage(toolkit);
      return;
    }
    setIsDownloading(true);
    try {
      await downloadToolkitZip(toolkit);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl border border-[#EBE4D8] shadow-2xl overflow-hidden my-0 sm:my-8 max-h-[90vh] sm:max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#EBE4D8] bg-[#F5EFE6] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[10px] sm:text-xs font-mono-code font-bold tracking-widest text-[#a8422b] uppercase truncate max-w-[140px] xs:max-w-none">
              {toolkit.categoryLabel}
            </span>
            <span className="text-[#a0988c]">·</span>
            <span className="text-[10px] sm:text-xs font-mono-code font-bold text-[#181614]">
              {toolkit.code}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onViewFullPage(toolkit)}
              className="flex items-center gap-1.5 text-xs font-mono-code text-[#181614] hover:text-[#a8422b] font-bold px-2.5 py-1.5 rounded-full hover:bg-white/50 transition-colors cursor-pointer min-h-[40px]"
            >
              <span className="hidden xs:inline">Full Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-[#EBE4D8] text-[#756F66] hover:text-[#181614] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2 Columns on desktop */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Aesthetic Cover */}
            <div className="md:col-span-5 space-y-3">
              <div
                className="cursor-pointer group relative overflow-hidden rounded-2xl"
                onClick={() => onViewFullPage(toolkit)}
                title="Click to view full product page"
              >
                <AestheticCover toolkit={toolkit} size="large" />
                <div className="absolute inset-0 z-30 bg-black/55 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 pointer-events-none">
                  <span className="px-4 py-2.5 rounded-full bg-white text-[#181614] font-mono-code text-xs font-bold shadow-2xl tracking-wider text-center whitespace-nowrap transform scale-95 group-hover:scale-100 transition-all duration-200">
                    VIEW PRODUCT PAGE →
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono-code text-[#756F66] px-1">
                <span>{toolkit.zipFile.fileSize} ZIP</span>
                <span>{toolkit.pages} pages</span>
                <span>{toolkit.formats[0]}</span>
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="md:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#181614] leading-tight">
                  {toolkit.title}
                </h2>
                <p className="text-sm text-[#756F66] leading-relaxed">
                  {toolkit.subtitle}
                </p>
              </div>

              {/* Price & Guarantee */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-white border border-[#EBE4D8]">
                <span className="text-3xl font-editorial font-bold text-[#181614]">
                  ${toolkit.price.toFixed(2)}
                </span>
                {toolkit.regularPrice > toolkit.price && (
                  <span className="text-sm font-mono-code text-[#a0988c] line-through">
                    ${toolkit.regularPrice.toFixed(2)}
                  </span>
                )}
                <span className="ml-auto text-xs font-mono-code text-emerald-700 font-bold">
                  Single-Seat License
                </span>
              </div>

              {/* Description */}
              <div className="space-y-1.5 text-xs text-[#524c44] leading-relaxed">
                <div className="font-mono-code font-bold uppercase tracking-wider text-[#a8422b]">
                  Overview
                </div>
                <p>{toolkit.description}</p>
              </div>

              {/* Mechanisms */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#756F66]">
                  Key Interventions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {toolkit.highlightMechanisms.map((mech) => (
                    <span
                      key={mech}
                      className="px-2 py-0.5 rounded bg-white border border-[#EBE4D8] text-[10px] font-mono-code font-semibold text-[#181614]"
                    >
                      {mech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 space-y-2.5">
                {unlockedProductIds.includes(toolkit.id) ? (
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono-code font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md"
                  >
                    <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
                    <span>{isDownloading ? 'Downloading ZIP Archive...' : `Download ZIP Archive (${toolkit.zipFile.fileSize})`}</span>
                  </button>
                ) : (
                  <>
                    <a
                      href={getPolarCheckoutUrl(toolkit)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#181614] hover:bg-[#a8422b] text-white text-xs font-mono-code font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md text-center"
                    >
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span>Buy via Polar Checkout · ${toolkit.price.toFixed(2)}</span>
                    </a>

                    <div className="flex items-center justify-center gap-1.5 py-1 text-[11px] font-mono-code text-[#756F66]">
                      <Lock className="w-3.5 h-3.5 text-[#a8422b]" />
                      <span>ZIP download unlocks immediately upon payment</span>
                    </div>

                    <div className="text-center text-[10px] font-mono-code text-[#8c857b] pt-1">
                      Instant delivery · Due to the digital nature, sales are final · Support: t45trdds@gmail.com
                    </div>
                  </>
                )}

                {/* Friendly Professional Advice Disclaimer Box */}
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EBE4D8] flex items-start gap-2.5 text-[11px] leading-relaxed text-[#524c44] mt-3">
                  <Info className="w-3.5 h-3.5 text-[#a8422b] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold font-mono-code text-[#181614] block text-[10px] uppercase tracking-wider mb-0.5">
                      Friendly Note on Professional Guidance
                    </span>
                    <span className="text-[#686259]">
                      This toolkit is a self-guided educational resource and organizational framework. It does not replace or constitute licensed medical, psychiatric, legal, financial, or tax counsel. For specific diagnostic or specialized guidance, we always recommend consulting a qualified practitioner.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 border-t border-[#EBE4D8] bg-[#F5EFE6] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs font-mono-code text-[#756F66] hover:text-[#181614] uppercase tracking-wider cursor-pointer"
          >
            ← Close
          </button>

          <button
            onClick={() => onViewFullPage(toolkit)}
            className="flex items-center gap-2 text-xs font-mono-code font-bold text-[#181614] hover:text-[#a8422b] cursor-pointer"
          >
            <span>Go to Dedicated Product Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
