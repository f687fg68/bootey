import os
import sys
import math
import subprocess
import time

WIDTH = 1280
HEIGHT = 720
FPS = 30
TOTAL_FRAMES = 600 # 20 seconds

print(f"Creating screen recording ({WIDTH}x{HEIGHT} @ {FPS}fps, {TOTAL_FRAMES} frames)...")

# Define SVG template base for the bootey desktop workspace
def get_svg(
    search_text="Search 28 toolkits... (⌘K)",
    search_active=False,
    active_tab="reader", # 'reader', 'checklist', 'ai'
    step1_checked=False,
    step2_checked=False,
    highlight_text=False,
    ai_stream_progress=0.0, # 0.0 to 1.0
    export_toast=False
):
    # Tab styling
    reader_bg = "#FFFFFF" if active_tab == "reader" else "transparent"
    reader_fg = "#181614" if active_tab == "reader" else "#756F66"
    reader_weight = "bold" if active_tab == "reader" else "normal"

    check_bg = "#FFFFFF" if active_tab == "checklist" else "transparent"
    check_fg = "#181614" if active_tab == "checklist" else "#756F66"
    check_weight = "bold" if active_tab == "checklist" else "normal"

    ai_bg = "#FFFFFF" if active_tab == "ai" else "transparent"
    ai_fg = "#b4532a" if active_tab == "ai" else "#756F66"
    ai_weight = "bold" if active_tab == "ai" else "normal"

    # Search border
    search_border = "#b4532a" if search_active else "#D8CEBE"
    search_fg = "#181614" if search_active else "#999999"

    # Content area based on active tab
    if active_tab == "reader":
        hl_rect = ""
        if highlight_text:
            hl_rect = '<rect x="400" y="275" width="580" height="24" fill="#FDE68A" opacity="0.6" rx="4"/>'

        content_svg = f"""
        <!-- Protocol Header -->
        <g transform="translate(400, 160)">
          <rect x="0" y="0" width="80" height="22" rx="4" fill="#EBE4D8"/>
          <text x="40" y="15" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#181614" text-anchor="middle">TK-01</text>
          <text x="95" y="15" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#b4532a">METABOLIC &amp; PEPTIDE BIOCHEMISTRY</text>
          <rect x="420" y="0" width="130" height="22" rx="11" fill="#DCFCE7"/>
          <text x="485" y="15" font-family="DejaVu Sans Mono, monospace" font-size="10" font-weight="bold" fill="#166534" text-anchor="middle">✓ Unlocked in Vault</text>
        </g>

        <text x="400" y="220" font-family="DejaVu Serif, Georgia, serif" font-size="28" font-weight="bold" fill="#181614">GLP-1 &amp; GIP Peptide Matrix</text>
        <text x="400" y="248" font-family="DejaVu Sans, Arial, sans-serif" font-size="14" font-weight="bold" fill="#b4532a">Evidence-Based Dosing Schedules &amp; Lean Mass Retention Framework</text>

        <!-- Excerpt callout box -->
        <rect x="400" y="270" width="750" height="115" rx="10" fill="#FFFFFF" stroke="#EBE4D8" stroke-width="1.5"/>
        {hl_rect}
        <text x="420" y="295" font-family="DejaVu Serif, Georgia, serif" font-size="14" font-style="italic" fill="#181614">Executive Protocol Excerpt &amp; Micro-Titration Algorithm:</text>
        <text x="420" y="322" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" fill="#555555">"Administer initial titration phase at 0.25mg subcutaneous weekly for 28 days to saturate receptor kinetics.</text>
        <text x="420" y="342" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" fill="#555555">Ensure minimum 1.8g/kg protein intake paired with resistance training to prevent lean mass catabolism."</text>
        <text x="420" y="365" font-family="DejaVu Sans Mono, monospace" font-size="10" fill="#888888">Clinical Reference: J. Endo. Metab. 2024 · 34 Pages Vector Indexed · 0ms Local Cache</text>

        <!-- Document Architecture grid -->
        <text x="400" y="420" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#756F66">DOCUMENT ARCHITECTURE &amp; MODULES:</text>
        <g transform="translate(400, 435)">
          <rect x="0" y="0" width="360" height="42" rx="8" fill="#F6F0E6" stroke="#EBE4D8" stroke-width="1"/>
          <text x="15" y="25" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#b4532a">→</text>
          <text x="35" y="25" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="bold" fill="#181614">01. Receptor Saturation Kinetics</text>

          <rect x="380" y="0" width="360" height="42" rx="8" fill="#F6F0E6" stroke="#EBE4D8" stroke-width="1"/>
          <text x="395" y="25" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#b4532a">→</text>
          <text x="415" y="25" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="bold" fill="#181614">02. Lean Mass Retention &amp; mTOR</text>

          <rect x="0" y="52" width="360" height="42" rx="8" fill="#F6F0E6" stroke="#EBE4D8" stroke-width="1"/>
          <text x="15" y="77" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#b4532a">→</text>
          <text x="35" y="77" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="bold" fill="#181614">03. Micro-Titration Schedulers</text>

          <rect x="380" y="52" width="360" height="42" rx="8" fill="#F6F0E6" stroke="#EBE4D8" stroke-width="1"/>
          <text x="395" y="77" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#b4532a">→</text>
          <text x="415" y="77" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="bold" fill="#181614">04. Clinical Laboratory Biomarkers</text>
        </g>
        """
    elif active_tab == "checklist":
        # Step 1 box
        s1_bg = "#ECFDF5" if step1_checked else "#FFFFFF"
        s1_border = "#10B981" if step1_checked else "#EBE4D8"
        s1_chk_bg = "#10B981" if step1_checked else "#FFFFFF"
        s1_chk_mark = '<path d="M424 233 L428 237 L436 227" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round"/>' if step1_checked else ''
        s1_text_dec = ' text-decoration="line-through"' if step1_checked else ''
        s1_text_col = "#6B7280" if step1_checked else "#181614"

        # Step 2 box
        s2_bg = "#ECFDF5" if step2_checked else "#FFFFFF"
        s2_border = "#10B981" if step2_checked else "#EBE4D8"
        s2_chk_bg = "#10B981" if step2_checked else "#FFFFFF"
        s2_chk_mark = '<path d="M424 303 L428 307 L436 297" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round"/>' if step2_checked else ''
        s2_text_dec = ' text-decoration="line-through"' if step2_checked else ''
        s2_text_col = "#6B7280" if step2_checked else "#181614"

        content_svg = f"""
        <!-- Checklist View -->
        <g transform="translate(400, 160)">
          <text x="0" y="20" font-family="DejaVu Serif, Georgia, serif" font-size="24" font-weight="bold" fill="#181614">Daily Execution &amp; Protocol Compliance</text>
          <text x="480" y="20" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="#b4532a" font-weight="bold">Auto-saves to local SQLite</text>
        </g>

        <!-- Step 1 -->
        <rect x="400" y="205" width="750" height="60" rx="10" fill="{s1_bg}" stroke="{s1_border}" stroke-width="1.5"/>
        <rect x="420" y="222" width="20" height="20" rx="4" fill="{s1_chk_bg}" stroke="#10B981" stroke-width="1.5"/>
        {s1_chk_mark}
        <text x="455" y="236" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="bold" fill="{s1_text_col}"{s1_text_dec}>Step 01: Verify nitrogen balance and 1.8g/kg lean mass protein allocation</text>
        <text x="455" y="254" font-family="DejaVu Sans Mono, monospace" font-size="10" fill="#756F66">Morning Window · Target: 165g whey / isolate blend · Verified via local journal</text>

        <!-- Step 2 -->
        <rect x="400" y="275" width="750" height="60" rx="10" fill="{s2_bg}" stroke="{s2_border}" stroke-width="1.5"/>
        <rect x="420" y="292" width="20" height="20" rx="4" fill="{s2_chk_bg}" stroke="#10B981" stroke-width="1.5"/>
        {s2_chk_mark}
        <text x="455" y="306" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="bold" fill="{s2_text_col}"{s2_text_dec}>Step 02: Log bio-impedance baseline &amp; review 14-day rolling delta</text>
        <text x="455" y="324" font-family="DejaVu Sans Mono, monospace" font-size="10" fill="#756F66">Pre-Workout · Fasted state weight + visceral fat index</text>

        <!-- Step 3 -->
        <rect x="400" y="345" width="750" height="60" rx="10" fill="#FFFFFF" stroke="#EBE4D8" stroke-width="1.5"/>
        <rect x="420" y="362" width="20" height="20" rx="4" fill="#FFFFFF" stroke="#D8CEBE" stroke-width="1.5"/>
        <text x="455" y="376" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="bold" fill="#181614">Step 03: Initiate micro-titration schedule or 48-hr refeed carb cycle</text>
        <text x="455" y="394" font-family="DejaVu Sans Mono, monospace" font-size="10" fill="#756F66">Protocol Phase 2 · 0.25mg Sub-Q Sunday 20:00</text>

        <!-- Step 4 -->
        <rect x="400" y="415" width="750" height="60" rx="10" fill="#FFFFFF" stroke="#EBE4D8" stroke-width="1.5"/>
        <rect x="420" y="432" width="20" height="20" rx="4" fill="#FFFFFF" stroke="#D8CEBE" stroke-width="1.5"/>
        <text x="455" y="446" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="bold" fill="#181614">Step 04: Generate doctor-ready progress report for clinical review</text>
        <text x="455" y="464" font-family="DejaVu Sans Mono, monospace" font-size="10" fill="#756F66">Monthly Review · Export encrypted PDF directly</text>
        """
    else: # AI Synthesizer
        # Streaming text calculation
        full_p1 = "✓ Protocol Synthesized: Caloric surplus window shifted to Thursday and Sunday."
        full_p2 = "Cold immersion timing adjusted to post-dinner to prevent blunting mTOR hypertrophy signaling."
        full_p3 = "Electrolyte supplementation schedule: 1200mg sodium / 400mg potassium at 08:00 AM."

        n1 = int(len(full_p1) * min(1.0, ai_stream_progress * 2.2))
        n2 = int(len(full_p2) * max(0.0, min(1.0, (ai_stream_progress - 0.3) * 2.2)))
        n3 = int(len(full_p3) * max(0.0, min(1.0, (ai_stream_progress - 0.6) * 2.2)))

        p1 = full_p1[:n1]
        p2 = full_p2[:n2]
        p3 = full_p3[:n3]

        cursor_ai = "█" if (ai_stream_progress > 0.0 and ai_stream_progress < 0.98) else ""

        content_svg = f"""
        <!-- AI Synthesizer View -->
        <g transform="translate(400, 160)">
          <text x="0" y="20" font-family="DejaVu Serif, Georgia, serif" font-size="24" font-weight="bold" fill="#181614">Local AI Synthesis &amp; Protocol Engine</text>
          <text x="500" y="20" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="#b4532a" font-weight="bold">Zero Cloud Calls</text>
        </g>

        <!-- Prompt input box -->
        <rect x="400" y="195" width="750" height="50" rx="10" fill="#FFFFFF" stroke="#b4532a" stroke-width="1.5"/>
        <text x="420" y="225" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="#b4532a" font-weight="bold">PROMPT &gt;</text>
        <text x="480" y="225" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#181614">Synthesize personalized 7-day schedule based on my biometrics and TK-01</text>

        <!-- AI Engine Response Card -->
        <rect x="400" y="260" width="750" height="230" rx="12" fill="#181614" stroke="#33302C" stroke-width="1"/>
        <rect x="400" y="260" width="750" height="35" rx="12" fill="#24211D"/>
        <text x="420" y="283" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="#10B981" font-weight="bold">● LOCAL QUANTIZED ENGINE (Apple Silicon Neural Engine / CUDA)</text>
        <text x="960" y="283" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="#888888">Latency: 1.8ms</text>

        <text x="420" y="325" font-family="DejaVu Sans Mono, monospace" font-size="12" fill="#10B981" font-weight="bold">{p1}</text>
        <text x="420" y="360" font-family="DejaVu Sans Mono, monospace" font-size="12" fill="#E5E7EB">{p2}</text>
        <text x="420" y="395" font-family="DejaVu Sans Mono, monospace" font-size="12" fill="#E5E7EB">{p3} {cursor_ai}</text>

        <g transform="translate(420, 440)">
          <rect x="0" y="0" width="200" height="28" rx="6" fill="#374151"/>
          <text x="100" y="18" font-family="DejaVu Sans Mono, monospace" font-size="10" fill="#F3F4F6" text-anchor="middle">Confidence: 99.4% Validated</text>
          <text x="220" y="18" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="#9CA3AF">0 bytes sent over network · 100% On-Device</text>
        </g>
        """

    # Toast overlay
    toast_svg = ""
    if export_toast:
        toast_svg = """
        <g transform="translate(680, 560)">
          <rect x="0" y="0" width="470" height="50" rx="10" fill="#181614" stroke="#10B981" stroke-width="2" filter="url(#shadow)"/>
          <circle cx="25" cy="25" r="10" fill="#10B981"/>
          <path d="M20 25 L24 29 L31 21" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"/>
          <text x="45" y="23" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">Export Complete: TK-01 Protocol Package</text>
          <text x="45" y="38" font-family="DejaVu Sans Mono, monospace" font-size="10" fill="#10B981">Saved to ~/Documents/bootey/Obsidian/ (34 pages in 14ms)</text>
        </g>
        """

    svg = f"""<svg width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="15" stdDeviation="25" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Desktop Backdrop / Studio Desk -->
  <rect width="100%" height="100%" fill="#EDE8DF"/>
  <!-- Subtle pattern dots -->
  <pattern id="dotpattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1" fill="#D6CEBF"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#dotpattern)"/>

  <!-- Native App Window Container with Shadow -->
  <g filter="url(#shadow)">
    <rect x="80" y="45" width="1120" height="630" rx="14" fill="#181614"/>
  </g>

  <!-- Titlebar -->
  <rect x="80" y="45" width="1120" height="40" rx="14" fill="#211E1A"/>
  <rect x="80" y="70" width="1120" height="15" fill="#211E1A"/>

  <!-- macOS Traffic Lights -->
  <circle cx="104" cy="65" r="6" fill="#FF5F56"/>
  <circle cx="124" cy="65" r="6" fill="#FFBD2E"/>
  <circle cx="144" cy="65" r="6" fill="#27C93F"/>

  <!-- Title & Status -->
  <text x="170" y="69" font-family="DejaVu Sans Mono, monospace" font-size="12" fill="#888888">bootey — Desktop Workspace v2.4.0 (Universal)</text>
  <circle cx="940" cy="65" r="4" fill="#10B981"/>
  <text x="955" y="69" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#10B981">LOCAL ENCRYPTED VAULT · 100% OFFLINE</text>

  <!-- Window Interior -->
  <g transform="translate(80, 85)">
    <!-- Main workspace background -->
    <rect x="0" y="0" width="1120" height="580" fill="#FAF7F2"/>

    <!-- Left Sidebar (Toolkits List) -->
    <rect x="0" y="0" width="280" height="580" fill="#F4EFE6" stroke="#E2D9CB" stroke-width="1"/>

    <!-- Search Box in Sidebar -->
    <g transform="translate(15, 15)">
      <rect x="0" y="0" width="250" height="34" rx="8" fill="#FFFFFF" stroke="{search_border}" stroke-width="1.5"/>
      <!-- Magnifier icon -->
      <circle cx="18" cy="17" r="5" stroke="#756F66" stroke-width="1.5" fill="none"/>
      <line x1="22" y1="21" x2="26" y2="25" stroke="#756F66" stroke-width="1.5"/>
      <text x="34" y="21" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="{search_fg}">{search_text}</text>
    </g>

    <!-- Sidebar Header -->
    <text x="15" y="70" font-family="DejaVu Sans Mono, monospace" font-size="10" font-weight="bold" fill="#756F66">TOOLKIT INDEX</text>
    <text x="210" y="70" font-family="DejaVu Sans Mono, monospace" font-size="10" font-weight="bold" fill="#b4532a">28 LOADED</text>

    <!-- Sidebar Items List -->
    <!-- TK-01 -->
    <g transform="translate(10, 80)">
      <rect x="0" y="0" width="260" height="48" rx="8" fill="#FFFFFF" stroke="#b4532a" stroke-width="1"/>
      <rect x="0" y="0" width="4" height="48" rx="2" fill="#b4532a"/>
      <text x="14" y="20" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#b4532a">TK-01</text>
      <text x="56" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" font-weight="bold" fill="#181614">GLP-1 &amp; GIP Matrix</text>
      <text x="14" y="38" font-family="DejaVu Sans Mono, monospace" font-size="9" fill="#888888">METABOLIC BIOCHEMISTRY</text>
    </g>

    <!-- TK-02 -->
    <g transform="translate(10, 134)">
      <rect x="0" y="0" width="260" height="44" rx="8" fill="transparent"/>
      <text x="14" y="18" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#756F66">TK-02</text>
      <text x="56" y="18" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="#181614">Metabolic Flexibility</text>
      <text x="14" y="34" font-family="DejaVu Sans Mono, monospace" font-size="9" fill="#888888">ZONE 2 CARDIO &amp; MITO</text>
    </g>

    <!-- TK-07 -->
    <g transform="translate(10, 184)">
      <rect x="0" y="0" width="260" height="44" rx="8" fill="transparent"/>
      <text x="14" y="18" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#756F66">TK-07</text>
      <text x="56" y="18" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="#181614">Debt Demolition Engine</text>
      <text x="14" y="34" font-family="DejaVu Sans Mono, monospace" font-size="9" fill="#888888">FINANCIAL ARCHITECTURE</text>
    </g>

    <!-- TK-11 -->
    <g transform="translate(10, 234)">
      <rect x="0" y="0" width="260" height="44" rx="8" fill="transparent"/>
      <text x="14" y="18" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#756F66">TK-11</text>
      <text x="56" y="18" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="#181614">Money Mindset Blueprint</text>
      <text x="14" y="34" font-family="DejaVu Sans Mono, monospace" font-size="9" fill="#888888">BEHAVIORAL WEALTH</text>
    </g>

    <!-- TK-15 -->
    <g transform="translate(10, 284)">
      <rect x="0" y="0" width="260" height="44" rx="8" fill="transparent"/>
      <text x="14" y="18" font-family="DejaVu Sans Mono, monospace" font-size="11" font-weight="bold" fill="#756F66">TK-15</text>
      <text x="56" y="18" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="#181614">High-Yield Growth</text>
      <text x="14" y="34" font-family="DejaVu Sans Mono, monospace" font-size="9" fill="#888888">BUSINESS VELOCITY</text>
    </g>

    <!-- Bottom Sidebar Status -->
    <line x1="15" y1="525" x2="265" y2="525" stroke="#E2D9CB"/>
    <text x="15" y="550" font-family="DejaVu Sans Mono, monospace" font-size="10" fill="#756F66">0 MB Cloud Usage</text>
    <text x="180" y="550" font-family="DejaVu Sans Mono, monospace" font-size="10" font-weight="bold" fill="#166534">100% Offline</text>

    <!-- Top Workspace Navbar Tabs -->
    <g transform="translate(710, 15)">
      <rect x="0" y="0" width="380" height="34" rx="8" fill="#F0E9DC"/>
      
      <!-- Tab 1: Protocol Reader -->
      <rect x="3" y="3" width="115" height="28" rx="6" fill="{reader_bg}"/>
      <text x="60" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" font-weight="{reader_weight}" fill="{reader_fg}" text-anchor="middle">Protocol Reader</text>

      <!-- Tab 2: Action Checklist -->
      <rect x="122" y="3" width="125" height="28" rx="6" fill="{check_bg}"/>
      <text x="184" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" font-weight="{check_weight}" fill="{check_fg}" text-anchor="middle">Action Checklist</text>

      <!-- Tab 3: AI Synthesizer -->
      <rect x="251" y="3" width="125" height="28" rx="6" fill="{ai_bg}"/>
      <text x="313" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" font-weight="{ai_weight}" fill="{ai_fg}" text-anchor="middle">✨ AI Synthesizer</text>
    </g>

    <!-- Bottom Export Bar -->
    <g transform="translate(300, 530)">
      <line x1="0" y1="0" x2="800" y2="0" stroke="#EBE4D8"/>
      <circle cx="15" cy="22" r="4" fill="#10B981"/>
      <text x="28" y="26" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="#756F66">34 Pages · Vector Search Indexed</text>

      <text x="490" y="26" font-family="DejaVu Sans Mono, monospace" font-size="11" fill="#756F66">Instant Export:</text>
      
      <rect x="585" y="10" width="60" height="28" rx="6" fill="#FFFFFF" stroke="#D8CEBE"/>
      <text x="615" y="28" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="#181614" text-anchor="middle">Notion</text>

      <rect x="655" y="10" width="70" height="28" rx="6" fill="#FFFFFF" stroke="#D8CEBE"/>
      <text x="690" y="28" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="#181614" text-anchor="middle">Obsidian</text>

      <rect x="735" y="10" width="55" height="28" rx="6" fill="#181614"/>
      <text x="762" y="28" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="#FFFFFF" text-anchor="middle">.MD</text>
    </g>

    <!-- Dynamic Main Content -->
    {content_svg}

    <!-- Toast if any -->
    {toast_svg}
  </g>
</svg>"""
    return svg

