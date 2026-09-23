import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalogSection } from './components/ProductCatalogSection';
import { LibraryPage } from './components/LibraryPage';
import { DigitalProductsPage } from './components/DigitalProductsPage';
import { ProductPage } from './components/ProductPage';
import { LicensingSection } from './components/LicensingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Toolkit } from './types';
import { TOOLKITS } from './data/toolkitsData';
import { 
  purgeUnverifiedLegacyState,
  getPaidProductIds, 
  checkPolarReturnRedirect, 
  revokePayment 
} from './utils/orderVerification';
import { 
  LicensingPage, 
  AIDisclosurePage, 
  FormatGuidePage, 
  FAQsPage, 
  AboutPage,
  EditorialPrinciplesPage,
  TermsOfPurchasePage,
  TermsAndDisclaimerPage
} from './components/InfoPages';

export type AppView = 
  | 'home' 
  | 'digital-products'
  | 'library' 
  | 'product' 
  | 'licensing' 
  | 'ai-disclosure' 
  | 'format-guide' 
  | 'faqs' 
  | 'about'
  | 'editorial'
  | 'terms-of-purchase'
  | 'terms-and-disclaimer';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Toolkit | null>(null);
  const [cart, setCart] = useState<Toolkit[]>([]);
  // Digital downloads are strictly locked until confirmed via Polar checkout session ID
  const [unlockedProductIds, setUnlockedProductIds] = useState<string[]>(() => {
    try {
      purgeUnverifiedLegacyState();
      return getPaidProductIds();
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [modalToolkit, setModalToolkit] = useState<Toolkit | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRevokePayment = (id: string) => {
    revokePayment(id);
    setUnlockedProductIds(getPaidProductIds());
    showToast(`Payment reset. Download locked.`);
  };

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Check for auto-verification on Polar return URL with a real checkout session ID
  useEffect(() => {
    purgeUnverifiedLegacyState();
    const urlParams = new URLSearchParams(window.location.search);
    const returnCheck = checkPolarReturnRedirect(urlParams, TOOLKITS);
    if (returnCheck.paid && returnCheck.toolkit && returnCheck.checkoutId) {
      setUnlockedProductIds(getPaidProductIds());
      setSelectedProduct(returnCheck.toolkit);
      setCurrentView('product');
      showToast(`✓ Payment confirmed on Polar! Digital download for ${returnCheck.toolkit.title} is now unlocked.`);
      window.history.replaceState({ product: returnCheck.toolkit.id }, '', `${window.location.pathname}?product=${returnCheck.toolkit.id}`);
    }
  }, []);

  // Support URL deep linking on mount and browser popstate (e.g., ?product=bt-01 or ?view=library)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get('product') || params.get('id');
      const viewParam = params.get('view');

      if (productId) {
        const found = TOOLKITS.find(
          (t) =>
            t.id === productId ||
            t.code.toLowerCase().replace(/[^a-z0-9]/g, '') === productId.toLowerCase().replace(/[^a-z0-9]/g, '')
        );
        if (found) {
          setSelectedProduct(found);
          setCurrentView('product');
          return;
        }
      }

      if (viewParam === 'digital-products' || viewParam === 'products') {
        setCurrentView('digital-products');
      } else if (viewParam === 'library') {
        setCurrentView('library');
      } else if (viewParam === 'licensing') {
        setCurrentView('licensing');
      } else if (viewParam === 'ai-disclosure') {
        setCurrentView('ai-disclosure');
      } else if (viewParam === 'format-guide') {
        setCurrentView('format-guide');
      } else if (viewParam === 'faqs') {
        setCurrentView('faqs');
      } else if (viewParam === 'about') {
        setCurrentView('about');
      } else if (viewParam === 'editorial') {
        setCurrentView('editorial');
      } else if (viewParam === 'terms-of-purchase') {
        setCurrentView('terms-of-purchase');
      } else if (viewParam === 'terms-and-disclaimer') {
        setCurrentView('terms-and-disclaimer');
      } else if (viewParam === 'home') {
        setCurrentView('home');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      window.history.pushState({}, '', window.location.pathname);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(id);
  };

  const handleNavigate = (view: AppView) => {
    if (view === 'digital-products') {
      setCurrentView('digital-products');
      window.history.pushState({}, '', `${window.location.pathname}?view=digital-products`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'library') {
      setCurrentView('library');
      window.history.pushState({}, '', `${window.location.pathname}?view=library`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'home') {
      setCurrentView('home');
      window.history.pushState({}, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'licensing') {
      setCurrentView('licensing');
      window.history.pushState({}, '', `${window.location.pathname}?view=licensing`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'ai-disclosure') {
      setCurrentView('ai-disclosure');
      window.history.pushState({}, '', `${window.location.pathname}?view=ai-disclosure`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'format-guide') {
      setCurrentView('format-guide');
      window.history.pushState({}, '', `${window.location.pathname}?view=format-guide`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'faqs') {
      setCurrentView('faqs');
      window.history.pushState({}, '', `${window.location.pathname}?view=faqs`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'about') {
      setCurrentView('about');
      window.history.pushState({}, '', `${window.location.pathname}?view=about`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'editorial') {
      setCurrentView('editorial');
      window.history.pushState({}, '', `${window.location.pathname}?view=editorial`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'terms-of-purchase') {
      setCurrentView('terms-of-purchase');
      window.history.pushState({}, '', `${window.location.pathname}?view=terms-of-purchase`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'terms-and-disclaimer') {
      setCurrentView('terms-and-disclaimer');
      window.history.pushState({}, '', `${window.location.pathname}?view=terms-and-disclaimer`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      window.history.pushState({}, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (toolkit: Toolkit) => {
    setCart((prev) => {
      const exists = prev.some((it) => it.id === toolkit.id);
      if (exists) {
        showToast(`${toolkit.title} is already in your bag.`);
        return prev;
      }
      showToast(`Added ${toolkit.title} to bag.`);
      return [...prev, toolkit];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Navigates directly to the aesthetic dedicated Product Page
  const handleOpenProductPage = (toolkit: Toolkit) => {
    setSelectedProduct(toolkit);
    setCurrentView('product');
    setIsDetailModalOpen(false);
    if (window.location.search !== `?product=${toolkit.id}`) {
      window.history.pushState({ product: toolkit.id }, '', `${window.location.pathname}?product=${toolkit.id}`);
    }
  };

  const handleBackToLibrary = () => {
    setCurrentView('library');
    window.history.pushState({}, '', `${window.location.pathname}?view=library`);
  };

  // Quick detail preview modal (optional modal trigger)
  const handleOpenDetailModal = (toolkit: Toolkit) => {
    setModalToolkit(toolkit);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#181614] selection:bg-[#a8422b]/20 selection:text-[#a8422b] font-sans antialiased flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181614] text-white px-5 py-3 rounded-full shadow-2xl border border-[#33302c] text-xs font-mono-code flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Navigation Header */}
      <Header
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        currentView={currentView}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ======================================================== */}
        {/* VIEW 1: DEDICATED AESTHETIC PRODUCT PAGE */}
        {/* ======================================================== */}
        {currentView === 'product' && selectedProduct && (
          <ProductPage
            toolkit={selectedProduct}
            onBackToLibrary={handleBackToLibrary}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleOpenProductPage}
            isInCart={cart.some((c) => c.id === selectedProduct.id)}
            unlockedProductIds={unlockedProductIds}
            onRevokeVerification={handleRevokePayment}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW 1.5: DEDICATED DIGITAL PRODUCTS WE SELL PAGE */}
        {/* ======================================================== */}
        {currentView === 'digital-products' && (
          <DigitalProductsPage
            onSelectProduct={handleOpenProductPage}
            onAddToCart={handleAddToCart}
            cartItemIds={cart.map((c) => c.id)}
            unlockedProductIds={unlockedProductIds}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW 2: DEDICATED LIBRARY PAGE (ALL 28 DIGITAL TOOLKITS) */}
        {/* ======================================================== */}
        {currentView === 'library' && (
          <LibraryPage
            onSelectProduct={handleOpenProductPage}
            onAddToCart={handleAddToCart}
            cartItemIds={cart.map((c) => c.id)}
            unlockedProductIds={unlockedProductIds}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW 3: MAIN LANDING / HOME PAGE */}
        {/* ======================================================== */}
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onBrowseLibrary={() => setCurrentView('library')}
              onViewLicensing={() => scrollToSection('licensing-section')}
              onViewTherapistPack={() => {
                const found = TOOLKITS.find((t) => t.id === 'bt-19');
                if (found) handleOpenProductPage(found);
              }}
            />

            {/* Featured Digital Products Section with Aesthetic Covers */}
            <ProductCatalogSection
              onSelectProduct={handleOpenProductPage}
              onAddToCart={handleAddToCart}
              onOpenFullLibrary={() => setCurrentView('library')}
              cartItemIds={cart.map((c) => c.id)}
            />

            {/* Licensing Section (Purchase once, use forever) */}
            <LicensingSection />

            {/* Support / FAQ Section (Fine print in plain words) */}
            <FaqSection />
          </>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: DETAILED LICENSING & USAGE PAGE */}
        {/* ======================================================== */}
        {currentView === 'licensing' && (
          <LicensingPage onBack={() => handleNavigate('home')} />
        )}

        {/* ======================================================== */}
        {/* VIEW 5: DETAILED AI DISCLOSURE PAGE */}
        {/* ======================================================== */}
        {currentView === 'ai-disclosure' && (
          <AIDisclosurePage onBack={() => handleNavigate('home')} />
        )}

        {/* ======================================================== */}
        {/* VIEW 6: DETAILED FORMAT GUIDE PAGE */}
        {/* ======================================================== */}
        {currentView === 'format-guide' && (
          <FormatGuidePage onBack={() => handleNavigate('home')} />
        )}

        {/* ======================================================== */}
        {/* VIEW 7: DETAILED FAQS PAGE */}
        {/* ======================================================== */}
        {currentView === 'faqs' && (
          <FAQsPage onBack={() => handleNavigate('home')} />
        )}

        {/* ======================================================== */}
        {/* VIEW 8: DETAILED ABOUT BOOTEY PAGE */}
        {/* ======================================================== */}
        {currentView === 'about' && (
          <AboutPage onBack={() => handleNavigate('home')} />
        )}

        {/* ======================================================== */}
        {/* VIEW 10: DETAILED EDITORIAL PRINCIPLES PAGE */}
        {/* ======================================================== */}
        {currentView === 'editorial' && (
          <EditorialPrinciplesPage onBack={() => handleNavigate('home')} />
        )}

        {/* ======================================================== */}
        {/* VIEW 11: DETAILED TERMS OF PURCHASE PAGE */}
        {/* ======================================================== */}
        {currentView === 'terms-of-purchase' && (
          <TermsOfPurchasePage onBack={() => handleNavigate('home')} />
        )}

        {/* ======================================================== */}
        {/* VIEW 12: DETAILED TERMS & COMPREHENSIVE DISCLAIMER PAGE */}
        {/* ======================================================== */}
        {currentView === 'terms-and-disclaimer' && (
          <TermsAndDisclaimerPage onBack={() => handleNavigate('home')} />
        )}
      </main>

      {/* Footer across all pages */}
      <Footer 
        onScrollTo={scrollToSection} 
        onOpenLibrary={() => setCurrentView('library')} 
        onNavigate={handleNavigate}
      />

      {/* Slide-over Cart / Downloads Bag */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        unlockedProductIds={unlockedProductIds}
      />

      {/* Quick View Product Modal */}
      <ProductDetailModal
        toolkit={modalToolkit}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddToCart={handleAddToCart}
        onViewFullPage={handleOpenProductPage}
        isInCart={cart.some((c) => c.id === modalToolkit?.id)}
        unlockedProductIds={unlockedProductIds}
      />
    </div>
  );
}
