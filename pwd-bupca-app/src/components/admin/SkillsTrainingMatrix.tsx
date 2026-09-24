'use client';

import React, { useState } from 'react';
import { 
  MembershipApplication, 
  EquipmentAsset, 
  TrainingCohort 
} from '@/types';
import { 
  SKILLS_TO_LEARN_OPTIONS, 
  SKILLS_INVENTORY_OPTIONS 
} from '@/data/intakeOptions';
import { 
  GraduationCap, 
  Sparkles, 
  Users, 
  Wrench, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  TrendingUp, 
  ArrowRight, 
  BookOpen, 
  UserPlus, 
  Award,
  Layers,
  Building
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface SkillsTrainingMatrixProps {
  applications: MembershipApplication[];
  assets: EquipmentAsset[];
  cohorts: TrainingCohort[];
  onUpdateCohorts: (cohorts: TrainingCohort[]) => void;
  onUpdateAsset?: (asset: EquipmentAsset) => void;
}

export const SkillsTrainingMatrix: React.FC<SkillsTrainingMatrixProps> = ({
  applications,
  assets,
  cohorts,
  onUpdateCohorts,
  onUpdateAsset
}) => {
  const { playChime, speakText } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'matrix' | 'cohorts' | 'matching'>('matrix');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');

  // Modal: Create / Edit Cohort
  const [showCohortModal, setShowCohortModal] = useState<boolean>(false);
  const [cohortTitle, setCohortTitle] = useState('');
  const [targetSkill, setTargetSkill] = useState(SKILLS_TO_LEARN_OPTIONS[0]);
  const [partnerLead, setPartnerLead] = useState('UP College of Home Economics (CHE)');
  const [cohortLocation, setCohortLocation] = useState('UP CHE Community Workshop');
  const [cohortSchedule, setCohortSchedule] = useState('Saturdays, 8:00 AM - 12:00 PM');
  const [cohortCapacity, setCohortCapacity] = useState(6);
  const [cohortNotes, setCohortNotes] = useState('');
  const [cohortStartDate, setCohortStartDate] = useState('2026-04-15');

  // Modal: Enroll Member into Cohort
  const [selectedCohortForEnroll, setSelectedCohortForEnroll] = useState<TrainingCohort | null>(null);

  // Compute skill frequencies from applications
  const skillDemandMap = SKILLS_TO_LEARN_OPTIONS.map((skill) => {
    const interestedApplicants = applications.filter((app) => 
      app.skillsToLearn && app.skillsToLearn.some(s => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase()))
    );

    // Active cohorts teaching this skill
    const matchingCohorts = cohorts.filter(c => c.targetSkill === skill);
    const totalEnrolled = matchingCohorts.reduce((sum, c) => sum + c.enrolledApplicantIds.length, 0);

    return {
      skill,
      count: interestedApplicants.length,
      applicants: interestedApplicants,
      cohortCount: matchingCohorts.length,
      enrolledCount: totalEnrolled
    };
  }).sort((a, b) => b.count - a.count);

  // Compute existing skills inventory in community
  const existingSkillsMap = SKILLS_INVENTORY_OPTIONS.map((skill) => {
    const artisansWithSkill = applications.filter((app) =>
      app.existingSkills && app.existingSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase()))
    );
    return {
      skill,
      count: artisansWithSkill.length,
      artisans: artisansWithSkill
    };
  }).sort((a, b) => b.count - a.count);

  // Unissued industrial assets ready for allocation
  const availableMachines = assets.filter(a => !a.issuedTo && a.status !== 'maintenance');

  const handleCreateCohort = (e: React.FormEvent) => {
    e.preventDefault();
    const newCohort: TrainingCohort = {
      id: `ch-${Date.now()}`,
      title: cohortTitle.trim(),
      targetSkill,
      partnerLead: partnerLead.trim() || 'PWD BUPCA Training Committee',
      locationName: cohortLocation.trim(),
      schedule: cohortSchedule.trim(),
      capacity: cohortCapacity,
      enrolledApplicantIds: [],
      status: 'active',
      startDate: cohortStartDate,
      notes: cohortNotes.trim()
    };
    const updated = [newCohort, ...cohorts];
    onUpdateCohorts(updated);
    try {
      localStorage.setItem('pwd_bupca_cohorts', JSON.stringify(updated));
    } catch {}
    setShowCohortModal(false);
    playChime('success');
    speakText(`Training cohort ${cohortTitle} created successfully.`);
  };

  const handleEnrollMember = (cohortId: string, applicantId: string) => {
    const updated = cohorts.map(c => {
      if (c.id === cohortId) {
        if (c.enrolledApplicantIds.includes(applicantId)) return c;
        return {
          ...c,
          enrolledApplicantIds: [...c.enrolledApplicantIds, applicantId]
        };
      }
      return c;
    });
    onUpdateCohorts(updated);
    try {
      localStorage.setItem('pwd_bupca_cohorts', JSON.stringify(updated));
    } catch {}
    playChime('success');
  };

  const handleRemoveEnrollment = (cohortId: string, applicantId: string) => {
    const updated = cohorts.map(c => {
      if (c.id === cohortId) {
        return {
          ...c,
          enrolledApplicantIds: c.enrolledApplicantIds.filter(id => id !== applicantId)
        };
      }
      return c;
    });
    onUpdateCohorts(updated);
    try {
      localStorage.setItem('pwd_bupca_cohorts', JSON.stringify(updated));
    } catch {}
    playChime('alert');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Training Demand & Upskilling Command */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-bold mb-3 uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
              Community Capacity & Livelihood Upskilling
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Skills Assessment & Training Needs Matrix
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Direct intelligence extracted from official intake forms. Group aspiring artisans by desired machine competencies, organize training cohorts, and allocate standby machines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setCohortTitle(`Batch Cohort ${cohorts.length + 1}: ${targetSkill.split(' ')[0]} Mastery`);
                setShowCohortModal(true);
                playChime('click');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Training Cohort</span>
            </button>
          </div>
        </div>

        {/* Real Demand Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10 text-white">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-300 font-bold block">Top Requested Skill</span>
            <span className="text-base sm:text-lg font-black mt-0.5 block truncate text-amber-300">
              {skillDemandMap[0]?.skill.split(' ')[0]} {skillDemandMap[0]?.skill.split(' ')[1]}
            </span>
            <span className="text-[10px] text-slate-400">{skillDemandMap[0]?.count} applicants requesting</span>
          </div>

          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-400/30">
            <span className="text-xs text-indigo-300 font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Active Cohorts
            </span>
            <span className="text-2xl font-black text-indigo-300 mt-0.5 block">
              {cohorts.filter(c => c.status === 'active').length} Batches
            </span>
            <span className="text-[10px] text-indigo-400">UP CHE & Area 2 Hubs</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
            <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Enrolled Apprentices
            </span>
            <span className="text-2xl font-black text-emerald-300 mt-0.5 block">
              {cohorts.reduce((s, c) => s + c.enrolledApplicantIds.length, 0)} Members
            </span>
            <span className="text-[10px] text-emerald-400">Undergoing apprenticeship</span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-400/30">
            <span className="text-xs text-blue-300 font-bold flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              Machines for Training
            </span>
            <span className="text-2xl font-black text-blue-300 mt-0.5 block">
              {availableMachines.length} Units Free
            </span>
            <span className="text-[10px] text-blue-400">Ready in hub stock</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-2xl border border-slate-200 dark:border-zinc-700/80">
          <button
            onClick={() => { setActiveTab('matrix'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'matrix' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Demand Matrix & Analytics</span>
          </button>

          <button
            onClick={() => { setActiveTab('cohorts'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'cohorts' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Active Training Cohorts ({cohorts.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('matching'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'matching' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Machine-to-Artisan Allocation</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DEMAND MATRIX & COMMUNITY SKILLS INTELLIGENCE */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: What Community Wants to Learn */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Desired Skills to Learn ("Kasanayan na Gustong Matutunan")
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Ranked by applicant demand from intake forms.</p>
              </div>
            </div>

            <div className="space-y-3">
              {skillDemandMap.map((item, idx) => {
                const maxDemand = Math.max(...skillDemandMap.map(d => d.count), 1);
                const percent = Math.round((item.count / maxDemand) * 100);
                return (
                  <div 
                    key={item.skill} 
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/80 dark:border-zinc-700/80 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-black text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{item.skill}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                          {item.count} {item.count === 1 ? 'applicant' : 'applicants'}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-slate-300 font-bold">
                          {item.cohortCount} {item.cohortCount === 1 ? 'cohort' : 'cohorts'}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Applicant Preview Badges */}
                    {item.applicants.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        <span className="text-[10px] text-slate-400 font-medium mr-1">Aspiring:</span>
                        {item.applicants.map((a) => (
                          <span 
                            key={a.id} 
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300"
                            title={a.address}
                          >
                            {a.fullName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Existing Artisan Talent Pool */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                Community Skills Baseline ("Existing Skills")
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Existing artisan capabilities ready for active production.</p>
            </div>

            <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
              {existingSkillsMap.map((item) => (
                <div 
                  key={item.skill}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{item.skill}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      {item.artisans.map(a => a.fullName).slice(0, 2).join(', ')}
                      {item.artisans.length > 2 ? ` +${item.artisans.length - 2} more` : ''}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    {item.count} Artisans
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ACTIVE TRAINING COHORTS */}
      {activeTab === 'cohorts' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cohorts.map((cohort) => {
              const enrolledMembers = applications.filter(a => cohort.enrolledApplicantIds.includes(a.id));
              const isFull = cohort.enrolledApplicantIds.length >= cohort.capacity;
              return (
                <div 
                  key={cohort.id}
                  className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                        cohort.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}>
                        {cohort.status === 'active' ? '● In Progress' : '○ Planning'}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {cohort.enrolledApplicantIds.length}/{cohort.capacity} Enrolled
                      </span>
                    </div>

                    <h4 className="font-black text-base text-slate-900 dark:text-white leading-snug">
                      {cohort.title}
                    </h4>

                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <p className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{cohort.targetSkill}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{cohort.locationName}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{cohort.schedule}</span>
                      </p>
                    </div>

                    {cohort.assignedAssetTags && cohort.assignedAssetTags.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/60 dark:border-zinc-700 text-[11px]">
                        <span className="font-bold text-slate-400 block mb-1">Assigned Training Machinery:</span>
                        <div className="flex flex-wrap gap-1">
                          {cohort.assignedAssetTags.map(tag => (
                            <span key={tag} className="font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enrolled Members list */}
                  <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Enrolled Apprentices ({enrolledMembers.length})
                    </span>
                    <div className="space-y-1.5">
                      {enrolledMembers.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No members enrolled yet.</p>
                      ) : (
                        enrolledMembers.map((m) => (
                          <div 
                            key={m.id} 
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-zinc-800 text-xs"
                          >
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white leading-tight">{m.fullName}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{m.contactNo}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveEnrollment(cohort.id, m.id)}
                              className="text-rose-500 hover:text-rose-700 text-[10px] font-bold px-1.5 py-0.5 cursor-pointer"
                              title="Remove from cohort"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCohortForEnroll(cohort);
                        playChime('click');
                      }}
                      disabled={isFull}
                      className={`w-full mt-2 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        isFull 
                          ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>{isFull ? 'Cohort Full' : '+ Enroll Member'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: MACHINE-TO-ARTISAN ALLOCATION */}
      {activeTab === 'matching' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Available Unassigned Machinery (Ready for MR) */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-600" />
                Unassigned Standby Machines ({availableMachines.length} Units)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Physical machines in central stock ready to be issued under Memorandum Receipt to newly trained members.
              </p>
            </div>

            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {availableMachines.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  All machines currently issued under Memorandum Receipt.
                </div>
              ) : (
                availableMachines.map((ast) => (
                  <div 
                    key={ast.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                          {ast.assetTag}
                        </span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-slate-300">
                          {ast.brand}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 dark:text-white mt-1">{ast.name}</p>
                      <p className="text-slate-400 text-[11px] font-mono">{ast.serialNo || ast.specifications}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold shrink-0">
                      Ready for MR
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Qualified Applicants Looking for Machine Placement */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Approved Members Ready for Equipment Matching
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Members certified with sewing competencies awaiting machine deployment to their home or cell.
              </p>
            </div>

            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {applications.filter(a => a.status === 'approved').map((app) => (
                <div 
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{app.fullName}</span>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-mono font-bold">
                        {app.assignedMembershipNo || app.referenceNumber}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200">
                      Approved Member
                    </span>
                  </div>

                  <p className="text-slate-500 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{app.address}</span>
                  </p>

                  <div className="pt-2 border-t border-slate-200 dark:border-zinc-700 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-medium">
                      Skills: {app.existingSkills.slice(0, 2).join(', ')}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                      Aims: {app.skillsToLearn.slice(0, 1).join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODAL: CREATE TRAINING COHORT */}
      {showCohortModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                  New Apprenticeship Program
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  Create Training Cohort
                </h3>
              </div>
              <button 
                onClick={() => setShowCohortModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCohort} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Cohort Title *
                </label>
                <input
                  type="text"
                  required
                  value={cohortTitle}
                  onChange={(e) => setCohortTitle(e.target.value)}
                  placeholder="e.g. Batch 2: Juki High-Speed Industrial Lockstitch Apprenticeship"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Target Competency / Skill *
                </label>
                <select
                  value={targetSkill}
                  onChange={(e) => setTargetSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-medium"
                >
                  {SKILLS_TO_LEARN_OPTIONS.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Partner / Lead Instructor
                  </label>
                  <input
                    type="text"
                    value={partnerLead}
                    onChange={(e) => setPartnerLead(e.target.value)}
                    placeholder="e.g. UP CHE Faculty"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Max Capacity (Artisans) *
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={25}
                    value={cohortCapacity}
                    onChange={(e) => setCohortCapacity(parseInt(e.target.value) || 6)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Location / Hub *
                  </label>
                  <input
                    type="text"
                    value={cohortLocation}
                    onChange={(e) => setCohortLocation(e.target.value)}
                    placeholder="e.g. UP CHE Workshop"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Schedule *
                  </label>
                  <input
                    type="text"
                    value={cohortSchedule}
                    onChange={(e) => setCohortSchedule(e.target.value)}
                    placeholder="e.g. Saturdays, 8AM - 12PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCohortModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Launch Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ENROLL MEMBER INTO COHORT */}
      {selectedCohortForEnroll && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">Enroll Apprentices</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedCohortForEnroll.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Target Skill: {selectedCohortForEnroll.targetSkill}</p>
              </div>
              <button onClick={() => setSelectedCohortForEnroll(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <p className="text-xs font-bold text-slate-500 uppercase">Available Applicants:</p>
              {applications.map((app) => {
                const isAlreadyEnrolled = selectedCohortForEnroll.enrolledApplicantIds.includes(app.id);
                return (
                  <div 
                    key={app.id} 
                    className="p-3 rounded-xl border border-slate-200 dark:border-zinc-700 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{app.fullName}</p>
                      <p className="text-[10px] text-slate-400">{app.address}</p>
                    </div>
                    {isAlreadyEnrolled ? (
                      <span className="text-emerald-600 font-bold text-[11px]">✓ Enrolled</span>
                    ) : (
                      <button
                        onClick={() => handleEnrollMember(selectedCohortForEnroll.id, app.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-[11px] hover:bg-blue-500 cursor-pointer"
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setSelectedCohortForEnroll(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
