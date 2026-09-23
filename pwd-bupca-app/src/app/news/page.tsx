'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { defaultWebsiteContent } from '@/data/websiteContent';
import { NewsItem } from '@/types';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Tag, 
  User, 
  Filter, 
  ShieldCheck, 
  Bell,
  Clock,
  Share2,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function NewsPage() {
  const { playChime, speakText } = useAccessibility();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalNews, setActiveModalNews] = useState<NewsItem | null>(null);

  const categories = ['All', 'Milestone', 'Event', 'Training', 'Partnership', 'Advocacy'];
  const allNews: NewsItem[] = defaultWebsiteContent.news || [];

  const filteredNews = selectedCategory === 'All'
    ? allNews
    : allNews.filter(n => n.category === selectedCategory);

  const featuredNews = allNews.find(n => n.featured) || allNews[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Community Bulletins & Happenings</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            News, Milestones & Events
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium">
            Stay updated with vocational training schedules, UP Diliman circular sustainability milestones, donation drives, and official association announcements.
          </p>
        </div>

        {/* Featured Milestone Card */}
        {featuredNews && (
          <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
            <div className="lg:col-span-6 relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md">
                  ★ Featured Highlight
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold uppercase tracking-wider">
                  {featuredNews.category}
                </span>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredNews.publishedDate}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                {featuredNews.title}
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {featuredNews.summary}
              </p>

              {featuredNews.eventLocation && (
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 pt-1">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{featuredNews.eventLocation}</span>
                </div>
              )}

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    playChime('click');
                    setActiveModalNews(featuredNews);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-zinc-400 mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playChime('click');
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-zinc-400 font-medium">
            Showing {filteredNews.length} Article(s)
          </span>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{item.publishedDate}</span>
                    {item.eventDate && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Event: {item.eventDate}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.eventLocation && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{item.eventLocation}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 px-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-medium">By {item.author}</span>
                <button
                  onClick={() => {
                    playChime('click');
                    setActiveModalNews(item);
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* DPA Compliance & Transparency Notice */}
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              <strong>Transparency & Privacy Notice:</strong> All public news, event photographs, and partnership releases are published in compliance with the Philippine Data Privacy Act of 2012 (RA 10173).
            </span>
          </div>
          <Link
            href="/privacy"
            className="text-xs font-bold text-blue-700 dark:text-blue-300 underline whitespace-nowrap"
          >
            Read Privacy Policy →
          </Link>
        </div>

      </main>

      {/* ARTICLE FULL MODAL */}
      {activeModalNews && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                {activeModalNews.category}
              </span>
              <button
                onClick={() => setActiveModalNews(null)}
                className="text-zinc-400 hover:text-zinc-600 text-xs font-semibold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={activeModalNews.image}
                alt={activeModalNews.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <span>Published: {activeModalNews.publishedDate}</span>
                {activeModalNews.eventDate && <span>• Event Date: {activeModalNews.eventDate}</span>}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                {activeModalNews.title}
              </h2>

              {activeModalNews.eventLocation && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 pt-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{activeModalNews.eventLocation}</span>
                </div>
              )}
            </div>

            <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <p>{activeModalNews.content}</p>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
              <span>Authored by: <strong>{activeModalNews.author}</strong></span>
              <button
                onClick={() => setActiveModalNews(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
