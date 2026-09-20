import React, { useState } from 'react';
import { ArrowUpRight, Check, Monitor, Apple, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onDownloadOs: (platform: 'macos' | 'windows') => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onDownloadOs }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#181614] text-[#FAF7F2] pt-20 pb-12 border-t border-[#292622] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter / Stay in the Loop Section */}
        <div className="bg-[#211e1a] rounded-3xl p-8 sm:p-12 border border-[#33302c] mb-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white">
                Stay in the loop.
              </h3>
              <p className="text-xs sm:text-sm text-[#a0988c] max-w-xl leading-relaxed">
                Receive new release builds, performance notes, and desktop app updates directly to your inbox. No marketing spam, ever.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3.5 bg-emerald-950/60 border border-emerald-700/50 rounded-full text-emerald-300 text-xs font-mono-code">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>You are on the dispatch list. Welcome aboard.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#181614] border border-[#3d3832] rounded-full text-xs text-white placeholder-[#756F66] focus:outline-none focus:border-[#b4532a] font-mono-code"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#FAF7F2] hover:bg-[#b4532a] text-[#181614] hover:text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-[#292622]">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold font-sans tracking-tight text-white">
                bootey<sup className="text-base font-normal">®</sup>
              </span>
            </div>
            <p className="text-xs text-[#a0988c] leading-relaxed max-w-sm">
              The ultimate native desktop app for power users. Ultra-fast, offline-first, no accounts, no subscriptions.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono-code text-[#756F66]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Native Engine v2.4.0 Active</span>
            </div>
          </div>

          {/* Features Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#d8cebe]">
              Features
            </h4>
            <ul className="space-y-2 text-xs text-[#a0988c]">
              <li>
                <button
                  onClick={() => onScrollTo('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Native Desktop Interface
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sub-2ms Local Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('download-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  100% Offline Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('download-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Local Encrypted Storage
                </button>
              </li>
            </ul>
          </div>

          {/* Desktop App Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#d8cebe]">
              Desktop App
            </h4>
            <ul className="space-y-2 text-xs text-[#a0988c]">
              <li>
                <button
                  onClick={() => onDownloadOs('macos')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Apple className="w-3.5 h-3.5 text-[#b4532a]" />
                  <span>Download .dmg (macOS)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onDownloadOs('windows')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Monitor className="w-3.5 h-3.5 text-[#b4532a]" />
                  <span>Download .exe (Windows)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('download-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Installation Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('download-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SHA-256 Checksums
                </button>
              </li>
            </ul>
          </div>

          {/* Licensing & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#d8cebe]">
              Licensing
            </h4>
            <ul className="space-y-2 text-xs text-[#a0988c]">
              <li>
                <button
                  onClick={() => onScrollTo('licensing-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Personal Lifetime License
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('licensing-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Commercial & Professional Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('faq-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  30-Day Money-Back Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('faq-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Links */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#756F66]">
          <div>
            © 2026 bootey. Purchase once, use forever. No subscriptions.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security Hashes</span>
          </div>
        </div>

        {/* Monumental Wordmark */}
        <div className="pt-6 pb-2 text-center select-none overflow-hidden">
          <div className="text-[14vw] font-black tracking-tighter text-[#211e1a] hover:text-[#27231f] transition-colors leading-none font-sans">
            bootey®
          </div>
        </div>
      </div>
    </footer>
  );
};
