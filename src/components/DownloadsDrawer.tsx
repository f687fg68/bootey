import React from 'react';
import { X, Download, Trash2, CheckCircle2, FileText, Monitor, Apple, ArrowRight, ShieldCheck } from 'lucide-react';
import { DownloadItem } from '../types';

interface DownloadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: DownloadItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onCheckoutOrDownloadAll: () => void;
}

export const DownloadsDrawer: React.FC<DownloadsDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onCheckoutOrDownloadAll,
}) => {
  if (!isOpen) return null;

  // Real download trigger: creates a file blob so clicking it actually downloads a file!
  const triggerActualFileDownload = (item: DownloadItem) => {
    let content = '';
    let filename = '';

    if (item.type === 'desktop_macos') {
      content = `# bootey Desktop v2.4.0 for macOS (Universal Build)
SHA-256: 7f4c919d53c8965f7c32bfda408f6579a32c253be88b48879b76c8c93de8572b

INSTALLATION STEPS:
1. Double-click the .dmg to mount.
2. Drag bootey.app into /Applications.
3. Open Spotlight and search for 'bootey'.
Enjoy offline search and your bootey native desktop workspace!`;
      filename = 'bootey-desktop-v2.4.0-macOS.dmg.txt';
    } else if (item.type === 'desktop_windows') {
      content = `# bootey Desktop v2.4.0 for Windows (64-bit Installer)
SHA-256: a1e8432bc9d03194a8f936bb48312e72089ca4e17efcb4892c908713d2f98e54

INSTALLATION STEPS:
1. Double-click the installer executable.
2. If Windows SmartScreen shows, click 'More info' -> 'Run anyway'.
3. Complete the 2-step setup wizard.
Pin to Taskbar for sub-0.4s launch speed!`;
      filename = 'bootey-desktop-v2.4.0-windows-x64.exe.txt';
    } else {
      content = `# ${item.name}
Code: ${item.code || 'BT-CODEX'}
Formats Included: US Letter PDF, Obsidian Markdown (.md), Notion Database Link.

SUMMARY:
Thank you for unlocking this exclusive digital toolkit from bootey.
Your personal lifetime license has been recorded in Batch 04.
All updates and addendums will be delivered free of charge.`;
      filename = `${(item.code || 'bootey-toolkit').toLowerCase()}-manual.txt`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalAmount = items.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#EBE4D8] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#EBE4D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#b4532a]" />
            <h3 className="font-editorial text-xl font-bold text-[#181614]">
              Your Downloads & Vault
            </h3>
            <span className="text-xs font-mono-code bg-[#FAF7F2] border border-[#d8cebe] px-2 py-0.5 rounded-full font-bold">
              {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] flex items-center justify-center text-[#756F66] hover:text-[#181614] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EBE4D8] text-[#756F66] flex items-center justify-center mx-auto">
                <Download className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-lg text-[#181614]">Your queue is empty</h4>
              <p className="text-xs text-[#756F66] max-w-xs mx-auto">
                Choose any of the 28 digital toolkits or grab the bootey Desktop App for macOS and Windows.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-[11px] font-mono-code text-[#756F66]">
                <span>ITEMS READY TO DOWNLOAD</span>
                <button
                  onClick={onClearAll}
                  className="text-rose-600 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-[#EBE4D8] shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#EBE4D8] flex items-center justify-center shrink-0 text-[#b4532a] mt-0.5">
                        {item.type === 'desktop_macos' ? (
                          <Apple className="w-4 h-4" />
                        ) : item.type === 'desktop_windows' ? (
                          <Monitor className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#181614]">{item.name}</div>
                        <div className="text-[10px] font-mono-code text-[#756F66]">
                          {item.fileSize} · {item.type.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#aaa] hover:text-rose-600 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Progress / Status */}
                  <div className="pt-2 border-t border-[#EBE4D8]/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-mono-code text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready for instant download</span>
                    </div>

                    <button
                      onClick={() => triggerActualFileDownload(item)}
                      className="px-3 py-1 bg-[#FAF7F2] hover:bg-[#181614] hover:text-white rounded-md border border-[#d8cebe] text-[11px] font-mono-code font-semibold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Save File</span>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#EBE4D8] space-y-4">
            <div className="flex items-center justify-between text-sm font-mono-code">
              <span className="text-[#756F66]">Total Value:</span>
              <span className="font-bold text-lg text-[#181614]">${totalAmount}</span>
            </div>

            <button
              onClick={() => {
                items.forEach((it) => triggerActualFileDownload(it));
                onCheckoutOrDownloadAll();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#181614] hover:bg-[#b4532a] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download All Queued Files</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono-code text-[#756F66]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cryptographically verified binaries · No tracking</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
