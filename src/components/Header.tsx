import React from 'react';
import { ShoppingBag, ArrowDownToLine, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  currentView: any;
  onNavigate: (view: any) => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
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
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EBE4D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1 group text-left cursor-pointer"
            id="brand-logo-btn"
          >
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-[#181614] group-hover:text-[#a8422b] transition-colors">
              bootey<sup className="text-sm font-normal">®</sup>
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links & Bag Button */}
        <div className="flex items-center gap-6 sm:gap-8">
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
            className="sm:hidden p-2 rounded-lg text-[#181614] hover:bg-[#FAF7F2] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#EBE4D8] bg-[#FAF7F2] px-4 py-4 space-y-3 animate-in fade-in duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 text-sm font-semibold text-[#181614]"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('library')}
            className="block w-full text-left py-2 text-sm font-semibold text-[#a8422b]"
          >
            Shop (The 28 Toolkits Library)
          </button>
          <button
            onClick={() => handleNavClick('licensing')}
            className="block w-full text-left py-2 text-sm font-semibold text-[#181614]"
          >
            Licensing
          </button>

        </div>
      )}
    </header>
  );
};
