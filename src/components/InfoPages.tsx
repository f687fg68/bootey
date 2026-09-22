import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  FileCheck, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Info,
  BookOpen
} from 'lucide-react';

interface PageProps {
  onBack: () => void;
}

// ==========================================
// 1. LICENSING & USAGE PAGE
// ==========================================
export const LicensingPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#FAF7F2] text-[#181614] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#756F66] hover:text-[#181614] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#a8422b]">
            LEGAL ARCHITECTURE
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial font-bold tracking-tight text-[#181614]">
            Licensing &amp; Commercial Usage Agreement
          </h1>
          <p className="text-sm font-mono-code text-[#756F66]">
            EFFECTIVE DATE: SEPTEMBER 22, 2026 · VERSION 2.4
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-8 text-sm leading-relaxed text-[#524c44]">
          {/* Executive Summary */}
          <div className="p-6 rounded-2xl bg-[#f5efe4] border border-[#e3d9c8] space-y-3">
            <h3 className="font-mono-code text-xs font-bold uppercase tracking-wide text-[#181614] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#a8422b]" />
              Executive Summary (Plain English)
            </h3>
            <p className="text-xs leading-relaxed text-[#524c44]">
              Every tool and template purchased on bootey comes with a perpetual, worldwide, non-exclusive license. 
              <strong> You can use these templates for both personal and professional operations (including with clients)</strong>. 
              The only restriction is that you cannot re-sell, re-license, sublicense, or distribute the raw files (XLSX, PDF, Canva template links) to others as a stand-alone product or package.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              1. Definitions &amp; Parties
            </h2>
            <p>
              This Licensing &amp; Usage Agreement (&quot;Agreement&quot;) is a legal contract between the individual or business entity purchasing the digital material (&quot;Licensee&quot;, &quot;User&quot;, &quot;You&quot;) and bootey Studio (&quot;Licensor&quot;, &quot;Studio&quot;, &quot;We&quot;, &quot;Us&quot;). By downloading, accessing, or utilizing any spreadsheet, PDF, guide, template, or tracking tool offered by the Studio (&quot;the Products&quot;), you acknowledge and agree to be bound by the terms detailed herein.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              2. License Classifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-[#EBE4D8] bg-white space-y-2">
                <h3 className="font-bold text-xs font-mono-code uppercase text-[#a8422b]">
                  A. Individual Professional License
                </h3>
                <p className="text-xs leading-relaxed">
                  Included standard on all single-seat purchases. Authorizes a single practitioner, advisor, therapist, creator, or small business owner to utilize the template within their personal work or client delivery flows. Highly suited for therapy client handouts, individual taxation, freelance bookkeeping, or single-creator brand tracking.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[#EBE4D8] bg-white space-y-2">
                <h3 className="font-bold text-xs font-mono-code uppercase text-[#a8422b]">
                  B. Enterprise / Multi-Seat License
                </h3>
                <p className="text-xs leading-relaxed">
                  Required when a tool is deployed across an entire organization with multiple concurrent employees using the database template. Please contact support to arrange bulk pricing multipliers and standardized seat allotments.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              3. Permitted Uses &amp; Scope
            </h2>
            <p>
              The License grants you a perpetual, non-exclusive, non-transferable right to utilize the files under the following approved constraints:
            </p>
            <ul className="list-decimal pl-5 space-y-2.5">
              <li>
                <strong>Client Consultation Delivery:</strong> You may customize, populate, and share completed PDF exports or read-only spreadsheet snapshots directly with your individual clients as part of your consulting or clinical services.
              </li>
              <li>
                <strong>Business Operations Support:</strong> You may use our bookkeeping, budgeting, tax-planning engines, and short-term rental planners internally to run and optimize your own commercial businesses and portfolios.
              </li>
              <li>
                <strong>Educational Integration:</strong> You may showcase structural screenshots or formulas in educational lectures, slides, and educational videos, provided there is a clear visual citation of bootey.
              </li>
              <li>
                <strong>Derivative Customization:</strong> You may alter colors, fonts, structures, columns, and logic to perfectly suit your bespoke operational requirements.
              </li>
            </ul>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              4. Strictly Prohibited Activities
            </h2>
            <p className="text-amber-800 bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs">
              <strong>CRITICAL LIMITATION:</strong> Under no circumstances may the raw editable assets (including XLSX files, active Google Sheets links, Canva template share-links, or DOCX formats) be packaged, shared, or distributed in a way that allows third parties to acquire, download, or edit the raw template themselves.
            </p>
            <ul className="list-disc pl-5 space-y-2.5">
              <li>
                No resale of the templates as stand-alone items, visual design bundles, digital assets, or elements within a marketplace.
              </li>
              <li>
                No hosting of raw templates on public shared drives, Slack channels, Discord communities, or GitHub repositories.
              </li>
              <li>
                No reverse-engineering of the internal structural logic to create competitive products, online SaaS platforms, or standalone web apps that duplicate the template&#39;s exact functional utility.
              </li>
            </ul>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              5. Intellectual Property Rights
            </h2>
            <p>
              bootey Studio retains complete, exclusive, and unencumbered ownership of all structural formatting, proprietary mathematical formulations, aesthetic cover layouts, programmatic scripts, and copywriting included within the Products. No intellectual property ownership is transferred to the Licensee under this agreement.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              6. Limitation of Liability &amp; Disclaimers
            </h2>
            <p>
              THE PRODUCTS ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL BOOTEY STUDIO, ITS FOUNDERS, CONSULTANTS, OR DEVELOPERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE PRODUCTS OR THE USE OF OTHER DEALINGS IN THE PRODUCTS.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              7. Refund and Termination Policy
            </h2>
            <p>
              Because our digital products are delivered as immediate, irrevocable downloads of unencrypted spreadsheets and guides, bootey does not offer refunds once an order is placed and digital packages are unlocked. We warmly invite you to review all toolkit details, table of contents previews, and format guides prior to checkout. If you ever encounter any technical questions or file access difficulties, our support team will promptly assist you at o88gfdde@gmail.com to make sure you have complete, seamless access to your files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. AI DISCLOSURE PAGE
// ==========================================
export const AIDisclosurePage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#FAF7F2] text-[#181614] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#756F66] hover:text-[#181614] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#a8422b]">
            TRANSPARENCY MANIFESTO
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial font-bold tracking-tight text-[#181614]">
            The bootey Editorial &amp; AI-Assistance Disclosure
          </h1>
          <p className="text-sm font-mono-code text-[#756F66]">
            ISSUED: SEPTEMBER 2026 · COMMITMENT TO ETHICAL SYNTHESIS
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-8 text-sm leading-relaxed text-[#524c44]">
          {/* Main Statement */}
          <div className="p-6 rounded-2xl bg-[#EBE4D8]/30 border border-[#d3cbbd] space-y-4">
            <p className="font-serif italic text-base text-[#181614] leading-relaxed">
              &quot;We reject both the lazy path of raw, unchecked AI output and the archaic rejection of machine capabilities. bootey represents a deliberate synthesis: expert human supervision guiding advanced artificial logic to generate clean, robust, and highly functional digital painkillers.&quot;
            </p>
            <p className="text-xs font-mono-code text-[#756F66]">— THE STUDIO DIRECTORS</p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              1. Our Stance on Generative AI
            </h2>
            <p>
              Generative Artificial Intelligence (AI) is a powerful tool for structuring information, automating formulas, and formatting complex checklists. However, when left entirely unattended, machines often output generic blueprints that are clinically, legally, or technically vacant. 
            </p>
            <p>
              Every single guide, workbook, or framework available in the bootey library has undergone a comprehensive human-in-the-loop review pipeline. We curate, verify, fact-check, and expand the underlying logic to ensure it provides practical, real-world utility instead of superficial filler.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              2. How AI is Utilized in Our Process
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#181614] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-[#181614] text-sm">Automated Mathematical Modeling</h3>
                  <p className="text-xs text-[#524c44]">
                    We use AI code-writing engines (including advanced Large Language Models) to structure bulletproof formulas, macro scripts, and column dependencies inside our Excel (`.xlsx`) and spreadsheet systems, preventing syntax errors and rounding anomalies.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#181614] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-[#181614] text-sm">Subject-Matter Translation</h3>
                  <p className="text-xs text-[#524c44]">
                    AI models assist us in translating dense legal statutes, complex accounting regulations (IRS codes, bookkeeping definitions), or medical symptom checklists into easily digestible, clean bulleted structures for rapid end-user consumption.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#181614] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                  03
                </div>
                <div>
                  <h3 className="font-bold text-[#181614] text-sm">Aesthetic Cover Art &amp; Typography Scales</h3>
                  <p className="text-xs text-[#524c44]">
                    We configure custom CSS layouts and programmatic typography spacing matching mathematical ratios, ensuring clean, elegant light-theme palettes that feel spacious, distinct, and pleasant to view.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              3. The Human Verification Checklist
            </h2>
            <p>
              To keep our systems pristine and reliable, every file must clear these manual inspection gates before deployment:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zero Placeholder Validation:</strong> Checking to ensure there are no broken links, raw &quot;Lorem Ipsum&quot; paragraphs, or unpopulated form fields.</li>
              <li><strong>Formula Validation:</strong> Opening the sheet in Microsoft Excel, Google Sheets, and Apple Numbers to ensure compatibility.</li>
              <li><strong>Plain-Language Simplification:</strong> Rewriting cold, overly complex legal or technical jargon into comforting, active advice.</li>
            </ul>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              4. Responsible Use Warning for Buyers
            </h2>
            <p className="text-xs text-[#756F66] bg-[#FAF7F2] border border-[#EBE4D8] p-4 rounded-xl leading-relaxed">
              Please note that while our products are structured to provide robust operational frameworks, they do not replace formal professional advice. Our templates are tools to support organization, goal tracking, and self-advocacy. You should always consult with qualified certified public accountants, attorneys, or licensed medical practitioners for specialized requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 3. FORMAT GUIDE PAGE
// ==========================================
export const FormatGuidePage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#FAF7F2] text-[#181614] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#756F66] hover:text-[#181614] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#a8422b]">
            TECHNICAL SPECIFICATIONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial font-bold tracking-tight text-[#181614]">
            Technical Format &amp; Compatibility Manual
          </h1>
          <p className="text-sm font-mono-code text-[#756F66]">
            SUPPORTED PLATFORMS: EXCEL · GOOGLE SHEETS · CANVA · NOTION · PDF
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-8 text-sm leading-relaxed text-[#524c44]">
          <p>
            All bootey digital files are configured to operate natively without installing third-party proprietary apps or paying for complex premium software. Below is our guide to importing, customizing, and printing your unlocked files.
          </p>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              1. Spreadsheet Architectures (XLSX, CSV)
            </h2>
            <p>
              Our automated calculators, pricing tools, and financial set-aside engines are packaged as optimized **Microsoft Excel** files (`.xlsx`). 
            </p>
            <div className="p-5 rounded-xl border border-[#EBE4D8] bg-white space-y-3">
              <h4 className="font-bold text-xs font-mono-code uppercase text-[#181614]">
                How to Import into Google Sheets Seamlessly:
              </h4>
              <ol className="list-decimal pl-5 text-xs space-y-2 text-[#524c44]">
                <li>Open your personal <strong>Google Drive</strong> account.</li>
                <li>Click <strong>New &gt; File Upload</strong> and select the downloaded `.xlsx` file.</li>
                <li>Once uploaded, right-click the file inside Drive and select <strong>Open with &gt; Google Sheets</strong>.</li>
                <li>To avoid editing in translation mode, click <strong>File &gt; Save as Google Sheets</strong>. This generates an optimized native copy.</li>
              </ol>
            </div>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              2. Text Guides &amp; Planners (PDF)
            </h2>
            <p>
              Our guides, symptom trackers, and journals are formatted as high-resolution vectors in standard PDF. 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Digital Reading:</strong> Completely hyperlinked. Clickable chapter links in the table of contents allow you to instantly skip to sections.
              </li>
              <li>
                <strong>Physical Printing:</strong> Formatted with a clean 0.5-inch safety margin, perfect for home desktop printers or professional offset print binderies. Select &quot;Scale to Fit&quot; or &quot;100% Scale&quot; for ideal results.
              </li>
              <li>
                <strong>Editable Forms:</strong> Interactive text boxes are provided so you can fill out fields on your iPad, tablet, or laptop before printing.
              </li>
            </ul>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              3. Visual Content Bundles (Canva &amp; Figma Templates)
            </h2>
            <p>
              For graphic packs (like our Therapist Carousel Pack), your secure download contains a PDF guide carrying clickable custom share tokens.
            </p>
            <p>
              Clicking these tokens automatically duplicates the design templates directly into your personal Canva or Figma workspace. This ensures the master layout remains locked and your working copy remains private and confidential.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              4. Common Troubleshooting Resolutions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 text-xs">
                <p className="font-bold text-red-900 mb-1">Issue: Formula errors (#VALUE!, #NAME?) display in columns</p>
                <p className="text-[#524c44]">
                  This occurs if you are running an outdated version of Microsoft Excel (2016 or earlier) that does not support modern mathematical functions. To resolve, import the sheet into Google Sheets (which is always up to date) or open it inside Excel Web.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 text-xs">
                <p className="font-bold text-red-900 mb-1">Issue: Cells show hashed sequences (###)</p>
                <p className="text-[#524c44]">
                  The column width is slightly too narrow to render the full computed figure. Simply hover over the right-side border of the column letter header and double-click to auto-expand the column width.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 4. FAQS PAGE
// ==========================================
export const FAQsPage: React.FC<PageProps> = ({ onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How do I access my files immediately after completing my purchase?',
      a: 'As soon as your purchase is finalized via our secure checkout, you will receive an automated, high-priority email containing a secure token link. Clicking this link takes you directly to your secure download portal. Alternatively, you can download them directly from your browser session if you kept the page open.'
    },
    {
      q: 'Are there any recurring monthly charges or subscription fees?',
      a: 'No. Every toolkit on bootey is sold as a transparent, one-time purchase. Once you buy a toolkit, you own the lifetime license to use and edit it indefinitely. There are no hidden fees, licensing renewals, or monthly server costs.'
    },
    {
      q: 'Can I use these spreadsheets on multiple machines or with my employees?',
      a: 'Yes, our Individual Professional License authorizes you to deploy and use the files on all of your personal computers, laptops, and mobile devices. If you need to share the file as a collaborative operational template across an entire company with multiple employees, please write to us for enterprise license keys.'
    },
    {
      q: 'What if I am not comfortable with Microsoft Excel or complex equations?',
      a: 'We design our systems to be accessible. Every spreadsheet features a "Quick-Start Instructions" tab containing visual legends, row guidelines, and plain-English step-by-step videos. There is zero advanced math required on your part—just type your numbers into the highlighted fields, and the calculations are done automatically.'
    },
    {
      q: 'Can I customize the formulas, fonts, and colors of the templates?',
      a: 'Absolutely. We do not password-protect or lock the cells of our templates. You are free to unhide worksheets, add extra rows, adjust formulas, change styling, and brand the documents with your own color codes and company logos.'
    },
    {
      q: 'Are future updates to the templates included for free?',
      a: 'Yes. Whenever we update or refine a toolkit (e.g., updating our Quarterly Tax Set-Aside Engine to match newly enacted tax brackets), we automatically send out updated files to all previous buyers of that product at no additional charge.'
    },
    {
      q: 'Do I need a special PDF reader to open and fill out the journals?',
      a: 'No. Our PDF files are completely standard. They can be opened in any modern browser (Chrome, Safari, Edge), Adobe Acrobat Reader, or note-taking apps like GoodNotes and Notability on iPad and other tablets.'
    },
    {
      q: 'Is my personal payment information secure?',
      a: 'We use industry-standard encryption protocols. Your purchase is processed securely using PCI-DSS compliant credit card and bank processing. We never store or view your full credit card digits.'
    },
    {
      q: 'What should I do if my download link has expired?',
      a: 'For security reasons, secure email download links are active for 7 days. If your link expires before you can save the files to your device, simply email o88gfdde@gmail.com with your purchase confirmation, and our automated queue will promptly assist you with link access.'
    },
    {
      q: 'What is your refund policy?',
      a: 'Because our toolkits are delivered as instant digital packages (.ZIP) containing fully unlocked, editable spreadsheets, templates, and guides with immediate access upon purchase, all digital sales are final and we do not offer refunds. We warmly encourage you to review the product specifications, table of contents, and sample excerpts before placing your order. If you encounter any technical difficulty accessing, unzipping, or using your files, our friendly support team is always ready to assist at o88gfdde@gmail.com.'
    },
    {
      q: 'Do you offer custom tailoring or personalized workbook creation services?',
      a: 'Yes. If you require a custom accounting template, bespoke clinical worksheets, or specialized operations dashboards customized for your unique business, we offer dedicated custom creation contracts. Please email o88gfdde@gmail.com.'
    }
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#181614] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#756F66] hover:text-[#181614] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#a8422b]">
            HELP DESK &amp; ARCHIVE
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial font-bold tracking-tight text-[#181614]">
            Comprehensive Studio FAQs
          </h1>
          <p className="text-sm font-mono-code text-[#756F66]">
            SEARCHING FOR QUICK ANSWERS · COMMITTED TO CLARITY
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="border-b border-[#EBE4D8] pb-4 transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full text-left py-4 font-serif font-bold text-base hover:text-[#a8422b] transition-colors group cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#a0988c] group-hover:text-[#181614] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="pt-2 pb-4 text-[#524c44] leading-relaxed text-sm animate-in slide-in-from-top-2 duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 6. ABOUT BOOTEY PAGE
// ==========================================
export const AboutPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#FAF7F2] text-[#181614] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#756F66] hover:text-[#181614] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#a8422b]">
            THE FOUNDRY STORY
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial font-bold tracking-tight text-[#181614]">
            About bootey Studio
          </h1>
          <p className="text-sm font-mono-code text-[#756F66]">
            CRAFTING DIGITAL ANALGESICS FOR THE ADMINISTRATIVE BURDEN
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-8 text-sm leading-relaxed text-[#524c44]">
          <div className="p-6 rounded-2xl bg-[#EBE4D8]/30 border border-[#d3cbbd] space-y-4">
            <h3 className="font-mono-code text-xs font-bold uppercase tracking-wide text-[#181614]">
              Our Manifesto
            </h3>
            <p className="font-serif italic text-base text-[#181614] leading-relaxed">
              &quot;Life is too short to wrestle with broken cells, poorly structured trackers, and generic advice. bootey designs meticulous, beautiful, and deeply practical operational systems to ease the cognitive friction of chaotic life transitions.&quot;
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              1. Who We Are
            </h2>
            <p>
              bootey is an independent digital foundry and design lab. We sit at the intersection of professional-grade operations, meticulous visual typography, and supportive clinical structure. We specialize in building &quot;digital painkillers&quot;—highly refined spreadsheets, trackers, guides, and templates designed to resolve distinct operational bottlenecks in small business, personal finance, therapy administration, and personal life crises.
            </p>
            <p>
              We believe that an administrative tracker can and should be a work of art. By pairing robust, mathematically sound underlying mechanics with spacious, elegant light-theme designs, we build utilities that are not only effective but genuinely pleasant to look at.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              2. The Genesis of the Studio
            </h2>
            <p>
              Founded in 2024 by a multidisciplinary collective of operations designers, certified accountants, and specialized educators, bootey was born out of frustration with two extremes of the template marketplace:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl border border-[#EBE4D8] bg-white space-y-2">
                <h4 className="font-bold text-xs font-mono-code uppercase text-[#a8422b]">
                  The Sterile Corporate Standard
                </h4>
                <p className="text-xs leading-relaxed text-[#524c44]">
                  Traditional operational worksheets are visually dense, overwhelming, and uninviting. They resemble cold tax returns rather than tools designed for supportive, everyday human use.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[#EBE4D8] bg-white space-y-2">
                <h4 className="font-bold text-xs font-mono-code uppercase text-[#a8422b]">
                  The Vacant Social Media Trend
                </h4>
                <p className="text-xs leading-relaxed text-[#524c44]">
                  Social marketplaces are flooded with flashy, generic templates that lack depth. They contain beautiful cover pages but fail to provide robust formula logic, realistic categories, or actionable structural guidance.
                </p>
              </div>
            </div>
            <p className="pt-2">
              Our solution was to bridge the gap: engineering professional-grade formula logic under the guidance of domain experts, and presenting them with the design polish of premium print publications.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              3. Our Designing Philosophy
            </h2>
            <p>
              Every product in our catalog conforms to four rigorous studio pillars:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Single-Purpose Dedication:</strong> We reject bloated multi-tools. We believe that an ADHD routine tracker should focus entirely on focus routines, and a short-term rental planner should center purely on rental cash-flows. Perfect specialization breeds utility.
              </li>
              <li>
                <strong>Pristine Light Typography:</strong> All text interfaces utilize generous negative space, high contrast, and proportional tracking scales, reducing visual anxiety and strain during use.
              </li>
              <li>
                <strong>Unlocked Freedom:</strong> We do not password-protect or hide structural columns. Your data belongs to you, and we encourage you to customize, adapt, and expand the underlying sheets as your workflows mature.
              </li>
              <li>
                <strong>Instant Clarity:</strong> We design clean instructions tabs featuring visual legends and clear examples, ensuring you can unlock, configure, and use your tool in under five minutes.
              </li>
            </ul>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              4. Looking Ahead
            </h2>
            <p>
              As the digital workspace continues to shift toward subscription-heavy models, bootey remains committed to the simple, offline-first, purchase-once-use-forever paradigm. We are continuously designing, testing, and expanding our catalog of digital toolkits to help small business operators, therapists, and families navigate complex structures with absolute clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 7. EDITORIAL PRINCIPLES PAGE
// ==========================================
export const EditorialPrinciplesPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#FAF7F2] text-[#181614] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#756F66] hover:text-[#181614] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#a8422b]">
            QUALITY PROTOCOLS
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial font-bold tracking-tight text-[#181614]">
            Our Editorial &amp; Quality Principles
          </h1>
          <p className="text-sm font-mono-code text-[#756F66]">
            HOW WE RESEARCH, CODE, AND VALIDATE OUR DIGITAL TOOLKITS
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-8 text-sm leading-relaxed text-[#524c44]">
          <p>
            At bootey, we hold digital products to the same exacting standards as print-published books and peer-reviewed materials. We maintain a transparent editorial process to ensure every template, guide, and calculator delivers immediate, accurate, and supportive utility.
          </p>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              1. The Research Phase
            </h2>
            <p>
              We do not create templates in a vacuum. Before a single formula cell is formatted or a guide is outlined, our team initiates a intensive discovery cycle:
            </p>
            <ul className="list-disc pl-5 space-y-2.5 text-xs">
              <li>
                <strong>Expert Consultation:</strong> For tax engines, bookkeeping tools, or legal checklists, we engage with licensed accountants (CPAs) and specialized legal practitioners to verify calculations and rules.
              </li>
              <li>
                <strong>Clinical Integration:</strong> For symptom trackers, ADHD journals, or caregiver manuals, we consult with licensed clinical social workers, therapists, and caregivers to ensure our structures are supportive and free from clinical distress cues.
              </li>
              <li>
                <strong>Friction Diagnostics:</strong> We analyze standard government worksheets, diagnostic manuals, and legacy software models to identify where users experience the most cognitive drag.
              </li>
            </ul>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              2. Technical &amp; Formula Engineering
            </h2>
            <p>
              A beautiful layout is useless if the internal math is broken. Our development team writes and compiles every formula cell with extreme care:
            </p>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-[#EBE4D8] bg-white space-y-2">
                <h3 className="font-bold text-xs font-mono-code uppercase text-[#181614]">
                  Robust Calculation Engines
                </h3>
                <p className="text-xs leading-relaxed text-[#524c44]">
                  We utilize standard, highly compatible functions (such as `SUMIF`, `INDEX/MATCH`, `XLOOKUP`, and `ROUND`) instead of volatile, platform-dependent macros or hidden custom plugins. This ensures that your sheet runs reliably regardless of your operating system.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[#EBE4D8] bg-white space-y-2">
                <h3 className="font-bold text-xs font-mono-code uppercase text-[#181614]">
                  Platform-Neutral Architecture
                </h3>
                <p className="text-xs leading-relaxed text-[#524c44]">
                  Every Excel template is strictly verified across Microsoft Excel Web, Excel Desktop (Windows/macOS), Google Sheets, and Apple Numbers. We do not approve spreadsheets that break or display parsing errors when moving between these common suites.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              3. Visual Accessibility &amp; Ergonomics
            </h2>
            <p>
              Our design choices are rooted in visual ergonomics. We enforce strict styling rules to prevent visual overwhelm:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zero Gradients:</strong> We prohibit rainbow gradients, glowing shadows, or high-vibrancy colored cells that cause visual distraction.</li>
              <li><strong>Balanced Brightness:</strong> Standard text interfaces feature off-white backgrounds (e.g. warm, eye-safe cream tones) with dark, high-contrast typography, maintaining a pleasant viewing contrast.</li>
              <li><strong>Consistent Visual Logic:</strong> Cells that require user input are always colored differently than calculated columns, letting you easily find where data should go.</li>
            </ul>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              4. Continuous Review &amp; Bracket Adjustments
            </h2>
            <p>
              The regulatory, legal, and operational landscape is always changing. When tax laws adjust, when diagnostic frameworks mature, or when software APIs adapt, our editorial board immediately updates our core toolkits. 
            </p>
            <p>
              These updates are automatically sent directly to all historical buyers of the product for free, ensuring your toolkits remain relevant, active, and fully compatible for years to come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 8. TERMS OF PURCHASE PAGE
// ==========================================
export const TermsOfPurchasePage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#FAF7F2] text-[#181614] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#756F66] hover:text-[#181614] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#a8422b]">
            TRANSACTION STANDARD
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial font-bold tracking-tight text-[#181614]">
            Terms of Purchase &amp; Service
          </h1>
          <p className="text-sm font-mono-code text-[#756F66]">
            LAST MODIFIED: SEPTEMBER 22, 2026 · SECURITY AGREEMENT
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-8 text-sm leading-relaxed text-[#524c44]">
          <p>
            By purchasing, downloading, or utilizing any template, worksheet, calculator, or handbook offered by bootey Studio, you agree to comply with and be bound by these Terms of Purchase. Please review them carefully before completing any transaction.
          </p>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              1. Digital Transaction Architecture
            </h2>
            <p>
              When you purchase a product on bootey, you are purchasing an **unrestricted perpetual license** to download, edit, customize, and utilize the digital files. You are not purchasing ownership of the underlying structures, styles, or formulas, which remain the sole intellectual property of bootey Studio.
            </p>
            <p>
              All payments are processed securely through our PCI-DSS compliant payment processing gateway. We never view, collect, or store your credit card digits.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              2. Download Delivery Protocols
            </h2>
            <ul className="list-decimal pl-5 space-y-2 text-xs">
              <li>
                <strong>Immediate Access:</strong> Upon successful transaction completion, your secure download links will render instantly in your browser and will be dispatched to your email address.
              </li>
              <li>
                <strong>Expiry Term:</strong> To prevent illegal link sharing, download links delivered via email are active for 7 days from the transaction date. If you need to re-download after expiration, you can contact support for automated token regeneration.
              </li>
              <li>
                <strong>Storage:</strong> We highly recommend saving a secure backup copy of your downloaded `.xlsx` and PDF files to your cloud storage (such as Google Drive, OneDrive, or iCloud) immediately after downloading.
              </li>
            </ul>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              3. Refund and Exchange Policy
            </h2>
            <p>
              Because our digital toolkits are delivered instantly as full, unencrypted file archives (.ZIP) upon purchase, <strong>all digital sales are final and we do not offer refunds</strong>. We warmly encourage you to review product descriptions, included formats, and sample previews before completing your order.
            </p>
            <p>
              If you ever experience any difficulty downloading, unzipping, or opening your files, please reach out to us at <a href="mailto:o88gfdde@gmail.com" className="underline text-[#181614] hover:text-[#a8422b]">o88gfdde@gmail.com</a>. Our support team is always delighted to assist you and ensure you have full access to your purchase.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              4. Disclaimer of Professional Relationship
            </h2>
            <p className="text-amber-800 bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs leading-relaxed">
              <strong>IMPORTANT NOTICE:</strong> The templates, calculations, suggestions, and guides provided by bootey do not constitute formal legal, accounting, mental health, or medical advice. They are structured organizational systems. By using our toolkits, you acknowledge that no fiduciary, clinical, or professional advisory relationship has been created between you and bootey.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              5. Governing Jurisdiction
            </h2>
            <p>
              These Terms of Purchase shall be governed by, construed, and enforced in accordance with the laws of the State of Washington, without regard to conflict of laws principles. Any legal action arising under these Terms shall be resolved exclusively in the state or federal courts located in Seattle, Washington.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 9. TERMS & COMPREHENSIVE DISCLAIMER PAGE
// ==========================================
export const TermsAndDisclaimerPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#FAF7F2] text-[#181614] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#756F66] hover:text-[#181614] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#a8422b]">
            LEGAL FRAMEWORK &amp; SAFE HARBOR
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial font-bold tracking-tight text-[#181614]">
            Terms of Service &amp; Comprehensive Disclaimers
          </h1>
          <p className="text-sm font-mono-code text-[#756F66]">
            LAST UPDATED: SEPTEMBER 22, 2026 · DOCUMENT VERSION 3.0 · READ CAREFULLY
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-8 text-sm leading-relaxed text-[#524c44]">
          
          {/* Important Warning Notice Block */}
          <div className="p-6 rounded-2xl bg-[#f5efe4] border border-[#e3d9c8] space-y-4">
            <h3 className="font-mono-code text-xs font-bold uppercase tracking-wide text-[#181614] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#a8422b]" />
              CRITICAL NOTICE &amp; BINDING AGREEMENT
            </h3>
            <p className="text-xs leading-relaxed text-[#524c44]">
              PLEASE READ THIS DOCUMENT IN ITS ENTIRETY BEFORE PURCHASING, DOWNLOADING, OR LOGGING INTO ANY DIGITAL WORKBOOK, SPREADSHEET ENGINE, AND DOCUMENT TEMPLATE (&quot;THE PRODUCT&quot;) CREATED BY BOOTEY STUDIO (&quot;THE STUDIO&quot;). 
              BY ACCESSING THE SERVICES AND TOOLKITS, YOU EXPRESSLY ACKNOWLEDGE AND COVENANT THAT YOU UNDERSTAND THESE BINDING LIMITATIONS AND AGREE TO BE BOUND FULLY BY THEM. IF YOU DO NOT AGREE, YOU MUST IMMEDIATELY CEASE AND DESIST ALL USE OF OUR PRODUCTS AND THE PORTAL.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              1. General Acceptance and Conditions of Use
            </h2>
            <p>
              This comprehensive agreement describes the terms under which bootey Studio grants you a limited, personal, non-assignable, and non-exclusive license to utilize digital materials. The Studio provides specialized checklists, spreadsheet templates, tracking protocols, and educational frameworks designed to ease administrative burdens. 
            </p>
            <p>
              Our toolkits are structured to assist users in tracking, arranging, and advocating for themselves during pivotal life stages. They are not configured as autonomous solutions, software systems, or licensed advisory programs.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              2. Absolute Disclaimer of Professional Relationships
            </h2>
            <p className="font-medium text-[#181614]">
              Under no circumstances does your purchase, download, review, or use of any product inside the bootey repository create any form of clinical, psychotherapeutic, fiduciary, medical, attorney-client, or professional advisory relationship between you and bootey Studio or any of its contributors.
            </p>
            <p>
              Our authors, designers, data annotators, and researchers are not operating as your personal clinical therapists, primary care physicians, corporate certified public accountants (CPAs), legal counsel, or financial fiduciary planners. You should never use our products as an alternative to, or replacement for, bespoke human advice from a licensed counselor, medical doctor, tax professional, or legal firm.
            </p>
          </div>

          {/* Domain-Specific Disclaimers Grid */}
          <div className="border-t border-[#EBE4D8] pt-8 space-y-6">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              3. Domain-Specific Disclaimers
            </h2>
            <p>
              Because our digital library covers several specialized and sensitive categories, the following specific disclaimers are legally incorporated as core terms of service:
            </p>

            <div className="space-y-6">
              {/* Category A: Medical & Psychiatric Disclaimer */}
              <div className="p-6 rounded-xl border border-[#EBE4D8] bg-white space-y-3 shadow-xs">
                <span className="inline-block px-2.5 py-1 rounded bg-rose-50 text-rose-800 text-[10px] font-mono-code font-bold uppercase tracking-wider">
                  HEALTH &amp; MEDICAL DISCLAIMER
                </span>
                <h3 className="font-serif font-bold text-base text-[#181614]">
                  Medical Symptoms, Hormonal Decoders &amp; Cancer Care
                </h3>
                <p className="text-xs text-[#524c44] leading-relaxed">
                  Products such as the <strong>Perimenopause Symptom Decoder</strong>, <strong>Medical Symptom War Book</strong>, <strong>IVF Journey Tracker</strong>, and <strong>Cancer Caregiver Command Center</strong> are strictly self-directed diary interfaces. They are intended solely for data-entry organization so that you can self-advocate and share cohesive logs during your doctor visits.
                </p>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  They are NOT diagnostic tools. They do NOT calculate physiological likelihoods, prescribe clinical treatments, evaluate symptom severity, or offer medical interventions. If you are experiencing symptoms or health fluctuations, you must consult immediately with an accredited practitioner or medical group. Never ignore professional medical instructions because of data inside our spreadsheets or PDF journals.
                </p>
              </div>

              {/* Category B: Taxation, Finance & Bookkeeping Disclaimer */}
              <div className="p-6 rounded-xl border border-[#EBE4D8] bg-white space-y-3 shadow-xs">
                <span className="inline-block px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-[10px] font-mono-code font-bold uppercase tracking-wider">
                  TAX &amp; FINANCIAL DISCLAIMER
                </span>
                <h3 className="font-serif font-bold text-base text-[#181614]">
                  Tax Calculations, Pricing Models &amp; Debt Demolition Planners
                </h3>
                <p className="text-xs text-[#524c44] leading-relaxed">
                  Products including the <strong>Quarterly Tax Set-Aside Engine</strong>, <strong>Shoebox Bookkeeping System</strong>, <strong>Debt Demolition FIRE Planner</strong>, <strong>Honest Numbers Pricing Kit</strong>, and <strong>Couples Money Dashboard</strong> utilize fixed arithmetic structures based on published IRS brackets and basic bookkeeping conventions.
                </p>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  These spreadsheets provide rough mathematical projections based on your active inputs. They are NOT certified CPA software programs, do NOT constitute official financial audit sheets, and do NOT offer tax minimization strategies or investment planning advice. Tax laws shift and vary by locality and entity structure. You must cross-reference all formulas and calculated outputs with a licensed tax accountant before filing returns or making business choices.
                </p>
              </div>

              {/* Category C: Real Estate & Rental Revenue Disclaimer */}
              <div className="p-6 rounded-xl border border-[#EBE4D8] bg-white space-y-3 shadow-xs">
                <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-[10px] font-mono-code font-bold uppercase tracking-wider">
                  REAL ESTATE &amp; INVESTMENT DISCLAIMER
                </span>
                <h3 className="font-serif font-bold text-base text-[#181614]">
                  Short-Term Rental Revenue Command Centers
                </h3>
                <p className="text-xs text-[#524c44] leading-relaxed">
                  Our <strong>STR Revenue Command Center</strong> helps real estate operators structure their occupancy and cash-flow projections. 
                </p>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  This tool calculates mathematical summaries based on historical input values provided by you. It is NOT a financial prospectus, does NOT guarantee property yields, and does NOT constitute real estate valuation advice. Property performance is subject to unpredictable market conditions, municipal zoning rules, platform algorithm shifts, and macroeconomics. bootey is not responsible for any investment decisions or operating losses incurred.
                </p>
              </div>

              {/* Category D: Legal, Separation & Custody Disclaimer */}
              <div className="p-6 rounded-xl border border-[#EBE4D8] bg-white space-y-3 shadow-xs">
                <span className="inline-block px-2.5 py-1 rounded bg-purple-50 text-purple-800 text-[10px] font-mono-code font-bold uppercase tracking-wider">
                  LEGAL DISCLAIMER
                </span>
                <h3 className="font-serif font-bold text-base text-[#181614]">
                  Divorce Asset splits, Survival Kits &amp; Case Trackers
                </h3>
                <p className="text-xs text-[#524c44] leading-relaxed">
                  Products such as the <strong>Divorce Finance Asset Split</strong>, <strong>Divorce Financial Survival Kit</strong>, and <strong>Immigration Case Deadline Tracker</strong> are organizational workbooks and calendars.
                </p>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  They do NOT represent legal counsel, do NOT act as mediation sheets, and do NOT constitute legal filings or advice. Marital division rules, community property statutes, and immigration thresholds differ significantly across jurisdictions and court systems. Any outputs are mathematical reflections of your data inputs and should be audited by licensed attorneys before establishing binding separation agreements.
                </p>
              </div>

              {/* Category E: Mental Health, Grief & Transition Disclaimer */}
              <div className="p-6 rounded-xl border border-[#EBE4D8] bg-white space-y-3 shadow-xs">
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-[10px] font-mono-code font-bold uppercase tracking-wider">
                  MENTAL HEALTH &amp; SELF-HELP DISCLAIMER
                </span>
                <h3 className="font-serif font-bold text-base text-[#181614]">
                  Breakup Recovery, Caregiver Burnout &amp; Grief Journals
                </h3>
                <p className="text-xs text-[#524c44] leading-relaxed">
                  Our trackers and journals (<strong>90Day Breakup Recovery Protocol</strong>, <strong>Pet Loss Grief Journal</strong>, <strong>Caregiver Burnout Recovery Kit</strong>, <strong>Threshold Journal</strong>, etc.) are structured self-guided logs.
                </p>
                <p className="text-xs text-[#756F66] leading-relaxed">
                  These materials are created to assist with self-reflection and structure during difficult times. They are NOT psychiatric evaluation diagnostics, medical tools, clinical therapy sessions, or emergency response resources. If you are experiencing mental health crises or feelings of despair, please seek professional support from a licensed clinic, physician, or local helpline immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              4. Accuracy, No Warranties, &quot;As Is&quot; Delivery
            </h2>
            <p>
              THE DIGITAL TOOLS ARE PROVIDED TO THE LICENSEE &quot;AS IS&quot; AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, THE STUDIO EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, WITH RESPECT TO THE PRODUCTS, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p>
              We try to ensure our formulas are robust and tax calculations match official codes, but we do not warrant that calculations are free from minor formatting errors or compatibility bugs across all spreadsheet platforms. The user assumes the entire risk of verifying mathematical results before basing critical financial, medical, or legal decisions on them.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              5. Intellectual Property Rights and Permitted Usage
            </h2>
            <p>
              When you purchase a toolkit, bootey grants you a single-seat personal license. All copyright, structural programming, visual layouts, visual styling, text descriptions, and underlying logic remains the sole intellectual property of bootey Studio. 
            </p>
            <p>
              You may customize, modify, and export individual pages for your personal use or standard client consulting delivery (e.g., printing clinical templates for your therapy clients). However, you are strictly prohibited from re-selling, re-licensing, packaging, or distributing raw files (XLSX, Canva links, PDF editable templates) on shared servers, public drives, or online marketplaces.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              6. Limitation of Liability and Indemnification
            </h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BOOTEY STUDIO, ITS DIRECTORS, ASSOCIATES, EMPLOYEES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES (INCLUDING, BUT NOT LIMITED TO, LOSS OF REVENUE, LOSS OF PROFITS, PROPERTY DAMAGE, MEDICAL COMPLICATIONS, DIVORCE SETTLEMENT REDUCTIONS, BUSINESS INTERRUPTION, OR TAX PENALTIES) ARISING OUT OF OR IN ANY WAY RELATED TO YOUR USE OF THE DIGITAL PRODUCTS.
            </p>
            <p>
              You agree to defend, indemnify, and hold harmless the Studio and its contributors from and against any and all claims, liabilities, losses, costs, or damages resulting from your misuse of the digital products, reliance on calculated outputs, or breach of these terms.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              7. Technical Requirements and Compatibility
            </h2>
            <p>
              Our spreadsheets are tested across primary office suites (Excel Web, Excel Desktop, Google Sheets, and Apple Numbers). However, certain legacy systems, mobile applications, or customized readers may not support advanced formulas. It is the user&#39;s responsibility to maintain compatible hardware and software. Please reference our <strong>Format Guide</strong> for assistance with importing files into your preferred platforms.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              8. Digital Fulfillment and Refund Policy
            </h2>
            <p>
              Due to the immediate digital fulfillment and irrevocability of downloadable ZIP packages containing unlocked templates, bootey does not offer refunds once an order is placed and files are unlocked. We encourage buyers to explore all product previews and documentation prior to checkout. Our support team is always available to help at <a href="mailto:o88gfdde@gmail.com" className="underline text-[#181614] hover:text-[#a8422b]">o88gfdde@gmail.com</a> should you need any technical assistance with accessing your files.
            </p>
          </div>

          <div className="border-t border-[#EBE4D8] pt-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-[#181614]">
              9. General Provisions and Dispute Resolution
            </h2>
            <p>
              These terms are governed exclusively by the laws of the State of Washington, USA, without regard to conflict of laws principles. Any disputes, claims, or legal actions shall be resolved in the state and federal courts located in Seattle, Washington. If any portion of this agreement is deemed invalid or unenforceable, the remaining terms shall continue in full force and effect.
            </p>
          </div>

          {/* Verification Signature */}
          <div className="p-6 rounded-2xl bg-[#EBE4D8]/30 border border-[#d3cbbd] text-center space-y-2">
            <h4 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#181614]">
              OFFICIALLY REGISTERED AND APPROVED
            </h4>
            <p className="text-xs text-[#524c44] leading-relaxed">
              This document is binding across all transaction portals linked to bootey.co and bootey Studio Ltd.
            </p>
            <p className="text-[10px] font-mono-code text-[#756F66] pt-1">
              REGISTRATION ID: BT-LEGAL-2026-3.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


