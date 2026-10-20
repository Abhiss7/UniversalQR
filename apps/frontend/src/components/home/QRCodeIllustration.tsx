'use client';

import { useState } from 'react';
import { RefreshCw, Download, BarChart3, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

const MODULES = [
  [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,0,1],
];

export function QRCodeIllustration() {
  const [color, setColor] = useState('#6366f1');

  const colors = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="relative w-full max-w-sm">
      {/* Floating card */}
      <div className="relative rounded-2xl border border-border/60 bg-card shadow-2xl shadow-brand-500/10 p-6 animate-float">
        {/* QR grid */}
        <div className="bg-white rounded-xl p-4 shadow-inner mb-4">
          <svg
            viewBox="0 0 170 170"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {MODULES.map((row, ri) =>
              row.map((cell, ci) =>
                cell ? (
                  <rect
                    key={`${ri}-${ci}`}
                    x={ci * 10}
                    y={ri * 10}
                    width={9}
                    height={9}
                    rx={1.5}
                    fill={color}
                    style={{ transition: 'fill 0.3s ease' }}
                  />
                ) : null,
              ),
            )}
            {/* Center logo placeholder */}
            <rect x={72} y={72} width={26} height={26} rx={5} fill="white" />
            <rect x={75} y={75} width={20} height={20} rx={4} fill={color} opacity={0.15} />
            <QrCode
              x={78}
              y={78}
              width={14}
              height={14}
              color={color}
              strokeWidth={2}
              style={{ display: 'none' }}
            />
          </svg>
        </div>

        {/* Color picker */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground font-medium">Color:</span>
          <div className="flex gap-1.5">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  'h-5 w-5 rounded-full transition-all duration-200',
                  color === c ? 'ring-2 ring-offset-1 ring-foreground scale-110' : 'hover:scale-110',
                )}
                style={{ backgroundColor: c }}
                aria-label={`Set color to ${c}`}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Download className="h-3 w-3" />
            PNG
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Download className="h-3 w-3" />
            SVG
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <RefreshCw className="h-3 w-3" />
            Update
          </button>
        </div>
      </div>

      {/* Scan counter badge */}
      <div className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 text-white shadow-lg shadow-brand-500/30">
        <BarChart3 className="h-3 w-3" />
        <span className="text-xs font-bold">1,247 scans</span>
      </div>

      {/* Update badge */}
      <div className="absolute -bottom-3 -left-3 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-white shadow-lg shadow-emerald-500/30">
        <RefreshCw className="h-3 w-3" />
        <span className="text-xs font-bold">Updated live</span>
      </div>
    </div>
  );
}
