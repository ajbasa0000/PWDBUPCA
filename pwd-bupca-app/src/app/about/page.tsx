'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Leaf, 
  Compass, 
  ArrowRight,
  Sun,
  Users,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Paintbrush,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Handshake,
  Download
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { mockMilestones } from '@/data/mockData';
import { OrgMilestone } from '@/types';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function AboutPage() {
  const { playChime } = useAccessibility();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [milestones, setMilestones] = useState<OrgMilestone[]>(mockMilestones);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('pwd_bupca_milestones');
      if (stored) {
        setMilestones(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const categories = ['All', 'Livelihood', 'Enterprise', 'Institutional', 'Renovation', 'Disaster Response'];

  const filteredMilestones = selectedCategory === 'All'
    ? milestones
    : milestones.filter(m => m.category === selectedCategory);

  const totalSales = milestones.reduce((sum, m) => sum + (m.grossIncome || 0), 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950 transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-200/30 via-sky-100/20 to-emerald-100/30 dark:from-blue-900/10 dark:via-zinc-900/10 dark:to-emerald-950/15 blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Persons with Disability in Barangay UP Campus Association, Inc.
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
                Rooted in Community. <br />
                Driven by <span className="font-serif italic text-blue-700 dark:text-blue-400">Determination.</span>
              </h1>

              <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                <strong>PWD-BUPCA, Inc.</strong> is a grassroots non-profit social enterprise in the University of the Philippines Diliman. We unite persons with disabilities, parents, solo mothers, women survivors, and community residents to build sustainable livelihoods through circular textile design, collective leadership, and zero-waste craftsmanship.
              </p>

              {/* Quick Stat Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/80">
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400 font-semibold block">Total Revenue</span>
                  <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">₱540k+</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">100% to Artisans</span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400 font-semibold block">Active Members</span>
                  <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">50+</span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block mt-0.5">Makers & Families</span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400 font-semibold block">Track Record</span>
                  <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">2022–2026</span>
                  <span className="text-[10px] text-zinc-500 font-bold block mt-0.5">Continuous Growth</span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400 font-semibold block">Volunteer Core</span>
                  <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">100%</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block mt-0.5">Zero Overhead</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PILLARS & FEMINIST TRANSFORMATIVE LEADERSHIP (FTL) */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>Leadership Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white leading-tight">
                Guided by Feminist Transformative Leadership (FTL)
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                Supported by volunteer advisers from <strong>BAYI Inc.</strong>, PWD-BUPCA rejects hierarchical command structures. Instead, we practice <em>shared leadership</em>, collective empowerment, and continuous critical reflection.
              </p>
              <div className="space-y-3.5 pt-2">
                {[
                  {
                    title: 'Collective Decision-Making',
                    desc: 'Every artisan, parent, and survivor has an active voice in setting production piece-rates and operational policies.'
                  },
                  {
                    title: '100% Volunteer Malasakit',
                    desc: 'Officers and mentors receive zero management salaries. Every peso of net revenue flows directly to creators.'
                  },
                  {
                    title: 'Gender Equality, Diversity & Social Inclusion (GEDSI)',
                    desc: 'Safe workspaces explicitly designed for mobility aids, hearing accommodations, and trauma-informed support.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-2">Our Mission</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    To support Persons with Determination and their families in Barangay UP Campus through continuous learning, livelihood dignity, medical mutual aid, and climate-conscious social enterprise.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 mt-6 uppercase tracking-wider">UP Diliman Community</span>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-2">Circular Vision</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    Transforming solid textile waste and decommissioned corporate collateral into high-value design goods, proving environmental stewardship directly generates sustainable economic opportunity.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 mt-6 uppercase tracking-wider">Zero Landfill Goal</span>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between sm:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-white">Mutual Aid & Grassroots Safety Net</h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl font-normal leading-relaxed">
                      Beyond workshop benches, PWD-BUPCA acts as an emergency response group chat. During severe flooding in Pook Daan Tubo and Pook Malinis, members dispatch preloved towels, vitamins, rice, and wheelchairs to affected neighbors via on-demand couriers.
                    </p>
                  </div>
                  <Link
                    href="/community"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition shrink-0"
                  >
                    <span>View Community Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE CHRONOLOGICAL MILESTONES (2022 - 2026) */}
        <section className="py-20 bg-zinc-100/60 dark:bg-zinc-900/40 border-y border-zinc-200/80 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Documented History</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                  Organizational Milestones (2022 – 2026)
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal">
                  From upcycling wood shipping crates for our first recreation room to securing enterprise contracts with Amber’s and BPI, every step is fueled by self-sufficiency.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { playChime('click'); setSelectedCategory(cat); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                        : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 border border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Stream */}
            <div className="relative border-l-2 border-blue-500/30 dark:border-blue-500/20 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
              {filteredMilestones.map((m) => (
                <div key={m.id} className="relative group">
                  
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-zinc-950 border-4 border-blue-600 flex items-center justify-center shadow-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </div>

                  {/* Milestone Card */}
                  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all">
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          {m.year}
                        </span>
                        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          {m.dateRange}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">
                          {m.category}
                        </span>
                        {m.grossIncome && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            ₱{m.grossIncome.toLocaleString()} Revenue
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug">
                      {m.title}
                    </h3>
                    {m.subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                        {m.subtitle}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal mt-3">
                      {m.summary}
                    </p>

                    {/* Achievements List */}
                    {m.achievements && m.achievements.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-zinc-400">Key Outcomes</h4>
                        <ul className="space-y-1.5">
                          {m.achievements.map((ach, i) => (
                            <li key={i} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Partners Involved */}
                    {m.partnersInvolved && m.partnersInvolved.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-zinc-400 font-bold mr-1">Alliances:</span>
                        {m.partnersInvolved.map((p, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                            {p}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* FLAGSHIP PROPOSAL: SOLAR-POWERED SOCIAL ENTERPRISE HUB */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-zinc-900 via-slate-900 to-blue-950 text-white p-8 sm:p-14 shadow-2xl border border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Flagship 2026–2028 Proposal</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                  The Solar-Powered Eco-Social Enterprise Hub
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  Our comprehensive project plan to build a permanent, inclusive, and net-zero community production facility in UP Campus. The hub will house dedicated sewing rooms, food and pastry kiosks for PWD bakers, an exhibition showroom, and rooftop solar power to guarantee clean, zero-cost operational electricity.
                </p>

                {/* 5-Phase Plan Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Phase 1 & 2</span>
                    <h4 className="text-xs font-bold text-white">Facility Development & Machinery Setup</h4>
                    <p className="text-[11px] text-zinc-400">Universal accessibility ramps, JUKI lockstitch stations, and safety work benches.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Phase 3 & 4</span>
                    <h4 className="text-xs font-bold text-white">Collective Production & Showroom Fairs</h4>
                    <p className="text-[11px] text-zinc-400">Regular corporate catalog manufacturing, quality control, and buyer visits.</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/store"
                    onClick={() => playChime('click')}
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105"
                  >
                    Support by Procuring Artisan Batches
                  </Link>
                  <a
                    href="mailto:pwdbupca@gmail.com?subject=Inquiry:%20Solar%20Hub%20Sponsorship"
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    Inquire as Institutional Sponsor
                  </a>
                </div>

              </div>

              {/* Resource Requirements Brief */}
              <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Proposed Resource Allocations</span>
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-zinc-200 block">Industrial Sewing Machines</span>
                      <span className="text-[10px] text-zinc-400">High-speed lockstitch & overlock edging</span>
                    </div>
                    <span className="font-mono font-bold text-amber-400">5 Units</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-zinc-200 block">Off-Grid Solar Energy Package</span>
                      <span className="text-[10px] text-zinc-400">PV panels, hybrid inverter, battery storage</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400">3.5 kWp</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-zinc-200 block">Food & Pastry Production Kiosk</span>
                      <span className="text-[10px] text-zinc-400">Baking ovens & coffee brewing stations</span>
                    </div>
                    <span className="font-mono font-bold text-blue-400">2 Stations</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-zinc-200 block">Accessible Showroom & Display</span>
                      <span className="text-[10px] text-zinc-400">Shelving, lighting, catalog display</span>
                    </div>
                    <span className="font-mono font-bold text-purple-400">1 Hub</span>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-400 leading-normal italic pt-2">
                  *Detailed specifications available from the official 2026 PWD-BUPCA Entry Document. All equipment will be permanently stewarded by the Association.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
