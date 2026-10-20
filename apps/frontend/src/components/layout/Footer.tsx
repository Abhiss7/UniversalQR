import Link from 'next/link';
import { QrCode, Github, Twitter } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Developers: [
    { label: 'API Docs', href: '/api/docs' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Status', href: '/status' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
                <QrCode className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base font-bold tracking-tight">
                Universal<span className="text-brand-500">QR</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Free dynamic QR codes for every business — restaurants, retail, hotels, events, and more.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} UniversalQR. Free and open source.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, NestJS, and PostgreSQL.
          </p>
        </div>
      </div>
    </footer>
  );
}
