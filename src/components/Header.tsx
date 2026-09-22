import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  currentView: any;
  onNavigate: (view: any) => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  activeSection = 'hero',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (view: any) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const isLibraryActive = currentView === 'library' || activeSection === 'toolkits-library';
  const isHomeActive = currentView === 'home' && activeSection === 'hero';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1 group text-left cursor-pointer active:scale-95 transition-transform"
            id="brand-logo-btn"
          >
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-[#181614] group-hover:text-[#a8422b] transition-colors">
              bootey<sup className="text-sm font-normal">®</sup>
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden sm:flex items-center gap-8 text-sm text-[#181614]">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors cursor-pointer pb-0.5 ${
                isHomeActive
                  ? 'font-medium border-b border-[#181614] text-[#181614]'
                  : 'text-[#756F66] hover:text-[#181614]'
              }`}
              id="nav-home-btn"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('library')}
              className={`transition-colors cursor-pointer pb-0.5 ${
                isLibraryActive
                  ? 'font-medium border-b border-[#181614] text-[#181614]'
                  : 'text-[#756F66] hover:text-[#181614]'
              }`}
              id="nav-library-btn"
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('licensing')}
              className={`transition-colors cursor-pointer pb-0.5 ${
                currentView === 'home' && activeSection === 'licensing-section'
                  ? 'font-medium border-b border-[#181614] text-[#181614]'
                  : 'text-[#756F66] hover:text-[#181614]'
              }`}
              id="nav-licensing-btn"
            >
              Licensing
            </button>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2.5 rounded-xl text-[#181614] hover:bg-[#EBE4D8]/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#a8422b]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#EBE4D8] bg-[#FAF7F2] px-4 py-5 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
              isHomeActive ? 'bg-[#EBE4D8] text-[#181614]' : 'text-[#181614] hover:bg-[#F5EFE6]'
            }`}
          >
            <span>Home</span>
            <span className="text-xs font-mono-code text-[#756F66]">→</span>
          </button>
          <button
            onClick={() => handleNavClick('library')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
              isLibraryActive ? 'bg-[#a8422b] text-white' : 'text-[#a8422b] hover:bg-[#a8422b]/10'
            }`}
          >
            <span>Shop (All 28 Toolkits)</span>
            <span className="text-xs font-mono-code font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20">
              28
            </span>
          </button>
          <button
            onClick={() => handleNavClick('licensing')}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-[#181614] hover:bg-[#F5EFE6] transition-colors flex items-center justify-between"
          >
            <span>Licensing & Usage</span>
            <span className="text-xs font-mono-code text-[#756F66]">→</span>
          </button>
          <button
            onClick={() => handleNavClick('faqs')}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-[#181614] hover:bg-[#F5EFE6] transition-colors flex items-center justify-between"
          >
            <span>FAQs & Support</span>
            <span className="text-xs font-mono-code text-[#756F66]">→</span>
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-[#181614] hover:bg-[#F5EFE6] transition-colors flex items-center justify-between"
          >
            <span>About bootey®</span>
            <span className="text-xs font-mono-code text-[#756F66]">→</span>
          </button>
        </div>
      )}
    </header>
  );
};
