import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DownloadSection } from './components/DownloadSection';
import { LicensingSection } from './components/LicensingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DownloadsDrawer } from './components/DownloadsDrawer';
import { DownloadItem } from './types';

export default function App() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger downloading .dmg or .exe
  const handleTriggerDownload = (platform: 'macos' | 'windows') => {
    const isMac = platform === 'macos';
    const newItem: DownloadItem = {
      id: `desktop-${platform}-${Date.now()}`,
      name: isMac ? 'bootey Desktop v2.4.0 (.dmg)' : 'bootey Desktop v2.4.0 (.exe)',
      type: isMac ? 'desktop_macos' : 'desktop_windows',
      fileSize: isMac ? '86.4 MB' : '74.2 MB',
      price: 0,
      downloadUrl: '#',
    };

    setDownloads((prev) => {
      const exists = prev.some((it) => it.type === newItem.type);
      if (exists) return prev;
      return [newItem, ...prev];
    });

    setIsDrawerOpen(true);
    showToast(`Added ${newItem.name} to downloads.`);
  };

  const handleRemoveDownload = (id: string) => {
    setDownloads((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearAll = () => {
    setDownloads([]);
  };

  const handleCheckoutOrDownloadAll = () => {
    showToast('Download package dispatched to your browser!');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#181614] selection:bg-[#b4532a]/20 selection:text-[#b4532a] font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181614] text-white px-5 py-3 rounded-full shadow-2xl border border-[#33302c] text-xs font-mono-code flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        downloadsCount={downloads.length}
        onOpenDownloads={() => setIsDrawerOpen(true)}
        onScrollTo={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main>
        {/* Hero */}
        <Hero
          onBrowseLibrary={() => scrollToSection('download-section')}
          onViewLicensing={() => scrollToSection('licensing-section')}
        />

        {/* Download Section (.dmg and .exe + instructions) */}
        <DownloadSection
          onTriggerDownload={handleTriggerDownload}
        />

        {/* Licensing Section */}
        <LicensingSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={scrollToSection}
        onDownloadOs={handleTriggerDownload}
      />

      {/* Downloads Drawer */}
      <DownloadsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={downloads}
        onRemoveItem={handleRemoveDownload}
        onClearAll={handleClearAll}
        onCheckoutOrDownloadAll={handleCheckoutOrDownloadAll}
      />
    </div>
  );
}
