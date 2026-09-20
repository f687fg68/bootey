import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What operating systems and platforms does bootey support?',
    answer:
      'bootey is distributed as native binaries for macOS (.dmg, Universal Silicon M1/M2/M3/M4 & Intel 64-bit) and Windows (.exe, x64). Both builds run directly on your hardware without heavy runtime dependencies or browser containers.',
  },
  {
    question: 'How does bootey operate 100% offline?',
    answer:
      'bootey indexes your documents and files directly on your machine into a local encrypted SQLite database. Search latency is sub-2ms, queries run in local memory, and zero telemetry packets or background pings ever leave your machine.',
  },
  {
    question: 'Do I need an account or recurring subscription?',
    answer:
      'No. We reject software-as-a-service rent-seeking. bootey is a one-time purchase with a permanent lifetime license. There are no logins, no accounts, no subscriptions, and no recurring renewal fees.',
  },
  {
    question: 'Can I install bootey on multiple personal computers?',
    answer:
      'Yes. Your personal license entitles you to install bootey Desktop on your primary and secondary personal machines (e.g., your MacBook Pro and your Windows desktop work rig). No arbitrary device limits or DRM hurdles.',
  },
  {
    question: 'What if macOS Gatekeeper or Windows SmartScreen displays a prompt?',
    answer:
      'Because bootey is distributed directly outside proprietary corporate app stores to preserve user privacy and avoid recurring 30% platform cuts, your OS may display a first-time gatekeeper prompt. On macOS, click "Open" or select "Open Anyway" in System Settings. On Windows, click "More Info" → "Run Anyway". We publish cryptographic SHA-256 checksums for every release build so you can verify binary integrity.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'If bootey does not exceed your performance expectations within 30 days of purchase, email support@bootey.co with your receipt ID for a prompt 100% refund. No questions asked.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq-section" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#EBE4D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE4D8] text-[#181614] text-xs font-mono-code font-semibold tracking-wider uppercase">
            ANSWERS & ASSURANCE
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-[#181614] leading-tight">
            Fine print, in plain words.
          </h2>
          <p className="text-base text-[#756F66]">
            Everything you need to know about bootey desktop app, downloads, and licensing terms.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EBE4D8] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2]/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-editorial text-lg sm:text-xl font-bold text-[#181614]">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                      isOpen
                        ? 'bg-[#181614] text-white border-[#181614]'
                        : 'bg-[#FAF7F2] text-[#756F66] border-[#EBE4D8]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 text-xs sm:text-sm text-[#756F66] leading-relaxed border-t border-[#EBE4D8]/60 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
