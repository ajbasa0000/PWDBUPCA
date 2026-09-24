'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Home, 
  BookOpen, 
  Sparkles,
  HeartHandshake,
  Sun,
  Moon,
  Users
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme, playChime } = useAccessibility();

  const navLinks = [
    { href: '/', label: 'Advocacy', icon: Home },
    { href: '/programs', label: 'Livelihood', icon: BookOpen },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/news', label: 'News', icon: Sparkles },
    { href: '/store', label: 'Store', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5.5rem] py-3 gap-3">
          
          {/* Logo & Brand Identity */}
          <Link 
            href="/" 
            onClick={() => playChime('click')}
            className="flex items-center gap-3.5 group rounded-2xl p-1 transition-all focus:ring-4 focus:ring-blue-500 shrink-0"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 text-white flex items-center justify-center font-black text-xl tracking-wider shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
                PB
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-zinc-900"></span>
              </span>
            </div>
            
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  PWD BUPCA
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200/90 dark:border-amber-700/80">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>UP Gawad Tsanselor</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap mt-0.5">
                Brgy. UP Campus Association • <span className="text-blue-700 dark:text-blue-400 font-semibold">Persons with Determination</span>
              </p>
            </div>
          </Link>

          {/* Navigation Links with Pill Highlight */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 shrink-0" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => playChime('click')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs xl:text-sm whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons with Light/Dark Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer shadow-xs focus:ring-2 focus:ring-blue-500"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <Link
              href="/membership"
              onClick={() => playChime('click')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <HeartHandshake className="w-4 h-4 text-white" />
              <span>Mag-miyembro</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => playChime('click')}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Command Center</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};
