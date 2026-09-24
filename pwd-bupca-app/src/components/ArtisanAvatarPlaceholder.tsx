'use client';

import React from 'react';
import { User, ShieldCheck } from 'lucide-react';

interface ArtisanAvatarPlaceholderProps {
  name: string;
  role?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showConsentBadge?: boolean;
}

export const ArtisanAvatarPlaceholder: React.FC<ArtisanAvatarPlaceholderProps> = ({
  name,
  role,
  size = 'md',
  className = '',
  showConsentBadge = false,
}) => {
  // Generate consistent initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-xl',
    hero: 'w-full h-full min-h-[220px] text-3xl',
  };

  if (size === 'hero') {
    return (
      <div
        className={`relative w-full h-full min-h-[240px] bg-gradient-to-br from-slate-100 via-zinc-100 to-blue-50/60 dark:from-zinc-900 dark:via-zinc-800/80 dark:to-zinc-900 flex flex-col items-center justify-center p-6 border-b border-zinc-200/80 dark:border-zinc-800 text-center select-none ${className}`}
      >
        {/* Subtle geometric circle ring */}
        <div className="relative flex items-center justify-center mb-3">
          <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 flex items-center justify-center shadow-xs">
            <User className="w-12 h-12 text-slate-400 dark:text-zinc-500" strokeWidth={1.5} />
          </div>
          <span className="absolute -bottom-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-black text-[10px] tracking-wider uppercase shadow-xs">
            {initials || 'PWD'}
          </span>
        </div>

        <span className="font-extrabold text-sm text-zinc-800 dark:text-zinc-200 mt-1">
          {name}
        </span>
        {role && (
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5 line-clamp-1">
            {role}
          </span>
        )}
        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-2 px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800/60">
          Verified Artisan Member
        </span>

        {showConsentBadge && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 text-[9px] font-bold border border-emerald-200/60 dark:border-emerald-800">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span>DPA RA 10173</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 font-black shadow-xs shrink-0 select-none ${sizeClasses[size]} ${className}`}
      title={name}
      aria-label={name}
    >
      <User className="w-1/2 h-1/2 text-slate-400 dark:text-zinc-500" strokeWidth={1.5} />
      <span className="sr-only">{name}</span>
    </div>
  );
};
