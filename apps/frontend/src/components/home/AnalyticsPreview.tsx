'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, Globe, Smartphone, Monitor } from 'lucide-react';

// ─── Demo data — clearly labelled as illustrative ──────────────────────────

const scansByDay = [
  { day: 'Mon', scans: 42 },
  { day: 'Tue', scans: 78 },
  { day: 'Wed', scans: 61 },
  { day: 'Thu', scans: 95 },
  { day: 'Fri', scans: 112 },
  { day: 'Sat', scans: 87 },
  { day: 'Sun', scans: 53 },
];

const topCountries = [
  { country: 'India', scans: 412 },
  { country: 'USA', scans: 284 },
  { country: 'UK', scans: 143 },
  { country: 'Germany', scans: 98 },
  { country: 'Canada', scans: 76 },
];

const deviceBreakdown = [
  { name: 'Mobile', value: 74, icon: Smartphone, color: '#6366f1' },
  { name: 'Desktop', value: 18, icon: Monitor, color: '#8b5cf6' },
  { name: 'Other', value: 8, icon: Globe, color: '#c4b5fd' },
];

const BRAND = '#6366f1';

export function AnalyticsPreview() {
  return (
    <section id="analytics" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">
            Analytics
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Know every scan, everywhere
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Real-time scan data broken down by time, location, and device — so you can act on what&apos;s working.
          </p>
          <p className="mt-2 text-xs text-muted-foreground italic">
            * Charts below show illustrative demo data only.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-xl overflow-hidden">
          {/* Mock browser bar */}
          <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4 rounded-md bg-background/70 border border-border/40 px-3 py-1 text-xs text-muted-foreground">
              universalqr.app/dashboard/analytics
            </div>
          </div>

          <div className="p-6">
            {/* KPI row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Scans (7d)', value: '1,247', delta: '+18%', up: true },
                { label: 'Unique Scans', value: '891', delta: '+12%', up: true },
                { label: 'Active QR Codes', value: '24', delta: '', up: true },
                { label: 'Top Country', value: 'India', delta: '33%', up: true },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-border/60 bg-background p-4"
                >
                  <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                  <p className="text-xl font-bold text-foreground">{kpi.value}</p>
                  {kpi.delta && (
                    <span className="inline-flex items-center gap-0.5 text-xs text-emerald-600 font-medium mt-1">
                      <TrendingUp className="h-3 w-3" />
                      {kpi.delta} vs last week
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Scans by day */}
              <div className="lg:col-span-2 rounded-xl border border-border/60 bg-background p-4">
                <p className="text-sm font-semibold text-foreground mb-4">
                  Scans by day — last 7 days
                </p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={scansByDay} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="scans" fill={BRAND} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top countries */}
              <div className="rounded-xl border border-border/60 bg-background p-4">
                <p className="text-sm font-semibold text-foreground mb-4">Top countries</p>
                <div className="space-y-3">
                  {topCountries.map((c, i) => {
                    const max = topCountries[0].scans;
                    return (
                      <div key={c.country}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-foreground">{c.country}</span>
                          <span className="text-muted-foreground">{c.scans}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(c.scans / max) * 100}%`,
                              backgroundColor: BRAND,
                              opacity: 1 - i * 0.15,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Device breakdown */}
                <div className="mt-5 pt-4 border-t border-border/40">
                  <p className="text-xs font-semibold text-muted-foreground mb-3">Device type</p>
                  <div className="space-y-2">
                    {deviceBreakdown.map((d) => (
                      <div key={d.name} className="flex items-center gap-2 text-xs">
                        <d.icon className="h-3.5 w-3.5" style={{ color: d.color }} />
                        <span className="flex-1 text-muted-foreground">{d.name}</span>
                        <span className="font-semibold text-foreground">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
