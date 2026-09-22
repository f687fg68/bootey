import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, Download, ExternalLink, Lock, ShoppingBag, FileArchive, ShieldCheck } from 'lucide-react';
import { Toolkit } from '../types';
import { downloadToolkitZip } from '../utils/zipDownloader';
import { getPolarCheckoutUrl } from '../utils/orderVerification';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Toolkit[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  unlockedProductIds: string[];
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  unlockedProductIds,
}) => {
  const [downloadedItems, setDownloadedItems] = useState<string[]>([]);
  const [activeDownloadingId, setActiveDownloadingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const total = items.reduce((acc, curr) => acc + curr.price, 0);
  const allVerified = items.length > 0 && items.every((item) => unlockedProductIds.includes(item.id));

  // Trigger verified digital file download
  const handleDownload = async (toolkit: Toolkit) => {
    setActiveDownloadingId(toolkit.id);
    try {
      await downloadToolkitZip(toolkit);
      setDownloadedItems((prev) => [...new Set([...prev, toolkit.id])]);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setActiveDownloadingId(null);
    }
  };

  const handleDownloadAllVerified = async () => {
    for (const item of items) {
      if (unlockedProductIds.includes(item.id)) {
        await handleDownload(item);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 w-full sm:max-w-md flex pl-0 sm:pl-10">
        <div className="w-full bg-[#FAF7F2] border-l border-[#EBE4D8] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#EBE4D8] bg-[#F5EFE6] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#a8422b]" />
              <h2 className="text-base sm:text-lg font-editorial font-bold text-[#181614] tracking-tight">
                Your Bag ({items.length})
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-[#EBE4D8] text-[#756F66] hover:text-[#181614] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              /* Empty Bag State */
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EBE4D8] text-[#756F66] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#181614]">Your bag is empty</p>
                  <p className="text-xs text-[#756F66] max-w-xs mx-auto">
                    Explore our 28 curated digital protocols and select your toolkits.
                  </p>
                </div>
              </div>
            ) : (
              /* Active Cart Items */
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-code text-[#756F66]">
                  <span>SELECTED ITEMS ({items.length})</span>
                  <button
                    onClick={onClearCart}
                    className="hover:text-red-700 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => {
                  const isVerified = unlockedProductIds.includes(item.id);
                  const isDownloaded = downloadedItems.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-[#EBE4D8] space-y-3 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono-code font-bold text-[#a8422b]">
                              {item.code}
                            </span>
                            <span className="text-[10px] font-mono-code text-[#756F66] truncate">
                              · {item.categoryLabel}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-[#181614] line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-[#756F66] flex items-center gap-1">
                            <FileArchive className="w-3 h-3 text-[#a8422b]" />
                            <span className="truncate">{item.zipFile.fileName}</span>
                            <span>({item.zipFile.fileSize})</span>
                          </p>
                        </div>

                        <div className="flex flex-col items-end justify-between space-y-2 shrink-0">
                          <span className="text-sm font-editorial font-bold text-[#181614]">
                            ${item.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 rounded text-[#a0988c] hover:text-red-600 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Item Action Buttons based on Polar Verification Status */}
                      <div className="pt-2 border-t border-[#FAF7F2] space-y-2">
                        {isVerified ? (
                          <div className="space-y-1.5">
                            <div className="text-[11px] font-mono-code text-emerald-700 flex items-center gap-1 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Polar Purchase Verified</span>
                            </div>
                            <button
                              onClick={() => handleDownload(item)}
                              disabled={activeDownloadingId === item.id}
                              className={`w-full py-2 px-3 rounded-full text-[11px] font-mono-code font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                isDownloaded
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              }`}
                            >
                              <Download className={`w-3 h-3 ${activeDownloadingId === item.id ? 'animate-bounce' : ''}`} />
                              <span>
                                {activeDownloadingId === item.id
                                  ? 'Downloading...'
                                  : isDownloaded
                                  ? 'Re-download ZIP'
                                  : 'Download ZIP Archive'}
                              </span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <a
                              href={getPolarCheckoutUrl(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 rounded-full bg-[#181614] hover:bg-[#a8422b] text-white text-[11px] font-mono-code font-bold tracking-wider uppercase transition-colors text-center flex items-center justify-center gap-1.5"
                            >
                              <ExternalLink className="w-3 h-3 text-emerald-400" />
                              <span>Checkout · ${item.price.toFixed(2)}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] border-t border-[#EBE4D8] bg-[#F5EFE6] space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#756F66]">
                  <span>Total Items</span>
                  <span className="font-mono-code">{items.length} toolkits</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#756F66]">
                  <span>Fulfillment</span>
                  <span className="text-emerald-700 font-semibold font-mono-code">
                    Instant .ZIP on Confirmed Payment
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#EBE4D8] text-base font-editorial font-bold text-[#181614]">
                  <span>Total</span>
                  <span className="font-mono-code">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {allVerified ? (
                <button
                  onClick={handleDownloadAllVerified}
                  className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono-code font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download All Verified Toolkits</span>
                </button>
              ) : items.length === 1 ? (
                <div className="space-y-2">
                  <a
                    href={getPolarCheckoutUrl(items[0])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-full bg-[#181614] hover:bg-[#a8422b] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md text-center"
                  >
                    <ExternalLink className="w-4 h-4 text-emerald-400" />
                    <span>Pay with Polar · ${total.toFixed(2)}</span>
                  </a>
                  <p className="text-[11px] font-mono-code text-[#756F66] text-center">
                    Payment unlocks instant .ZIP download
                  </p>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <p className="text-[11px] font-mono-code text-[#756F66]">
                    Click individual <strong>Checkout</strong> buttons above to complete each purchase on Polar.
                  </p>
                </div>
              )}

              {/* Friendly Refund & Support Notice */}
              <div className="pt-2 border-t border-[#EBE4D8]/80 text-[10px] font-mono-code text-[#756F66] leading-relaxed text-center">
                Instant digital fulfillment · As digital items are delivered immediately, sales are final with no refunds. Need help? We're happy to assist at <a href="mailto:o88gfdde@gmail.com" className="underline text-[#181614] hover:text-[#a8422b]">o88gfdde@gmail.com</a>.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
