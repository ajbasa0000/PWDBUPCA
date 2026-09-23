'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag, 
  Truck, 
  Clock, 
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 text-xs font-bold">
            <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Cooperative Social Enterprise Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium">
            Standard Terms of Sale, Livelihood Fair-Trade Code, and Bulk Ordering Policies of <strong>PWD BUPCA Inc.</strong> (Barangay UP Campus, Diliman QC). Effective March 2026.
          </p>
        </div>

        {/* Section 1: Overview */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>1. PWD BUPCA Social Enterprise Charter</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            By browsing our public platform, submitting livelihood training inquiries, or purchasing items through the Artisan Virtual Store, you agree to these Terms. All commercial transactions directly support fair-wage piece-rates and operational allowances for artisans with determinations in Barangay UP Campus, Quezon City.
          </p>
        </div>

        {/* Section 2: Product Nature & Handcrafted Disclosures */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
            <span>2. Nature of Upcycled Handcrafted Goods</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Every PWD BUPCA product is individually constructed from <strong>repurposed post-consumer denim garments, donated academic uniforms, and institutional fabric remnants</strong>:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 pl-2">
            <li><strong>Unique Textural Variations:</strong> Because raw denim offcuts originate from varied genuine denim garments, minor shade differences, wash fades, and distressing characteristics are natural attributes of circular fashion.</li>
            <li><strong>Structural Integrity:</strong> All seams, handles, and stress points are reinforced using industrial lockstitch and 4-thread differential feed overlock edging meeting commercial durability standards.</li>
          </ul>
        </div>

        {/* Section 3: Orders, Payments & Fulfillment */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <span>3. Virtual Store Orders & Payment Methods</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700 space-y-1.5">
              <strong className="text-zinc-900 dark:text-white block text-sm">GCash Electronic Transfer</strong>
              <p className="text-zinc-600 dark:text-zinc-400">
                Payment confirmation is verified via reference receipt upload. Orders transition immediately to our workshop batch production queue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700 space-y-1.5">
              <strong className="text-zinc-900 dark:text-white block text-sm">BPI Bank Transfer</strong>
              <p className="text-zinc-600 dark:text-zinc-400">
                Direct institutional and personal bank transfers processed through BPI UP Campus Branch. Official receipts issued upon request.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700 space-y-1.5">
              <strong className="text-zinc-900 dark:text-white block text-sm">Cash on Pickup</strong>
              <p className="text-zinc-600 dark:text-zinc-400">
                Available for pickup at PWD BUPCA Operations Hub (Pook Dagohoy, UP Diliman) with zero shipping fees.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Institutional & Corporate B2B Orders */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span>4. Bulk Corporate & Institutional Commissions</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            For academic conventions, corporate conferences, and institutional holiday gift packages:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 pl-2">
            <li>Production timelines require 2 to 4 weeks depending on batch volume (100 to 1,000 units).</li>
            <li>A 50% mobilization deposit is requested upon contract signing to allocate dedicated machine stations and raw supplies.</li>
            <li>Each bulk order includes certified ESG impact documentation and artisan provenance story cards.</li>
          </ul>
        </div>

        {/* Footer Link */}
        <div className="flex justify-between items-center text-xs text-zinc-400 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <span>PWD BUPCA Inc. • Barangay UP Campus, Diliman QC</span>
          <Link href="/privacy" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            View Data Privacy Policy →
          </Link>
        </div>

      </main>

    </div>
  );
}
