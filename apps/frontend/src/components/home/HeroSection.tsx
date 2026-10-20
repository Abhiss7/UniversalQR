import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QRCodeIllustration } from './QRCodeIllustration';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-mesh" aria-hidden />
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-400 to-violet-400 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div className="text-center lg:text-left">
            <Badge variant="brand" className="mb-5 inline-flex gap-1.5 py-1 px-3">
              <Sparkles className="h-3 w-3" />
              <span>Free forever — no credit card required</span>
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Dynamic QR codes for{' '}
              <span className="bg-gradient-to-r from-brand-500 to-violet-500 bg-clip-text text-transparent">
                every business
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Create QR codes that never go stale. Update destinations, track scans,
              build landing pages — for restaurants, retail, hotels, events, and more.
              No reprinting. No repricing.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button variant="brand" size="lg" className="gap-2 shadow-lg shadow-brand-500/25" asChild>
                <Link href="/register">
                  Create your first QR
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
              {[
                { value: '∞', label: 'QR codes' },
                { value: 'Free', label: 'forever' },
                { value: '10+', label: 'business types' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration side */}
          <div className="flex justify-center lg:justify-end">
            <QRCodeIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
