'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-12 text-zinc-500 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-sm">
              PB
            </div>
            <span className="font-extrabold text-base text-zinc-900 dark:text-white">
              PWD BUPCA Inc.
            </span>
          </div>
          <p className="max-w-md text-zinc-500 leading-relaxed">
            Persons with Disabilities - Barangay UP Campus Association Inc. Registered grassroots cooperative based in the University of the Philippines Diliman, Quezon City.
          </p>
          <p className="text-[11px] text-zinc-400">
            Recipient, Gawad Tsanselor 2025: Natatanging Lingkod Komunidad.
          </p>
        </div>

        <div>
          <span className="font-bold text-sm text-zinc-900 dark:text-white block mb-3">Portal Links</span>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Our Advocacy & Mission</Link></li>
            <li><Link href="/programs" className="hover:text-blue-600 transition-colors">Livelihood Trainings</Link></li>
            <li><Link href="/membership" className="hover:text-blue-600 transition-colors font-bold text-blue-600">Public Membership & Intake Form</Link></li>
            <li><Link href="/community" className="hover:text-blue-600 transition-colors">Artisan Community</Link></li>
            <li><Link href="/news" className="hover:text-blue-600 transition-colors">News & Events</Link></li>
            <li><Link href="/store" className="hover:text-blue-600 transition-colors">Mini Virtual Store</Link></li>
          </ul>
        </div>

        <div>
          <span className="font-bold text-sm text-zinc-900 dark:text-white block mb-3">Governance & Privacy</span>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/membership" className="hover:text-blue-600 transition-colors">Register as Member / Livelihood</Link></li>
            <li><Link href="/admin" className="hover:text-blue-600 transition-colors font-bold text-slate-800 dark:text-slate-200">Admin Command Center</Link></li>
            <li className="text-zinc-400 pt-2">
              Protected under Republic Act 10173 (Data Privacy Act of 2012). WCAG 2.1 AA accessible with bilingual support.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
