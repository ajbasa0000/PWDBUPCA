'use client';

import React, { useState } from 'react';
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
  Users,
  Menu,
  X,
  FileText,
  Award
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme, playChime } = useAccessibility();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Advocacy', icon: Home },
    { href: '/about', label: 'About', icon: Award },
    { href: '/programs', label: 'Livelihood', icon: BookOpen },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/news', label: 'News', icon: Sparkles },
    { href: '/store', label: 'Store', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[4rem] sm:min-h-[5.5rem] py-2 sm:py-3 gap-1.5 sm:gap-3">
          
          {/* Logo & Brand Identity */}
          <Link 
            href="/" 
            onClick={() => { playChime('click'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-2 sm:gap-3.5 group rounded-2xl p-0.5 sm:p-1 transition-all focus:ring-4 focus:ring-blue-500 shrink min-w-0"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                <img
                  src="/logo.png"
                  alt="PWD BUPCA Logo"
                  className="w-full h-full object-contain filter contrast-105"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 sm:h-4 sm:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-white dark:border-zinc-900"></span>
              </span>
            </div>
            
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-base sm:text-2xl tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  PWD BUPCA
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200/90 dark:border-amber-700/80">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>UP Gawad Tsanselor</span>
                </span>
              </div>
              <p className="text-[9.5px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate max-w-[130px] xs:max-w-[170px] sm:max-w-none mt-0.5">
                Brgy. UP Campus • <span className="text-blue-700 dark:text-blue-400 font-semibold">PWD BUPCA</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links with Pill Highlight */}
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

          {/* Right Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer shadow-xs focus:ring-2 focus:ring-blue-500"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
              )}
            </button>

            {/* Mag-miyembro Call to Action */}
            <Link
              href="/membership"
              onClick={() => playChime('click')}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] sm:text-xs shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-white" />
              <span className="hidden xs:inline">Mag-miyembro</span>
              <span className="xs:hidden">Sali</span>
            </Link>

            {/* Command Center (Hidden on small screens, accessible via hamburger) */}
            <Link
              href="/admin"
              onClick={() => playChime('click')}
              className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Command Center</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => {
                playChime('click');
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer shadow-xs shrink-0"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-rose-500" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-100 dark:border-zinc-800 py-3.5 px-1 animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      playChime('click');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
                  </Link>
                );
              })}

              <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
                <Link
                  href="/admin"
                  onClick={() => {
                    playChime('click');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-extrabold bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400 dark:text-blue-600" />
                  <span>Admin Command Center</span>
                </Link>

                <a
                  href="/documentation.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                >
                  <FileText className="w-4 h-4" />
                  <span>System Documentation & PDF Export</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
