export type CategoryType =
  | 'all'
  | 'health'
  | 'mental-health'
  | 'finance'
  | 'career'
  | 'family'
  | 'caregiving'
  | 'legal';

export interface ZipManifestItem {
  name: string;
  size: string;
  type: string;
  description: string;
}

export interface ZipFileInfo {
  fileName: string;
  fileSize: string;
  filesCount: number;
  fileTypes: string[];
  downloadPath?: string;
  manifest: ZipManifestItem[];
}

export interface Toolkit {
  id: string;
  code: string; // e.g. 'BT — 01'
  title: string;
  subtitle: string;
  category: CategoryType;
  categoryLabel: string;
  price: number;
  regularPrice: number;
  pages: number;
  readTime: string;
  formats: string[];
  urgencyBadge?: {
    text: string;
    type: 'urgent' | 'popular' | 'exclusive' | 'limited';
  };
  coverBadge?: 'POPULAR' | 'MEGA BUNDLE' | 'NEW' | 'FEATURED';
  copiesRemaining?: number;
  highlightMechanisms: string[];
  colorTheme: {
    primary: string;
    gradient: string;
    cardBg: string;
    textDark: boolean;
  };
  description: string;
  tableOfContents: string[];
  excerpt: string;
  // Polar Checkout Link
  polarCheckoutUrl?: string;
  // Zip integration specs
  zipFile: ZipFileInfo;
  // Cover rendering specifics
  coverMeta?: {
    superTitle?: string;
    subHeader?: string;
    italicAccent?: string;
    tagline?: string;
    statBadges?: { label: string; value: string }[];
    metricPills?: string[];
    volumeNotice?: string;
    quoteOrStat?: string;
    styleVariant:
      | 'glp1'
      | 'decoder'
      | 'dark-minimal'
      | 'reduction'
      | 'becoming'
      | 'breakup'
      | 'rebound'
      | 'threshold'
      | 'grief'
      | 'caregiver'
      | 'fire'
      | 'tax'
      | 'couples'
      | 'pricing'
      | 'str'
      | 'brag'
      | 'craft'
      | 'adhd-parent'
      | 'ivf'
      | 'cancer'
      | 'divorce-48'
      | 'divorce-checklist'
      | 'wedding';
  };
}

export interface DownloadItem {
  id: string;
  name: string;
  title?: string;
  filename?: string;
  type: 'desktop_macos' | 'desktop_windows' | 'toolkit';
  fileSize?: string;
  size?: string;
  price?: number;
  code?: string;
  downloadUrl?: string;
  platform?: 'macos' | 'windows' | 'toolkit';
  progress?: number;
  status?: 'pending' | 'downloading' | 'completed';
  timestamp?: string;
}

export interface CartItem {
  toolkit: Toolkit;
  addedAt: number;
}

export interface PaidProductRecord {
  productId: string;
  productCode: string;
  productTitle: string;
  paidAt: string;
  checkoutId?: string;
}
