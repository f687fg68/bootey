import React, { useState } from 'react';
import {
  Apple,
  Monitor,
  Download,
  CheckCircle2,
  Copy,
  Check,
  HelpCircle,
  ShieldCheck,
  HardDrive,
  Cpu,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  FileCode,
} from 'lucide-react';
import { DownloadItem } from '../types';

interface DownloadSectionProps {
  onTriggerDownload: (platform: 'macos' | 'windows') => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onTriggerDownload }) => {
  const [activeOsTab, setActiveOsTab] = useState<'macos' | 'windows'>('macos');
  const [copiedChecksum, setCopiedChecksum] = useState<string | null>(null);

  const macChecksum = 'sha256:7f4c919d53c8965f7c32bfda408f6579a32c253be88b48879b76c8c93de8572b';
  const winChecksum = 'sha256:a1e8432bc9d03194a8f936bb48312e72089ca4e17efcb4892c908713d2f98e54';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChecksum(key);
    setTimeout(() => setCopiedChecksum(null), 2500);
  };

  return (
    <section id="download-section" className="py-20 sm:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE4D8] text-[#181614] text-xs font-mono-code font-semibold tracking-wider uppercase">
            <Monitor className="w-3.5 h-3.5 text-[#b4532a]" />
            NATIVE CLIENT · ZERO DEPENDENCIES
          </div>

          <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-[#181614] leading-tight">
            Download bootey Desktop.
            <br />
            <span className="italic text-[#b4532a]">Lightweight, offline, permanent.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#756F66] max-w-2xl mx-auto">
            Choose your operating system below to download the latest stable release of bootey (v2.4.0). Includes 100% offline access to all your digital toolkits.
          </p>
        </div>

        {/* Dual Platform Download Cards (macOS .dmg and Windows .exe) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* macOS Download Card */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#EBE4D8] shadow-[0_12px_40px_rgba(24,22,20,0.06)] flex flex-col justify-between hover:border-[#b4532a]/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#EBE4D8] flex items-center justify-center text-[#181614]">
                  <Apple className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono-code bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    v2.4.0 Latest
                  </span>
                  <div className="text-[11px] font-mono-code text-[#756F66] mt-0.5">86.4 MB · Universal</div>
                </div>
              </div>

              <h3 className="text-2xl font-editorial font-bold text-[#181614] mb-2">
                bootey for macOS
              </h3>
              <p className="text-xs text-[#756F66] leading-relaxed mb-6">
                Native universal binary optimized for both Apple Silicon (M1, M2, M3, M4) and Intel Core 64-bit processors. Runs natively on macOS Monterey, Ventura, Sonoma, and Sequoia.
              </p>

              {/* Specs pill tags */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code mb-6 text-[#756F66]">
                <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EBE4D8]">
                  <span className="text-[#888] block text-[10px]">ARCHITECTURE</span>
                  <span className="text-[#181614] font-semibold">arm64 & x86_64</span>
                </div>
                <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EBE4D8]">
                  <span className="text-[#888] block text-[10px]">REQUIREMENT</span>
                  <span className="text-[#181614] font-semibold">macOS 12.0+</span>
                </div>
              </div>
            </div>

            <div>
              {/* The .dmg Download Button */}
              <button
                onClick={() => onTriggerDownload('macos')}
                className="w-full py-3.5 px-6 rounded-full bg-[#181614] text-[#FAF7F2] hover:bg-[#b4532a] font-medium text-sm flex items-center justify-center gap-2.5 transition-colors shadow-md group cursor-pointer"
                id="download-macos-dmg-btn"
              >
                <Download className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
                <span>Download .dmg (macOS)</span>
                <span className="text-[10px] font-mono-code bg-white/20 px-2 py-0.5 rounded text-white">
                  v2.4.0
                </span>
              </button>

              {/* SHA-256 Checksum */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono-code text-[#756F66] bg-[#FAF7F2] p-2 rounded-lg border border-[#EBE4D8]">
                <span className="truncate max-w-[240px]">SHA-256: 7f4c919d...3de8572b</span>
                <button
                  onClick={() => copyToClipboard(macChecksum, 'mac')}
                  className="flex items-center gap-1 text-[#b4532a] hover:underline font-semibold ml-2 shrink-0 cursor-pointer"
                >
                  {copiedChecksum === 'mac' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Hash</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Windows Download Card */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#EBE4D8] shadow-[0_12px_40px_rgba(24,22,20,0.06)] flex flex-col justify-between hover:border-[#b4532a]/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#EBE4D8] flex items-center justify-center text-[#181614]">
                  <Monitor className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono-code bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    v2.4.0 Latest
                  </span>
                  <div className="text-[11px] font-mono-code text-[#756F66] mt-0.5">74.2 MB · Standalone</div>
                </div>
              </div>

              <h3 className="text-2xl font-editorial font-bold text-[#181614] mb-2">
                bootey for Windows
              </h3>
              <p className="text-xs text-[#756F66] leading-relaxed mb-6">
                Official Windows 64-bit setup executable. Full hardware-accelerated rendering with WebView2 runtime integration. Tested on Windows 10, Windows 11, and Windows Server.
              </p>

              {/* Specs pill tags */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code mb-6 text-[#756F66]">
                <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EBE4D8]">
                  <span className="text-[#888] block text-[10px]">ARCHITECTURE</span>
                  <span className="text-[#181614] font-semibold">x64 / ARM64</span>
                </div>
                <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EBE4D8]">
                  <span className="text-[#888] block text-[10px]">REQUIREMENT</span>
                  <span className="text-[#181614] font-semibold">Windows 10 / 11</span>
                </div>
              </div>
            </div>

            <div>
              {/* The .exe Download Button */}
              <button
                onClick={() => onTriggerDownload('windows')}
                className="w-full py-3.5 px-6 rounded-full bg-[#181614] text-[#FAF7F2] hover:bg-[#b4532a] font-medium text-sm flex items-center justify-center gap-2.5 transition-colors shadow-md group cursor-pointer"
                id="download-windows-exe-btn"
              >
                <Download className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
                <span>Download .exe (Windows)</span>
                <span className="text-[10px] font-mono-code bg-white/20 px-2 py-0.5 rounded text-white">
                  v2.4.0
                </span>
              </button>

              {/* SHA-256 Checksum */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono-code text-[#756F66] bg-[#FAF7F2] p-2 rounded-lg border border-[#EBE4D8]">
                <span className="truncate max-w-[240px]">SHA-256: a1e8432b...d2f98e54</span>
                <button
                  onClick={() => copyToClipboard(winChecksum, 'win')}
                  className="flex items-center gap-1 text-[#b4532a] hover:underline font-semibold ml-2 shrink-0 cursor-pointer"
                >
                  {copiedChecksum === 'win' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Hash</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Installation Instructions (Mandated in user request) */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-7 sm:p-10 border border-[#EBE4D8] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EBE4D8]">
            <div>
              <div className="text-[11px] font-mono-code text-[#b4532a] font-semibold uppercase tracking-wider">
                STEP-BY-STEP SETUP GUIDE
              </div>
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#181614] mt-1">
                Clear Installation Instructions
              </h3>
            </div>

            {/* Operating System Switcher */}
            <div className="flex items-center p-1 rounded-full bg-[#FAF7F2] border border-[#d8cebe] text-xs font-mono-code">
              <button
                onClick={() => setActiveOsTab('macos')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeOsTab === 'macos'
                    ? 'bg-[#181614] text-white font-semibold shadow-xs'
                    : 'text-[#756F66] hover:text-[#181614]'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>macOS (.dmg)</span>
              </button>
              <button
                onClick={() => setActiveOsTab('windows')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeOsTab === 'windows'
                    ? 'bg-[#181614] text-white font-semibold shadow-xs'
                    : 'text-[#756F66] hover:text-[#181614]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Windows (.exe)</span>
              </button>
            </div>
          </div>

          {/* Steps for macOS */}
          {activeOsTab === 'macos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] text-[#b4532a] font-mono-code font-bold text-sm flex items-center justify-center">
                  1
                </div>
                <h4 className="font-semibold text-sm text-[#181614]">Mount the .dmg</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  Locate the downloaded <code className="bg-[#FAF7F2] px-1 rounded text-[#181614] font-mono-code">bootey-desktop-v2.4.0.dmg</code> in your Downloads folder and double-click to mount.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] text-[#b4532a] font-mono-code font-bold text-sm flex items-center justify-center">
                  2
                </div>
                <h4 className="font-semibold text-sm text-[#181614]">Drag to Applications</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  Drag the <strong className="text-[#181614]">bootey.app</strong> icon into the Applications folder shortcut presented in the disk window.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] text-[#b4532a] font-mono-code font-bold text-sm flex items-center justify-center">
                  3
                </div>
                <h4 className="font-semibold text-sm text-[#181614]">Approve Gatekeeper</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  If prompted with "Downloaded from internet", click <strong className="text-[#181614]">Open</strong>. Or in <em>System Settings → Privacy & Security</em>, click "Open Anyway".
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] text-[#b4532a] font-mono-code font-bold text-sm flex items-center justify-center">
                  4
                </div>
                <h4 className="font-semibold text-sm text-[#181614]">Instant Offline Access</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  Launch via Spotlight (<kbd className="bg-[#FAF7F2] px-1 py-0.5 rounded text-[10px] font-mono-code border border-[#EBE4D8]">⌘Space</kbd>). All your 28 digital toolkits are immediately readable offline.
                </p>
              </div>
            </div>
          )}

          {/* Steps for Windows */}
          {activeOsTab === 'windows' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] text-[#b4532a] font-mono-code font-bold text-sm flex items-center justify-center">
                  1
                </div>
                <h4 className="font-semibold text-sm text-[#181614]">Launch Installer</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  Double-click the downloaded <code className="bg-[#FAF7F2] px-1 rounded text-[#181614] font-mono-code">bootey-desktop-v2.4.0.exe</code> file to initialize setup.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] text-[#b4532a] font-mono-code font-bold text-sm flex items-center justify-center">
                  2
                </div>
                <h4 className="font-semibold text-sm text-[#181614]">SmartScreen Notice</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  If Windows Defender SmartScreen shows a blue banner, simply click <strong className="text-[#181614]">"More info"</strong> and then click <strong className="text-[#181614]">"Run anyway"</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] text-[#b4532a] font-mono-code font-bold text-sm flex items-center justify-center">
                  3
                </div>
                <h4 className="font-semibold text-sm text-[#181614]">Select Install Path</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  Follow the clean 2-step setup wizard. Standard destination is <code className="text-[10px] bg-[#FAF7F2] px-1 rounded font-mono-code">AppData/Local/Programs/bootey</code>.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EBE4D8] text-[#b4532a] font-mono-code font-bold text-sm flex items-center justify-center">
                  4
                </div>
                <h4 className="font-semibold text-sm text-[#181614]">Pin & Execute</h4>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  Pin to your Windows Taskbar. bootey starts in under 0.4 seconds with zero background telemetry or recurring account prompts.
                </p>
              </div>
            </div>
          )}

          {/* Reassurance Footer */}
          <div className="mt-8 pt-6 border-t border-[#EBE4D8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#756F66]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Signed & Notarized · Zero adware, zero bloat, 100% open sandbox standards</span>
            </div>
            <div className="flex items-center gap-3 font-mono-code">
              <span>Looking for CLI or Linux AppImage?</span>
              <button
                onClick={() => onTriggerDownload('macos')}
                className="text-[#b4532a] underline hover:text-[#181614] font-semibold cursor-pointer"
              >
                View Build Matrix →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