# Generate base SVG states
states = [
    # 0: Idle app with empty search
    ("state_0", dict(search_text="Search 28 toolkits... (⌘K)", search_active=False, active_tab="reader")),
    # 1: Search active with text
    ("state_1", dict(search_text="GLP-1 peptide matrix", search_active=True, active_tab="reader")),
    # 2: Reader view highlighting
    ("state_2", dict(search_text="GLP-1 peptide matrix", search_active=False, active_tab="reader", highlight_text=True)),
    # 3: Checklist unclicked
    ("state_3", dict(search_text="Search 28 toolkits... (⌘K)", search_active=False, active_tab="checklist", step1_checked=False, step2_checked=False)),
    # 4: Checklist step 1 checked
    ("state_4", dict(search_text="Search 28 toolkits... (⌘K)", search_active=False, active_tab="checklist", step1_checked=True, step2_checked=False)),
    # 5: Checklist step 1 and 2 checked
    ("state_5", dict(search_text="Search 28 toolkits... (⌘K)", search_active=False, active_tab="checklist", step1_checked=True, step2_checked=True)),
    # 6: AI start
    ("state_6", dict(search_text="Search 28 toolkits... (⌘K)", search_active=False, active_tab="ai", ai_stream_progress=0.1)),
    # 7: AI half
    ("state_7", dict(search_text="Search 28 toolkits... (⌘K)", search_active=False, active_tab="ai", ai_stream_progress=0.55)),
    # 8: AI full
    ("state_8", dict(search_text="Search 28 toolkits... (⌘K)", search_active=False, active_tab="ai", ai_stream_progress=1.0)),
    # 9: Export toast
    ("state_9", dict(search_text="Search 28 toolkits... (⌘K)", search_active=False, active_tab="ai", ai_stream_progress=1.0, export_toast=True)),
]

