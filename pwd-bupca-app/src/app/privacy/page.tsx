'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Scale, 
  Users,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Republic Act No. 10173 Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Data Privacy Policy & DPA RA 10173 Disclosure
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium">
            Official Data Protection Framework of <strong>Persons with Disabilities - Barangay UP Campus Association Inc. (PWD BUPCA Inc.)</strong>. Effective Date: March 2026.
          </p>
        </div>

        {/* Executive Transparency Statement */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <span>1. Commitment to Personal & Sensitive Data Privacy</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            PWD BUPCA Inc. is committed to upholding and respecting the rights of our members, staff, customers, and partners in full compliance with the <strong>Philippine Data Privacy Act of 2012 (Republic Act No. 10173)</strong>, its Implementing Rules and Regulations (IRR), and all circulars issued by the <strong>National Privacy Commission (NPC)</strong>.
          </p>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Because our community includes individuals with sensory, mobility, and neurodivergent determinations, we implement strict administrative, technical, and physical controls to ensure sensitive personal information (including health condition and disability classifications) is held in the highest confidence and never disclosed without explicit informed consent.
          </p>
        </div>

        {/* Section 2: What We Collect & Why */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>2. Categories of Information Processed</span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700 space-y-2">
              <strong className="text-zinc-900 dark:text-white block text-sm">
                A. Public Artisan Profiles & Community Showcase (`/community`)
              </strong>
              <p className="leading-relaxed">
                We collect and publish preferred community names, photos, craft specializations, and quotes <strong>solely based on written, voluntary informed consent</strong>. This celebrates artisan craftsmanship and builds public recognition.
              </p>
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs pt-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Personal phone numbers, home addresses, and government ID numbers are NEVER made public.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700 space-y-2">
              <strong className="text-zinc-900 dark:text-white block text-sm">
                B. Member Production & DTR Station Logs (Internal Command Center)
              </strong>
              <p className="leading-relaxed">
                During workshop shifts, members log machine hours worked, fabric meters consumed, and finished units produced. This operational data is processed strictly for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs pl-2">
                <li>Automated calculation of fair piece-rate earnings and DTR hourly allowances.</li>
                <li>Auditing 100% grant-subsidized raw material distribution.</li>
                <li>Equipment maintenance and workshop station scheduling.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700 space-y-2">
              <strong className="text-zinc-900 dark:text-white block text-sm">
                C. Store Customers & Bulk Purchasers (`/store`)
              </strong>
              <p className="leading-relaxed">
                When purchasing handcrafted products, we collect customer name, contact phone number, delivery address, and payment method (GCash, Bank Transfer, or Cash on Pickup). This information is utilized exclusively for order fulfillment, receipt generation, and delivery coordination.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Principles of Data Processing */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <span>3. Principles of Transparency, Legitimacy & Proportionality</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-1.5">
              <strong className="text-blue-900 dark:text-blue-200 block text-sm">Transparency</strong>
              <p className="text-zinc-600 dark:text-zinc-300">
                Members and customers are clearly informed before any data collection regarding why the information is required and how it will be processed.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-1.5">
              <strong className="text-blue-900 dark:text-blue-200 block text-sm">Legitimate Purpose</strong>
              <p className="text-zinc-600 dark:text-zinc-300">
                Data processing is strictly bound to cooperative enterprise management, vocational training certification, and legal order fulfillment.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-1.5">
              <strong className="text-blue-900 dark:text-blue-200 block text-sm">Proportionality</strong>
              <p className="text-zinc-600 dark:text-zinc-300">
                We collect only the minimum necessary data fields. Unnecessary medical records and sensitive financial identifiers are never requested.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Data Subject Rights */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>4. Your Statutory Rights Under RA 10173</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Every data subject whose personal information is processed by PWD BUPCA Inc. enjoys full statutory rights under Section 16 of the Data Privacy Act:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
            <li className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Right to be Informed</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Right to Access Your Records</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Right to Object to Processing</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Right to Erasure or Blocking</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Right to Rectification & Correction</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Right to File a Complaint with the NPC</span>
            </li>
          </ul>
        </div>

        {/* Data Protection Officer (DPO) Contact */}
        <div className="p-6 rounded-3xl bg-zinc-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
              Data Protection Officer (DPO) Inquiries
            </span>
            <h3 className="text-lg font-bold mt-0.5">
              Have questions regarding your privacy rights?
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              To request profile removal, correct information, or review written consent records, please contact our compliance desk at Pook Dagohoy Hub.
            </p>
          </div>
          <div className="space-y-1 text-xs">
            <span className="font-mono text-zinc-300 block">dpo.pwdbupca@gmail.com</span>
            <span className="font-mono text-zinc-400 block">Barangay UP Campus, Diliman QC</span>
          </div>
        </div>

      </main>

    </div>
  );
}
