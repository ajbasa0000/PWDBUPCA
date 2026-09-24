'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Award, 
  Scissors, 
  Users, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Leaf, 
  Layers, 
  Star, 
  Compass, 
  ArrowUpRight,
  Calendar,
  MapPin,
  Handshake,
  Building2,
  ExternalLink
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { mockProducts, mockPartners } from '@/data/mockData';
import { PartnerClient } from '@/types';
import { defaultWebsiteContent } from '@/data/websiteContent';
import { useAccessibility } from '@/context/AccessibilityContext';
import { ArtisanAvatarPlaceholder } from '@/components/ArtisanAvatarPlaceholder';

export default function HomePage() {
  const { playChime } = useAccessibility();
  const [partnersList, setPartnersList] = React.useState<PartnerClient[]>(mockPartners);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('pwd_bupca_partners');
      if (stored) {
        setPartnersList(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const impactStats = [
    { label: "100% PWD Artisan Made", desc: "Every single piece sewn and crafted by members with determination", value: "100%" },
    { label: "Post-Consumer Textiles", desc: "Diverted from landfills via circular design & upcycling", value: "2.4+ Tons" },
    { label: "Active Workshop Hubs", desc: "Located throughout the University of the Philippines Diliman", value: "3 Hubs" },
    { label: "Fair Living Wage", desc: "Guaranteed piece-rates plus continuous equipment mastery", value: "100% Direct" },
  ];

  const testimonials = [
    {
      name: "Elena Santos",
      role: "Lead Master Artisan • Hearing Impaired",
      story: "Through PWD BUPCA and the UP CHE training, I mastered the high-speed lockstitch machine. Today, I create eco-totes and generate consistent income for my family with complete independence and dignity.",
      avatar: "",
      tag: "Lockstitch Specialist"
    },
    {
      name: "Ramil Bautista",
      role: "Overlock Edging Specialist • Mobility Impaired",
      story: "The adaptive workstation setup at Area 2 UP Campus allows me to operate the overlock machine easily. We don't need charity—we need opportunities and tools. BUPCA provides both.",
      avatar: "",
      tag: "Overlock Operator"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1">
        
        {/* HERO SECTION: Editorial, Clean, Typographically Rich */}
        <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-200/40 via-sky-100/20 to-emerald-100/30 dark:from-blue-900/15 dark:via-zinc-900/10 dark:to-emerald-950/15 blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Editorial Text */}
              <div className="lg:col-span-7 space-y-7">
                
                {/* Prestige Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-amber-400 transition-colors max-w-full">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 shrink-0"></span>
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-zinc-700 dark:text-zinc-300 truncate sm:whitespace-normal">
                    UP Gawad Tsanselor 2025: Natatanging Lingkod Komunidad
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-xs sm:text-sm font-extrabold tracking-widest text-blue-700 dark:text-blue-400 uppercase">
                    Sustainable Craftsmanship & Social Enterprise
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                    From Dependency to <span className="font-serif italic font-normal text-blue-700 dark:text-blue-400">Empowerment.</span>
                  </h1>
                </div>

                <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal max-w-2xl">
                  <strong>PWD BUPCA Inc.</strong> is a grassroots community association of <em>Persons with Determination</em> in Barangay UP Campus, Diliman. We transform discarded denims and textile off-cuts into functional, design-forward lifestyle products using industrial machinery and collective mastery.
                </p>

                {/* Call to Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/store"
                    onClick={() => playChime('click')}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-500"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Shop Artisan Collection</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>

                  <Link
                    href="/programs"
                    onClick={() => playChime('click')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-bold text-sm sm:text-base shadow-xs hover:border-zinc-300 transition-all focus:ring-4 focus:ring-zinc-400"
                  >
                    <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Livelihood Trainings</span>
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => playChime('click')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 font-bold text-sm sm:text-base shadow-xs transition-all"
                  >
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Our Story & Milestones</span>
                  </Link>
                </div>

                {/* Key Pillars Checklist */}
                <div className="flex flex-wrap gap-y-2 gap-x-6 pt-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero Fabric Waste</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fair-Wage Piece Rates</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>UP Diliman Academic Partnerships</span>
                  </div>
                </div>

              </div>

              {/* Right Hero Visual Card with Layered Floating Elements */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Backdrop glowing card */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] opacity-20 blur-xl"></div>
                  
                  {/* Main Product Showcase Card */}
                  <div className="relative rounded-[2.2rem] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl p-3">
                    <div className="relative h-96 w-full rounded-[1.8rem] overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000"
                        alt="Signature upcycled denim tote handcrafted by PWD BUPCA artisans"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-extrabold text-xs tracking-wider uppercase border border-white/20">
                          Handcrafted in UP Diliman
                        </span>
                      </div>
                    </div>

                    {/* Card Caption */}
                    <div className="p-4 sm:p-5 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
                          Featured Artisan Product
                        </span>
                        <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white mt-0.5">
                          Signature Upcycled Denim Tote
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Sewn by Nanay Elena • UP CHE Workshop
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-zinc-900 dark:text-white">
                          ₱380
                        </span>
                        <Link
                          href="/store"
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 block hover:underline"
                        >
                          Order item →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Floating Micro-Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 shadow-xl flex items-center gap-3 hidden sm:flex">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-zinc-900 dark:text-white block">100% Upcycled</span>
                      <span className="text-[11px] text-zinc-500">Repurposed fabrics & scrap liners</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS & IMPACT BAR */}
        <section className="border-y border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, i) => (
                <div key={i} className="border-l-2 border-blue-600/30 pl-4 space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    {stat.label}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINI VIRTUAL STORE CURATED SHOWCASE */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-blue-700 dark:text-blue-400 uppercase">
                Ethical Fashion & Utility
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white mt-1">
                Artisan Handcrafted Collection
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
                Every purchase directly finances member piece-rates and guarantees that our PWD artisans earn regular livelihood with full technological empowerment.
              </p>
            </div>
            
            <Link
              href="/store"
              onClick={() => playChime('click')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs transition"
            >
              <span>View All 12 Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="group rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 dark:bg-zinc-900/95 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 shadow-sm">
                    {prod.category}
                  </span>
                  <div className="absolute bottom-4 right-4 bg-zinc-900/90 dark:bg-white/95 text-white dark:text-zinc-950 font-black text-sm px-3 py-1.5 rounded-xl shadow-lg">
                    ₱{prod.price}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-bold">
                      Master Artisan: {prod.artisanName}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {prod.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>In Stock & Ready</span>
                    </span>
                    <Link
                      href="/store"
                      onClick={() => playChime('click')}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-700 dark:text-blue-400 hover:underline"
                    >
                      <span>Order Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST NEWS & COMMUNITY DISPATCHES */}
        <section className="py-20 bg-white dark:bg-zinc-900 border-y border-zinc-200/80 dark:border-zinc-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/60 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Latest Dispatches & Milestones</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
                  News, Trainings & Events
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
                  Stay updated on our vocational training cohorts, institutional UP awards, campus fabric drives, and community advocacy milestones.
                </p>
              </div>

              <Link
                href="/news"
                onClick={() => playChime('click')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs transition shrink-0"
              >
                <span>Browse All News & Bulletins</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {defaultWebsiteContent.news.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href="/news"
                  onClick={() => playChime('click')}
                  className="group rounded-3xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <span className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-extrabold shadow-sm ${
                        item.category === 'Milestone'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : item.category === 'Training'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      }`}>
                        {item.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.publishedDate}</span>
                        </span>
                        {item.eventLocation && (
                          <span className="flex items-center gap-1 truncate max-w-[150px]">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate">{item.eventLocation}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-400 group-hover:underline flex items-center gap-1">
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {item.author}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ARTISAN VOICES & TESTIMONIES (Creative Editorial Layout) */}
        <section className="py-20 bg-zinc-100/70 dark:bg-zinc-900/50 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-blue-700 dark:text-blue-400 uppercase">
                Voices of Determination
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white mt-2">
                "Not Charity, But Opportunity."
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-medium">
                Hear firsthand from our certified machine operators and community leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between relative"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed italic">
                      "{t.story}"
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <ArtisanAvatarPlaceholder
                        name={t.name}
                        size="md"
                        className="border-2 border-blue-500 shadow"
                      />
                      <div>
                        <h4 className="font-extrabold text-base text-zinc-900 dark:text-white">
                          {t.name}
                        </h4>
                        <p className="text-xs text-zinc-500">
                          {t.role}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      {t.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL PARTNERS & CLIENTS SHOWCASE */}
        <section className="py-20 bg-slate-50 dark:bg-zinc-900/60 border-y border-zinc-200/80 dark:border-zinc-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold">
                  <Handshake className="w-3.5 h-3.5" />
                  <span>Institutional Ecosystem</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  Trusted by Universities, LGUs & Corporates
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal">
                  Over 30 academic departments, city offices, financial institutions, and community foundations partner with PWD BUPCA for sustainable procurement, upcycling programs, and skills training.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {partnersList.filter(p => p.activeStatus).length} Active Institutional Alliances
                </span>
              </div>
            </div>

            {/* Category Groups */}
            <div className="space-y-10">
              {[
                { category: 'Academic & UP Units', label: 'University of the Philippines Diliman & Academic Colleges' },
                { category: 'Government & City Units', label: 'Quezon City Government & Public Sector Offices' },
                { category: 'Corporate & Banking', label: 'Corporate Clients & Enterprise Patrons' },
                { category: 'NGO & Civil Society', label: 'Civic Foundations, Fraternal & Community Partners' },
              ].map((grp) => {
                const groupPartners = partnersList.filter(
                  (p) => p.activeStatus && (p.category === grp.category || (grp.category === 'NGO & Civil Society' && p.category === 'Community & Fraternal'))
                );
                if (groupPartners.length === 0) return null;

                return (
                  <div key={grp.category} className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>{grp.label}</span>
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                      {groupPartners.map((part) => (
                        <div
                          key={part.id}
                          className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[140px]"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2 rounded-xl bg-slate-50/50 dark:bg-zinc-800/40 group-hover:scale-105 transition-transform">
                            <img
                              src={part.logo}
                              alt={part.name}
                              className="max-h-full max-w-full object-contain filter contrast-105"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>

                          <div className="mt-2 w-full">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {part.name}
                            </span>
                            <span className="text-[9px] text-zinc-400 font-medium block truncate mt-0.5">
                              {part.collaborationType}
                            </span>
                          </div>

                          {part.websiteUrl && (
                            <a
                              href={part.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-blue-600"
                              title={`Visit ${part.name}`}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION: Institutional Partner & Community Support */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-8 sm:p-14 shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-amber-300">
                Partner With Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Bulk Corporate Orders, Fabric Donations & Training Sponsorships.
              </h2>
              <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
                Whether you represent a University department, financial institution, or an enterprise seeking eco-friendly corporate gifts, we manufacture high-capacity batches with verified impact.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/store"
                  onClick={() => playChime('click')}
                  className="px-6 py-3.5 rounded-xl bg-white text-blue-900 font-extrabold text-sm shadow-md hover:bg-blue-50 transition-all hover:scale-105"
                >
                  Order Custom Batches
                </Link>
                <Link
                  href="/programs"
                  onClick={() => playChime('click')}
                  className="px-6 py-3.5 rounded-xl bg-blue-800/80 border border-white/20 text-white font-bold text-sm hover:bg-blue-800 transition-all"
                >
                  Explore Workshop Curriculum
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER: Minimal, Clean, Elegant */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-12 text-zinc-500 text-xs">
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
              Persons with Disabilities - Barangay UP Campus Association Inc. Registered non-profit grassroots cooperative based in the University of the Philippines Diliman, Quezon City.
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
              <li><Link href="/community" className="hover:text-blue-600 transition-colors">Artisan Community</Link></li>
              <li><Link href="/news" className="hover:text-blue-600 transition-colors">News & Events</Link></li>
              <li><Link href="/store" className="hover:text-blue-600 transition-colors">Mini Virtual Store</Link></li>
              <li><Link href="/admin" className="hover:text-blue-600 transition-colors font-bold text-blue-600">Admin Command Center</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-sm text-zinc-900 dark:text-white block mb-3">Governance & Privacy</span>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Data Privacy Policy (RA 10173)</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms & Fair-Trade Conditions</Link></li>
              <li className="text-zinc-400 pt-1">
                Equipped with WCAG 2.1 accessible modes (High-Contrast, Dyslexia Font, Audio Chimes).
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
