'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Scissors, Award, Users, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAccessibility } from '@/context/AccessibilityContext';
import { defaultWebsiteContent } from '@/data/websiteContent';

export default function ProgramsPage() {
  const { playChime } = useAccessibility();
  const programs = defaultWebsiteContent.programs || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Gawad Tsanselor Recognized Initiatives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Livelihood Trainings & Community Programs
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 font-medium">
            Building long-term self-reliance through accredited vocational skills, modern equipment, and institutional partnerships within the University of the Philippines Diliman community.
          </p>
        </div>

        <div className="space-y-8">
          {programs.map((prog, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black shrink-0">
                <Scissors className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase">
                    Partner: {prog.partner}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                  {prog.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed font-medium">
                  {prog.description}
                </p>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-500 block mb-2">Key Competencies Learned:</span>
                  <div className="flex flex-wrap gap-2">
                    {prog.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enrollment & Partnership CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-blue-700 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl font-black">Interested in Partnering or Sponsoring Materials?</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              We welcome fabric donations, equipment maintenance volunteers, and institutional product commissions for corporate gifts and conventions.
            </p>
          </div>
          <Link
            href="/store"
            onClick={() => playChime('click')}
            className="px-6 py-3.5 rounded-2xl bg-white text-blue-900 font-extrabold text-sm shadow-md hover:bg-zinc-100 shrink-0"
          >
            Visit Product Showcase
          </Link>
        </div>
      </main>
    </div>
  );
}
