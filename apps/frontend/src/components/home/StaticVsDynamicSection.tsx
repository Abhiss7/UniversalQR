import { Lock, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

const comparison = [
  {
    feature: 'Destination URL',
    static: 'Fixed at creation',
    dynamic: 'Update any time',
    dynamicWins: true,
  },
  {
    feature: 'Scan analytics',
    static: 'Not available',
    dynamic: 'Full — country, device, time',
    dynamicWins: true,
  },
  {
    feature: 'Reprint needed on change',
    static: 'Yes',
    dynamic: 'Never',
    dynamicWins: true,
  },
  {
    feature: 'Works offline (no redirect)',
    static: 'Yes — encodes content directly',
    dynamic: 'Requires internet for redirect',
    dynamicWins: false,
  },
  {
    feature: 'Custom landing page',
    static: 'No',
    dynamic: 'Yes',
    dynamicWins: true,
  },
  {
    feature: 'Campaign tracking',
    static: 'No',
    dynamic: 'Yes',
    dynamicWins: true,
  },
];

export function StaticVsDynamicSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">
            How It Works
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Static vs Dynamic QR — which do you need?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Both types are fully supported. Most businesses find dynamic QR codes pay off the moment they update their first destination.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Cards */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Lock className="h-4.5 w-4.5 text-slate-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Static QR Code</h3>
                  <p className="text-xs text-muted-foreground">Content encoded at creation</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The content — URL, text, WiFi password — is encoded directly into the QR image.
                Scanning doesn&apos;t hit any server. Fast and reliable offline, but changing anything
                means generating and reprinting a new code.
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                Best for: business cards, Wi-Fi codes, product labels that never change.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/50 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900">
                  <RefreshCw className="h-4.5 w-4.5 text-brand-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Dynamic QR Code</h3>
                  <p className="text-xs text-brand-500 font-medium">Recommended for most businesses</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The QR code encodes a short, permanent URL. When someone scans it, they&apos;re
                redirected to your current destination — which you can change instantly from the
                dashboard without touching the physical code.
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                Best for: menus, promotions, events, products, landing pages — anything that evolves.
              </p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Feature</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Static</th>
                  <th className="text-center px-4 py-3 font-medium text-brand-500">Dynamic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {comparison.map((row) => (
                  <tr key={row.feature} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground text-xs">
                      <span className="flex items-center justify-center gap-1">
                        {row.dynamicWins ? (
                          <XCircle className="h-3.5 w-3.5 text-red-400" />
                        ) : (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        )}
                        {row.static}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs">
                      <span className="flex items-center justify-center gap-1">
                        {row.dynamicWins ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-red-400" />
                        )}
                        {row.dynamic}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
