import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const LicensingSection: React.FC = () => {
  return (
    <section id="licensing-section" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#EBE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 3 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono-code font-bold tracking-[0.2em] text-[#a8422b] uppercase">
            LICENSING
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#181614] leading-tight tracking-tight">
            Purchase once, <span className="italic text-[#a8422b]">use forever</span>
          </h2>

          <p className="text-sm sm:text-base text-[#756F66]">
            Plain language. No legal labyrinths.
          </p>
        </div>

        {/* 3 Licensing Columns matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto">
          {/* Card 01 Personal */}
          <div className="space-y-4">
            <div className="text-sm font-mono-code font-bold text-[#a8422b]">
              01
            </div>
            <h3 className="text-2xl font-editorial font-normal text-[#181614]">
              Personal
            </h3>
            <p className="text-xs sm:text-sm text-[#756F66] leading-relaxed">
              Every toolkit is licensed for your individual use. Read it, apply it, keep it on your devices. You may not resell, redistribute, or publish the files.
            </p>
          </div>

          {/* Card 02 AI-Assisted */}
          <div className="space-y-4">
            <div className="text-sm font-mono-code font-bold text-[#a8422b]">
              02
            </div>
            <h3 className="text-2xl font-editorial font-normal text-[#181614]">
              AI-Assisted
            </h3>
            <p className="text-xs sm:text-sm text-[#756F66] leading-relaxed">
              Toolkits are developed with AI research and editorial synthesis, then rigorously structured by human editors. We don't pretend otherwise.
            </p>
          </div>

          {/* Card 03 Attribution */}
          <div className="space-y-4">
            <div className="text-sm font-mono-code font-bold text-[#a8422b]">
              03
            </div>
            <h3 className="text-2xl font-editorial font-normal text-[#181614]">
              Attribution
            </h3>
            <p className="text-xs sm:text-sm text-[#756F66] leading-relaxed">
              If you cite concepts, frameworks, or data from a toolkit in your own public work, a mention of bootey is appreciated — never legally required.
            </p>
          </div>
        </div>

        {/* Footer Commercial Inquiry Note */}
        <div className="mt-16 text-center text-xs text-[#756F66]">
          <span>Questions about commercial or team licensing? </span>
          <a
            href="mailto:o88gfdde@gmail.com"
            className="text-[#181614] hover:text-[#a8422b] font-medium underline inline-flex items-center gap-0.5 ml-1 transition-colors"
          >
            <span>o88gfdde@gmail.com</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