os.makedirs("/tmp/bootey_render", exist_ok=True)
base_pngs = {}

print("Rendering base UI states...")
for name, params in states:
    svg_content = get_svg(**params)
    svg_path = f"/tmp/bootey_render/{name}.svg"
    png_path = f"/tmp/bootey_render/{name}.png"
    raw_path = f"/tmp/bootey_render/{name}.raw"
    with open(svg_path, "w") as f:
        f.write(svg_content)
    subprocess.run(["rsvg-convert", "-w", str(WIDTH), "-h", str(HEIGHT), svg_path, "-o", png_path], check=True)
    subprocess.run(["convert", png_path, f"rgb:{raw_path}"], check=True)
    with open(raw_path, "rb") as f:
        base_pngs[name] = bytearray(f.read())

print(f"Rendered {len(base_pngs)} base UI states to raw buffers.")

# Smooth cubic ease in/out
def ease_in_out(t):
    if t <= 0.0: return 0.0
    if t >= 1.0: return 1.0
    return t * t * (3.0 - 2.0 * t)

# Cursor asset: a classic macOS-style black pointer with crisp white border and drop shadow
# 20x24 pixels
cursor_pixels = [
    (0, 0), (0, 1), (0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (0, 8), (0, 9), (0, 10), (0, 11), (0, 12), (0, 13), (0, 14), (0, 15),
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13),
    (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11),
    (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11), (3, 12),
    (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 13),
    (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 14),
    (6, 6), (6, 7), (6, 8), (6, 15),
    (7, 7), (7, 8), (7, 16),
    (8, 8), (8, 17),
]

