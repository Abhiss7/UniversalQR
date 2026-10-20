// ─── Application Constants ────────────────────────────────────────────────────

export const APP_NAME = 'UniversalQR';
export const APP_DESCRIPTION =
  'Dynamic QR code platform for businesses of every type — restaurants, retail, events, hotels, and more.';
export const APP_VERSION = '0.1.0';

// ─── QR Configuration ─────────────────────────────────────────────────────────

export const QR_CONFIG = {
  defaultErrorCorrectionLevel: 'M' as const,
  defaultMargin: 4,
  defaultForeground: '#000000',
  defaultBackground: '#ffffff',
  maxLogoSizePercent: 30,
  shortUrlBaseLength: 8,
  supportedExportFormats: ['png', 'svg'] as const,
} as const;

// ─── Pagination ────────────────────────────────────────────────────────────────

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
} as const;

// ─── Business Use-Case Categories ─────────────────────────────────────────────

export const BUSINESS_CATEGORIES = [
  'restaurant',
  'retail',
  'hotel',
  'event',
  'agency',
  'personal',
  'healthcare',
  'education',
  'real_estate',
  'other',
] as const;

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];

// ─── Landing Page Templates ────────────────────────────────────────────────────

export const LANDING_PAGE_TEMPLATES = [
  'menu',         // Restaurant / café menu
  'product',      // Retail product page
  'event',        // Event details + RSVP
  'hotel',        // Hotel room / service info
  'vcard',        // Digital business card
  'social',       // Social links hub
  'pdf_viewer',   // Embedded PDF viewer
  'redirect',     // Simple redirect with analytics
] as const;

export type LandingPageTemplate = (typeof LANDING_PAGE_TEMPLATES)[number];

// ─── API Routes ────────────────────────────────────────────────────────────────

export const API_ROUTES = {
  health: '/health',
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  workspaces: '/workspaces',
  qrCodes: '/qr-codes',
  campaigns: '/campaigns',
  analytics: '/analytics',
  scan: '/s', // short scan redirect: /s/:code
} as const;

// ─── Feature Flags (all enabled — free tier only) ─────────────────────────────

export const FEATURES = {
  dynamicQR: true,
  analytics: true,
  customLandingPages: true,
  teamWorkspaces: true,
  bulkExport: true,
  apiAccess: true,
} as const;
