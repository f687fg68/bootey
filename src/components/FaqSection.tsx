import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Are these toolkits a one-time purchase?',
    answer:
      'Yes. Always. You buy once, you download immediately, and the files are yours forever. There are no subscriptions, no accounts to maintain, and no renewal fees.',
  },
  {
    question: 'Were these made by AI?',
    answer:
      'Our toolkits are developed through an AI-assisted workflow: large-scale research synthesis, pattern recognition, and initial drafting are done with advanced models, followed by human editorial review, structuring, and formatting. We disclose this upfront because we believe in transparency.',
  },
  {
    question: 'Can I use these for professional advice?',
    answer:
      'No. Every toolkit is designed for informational and educational purposes only. They are not substitutes for medical, psychological, legal, or financial professional counsel. See our full disclaimer for details.',
  },
  {
    question: 'What format are the products?',
    answer:
      'Most toolkits are delivered as beautifully formatted, printable PDFs. Interactive products may include Notion templates, CSV spreadsheets, or Markdown files. Formats are clearly listed on each product card.',
  },
  {
    question: 'How do I receive updates?',
    answer:
      'When a toolkit is meaningfully updated, everyone who purchased it receives the new version via email at no extra charge. We believe in taking care of early adopters.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'Due to the digital nature of our toolkits, all sales are final and we do not offer refunds once files have been accessed or downloaded. We kindly encourage you to review product specifications and previews carefully before purchasing. If you experience any technical difficulty opening your files, please email us at o88gfdde@gmail.com and our team will be delighted to assist you.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq-section" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#EBE4D8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screenshots 4 & 5 */}
        <div className="text-center mb-16 space-y-3">
          <div className="text-xs font-mono-code font-bold tracking-[0.2em] text-[#a8422b] uppercase">
            SUPPORT
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#181614] leading-tight tracking-tight">
            Fine print, <span className="italic text-[#a8422b]">in plain words.</span>
          </h2>
        </div>

        {/* FAQ Accordion List matching Screenshots 4 & 5 */}
        <div className="divide-y divide-[#EBE4D8]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-6 transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-editorial font-normal text-[#181614] group-hover:text-[#a8422b] transition-colors pr-4">
                    {item.question}
                  </span>
                  <span className="shrink-0 p-1 text-[#756F66] group-hover:text-[#181614]">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-[#a8422b]" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-4 text-xs sm:text-sm text-[#756F66] leading-relaxed max-w-2xl animate-in fade-in duration-200">
                    <p>{item.answer}</p>
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