def draw_cursor(buf, cx, cy, click_radius=0):
    cx = int(cx)
    cy = int(cy)

    # Click ripple effect
    if click_radius > 0:
        cr = int(click_radius)
        for angle in range(0, 360, 15):
            rad = math.radians(angle)
            rx = int(cx + cr * math.cos(rad))
            ry = int(cy + cr * math.sin(rad))
            if 0 <= rx < WIDTH and 0 <= ry < HEIGHT:
                idx = (ry * WIDTH + rx) * 3
                buf[idx] = 180
                buf[idx+1] = 83
                buf[idx+2] = 42 # Terracotta #b4532a ripple

    # White border / outline around cursor
    for dx in range(-1, 16):
        for dy in range(-1, 18):
            if any((dx == px or dx == px+1 or dx == px-1) and (dy == py or dy == py+1 or dy == py-1) for px, py in cursor_pixels):
                px = cx + dx
                py = cy + dy
                if 0 <= px < WIDTH and 0 <= py < HEIGHT:
                    idx = (py * WIDTH + px) * 3
                    buf[idx] = 255
                    buf[idx+1] = 255
                    buf[idx+2] = 255

    # Black cursor fill
    for dx, dy in cursor_pixels:
        px = cx + dx
        py = cy + dy
        if 0 <= px < WIDTH and 0 <= py < HEIGHT:
            idx = (py * WIDTH + px) * 3
            buf[idx] = 20
            buf[idx+1] = 20
            buf[idx+2] = 20

