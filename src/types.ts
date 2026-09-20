export type CategoryType =
  | 'all'
  | 'health'
  | 'finance'
  | 'career'
  | 'mindset'
  | 'systems';

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
  urgencyBadge: {
    text: string;
    type: 'urgent' | 'popular' | 'exclusive' | 'limited';
  };
  copiesRemaining: number;
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
