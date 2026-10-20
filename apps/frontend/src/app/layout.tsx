import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'UniversalQR — Dynamic QR Codes for Every Business',
    template: '%s | UniversalQR',
  },
  description:
    'Create dynamic QR codes, custom landing pages, and scan analytics — for restaurants, retail, events, hotels, and more. Completely free.',
  keywords: [
    'QR code generator',
    'dynamic QR code',
    'QR code analytics',
    'restaurant QR menu',
    'retail QR code',
    'free QR code maker',
  ],
  authors: [{ name: 'UniversalQR' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'UniversalQR',
    title: 'UniversalQR — Dynamic QR Codes for Every Business',
    description:
      'Create dynamic QR codes, custom landing pages, and scan analytics. Free forever.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UniversalQR — Dynamic QR Codes for Every Business',
    description: 'Free dynamic QR codes for restaurants, retail, events, hotels & more.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#6366f1',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
