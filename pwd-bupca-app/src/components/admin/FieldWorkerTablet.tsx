'use client';

import React, { useState, useEffect } from 'react';
import { 
  MembershipApplication, 
  OfficialDisabilityCategory, 
  IntersectoralSector, 
  EconomicStatus, 
  ApplicationType, 
  DisabilityVisibility 
} from '@/types';
import { 
  OFFICIAL_DISABILITY_CATEGORIES, 
  INTERSECTORAL_SECTORS, 
  ECONOMIC_STATUS_OPTIONS, 
  SKILLS_INVENTORY_OPTIONS, 
  SKILLS_TO_LEARN_OPTIONS 
} from '@/data/intakeOptions';
import { 
  Tablet, 
  Wifi, 
  WifiOff, 
  Volume2, 
  CheckCircle2, 
  Save, 
  UploadCloud, 
  Trash2, 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  AlertCircle, 
  HelpCircle,
  FileCheck,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export const POOK_OPTIONS = [
  { id: 'Amorsolo', code: 'AMO', name: 'Pook Amorsolo', description: 'C.V. Francisco St., Amorsolo Alley' },
  { id: 'Dagohoy', code: 'DAG', name: 'Pook Dagohoy', description: 'Dagohoy Main, BUPCA Headquarters vicinity' },
  { id: 'Palaris', code: 'PAL', name: 'Pook Palaris', description: 'Palaris St., Lower Area' },
  { id: 'Area 2', code: 'AR2', name: 'Barangay UP Campus Area 2', description: 'J.P. Laurel St., Community Center' },
  { id: 'Area 1', code: 'AR1', name: 'Area 1 Center', description: 'Ricarte St., Upper Sector' },
  { id: 'Village A', code: 'VLA', name: 'UP Village A', description: 'Residential Zone' },
  { id: 'Village B', code: 'VLB', name: 'UP Village B', description: 'Residential Zone' },
  { id: 'Libis', code: 'LIB', name: 'Pook Libis', description: 'Creek / Riverside Sector' },
];

interface FieldWorkerTabletProps {
  onSyncApplications?: (newApplications: MembershipApplication[]) => void;
  currentUser?: { fullName: string; role: string };
}

export const FieldWorkerTablet: React.FC<FieldWorkerTabletProps> = ({
  onSyncApplications,
  currentUser = { fullName: 'Joyzel San Valentin', role: 'Pook Encoder / Area Lead' }
}) => {
  const { playChime, speakText } = useAccessibility();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [offlineDrafts, setOfflineDrafts] = useState<MembershipApplication[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pwd_bupca_field_drafts');
        if (stored) return JSON.parse(stored);
      } catch (e) {}
    }
    return [];
  });

  // Active Encoder Session State
  const [encoderName, setEncoderName] = useState(currentUser.fullName);
  const [selectedPook, setSelectedPook] = useState<string>('Amorsolo');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);

  // Form Field State
  const [appType, setAppType] = useState<ApplicationType>('both');
  const [fullName, setFullName] = useState<string>('');
  const [gender, setGender] = useState<'Lalaki (Male)' | 'Babae (Female)' | 'LGBTQ+' | 'Mas pinipiling huwag sabihin (Prefer not to say)'>('Babae (Female)');
  const [birthdate, setBirthdate] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [contactNo, setContactNo] = useState<string>('');

  const [isPwd, setIsPwd] = useState<boolean>(true);
  const [hasPwdId, setHasPwdId] = useState<'may_id' | 'wala' | 'processing'>('may_id');
  const [pwdIdNo, setPwdIdNo] = useState<string>('');
  const [disabilityVisibility, setDisabilityVisibility] = useState<DisabilityVisibility>('apparent');
  const [selectedCategories, setSelectedCategories] = useState<OfficialDisabilityCategory[]>(['Physical']);
  const [selectedSectors, setSelectedSectors] = useState<IntersectoralSector[]>(['PWD']);
  const [economicStatus, setEconomicStatus] = useState<EconomicStatus>('Walang Hanapbuhay (Unemployed)');

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDesiredSkills, setSelectedDesiredSkills] = useState<string[]>(['Industrial High-Speed Sewing Operation']);
  const [guardianName, setGuardianName] = useState<string>('');
  const [guardianContact, setGuardianContact] = useState<string>('');
  const [fieldNotes, setFieldNotes] = useState<string>('');

  // Online / Offline Network Listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync Drafts to LocalStorage
  const persistDrafts = (drafts: MembershipApplication[]) => {
    setOfflineDrafts(drafts);
    try {
      localStorage.setItem('pwd_bupca_field_drafts', JSON.stringify(drafts));
    } catch (e) {}
  };

  const handleToggleCategory = (cat: OfficialDisabilityCategory) => {
    playChime('click');
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleToggleSector = (sec: IntersectoralSector) => {
    playChime('click');
    setSelectedSectors(prev => 
      prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec]
    );
  };

  const handleToggleSkill = (skill: string) => {
    playChime('click');
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleToggleDesiredSkill = (skill: string) => {
    playChime('click');
    setSelectedDesiredSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSaveInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert('Pakilagay ang buong pangalan ng residente.');
      return;
    }

    const pookObj = POOK_OPTIONS.find(p => p.id === selectedPook) || POOK_OPTIONS[0];
    const generatedRef = `BUPCA-${pookObj.code}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: MembershipApplication = {
      id: `app-field-${Date.now()}`,
      referenceNumber: generatedRef,
      applicationType: appType,
      fullName: fullName.trim(),
      gender,
      birthdate: birthdate || '1990-01-01',
      address: `${streetAddress ? streetAddress + ', ' : ''}${pookObj.name}, Barangay UP Campus, Quezon City`,
      contactNo: contactNo || 'N/A (Field Recorded)',
      isPwd,
      hasPwdId,
      pwdIdNo: pwdIdNo.trim() || undefined,
      disabilityVisibility: isPwd ? disabilityVisibility : 'none',
      disabilityCategories: isPwd ? selectedCategories : [],
      sectors: selectedSectors,
      economicStatus,
      existingSkills: selectedSkills,
      skillsToLearn: selectedDesiredSkills,
      isLivelihoodMemberInterest: true,
      guardianName: guardianName.trim() || undefined,
      guardianContact: guardianContact.trim() || undefined,
      status: 'pending_review',
      submissionDate: new Date().toISOString().split('T')[0],
      reviewedBy: `Encoded by Community Volunteer: ${encoderName} (${pookObj.name})`,
      reviewNotes: fieldNotes.trim() ? `[Volunteer Intake Note]: ${fieldNotes.trim()}` : `Field survey encoded at ${pookObj.name} by volunteer ${encoderName}.`,
      dpaConsent: true,
    };

    const updated = [newRecord, ...offlineDrafts];
    persistDrafts(updated);
    playChime('success');

    // Reset Form for next resident
    setFullName('');
    setStreetAddress('');
    setContactNo('');
    setPwdIdNo('');
    setGuardianName('');
    setGuardianContact('');
    setFieldNotes('');
    speakText(`Naitala na ang panayam kay ${newRecord.fullName}. Handa na para sa susunod na residente.`);
  };

  const handleSyncToHub = () => {
    if (offlineDrafts.length === 0) return;
    setIsSyncing(true);
    playChime('click');

    setTimeout(() => {
      if (onSyncApplications) {
        onSyncApplications(offlineDrafts);
      }
      const count = offlineDrafts.length;
      persistDrafts([]);
      setIsSyncing(false);
      setSyncSuccessMsg(`Matagumpay na na-sync ang ${count} tala sa Membership Review Hub!`);
      playChime('success');
      speakText(`Tagumpay! ${count} mga aplikasyon ang naipadala sa Admin Review Hub.`);
      setTimeout(() => setSyncSuccessMsg(null), 6000);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Tablet Command Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center shrink-0 shadow-inner">
              <Tablet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  PWD BUPCA Tablet Mode
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  isOnline 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                }`}>
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {isOnline ? 'Online Ready' : 'Offline Storage Active'}
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
                Community Volunteer & Pook Encoder Console
              </h2>
              <p className="text-xs text-slate-300">
                Door-to-door resident interview & assisted registration terminal for Barangay UP Campus.
              </p>
            </div>
          </div>

          {/* Sync Queue Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-right">
              <span className="text-[10px] text-slate-300 uppercase block font-semibold">Local Queue</span>
              <span className="text-base font-black text-amber-300">{offlineDrafts.length} Residents</span>
            </div>

            <button
              type="button"
              onClick={handleSyncToHub}
              disabled={offlineDrafts.length === 0 || isSyncing}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition cursor-pointer ${
                offlineDrafts.length > 0 && !isSyncing
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-zinc-700/60 text-zinc-400 cursor-not-allowed border border-white/10'
              }`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Syncing to Hub...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Batch Sync ({offlineDrafts.length})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sync Success Alert */}
        {syncSuccessMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{syncSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Encoder Setup & Rapid Intake Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Encoder Profile & Drafts Roster */}
        <div className="space-y-6 lg:col-span-1">
          {/* Encoder Session Info */}
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              Active Encoder Session
            </h3>

            <div>
              <label className="block text-[11px] font-bold uppercase text-zinc-500 mb-1">
                Community Volunteer Name
              </label>
              <input
                type="text"
                value={encoderName}
                onChange={(e) => setEncoderName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-zinc-500 mb-1">
                Target Pook Sector
              </label>
              <select
                value={selectedPook}
                onChange={(e) => setSelectedPook(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-900 dark:text-white"
              >
                {POOK_OPTIONS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-zinc-400 mt-1">
                {POOK_OPTIONS.find(p => p.id === selectedPook)?.description}
              </p>
            </div>
          </div>

          {/* Pending Field Interviews Queue */}
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Interviews Saved Locally
              </h3>
              <span className="text-xs font-black text-blue-600">{offlineDrafts.length}</span>
            </div>

            {offlineDrafts.length === 0 ? (
              <p className="text-xs text-zinc-400 italic py-4 text-center">
                Walang naka-save na offline draft. Mag-interview at pindutin ang &quot;I-save ang Panayam&quot;.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {offlineDrafts.map((draft, idx) => (
                  <div key={draft.id || idx} className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{draft.fullName}</p>
                      <p className="text-[10px] font-mono text-blue-600">{draft.referenceNumber}</p>
                      <p className="text-[10px] text-zinc-500 truncate max-w-[180px]">{draft.address}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Alisin si ${draft.fullName} sa offline queue?`)) {
                          persistDrafts(offlineDrafts.filter((_, i) => i !== idx));
                        }
                      }}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition"
                      title="Alisin"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Rapid Field Intake Sheet */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSaveInterview} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            
            {/* Sheet Title & Filipino TTS Guide */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div>
                <span className="text-xs font-black uppercase text-blue-600 tracking-wider">
                  Mabilisang Pagtatala sa Pook (Rapid Survey)
                </span>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">
                  Form ng Residente & Interbyu
                </h3>
              </div>

              <button
                type="button"
                onClick={() => speakText("Magandang araw po. Ako ay community volunteer ng PWD BUPCA. Narito ako upang magtala para sa asosasyon at livelihood programs sa ating barangay.")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-xs hover:bg-blue-100 transition cursor-pointer"
                title="Pakinggan ang pambungad na bati"
              >
                <Volume2 className="w-4 h-4" />
                <span>Pambungad na Bati (Audio)</span>
              </button>
            </div>

            {/* Section 1: Demographics */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">
                1. Pangalan at Tirahan ng Residente
              </h4>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Buong Pangalan (Full Legal Name) *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maria Teresa Santos"
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Kasarian
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white"
                  >
                    <option value="Babae (Female)">Babae (Female)</option>
                    <option value="Lalaki (Male)">Lalaki (Male)</option>
                    <option value="LGBTQ+">LGBTQIA+</option>
                    <option value="Mas pinipiling huwag sabihin (Prefer not to say)">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Petsa ng Kapanganakan
                  </label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Telepono / Cellphone
                  </label>
                  <input
                    type="tel"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    placeholder="0917-xxx-xxxx"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Bahay / Kalye sa {selectedPook}
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. Blk 4 Lot 12, C.V. Francisco St."
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            {/* Section 2: PWD Classification & QC PDAO Status */}
            <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">
                2. Uri ng Kapansanan & Katayuan sa PDAO
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                    May Opisyal bang PWD ID?
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: 'may_id', label: 'May PDAO ID' },
                      { id: 'wala', label: 'Wala / Kailangan ng Tulong' },
                      { id: 'processing', label: 'Processing' }
                    ].map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setHasPwdId(st.id as any)}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
                          hasPwdId === st.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {hasPwdId === 'may_id' && (
                    <input
                      type="text"
                      value={pwdIdNo}
                      onChange={(e) => setPwdIdNo(e.target.value)}
                      placeholder="QC PDAO ID No. (e.g. QC-137404-2024-xxxx)"
                      className="w-full mt-2 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-bold text-blue-600"
                    />
                  )}
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                    Uri ng Kapansanan (Visibility)
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: 'apparent', label: 'Apparent (Nakikita)' },
                      { id: 'non_apparent', label: 'Non-Apparent (Di Nakikita)' }
                    ].map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setDisabilityVisibility(v.id as any)}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
                          disabilityVisibility === v.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Categories Pills */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Kategorya ng Kapansanan (Pumili ng isa o higit pa)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {OFFICIAL_DISABILITY_CATEGORIES.map(cat => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleToggleCategory(cat.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                        }`}
                      >
                        {cat.filipino}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 3: Skills & Machine Desires */}
            <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">
                3. Pangkabuhayan, Kasanayan at Pagsasanay
              </h4>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Kasanayan na gustong matutunan o pagsasanay na nais salihan:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS_TO_LEARN_OPTIONS.slice(0, 6).map(skill => {
                    const isSelected = selectedDesiredSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleToggleDesiredSkill(skill)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guardian Contact (if assisted) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1">
                    Kasambahay / Guardian (Kung may gumagabay)
                  </label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Pangalan ng Guardian"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1">
                    Telepono ng Guardian
                  </label>
                  <input
                    type="tel"
                    value={guardianContact}
                    onChange={(e) => setGuardianContact(e.target.value)}
                    placeholder="09xx-xxx-xxxx"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Field Notes */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1">
                  Tala ng Community Volunteer (Observations, Machine access needs, Urgency)
                </label>
                <textarea
                  rows={2}
                  value={fieldNotes}
                  onChange={(e) => setFieldNotes(e.target.value)}
                  placeholder="Halimbawa: May lumang makinang padyak sa bahay ngunit sirang foot pedal. Handa sumali sa Sabado batch ng CHE."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>RA 10173 Data Privacy Act Compliant</span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-lg transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>I-save ang Panayam (Save to Queue)</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
