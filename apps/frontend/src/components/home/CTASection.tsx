import Link from 'next/link';
import { ArrowRight, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 px-8 py-16 sm:px-16 sm:py-20 overflow-hidden text-center shadow-2xl shadow-brand-500/30">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-8 -left-8 h-48 w-48 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-violet-300 blur-3xl" />
          </div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <QrCode className="h-7 w-7 text-white" strokeWidth={2} />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Start generating QR codes today
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Free forever. No credit card. No plan limits. Just create, customise, and track.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-white text-brand-600 hover:bg-white/90 shadow-xl gap-2"
                asChild
              >
                <Link href="/register">
                  Create your workspace
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white border-white/30 border hover:bg-white/10"
                asChild
              >
                <Link href="/api/docs">Explore the API</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
