'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { defaultWebsiteContent } from '@/data/websiteContent';
import { CommunityMember } from '@/types';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ShoppingBag, 
  CheckCircle, 
  Heart, 
  ExternalLink,
  Award,
  Calendar,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function CommunityPage() {
  const { playChime } = useAccessibility();
  const members: CommunityMember[] = defaultWebsiteContent.communityMembers || [];
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 text-xs font-bold">
            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Master Artisans & Community Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Our PWD Artisan Community
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium">
            Celebrating the persons with determination behind every upcycled creation. From single-needle industrial lockstitch to precision overlock edging, meet our certified master makers in Barangay UP Campus.
          </p>
        </div>

        {/* Data Privacy Compliance Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white block">
                Philippine Data Privacy Act (RA 10173) Informed Consent
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                All featured artisan names, quotes, and photographs are published with voluntary, written informed consent. In compliance with National Privacy Commission (NPC) circulars, personal contacts, government IDs, and sensitive health records are strictly private and never published.
              </p>
            </div>
          </div>

          <Link
            href="/privacy"
            className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 text-xs font-bold text-zinc-800 dark:text-zinc-200 whitespace-nowrap shadow-2xs"
          >
            Privacy Framework →
          </Link>
        </div>

        {/* Artisan Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-60 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.preferredName}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                      Member since {member.joinedYear}
                    </span>
                  </div>

                  {member.consentSigned && (
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[9px] font-bold flex items-center gap-1 shadow-xs">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>Consent Verified</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Profile Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h2 className="font-black text-lg text-zinc-900 dark:text-white">
                      {member.preferredName}
                    </h2>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mt-0.5">
                      {member.artisanRole}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block mt-0.5">
                      {member.determinationFocus}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{member.workshopStation}</span>
                  </div>

                  {/* Specialties Pills */}
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Craft Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action to Store */}
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between">
                <button
                  onClick={() => {
                    playChime('click');
                    setSelectedMember(member);
                  }}
                  className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 cursor-pointer"
                >
                  View Story
                </button>

                <Link
                  href="/store"
                  onClick={() => playChime('click')}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Shop Crafts</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Community Empowerment Quote Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xl space-y-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Community Philosophy
            </span>
            <blockquote className="text-xl sm:text-2xl font-serif italic font-normal leading-snug">
              "We do not ask for charity or pity. Give us access to industrial machinery, adaptive workstations, and fair piece-rates—and we will create world-class products."
            </blockquote>
            <span className="text-xs font-semibold text-blue-200 block pt-1">
              — PWD BUPCA Artisan Circle • UP Diliman Gawad Tsanselor 2025
            </span>
          </div>
        </div>

      </main>

      {/* MEMBER STORY MODAL */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-xs text-zinc-900 dark:text-white">Artisan Profile</span>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-zinc-400 hover:text-zinc-600 text-xs font-semibold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={selectedMember.photo}
                alt={selectedMember.preferredName}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                {selectedMember.preferredName}
              </h2>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mt-0.5">
                {selectedMember.artisanRole}
              </span>
              <span className="text-xs text-zinc-400 font-mono block mt-0.5">
                Station: {selectedMember.workshopStation}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {selectedMember.bio}
            </p>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">DPA RA 10173 Consent Record:</span>
              <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Consent on file for public storytelling, portfolio showcase & store attribution.</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <button
                onClick={() => setSelectedMember(null)}
                className="flex-1 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Close
              </button>
              <Link
                href="/store"
                onClick={() => setSelectedMember(null)}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shop Artisan Store</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
