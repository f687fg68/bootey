import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onBrowseLibrary: () => void;
  onViewLicensing: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBrowseLibrary,
  onViewLicensing,
}) => {
  return (
    <section id="hero" className="relative pt-10 pb-20 sm:pt-14 sm:pb-24 overflow-hidden bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Hero Typography, CTAs & Stats */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-7 pt-2">
            {/* Category Eyebrow matching Screenshot */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code font-bold tracking-[0.22em] text-[#a8422b] uppercase">
                PREMIUM DIGITAL TOOLKITS · AI-ASSISTED
              </span>
            </div>

            {/* Headline with exact typography and italic terracotta accent */}
            <h1 className="text-5xl sm:text-6xl lg:text-[74px] font-editorial font-normal tracking-tight text-[#181614] leading-[1.04]">
              Curated <span className="italic text-[#a8422b] font-normal">digital</span>
              <br />
              toolkits.
              <br />
              Yours instantly.
            </h1>

            {/* Subhead with exact copywriting from Screenshot */}
            <p className="text-base sm:text-lg text-[#756F66] font-normal leading-relaxed max-w-lg">
              28 premium toolkits across health, finance, career, family and more. Thoughtfully organized, instantly downloadable — no accounts, no fees.
            </p>

            {/* Action Buttons matching Screenshot */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onBrowseLibrary}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#181614] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase hover:bg-[#a8422b] transition-colors shadow-md group cursor-pointer"
                id="hero-browse-library-btn"
              >
                <span>BROWSE THE LIBRARY</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onViewLicensing}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF7F2] border border-[#d8cebe] text-[#181614] font-semibold text-xs tracking-wider uppercase hover:border-[#181614] transition-all shadow-2xs cursor-pointer"
                id="hero-licensing-btn"
              >
                <span>LICENSING</span>
              </button>
            </div>

            {/* Bottom Stats matching Screenshot 1 */}
            <div className="pt-10 mt-6 border-t border-[#EBE4D8] grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-editorial font-normal text-[#181614]">
                  28
                </div>
                <div className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-[#756F66]">
                  TOOLKITS
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-editorial font-normal text-[#181614]">
                  7
                </div>
                <div className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-[#756F66]">
                  CATEGORIES
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-editorial font-normal text-[#181614]">
                  Premium
                </div>
                <div className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-[#756F66]">
                  ALWAYS
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical / Editorial Digital Product Cards (Exact Replica of Screenshot 1) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Left Tall Card: The GLP-1 Plateau Breakthrough Guide */}
              <div className="md:col-span-6 lg:col-span-6 xl:col-span-7 rounded-2xl bg-white border border-[#e2ded6] shadow-xl overflow-hidden flex flex-col justify-between relative">
                {/* Blueprint grid background texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8f0fe_1px,transparent_1px),linear-gradient(to_bottom,#e8f0fe_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 pointer-events-none" />

                <div className="p-6 sm:p-7 space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    {/* Top Eyebrow & Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono-code font-bold tracking-widest text-[#416982] uppercase">
                        PROTOCOL MANUAL · DEEP-DIVE EDITION
                      </span>
                      <span className="text-[9px] font-mono-code text-[#1f5b7d] border border-[#1f5b7d]/40 rounded px-1.5 py-0.5 font-semibold">
                        PROTOCOL GUIDE
                      </span>
                    </div>

                    {/* Big Serif Title */}
                    <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#142330] leading-[1.1]">
                      The GLP-1
                      <br />
                      Plateau
                      <br />
                      Breakthrough
                      <br />
                      Guide
                    </h2>

                    {/* Blue Subhead */}
                    <p className="text-xs font-semibold text-[#1d5b79] leading-snug">
                      The four-mechanism protocol for the month 6–9 weight-loss stall
                    </p>

                    {/* Explanatory Paragraph */}
                    <p className="text-[11px] text-[#556977] leading-relaxed">
                      You lost 12–18% of your body weight. Then the scale stopped moving for a month. This guide explains exactly why that stall happens on GLP-1 therapy — and gives you the four documented interventions, in execution order, that address it. No motivational filler. Mechanisms, protocols, and decision rules.
                    </p>

                    {/* Pill Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-1 rounded bg-[#edf4f8] border border-[#d2e0ea] text-[#33556c] text-[9px] font-mono-code font-semibold tracking-wide uppercase">
                        PROTEIN-CYCLING
                      </span>
                      <span className="px-2 py-1 rounded bg-[#edf4f8] border border-[#d2e0ea] text-[#33556c] text-[9px] font-mono-code font-semibold tracking-wide uppercase">
                        RESISTANCE TRAINING
                      </span>
                      <span className="px-2 py-1 rounded bg-[#edf4f8] border border-[#d2e0ea] text-[#33556c] text-[9px] font-mono-code font-semibold tracking-wide uppercase">
                        MICRO-TITRATION TIMING
                      </span>
                      <span className="px-2 py-1 rounded bg-[#edf4f8] border border-[#d2e0ea] text-[#33556c] text-[9px] font-mono-code font-semibold tracking-wide uppercase">
                        METABOLIC RESET
                      </span>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="pt-3 border-t border-[#e2e8f0]/80 text-[9px] text-[#788a96] space-y-0.5 font-mono-code">
                    <div>The GLP-1 Plateau Breakthrough Guide · Volume 1 of the Breakthrough Systems...</div>
                    <div>Educational protocol — designed to be reviewed with your prescribing physician.</div>
                  </div>
                </div>

                {/* Bottom Dark Overlay Strip */}
                <div className="bg-[#414b55] text-white p-4 sm:p-5 relative z-10 border-t border-[#535d67]">
                  <div className="flex items-center justify-between text-[9px] font-mono-code text-white/60 tracking-widest uppercase mb-1">
                    <span>HEALTH & WELLNESS</span>
                    <span>EDITION</span>
                  </div>
                  <div className="text-[8px] font-mono-code text-white/40 tracking-wider uppercase">
                    BREAKTHROUGH SYSTEM · PROTOCOL GUIDE
                  </div>
                  <div className="text-lg font-editorial font-normal text-white tracking-tight mt-0.5">
                    GLP-1 Plateau Breakthrough
                  </div>
                </div>
              </div>

              {/* Right Stacked Column: Money Mindset & Brag Document */}
              <div className="md:col-span-6 lg:col-span-6 xl:col-span-5 flex flex-col gap-5 justify-between">
                {/* Top Card: Money Mindset & Manifestation Journal */}
                <div className="rounded-2xl bg-gradient-to-br from-[#aa422b] via-[#943621] to-[#7c2b18] text-white p-5 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-3 relative z-10">
                    <span className="text-[9px] font-mono-code font-bold tracking-widest text-white/70 uppercase">
                      THE INNER ARCHITECTURE
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-editorial font-bold leading-tight">
                      Money
                      <br />
                      Mindset &
                      <br />
                      Manifestation
                      <br />
                      Journal
                    </h3>

                    <p className="text-[11px] text-white/85 italic leading-relaxed">
                      The emotional infrastructure that keeps you enrolled when the math gets hard — scarcity audits, abundance rituals, vision boards, and 90 days of guided journaling.
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-white/15 text-[9px] text-white/70 space-y-1 relative z-10">
                    <div>20 pages · scarcity audit, affirmations, vision boards, 30 prompts</div>
                    <div>Designed for the FIRE-minded · Print-friendly US Letter</div>

                    <div className="pt-2 flex items-center justify-between font-mono-code text-[9px] text-white/90">
                      <span className="uppercase tracking-wider">FINANCE</span>
                      <span>06</span>
                    </div>
                    <div className="text-sm font-editorial text-white">
                      Debt Demolition Planner
                    </div>
                  </div>
                </div>

                {/* Bottom Card: Evidence, Not Vibes */}
                <div className="rounded-2xl bg-gradient-to-br from-[#eef3f7] to-[#dde6ee] border border-[#cfdbe5] p-5 sm:p-6 shadow-xl flex flex-col justify-between text-[#181614] relative overflow-hidden">
                  <div className="space-y-3 relative z-10">
                    <span className="text-[9px] font-mono-code font-bold tracking-widest text-[#4f6474] uppercase">
                      THE BRAG DOCUMENT - QUICK START
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-[#142330] leading-none">
                      EVIDENCE,
                      <br />
                      NOT VIBES.
                    </h3>

                    {/* 4 Numbered Steps */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#a8422b] text-white text-[9px] font-mono-code font-bold flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <div className="text-[10px] font-bold text-[#142330]">Capture</div>
                          <div className="text-[9px] text-[#556977] leading-tight">Five minutes every Friday. One win, one number.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#a8422b] text-white text-[9px] font-mono-code font-bold flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </span>
                        <div>
                          <div className="text-[10px] font-bold text-[#142330]">Translate</div>
                          <div className="text-[9px] text-[#556977] leading-tight">Turn tasks into impact statements with metrics.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#a8422b] text-white text-[9px] font-mono-code font-bold flex items-center justify-center shrink-0 mt-0.5">
                          3
                        </span>
                        <div>
                          <div className="text-[10px] font-bold text-[#142330]">Assemble</div>
                          <div className="text-[9px] text-[#556977] leading-tight">The builder rolls your quarter into a brief.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#a8422b] text-white text-[9px] font-mono-code font-bold flex items-center justify-center shrink-0 mt-0.5">
                          4
                        </span>
                        <div>
                          <div className="text-[10px] font-bold text-[#142330]">Price</div>
                          <div className="text-[9px] text-[#556977] leading-tight">Market anchors turn scope into a number.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#cbd7e2] text-[9px] font-mono-code text-[#4f6474] flex items-center justify-between">
                    <span className="uppercase tracking-wider">CAREER & CREATOR</span>
                    <span className="font-editorial text-sm text-[#142330] font-normal">
                      The Brag Document
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