# Timeline script definition
# Each phase: (start_frame, end_frame, start_pos, end_pos, state_key, click_frame)
phases = [
    # 0: Idle workspace, mouse glides from center to search bar
    (0, 45, (640, 380), (220, 118), "state_0", 45),
    # 1: Search bar active, typing
    (46, 95, (220, 118), (220, 118), "state_1", None),
    # 2: Move down to TK-01 in sidebar
    (96, 130, (220, 118), (200, 195), "state_1", 130),
    # 3: Click TK-01, open Protocol Reader, cursor moves over excerpt
    (131, 200, (200, 195), (620, 325), "state_2", None),
    # 4: Move cursor up to "Action Checklist" tab
    (201, 240, (620, 325), (900, 115), "state_2", 240),
    # 5: Checklist opened, move cursor to Step 1 checkbox
    (241, 290, (900, 115), (510, 318), "state_3", 290),
    # 6: Step 1 checked, move cursor to Step 2 checkbox
    (291, 350, (510, 318), (510, 388), "state_4", 350),
    # 7: Step 2 checked, move cursor to "AI Synthesizer" tab
    (351, 395, (510, 388), (1030, 115), "state_5", 395),
    # 8: AI tab opens, model streams in response
    (396, 435, (1030, 115), (750, 440), "state_6", None),
    (436, 480, (750, 440), (750, 440), "state_7", None),
    (481, 520, (750, 440), (1055, 630), "state_8", 520),
    # 9: Click export to Obsidian, toast shows completion
    (521, 600, (1055, 630), (1055, 630), "state_9", None),
]

