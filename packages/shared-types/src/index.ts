// ─── QR Code Types ───────────────────────────────────────────────────────────

export type QRCodeType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'pdf'
  | 'social'
  | 'landing_page';

export type QRCodeKind = 'static' | 'dynamic';

export interface QRCodeStyle {
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  logoUrl?: string;
  logoSize?: number;
  cornerStyle?: 'square' | 'rounded' | 'dots';
  dotStyle?: 'square' | 'rounded' | 'dots';
}

export interface QRCode {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  kind: QRCodeKind;
  type: QRCodeType;
  destination: string;       // For static: encoded content; for dynamic: short URL
  targetUrl?: string;        // For dynamic: current redirect target
  style: QRCodeStyle;
  imageUrl?: string;
  scanCount: number;
  isActive: boolean;
  campaignId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Workspace / Tenant Types ─────────────────────────────────────────────────

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

// ─── User Types ───────────────────────────────────────────────────────────────

export type UserRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: UserRole;
  joinedAt: string;
}

// ─── Analytics Types ──────────────────────────────────────────────────────────

export interface ScanEvent {
  id: string;
  qrCodeId: string;
  scannedAt: string;
  ipAddress?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  referrer?: string;
}

export interface AnalyticsSummary {
  totalScans: number;
  uniqueScans: number;
  scansByDay: Array<{ date: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
  topDevices: Array<{ device: string; count: number }>;
  topBrowsers: Array<{ browser: string; count: number }>;
}

// ─── Campaign Types ───────────────────────────────────────────────────────────

export interface Campaign {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
  qrCodeCount: number;
  totalScans: number;
  createdAt: string;
  updatedAt: string;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

// ─── Auth Types ───────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  workspaceName?: string;
}
