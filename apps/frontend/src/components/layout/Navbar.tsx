'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Analytics', href: '#analytics' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-sm shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
            <QrCode className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Universal<span className="text-brand-500">QR</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button variant="brand" size="sm" asChild>
            <Link href="/register">Get started free</Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-96 border-b border-border/40' : 'max-h-0',
        )}
      >
        <div className="bg-background/95 backdrop-blur-xl px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border/40 flex flex-col gap-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button variant="brand" size="sm" className="w-full" asChild>
              <Link href="/register">Get started free</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