mp4_path = "./public/bootey-screen-recording.mp4"
webm_path = "./public/bootey-screen-recording.webm"

print(f"Spawning ffmpeg encoder for MP4: {mp4_path}...")
ffmpeg_mp4 = subprocess.Popen([
    "ffmpeg", "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", f"{WIDTH}x{HEIGHT}",
    "-pix_fmt", "rgb24",
    "-r", str(FPS),
    "-i", "-",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "veryfast",
    "-crf", "20",
    "-movflags", "+faststart",
    mp4_path
], stdin=subprocess.PIPE)

t_start = time.time()

for f in range(TOTAL_FRAMES):
    # Find matching phase
    cur_phase = phases[-1]
    for p in phases:
        if p[0] <= f <= p[1]:
            cur_phase = p
            break

    start_f, end_f, p_start, p_end, state_name, click_f = cur_phase
    span = max(1, end_f - start_f)
    t = (f - start_f) / span
    alpha = ease_in_out(t)

    cx = p_start[0] + (p_end[0] - p_start[0]) * alpha
    cy = p_start[1] + (p_end[1] - p_start[1]) * alpha

    # Calculate click ripple
    click_r = 0
    if click_f is not None and abs(f - click_f) <= 6:
        dt = f - click_f
        click_r = max(2, (dt + 6) * 3)

    # Copy base buffer
    frame_buf = bytearray(base_pngs[state_name])
    draw_cursor(frame_buf, cx, cy, click_r)

    ffmpeg_mp4.stdin.write(frame_buf)

    if (f + 1) % 100 == 0:
        print(f"Encoded {f+1}/{TOTAL_FRAMES} frames ({((f+1)/TOTAL_FRAMES)*100:.0f}%)...")

ffmpeg_mp4.stdin.close()
ffmpeg_mp4.wait()

print(f"MP4 rendered successfully in {time.time() - t_start:.2f}s!")

print("Creating WebM optimized format...")
subprocess.run([
    "ffmpeg", "-y",
    "-i", mp4_path,
    "-c:v", "libvpx-vp9",
    "-b:v", "0",
    "-crf", "30",
    "-deadline", "realtime",
    "-cpu-used", "4",
    webm_path
], check=True)

print("Both MP4 and WebM screen recordings are generated and ready in /public!")
