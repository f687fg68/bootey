import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenLibrary?: () => void;
  onOpenCategory?: (category: string) => void;
  onNavigate?: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onScrollTo, 
  onOpenLibrary, 
  onOpenCategory,
  onNavigate 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLibraryClick = () => {
    if (onOpenLibrary) {
      onOpenLibrary();
    } else {
      onScrollTo('toolkits-library');
    }
  };

  return (
    <footer className="bg-[#FAF7F2] text-[#181614] pt-16 pb-12 border-t border-[#EBE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Navigation Columns matching Screenshots 6 & 7 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-[#EBE4D8]">
          {/* Column 1: Library */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#181614]">
              Library
            </h4>
            <ul className="space-y-2.5 text-xs text-[#756F66]">
              <li>
                <button
                  onClick={handleLibraryClick}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  All 28 Digital Toolkits
                </button>
              </li>
              <li>
                <button
                  onClick={handleLibraryClick}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Health & Wellness
                </button>
              </li>
              <li>
                <button
                  onClick={handleLibraryClick}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Mental Health
                </button>
              </li>
              <li>
                <button
                  onClick={handleLibraryClick}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Finance & Business
                </button>
              </li>
              <li>
                <button
                  onClick={handleLibraryClick}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Career & Creator
                </button>
              </li>
              <li>
                <button
                  onClick={handleLibraryClick}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Family & Legal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('toolkits-library')}
                  className="hover:text-[#a8422b] font-medium transition-colors cursor-pointer text-left"
                >
                  View All 28 Toolkits →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#181614]">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#756F66]">
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('licensing') : onScrollTo('licensing-section')}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Licensing &amp; Usage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('ai-disclosure') : onScrollTo('licensing-section')}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  AI Disclosure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('format-guide') : onScrollTo('faq-section')}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Format Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('faqs') : onScrollTo('faq-section')}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('contact') : undefined}
                  className="hover:text-[#181614] transition-colors text-left cursor-pointer"
                >
                  Contact Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#181614]">
              Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-[#756F66]">
               <li>
                <button
                  onClick={() => onNavigate ? onNavigate('about') : onScrollTo('hero')}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  About bootey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('editorial') : onScrollTo('licensing-section')}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Editorial Principles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('terms-of-purchase') : undefined}
                  className="hover:text-[#181614] transition-colors cursor-pointer text-left"
                >
                  Terms of Purchase
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#181614]">
              Follow
            </h4>
            <ul className="space-y-2.5 text-xs text-[#756F66]">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>TikTok</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
              <li>
                <a
                  href="https://snapchat.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>Snapchat</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>Pinterest</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
              <li>
                <a
                  href="https://threads.net"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>Threads</span>
                  <ArrowUpRight className="w-3 h-3 text-[#a0988c]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Monumental Wordmark matching Screenshot 7 */}
        <div className="pt-12 pb-6 text-center select-none overflow-hidden">
          <div className="text-[15vw] font-editorial font-bold tracking-tighter text-[#EBE4D8] leading-none select-none">
            bootey®
          </div>
        </div>

        {/* Bottom Bar matching Screenshot 7 */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#756F66] border-t border-[#EBE4D8]/60">
          <div>
            © 2026 bootey — AI-assisted digital toolkits, one-time purchases.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate ? onNavigate('terms-and-disclaimer') : undefined}
              className="hover:text-[#181614] transition-colors cursor-pointer text-left"
            >
              Terms · Disclaimer
            </button>

            <button
              onClick={scrollToTop}
              className="text-[#181614] hover:text-[#a8422b] transition-colors cursor-pointer font-medium"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
