import { UtensilsCrossed, ShoppingBag, Calendar, Hotel, Megaphone, User } from 'lucide-react';

const useCases = [
  {
    icon: UtensilsCrossed,
    title: 'Restaurants & Cafés',
    headline: 'Digital menu, zero reprinting',
    points: [
      'QR code on table links to live menu',
      'Update specials and prices instantly',
      'Track table-level scan data',
      'Link to ordering systems or reservation pages',
    ],
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: ShoppingBag,
    title: 'Retail & E-commerce',
    headline: 'Turn every shelf tag into a content hub',
    points: [
      'Product detail pages with specs, reviews, demos',
      'Seasonal promo destinations — swap without reprinting',
      'QR codes on packaging, receipts, and tags',
      'Track scan-to-conversion by SKU',
    ],
    gradient: 'from-sky-500 to-blue-500',
  },
  {
    icon: Calendar,
    title: 'Events & Conferences',
    headline: 'Keep attendees informed in real time',
    points: [
      'Schedule, maps, and speaker bios via QR',
      'Update session times without reprinting badges',
      'Gauge engagement with live scan counts',
      'Post-event: redirect to recording or survey',
    ],
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Hotel,
    title: 'Hotels & Hospitality',
    headline: 'Touchless guest experiences',
    points: [
      'In-room QR for services, Wi-Fi, and checkout',
      'Spa, restaurant, and amenity guides',
      'Update policies and info without reprinting inserts',
      'Multi-property workspace management',
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Megaphone,
    title: 'Agencies & Brands',
    headline: 'Manage many clients from one dashboard',
    points: [
      'Per-client workspaces with isolated data',
      'Campaign-level QR grouping and reporting',
      'White-label-ready landing page templates',
      'Bulk export and API access',
    ],
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: User,
    title: 'Personal & Professional',
    headline: 'Your digital business card',
    points: [
      'vCard QR on your physical card',
      'Social links hub — one QR, all your profiles',
      'Personal portfolio or résumé page',
      'Track who scanned your card and when',
    ],
    gradient: 'from-amber-500 to-yellow-500',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">
            Use Cases
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Built for every business type
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            One platform, every vertical. UniversalQR adapts to how your business works — not the other way around.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              {/* Gradient strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${uc.gradient}`} />

              <div className="p-6">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${uc.gradient} mb-4 shadow-sm`}>
                  <uc.icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {uc.title}
                </p>
                <h3 className="text-base font-bold text-foreground mb-3">{uc.headline}</h3>
                <ul className="space-y-1.5">
                  {uc.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
