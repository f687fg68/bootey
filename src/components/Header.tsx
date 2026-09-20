import React from 'react';

interface HeaderProps {
  downloadsCount?: number;
  onOpenDownloads?: () => void;
  onScrollTo: (id: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollTo,
  activeSection,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EBE4D8] transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onScrollTo('hero')}
            className="flex items-center gap-1 group text-left cursor-pointer"
            id="brand-logo-btn"
          >
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-[#181614] group-hover:text-[#b4532a] transition-colors">
              bootey<sup className="text-sm font-normal">®</sup>
            </span>
          </button>
        </div>

        {/* Center / Right Navigation Links */}
        <nav className="flex items-center gap-8 text-sm text-[#181614]">
          <button
            onClick={() => onScrollTo('hero')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeSection === 'hero'
                ? 'font-medium border-b border-[#181614] text-[#181614]'
                : 'text-[#756F66] hover:text-[#181614]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onScrollTo('download-section')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeSection === 'shop' || activeSection === 'download-section'
                ? 'font-medium border-b border-[#181614] text-[#181614]'
                : 'text-[#756F66] hover:text-[#181614]'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => onScrollTo('licensing-section')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeSection === 'licensing-section'
                ? 'font-medium border-b border-[#181614] text-[#181614]'
                : 'text-[#756F66] hover:text-[#181614]'
            }`}
          >
            Licensing
          </button>
          <button
            onClick={() => onScrollTo('faq-section')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeSection === 'faq-section'
                ? 'font-medium border-b border-[#181614] text-[#181614]'
                : 'text-[#756F66] hover:text-[#181614]'
            }`}
          >
            Support
          </button>
        </nav>
      </div>
    </header>
  );
};
