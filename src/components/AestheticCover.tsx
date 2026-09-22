import React from 'react';
import { Toolkit } from '../types';

interface AestheticCoverProps {
  toolkit: Toolkit;
  size?: 'thumbnail' | 'grid' | 'large' | 'fullscreen';
  className?: string;
  onClick?: () => void;
}

export const AestheticCover: React.FC<AestheticCoverProps> = ({
  toolkit,
  size = 'grid',
  className = '',
  onClick,
}) => {
  const isLarge = size === 'large' || size === 'fullscreen';
  const isThumbnail = size === 'thumbnail';
  const variant = toolkit.coverMeta?.styleVariant || 'glp1';

  // Base paper container styles with realistic elevation and tactile texture
  const containerClasses = `relative aspect-[3/4] w-full overflow-hidden select-none transition-all duration-300 ${
    isLarge
      ? 'rounded-2xl shadow-2xl ring-1 ring-[#181614]/10'
      : isThumbnail
      ? 'rounded-lg shadow-sm'
      : 'rounded-xl shadow-md hover:shadow-xl ring-1 ring-[#181614]/5'
  } ${onClick ? 'cursor-pointer' : ''} ${className}`;

  // Render variant-specific content
  const renderCoverContent = () => {
    switch (variant) {
      // ----------------------------------------------------
      // 1. GLP-1 Breakthrough Guide (BT — 01)
      // ----------------------------------------------------
      case 'glp1':
        return (
          <div className="absolute inset-0 bg-[#FAF7F2] p-5 sm:p-7 flex flex-col justify-between text-[#181614]">
            {/* Subtle paper grid/linear accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* Top Bar: Code & Popular Badge */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#E0D7C8] pb-2.5">
              <span className="font-mono-code text-[11px] sm:text-xs font-bold tracking-wider text-[#181614]">
                {toolkit.code}
              </span>
              {toolkit.coverBadge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#181614] text-[#FAF7F2] text-[9px] sm:text-[10px] font-mono-code font-bold tracking-wider">
                  {toolkit.coverBadge}
                </span>
              )}
            </div>

            {/* Middle Section: Manual Title & Subtitle */}
            <div className="relative z-10 my-auto space-y-2 sm:space-y-3">
              <div className="text-[9px] sm:text-[10px] font-mono-code tracking-[0.2em] text-[#756F66] uppercase">
                {toolkit.coverMeta?.superTitle || 'PROTOCOL MANUAL · DEEP-DIVE EDITION'}
              </div>

              <div className="inline-block px-2 py-0.5 border border-[#181614] text-[9px] sm:text-[10px] font-mono-code font-bold tracking-wider text-[#181614]">
                {toolkit.coverMeta?.subHeader || 'PROTOCOL GUIDE'}
              </div>

              <h3
                className={`font-editorial font-bold text-[#181614] leading-[1.1] ${
                  isLarge ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-lg sm:text-xl'
                }`}
              >
                The GLP-1 Plateau Breakthrough Guide
              </h3>

              <p className="text-[11px] sm:text-xs text-[#a8422b] font-medium leading-tight">
                {toolkit.coverMeta?.tagline || toolkit.subtitle}
              </p>

              {isLarge && (
                <p className="text-xs text-[#524c44] leading-relaxed line-clamp-3 pt-1">
                  You lost 12–18% of your body weight. Then the scale stopped moving. This
                  guide gives you the four documented interventions in execution order.
                </p>
              )}
            </div>

            {/* Bottom Section: 4 Mechanism Pills & Volume Footer */}
            <div className="relative z-10 space-y-2.5 pt-2 border-t border-[#E0D7C8]">
              <div className="flex flex-wrap gap-1">
                {toolkit.highlightMechanisms.slice(0, 4).map((mech) => (
                  <span
                    key={mech}
                    className="px-1.5 py-0.5 rounded bg-[#ECE4D5] text-[8px] sm:text-[9px] font-mono-code font-semibold tracking-wider text-[#181614]"
                  >
                    {mech}
                  </span>
                ))}
              </div>
              <div className="text-[8px] sm:text-[9px] font-mono-code text-[#887f73] truncate">
                {toolkit.coverMeta?.volumeNotice || 'Volume 1 of the Breakthrough System'}
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------
      // 2. Perimenopause Symptom Decoder (BT — 02)
      // ----------------------------------------------------
      case 'decoder':
        return (
          <div className="absolute inset-0 bg-[#FAF7F2] p-5 sm:p-7 flex flex-col justify-between text-[#181614]">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E0D7C8] pb-2">
              <span className="font-mono-code text-[11px] sm:text-xs font-bold text-[#181614]">
                {toolkit.code}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono-code text-[#a8422b] uppercase tracking-wider">
                Hormonal Health
              </span>
            </div>

            {/* Content */}
            <div className="my-auto space-y-2.5">
              <div className="text-[8px] sm:text-[9px] font-mono-code tracking-[0.18em] text-[#756F66] uppercase">
                THE MANUAL YOUR DOCTOR SHOULD HAVE GIVEN YOU
              </div>

              <h3
                className={`font-editorial font-bold text-[#181614] leading-[1.1] ${
                  isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                }`}
              >
                The Perimenopause Symptom Decoder
              </h3>

              {/* Red Accent Line */}
              <div className="w-12 h-0.5 bg-[#a8422b]" />

              <p className="text-[10px] sm:text-xs text-[#524c44] leading-relaxed line-clamp-3">
                Your symptoms are real. Your hormones are shifting. Maps 34 symptoms to
                five hormonal patterns with doctor-ready scripts.
              </p>
            </div>

            {/* 3 Metric Cards at Bottom */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[#E0D7C8]">
              <div className="p-1.5 rounded bg-[#F0E8DC] text-center">
                <div className="text-[11px] sm:text-xs font-bold font-mono-code text-[#181614]">
                  34
                </div>
                <div className="text-[7px] sm:text-[8px] font-mono-code text-[#756F66] leading-tight">
                  SYMPTOMS
                </div>
              </div>
              <div className="p-1.5 rounded bg-[#F0E8DC] text-center">
                <div className="text-[11px] sm:text-xs font-bold font-mono-code text-[#181614]">
                  5
                </div>
                <div className="text-[7px] sm:text-[8px] font-mono-code text-[#756F66] leading-tight">
                  PATTERNS
                </div>
              </div>
              <div className="p-1.5 rounded bg-[#F0E8DC] text-center">
                <div className="text-[11px] sm:text-xs font-bold font-mono-code text-[#181614]">
                  1 PAGE
                </div>
                <div className="text-[7px] sm:text-[8px] font-mono-code text-[#756F66] leading-tight">
                  ACTION PLAN
                </div>
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------
      // 3. Dark Minimal Elegance (BT — 03, 12, 17, 19, 22, 27)
      // ----------------------------------------------------
      case 'dark-minimal': {
        const bgHex = toolkit.colorTheme.primary || '#163832';
        return (
          <div
            className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between text-white"
            style={{ backgroundColor: bgHex }}
          >
            {/* Outer & Inner Framed Borders */}
            <div className="absolute inset-3 sm:inset-4 border border-white/20 rounded-lg pointer-events-none" />
            <div className="absolute inset-4 sm:inset-5 border border-white/10 rounded pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono-code text-[11px] sm:text-xs font-bold tracking-widest text-white/90">
                {toolkit.code}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono-code tracking-widest text-white/60 uppercase">
                {toolkit.categoryLabel}
              </span>
            </div>

            {/* Centerpiece Title */}
            <div className="relative z-10 my-auto text-center px-2 space-y-2">
              <div className="text-[8px] sm:text-[9px] font-mono-code tracking-[0.25em] text-white/50 uppercase">
                {toolkit.coverMeta?.superTitle || 'CORE PROTOCOL MANUAL'}
              </div>
              <h3
                className={`font-editorial font-bold text-white tracking-wide leading-tight ${
                  isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                }`}
              >
                {toolkit.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-white/70 italic font-editorial">
                {toolkit.subtitle}
              </p>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono-code text-white/50 border-t border-white/15 pt-2">
              <span>bootey® EDITION</span>
              <span>{toolkit.formats.join(' · ')}</span>
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 4. Reduction Protocol (BT — 04)
      // ----------------------------------------------------
      case 'reduction':
        return (
          <div className="absolute inset-0 bg-[#FAF7F2] p-5 sm:p-7 flex flex-col justify-between text-[#181614]">
            <div className="flex items-center justify-between border-b border-[#E0D7C8] pb-2">
              <span className="font-mono-code text-[11px] sm:text-xs font-bold text-[#181614]">
                {toolkit.code}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono-code text-[#a8422b]">
                KIDS EDITION
              </span>
            </div>

            <div className="my-auto space-y-2.5">
              <div className="text-[8px] sm:text-[9px] font-mono-code tracking-[0.2em] text-[#756F66] uppercase">
                THE SCREEN-TIME REDUCTION PROTOCOL
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono-code text-[#a8422b] font-bold">
                A 30-DAY FAMILY SYSTEM
              </div>
              <h3
                className={`font-editorial font-bold text-[#181614] leading-[1.1] ${
                  isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                }`}
              >
                The Screen-Time <span className="italic text-[#a8422b]">Reduction</span>{' '}
                Protocol
              </h3>
              <p className="text-[10px] sm:text-xs text-[#524c44] leading-relaxed line-clamp-3">
                A step-by-step roadmap walking your child down to 90 minutes a day with
                word-for-word meltdown scripts.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[#E0D7C8]">
              <div className="p-1 rounded bg-[#F0E8DC] text-center">
                <div className="text-[11px] font-bold font-mono-code">30 DAYS</div>
                <div className="text-[7px] text-[#756F66]">START TO FINISH</div>
              </div>
              <div className="p-1 rounded bg-[#F0E8DC] text-center">
                <div className="text-[11px] font-bold font-mono-code">4 CUTS</div>
                <div className="text-[7px] text-[#756F66]">WEEKLY TARGETS</div>
              </div>
              <div className="p-1 rounded bg-[#F0E8DC] text-center">
                <div className="text-[11px] font-bold font-mono-code text-[#a8422b]">
                  90min
                </div>
                <div className="text-[7px] text-[#756F66]">END STATE</div>
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------
      // 5. Postpartum Identity Rebuild / Becoming (BT — 05)
      // ----------------------------------------------------
      case 'becoming':
        return (
          <div className="absolute inset-0 bg-[#F7F4EE] p-5 sm:p-7 flex flex-col justify-between text-[#181614]">
            {/* Elegant warm organic circle watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-[#EDE5D8]/50 blur-xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between border-b border-[#DFD6C8] pb-2">
              <span className="font-mono-code text-[11px] sm:text-xs font-bold">
                {toolkit.code}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono-code text-[#756F66] uppercase">
                Section One
              </span>
            </div>

            <div className="relative z-10 my-auto space-y-3 text-center sm:text-left">
              <div className="text-[8px] sm:text-[9px] font-mono-code tracking-[0.2em] text-[#756F66] uppercase">
                POSTPARTUM IDENTITY REBUILD
              </div>
              <h3
                className={`font-editorial font-bold text-[#181614] leading-[1.15] ${
                  isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                }`}
              >
                Identity Reflection &{' '}
                <span className="italic text-[#a8422b] font-normal">Becoming</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-[#5c544b] italic font-editorial leading-relaxed">
                "You are not lost. You are becoming."
              </p>
              {isLarge && (
                <p className="text-xs text-[#756F66] leading-relaxed">
                  A guided journal for the woman you were, the mother you are becoming,
                  and the self waiting on the other side.
                </p>
              )}
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#DFD6C8] text-[8px] sm:text-[9px] font-mono-code text-[#756F66]">
              <span>60 PAGES · GUIDED JOURNAL</span>
              <span>PDF BUNDLE</span>
            </div>
          </div>
        );

      // ----------------------------------------------------
      // 6. Breakup Recovery (BT — 06)
      // ----------------------------------------------------
      case 'breakup':
        return (
          <div className="absolute inset-0 bg-[#FAF7F2] p-5 sm:p-7 flex flex-col justify-between text-[#181614]">
            {/* Concentric fine line circles */}
            <div className="absolute right-3 bottom-12 w-28 h-28 rounded-full border border-[#D5CABE] pointer-events-none opacity-40" />
            <div className="absolute right-7 bottom-16 w-20 h-20 rounded-full border border-[#D5CABE] pointer-events-none opacity-40" />

            <div className="relative z-10 flex items-center justify-between border-b border-[#E0D7C8] pb-2">
              <span className="font-mono-code text-[11px] sm:text-xs font-bold">
                {toolkit.code}
              </span>
              {toolkit.coverBadge && (
                <span className="px-2 py-0.5 rounded-full bg-[#181614] text-white text-[9px] font-mono-code font-bold">
                  {toolkit.coverBadge}
                </span>
              )}
            </div>

            <div className="relative z-10 my-auto space-y-2.5">
              <div className="text-[8px] sm:text-[9px] font-mono-code tracking-[0.2em] text-[#756F66] uppercase">
                CORE PROGRAM · DIGITAL WORKBOOK
              </div>
              <div className="text-[9px] font-mono-code text-[#a8422b] font-bold">
                A DAILY PROTOCOL · 90 DAYS · 3 PHASES
              </div>
              <h3
                className={`font-editorial font-bold text-[#181614] leading-[1.1] ${
                  isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                }`}
              >
                The 90-Day Breakup Recovery Protocol
              </h3>
              <p className="text-[10px] sm:text-xs text-[#524c44] leading-relaxed line-clamp-3">
                A structured journal for rebuilding, one small day at a time. Ninety daily
                micro-interventions and no-contact tracking.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#E0D7C8] text-[8px] sm:text-[9px] font-mono-code text-[#756F66]">
              <span>PDF & NOTION OS</span>
              <span>NO-CONTACT FORTRESS</span>
            </div>
          </div>
        );

      // ----------------------------------------------------
      // 7. Terracotta / FIRE Money Mindset (BT — 11)
      // ----------------------------------------------------
      case 'fire':
        return (
          <div className="absolute inset-0 bg-[#FAF7F2] flex flex-col justify-between text-[#181614]">
            {/* Rich Terracotta Top Section */}
            <div className="bg-[#b4532a] text-white p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[11px] sm:text-xs font-bold">
                  {toolkit.code}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-[#b4532a] text-[9px] font-mono-code font-bold">
                  POPULAR
                </span>
              </div>
              <div className="text-[8px] sm:text-[9px] font-mono-code tracking-widest text-white/80 uppercase">
                DEBT DEMOLITION & FIRE · SECTION 06 / 07
              </div>
            </div>

            {/* Bottom Cream Section */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
              <div className="space-y-1.5 my-auto">
                <div className="text-[8px] sm:text-[9px] font-mono-code text-[#756F66] uppercase tracking-wider">
                  THE INNER ARCHITECTURE
                </div>
                <h3
                  className={`font-editorial font-bold text-[#181614] leading-[1.1] ${
                    isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                  }`}
                >
                  Money Mindset &{' '}
                  <span className="italic text-[#b4532a]">Manifestation</span> Journal
                </h3>
                <p className="text-[10px] sm:text-xs text-[#524c44] leading-relaxed line-clamp-2">
                  The emotional infrastructure that keeps you enrolled when the math gets
                  hard.
                </p>
              </div>

              <div className="pt-2 border-t border-[#E0D7C8] flex items-center justify-between text-[8px] sm:text-[9px] font-mono-code text-[#b4532a] font-bold">
                <span>PAINKILLERS, NOT VITAMINS · 06</span>
                <span>PDF + CSV</span>
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------
      // 8. Champagne Pearl / Wedding Mega Bundle (BT — 28)
      // ----------------------------------------------------
      case 'wedding':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#EFEBE4] to-[#DDD5C7] p-5 sm:p-7 flex flex-col justify-between text-[#181614]">
            <div className="flex items-center justify-between border-b border-[#D8CEBE] pb-2">
              <span className="font-mono-code text-[11px] sm:text-xs font-bold">
                {toolkit.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#181614] text-[#FAF7F2] text-[9px] font-mono-code font-bold tracking-wider">
                MEGA BUNDLE
              </span>
            </div>

            <div className="my-auto space-y-2.5">
              <div className="text-[8px] sm:text-[9px] font-mono-code tracking-[0.2em] text-[#756F66] uppercase">
                THE DESIGNER COLLECTION
              </div>
              <h3
                className={`font-editorial font-bold text-[#181614] leading-[1.1] ${
                  isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                }`}
              >
                How to Use This Bundle.
              </h3>
              <div className="text-[10px] sm:text-xs font-serif italic text-[#a8422b]">
                A step-by-step orientation for buyers
              </div>
              <p className="text-[10px] sm:text-xs text-[#524c44] leading-relaxed line-clamp-3">
                Five pages. Read them once before you start customizing. You'll know
                exactly what each file is for and avoid costly mistakes.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#D8CEBE] text-[8px] sm:text-[9px] font-mono-code text-[#756F66]">
              <span>50+ SUITE TEMPLATES</span>
              <span>CANVA & FIGMA</span>
            </div>
          </div>
        );

      // ----------------------------------------------------
      // 9. Default Editorial Layout for all other variants
      // ----------------------------------------------------
      default:
        return (
          <div className="absolute inset-0 bg-[#FAF7F2] p-5 sm:p-7 flex flex-col justify-between text-[#181614]">
            <div className="flex items-center justify-between border-b border-[#E0D7C8] pb-2">
              <span className="font-mono-code text-[11px] sm:text-xs font-bold">
                {toolkit.code}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono-code text-[#a8422b] uppercase tracking-wider">
                {toolkit.categoryLabel}
              </span>
            </div>

            <div className="my-auto space-y-2">
              {toolkit.coverMeta?.superTitle && (
                <div className="text-[8px] sm:text-[9px] font-mono-code tracking-[0.18em] text-[#756F66] uppercase">
                  {toolkit.coverMeta.superTitle}
                </div>
              )}
              <h3
                className={`font-editorial font-bold text-[#181614] leading-[1.15] ${
                  isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                }`}
              >
                {toolkit.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-[#a8422b] font-medium leading-tight">
                {toolkit.subtitle}
              </p>
              {isLarge && (
                <p className="text-xs text-[#524c44] leading-relaxed line-clamp-3 pt-1">
                  {toolkit.description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E0D7C8] text-[8px] sm:text-[9px] font-mono-code text-[#756F66]">
              <span>{toolkit.pages} PAGES</span>
              <span>{toolkit.formats[0]}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={containerClasses} onClick={onClick}>
      {renderCoverContent()}
    </div>
  );
};
