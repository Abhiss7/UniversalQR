import {
  Zap,
  RefreshCw,
  BarChart3,
  Palette,
  Globe,
  Shield,
  Download,
  QrCode,
} from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'Static & Dynamic QR',
    description:
      'Create one-time static QR codes or dynamic ones you can update without reprinting. Works for URLs, text, WiFi, vCards, PDFs, and more.',
    color: 'text-brand-500 bg-brand-50 dark:bg-brand-950',
  },
  {
    icon: RefreshCw,
    title: 'Update Anytime',
    description:
      'Change the destination behind a dynamic QR code whenever you need to — menu updated, event moved, promo ended. Your printed code always stays current.',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950',
  },
  {
    icon: BarChart3,
    title: 'Scan Analytics',
    description:
      'Know when, where, and how your QR codes are scanned — by country, device, browser, and time. Real data to back real decisions.',
    color: 'text-violet-500 bg-violet-50 dark:bg-violet-950',
  },
  {
    icon: Palette,
    title: 'Full Customisation',
    description:
      'Brand your QR codes with custom colors, embedded logos, and dot styles. Download as PNG or SVG, print-ready at any size.',
    color: 'text-pink-500 bg-pink-50 dark:bg-pink-950',
  },
  {
    icon: Globe,
    title: 'Custom Landing Pages',
    description:
      'Link directly to an editable landing page — restaurant menu, event info, hotel room guide, product sheet — no external hosting needed.',
    color: 'text-sky-500 bg-sky-50 dark:bg-sky-950',
  },
  {
    icon: Shield,
    title: 'Workspace Isolation',
    description:
      'Each workspace is fully isolated. Manage multiple brands or clients from one account without data leaking across boundaries.',
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950',
  },
  {
    icon: Download,
    title: 'PNG & SVG Export',
    description:
      'Download print-ready files in the format you need — PNG for digital use, scalable SVG for print-shop submissions.',
    color: 'text-rose-500 bg-rose-50 dark:bg-rose-950',
  },
  {
    icon: Zap,
    title: 'Campaign Management',
    description:
      'Group QR codes into campaigns with start and end dates, aggregate scan counts, and campaign-level reporting.',
    color: 'text-orange-500 bg-orange-50 dark:bg-orange-950',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">
            Features
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            UniversalQR gives every business the tools once reserved for enterprise QR platforms — free, with no arbitrary limits.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-md transition-all duration-200"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.color} mb-4`}>
                <f.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
