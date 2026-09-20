import React from 'react';

export const LicensingSection: React.FC = () => {
  return (
    <section id="licensing-section" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#EBE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE4D8] text-[#181614] text-xs font-mono-code font-semibold tracking-wider uppercase">
            CLEAR, HONEST OWNERSHIP
          </div>

          <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-[#181614] leading-tight">
            Purchase once, use forever.
          </h2>

          <p className="text-base sm:text-lg text-[#756F66] max-w-2xl mx-auto leading-relaxed">
            Every bootey license comes with a personal, non-exclusive lifetime agreement. No subscriptions, no renewal fees, no surprise terms.
          </p>
        </div>

        {/* 3 Licensing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 01 */}
          <div className="bg-white rounded-2xl p-8 border border-[#EBE4D8] shadow-xs space-y-4 hover:border-[#181614] transition-all">
            <div className="text-2xl font-editorial font-bold text-[#b4532a]">
              01
            </div>
            <h3 className="text-xl font-editorial font-bold text-[#181614]">
              Personal & Professional Use
            </h3>
            <p className="text-xs sm:text-sm text-[#756F66] leading-relaxed">
              Use bootey across your personal devices, creative workflow, and client projects. Build local encrypted vaults, organize resources, and run your daily operations without recurring license checks.
            </p>
          </div>

          {/* Card 02 */}
          <div className="bg-white rounded-2xl p-8 border border-[#EBE4D8] shadow-xs space-y-4 hover:border-[#181614] transition-all">
            <div className="text-2xl font-editorial font-bold text-[#b4532a]">
              02
            </div>
            <h3 className="text-xl font-editorial font-bold text-[#181614]">
              Native Architecture & Offline First
            </h3>
            <p className="text-xs sm:text-sm text-[#756F66] leading-relaxed">
              bootey is engineered for instant execution and total privacy. Zero telemetry, zero cloud accounts, and zero data leakage. Everything remains securely stored on your local disk.
            </p>
          </div>

          {/* Card 03 */}
          <div className="bg-white rounded-2xl p-8 border border-[#EBE4D8] shadow-xs space-y-4 hover:border-[#181614] transition-all">
            <div className="text-2xl font-editorial font-bold text-[#b4532a]">
              03
            </div>
            <h3 className="text-xl font-editorial font-bold text-[#181614]">
              Single Payment, Zero Subscriptions
            </h3>
            <p className="text-xs sm:text-sm text-[#756F66] leading-relaxed">
              We reject recurring SaaS subscription business models. You purchase your license once, download your installer (.dmg or .exe), and own the software outright for life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
