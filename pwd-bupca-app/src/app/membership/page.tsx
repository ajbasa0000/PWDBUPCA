'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAccessibility } from '@/context/AccessibilityContext';
import { 
  OFFICIAL_DISABILITY_CATEGORIES, 
  INTERSECTORAL_SECTORS, 
  ECONOMIC_STATUS_OPTIONS,
  SKILLS_INVENTORY_OPTIONS,
  SKILLS_TO_LEARN_OPTIONS
} from '@/data/intakeOptions';
import { 
  MembershipApplication, 
  OfficialDisabilityCategory, 
  IntersectoralSector, 
  EconomicStatus,
  ApplicationType,
  DisabilityVisibility
} from '@/types';
import { 
  HeartHandshake, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  Printer, 
  UserPlus, 
  Copy,
  Info,
  Clock,
  AlertTriangle,
  Scissors,
  CreditCard
} from 'lucide-react';
import { MemberIDCard } from '@/components/admin/MemberIDCard';

export default function MembershipRegistrationPage() {
  const { playChime, speakText } = useAccessibility();
  const [language, setLanguage] = useState<'tl' | 'en'>('tl');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [submittedApp, setSubmittedApp] = useState<MembershipApplication | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  // Status Lookup State
  const [searchRef, setSearchRef] = useState<string>('');
  const [searchResult, setSearchResult] = useState<MembershipApplication | null | 'not_found'>(null);

  // Form State
  const [appType, setAppType] = useState<ApplicationType>('both');
  const [fullName, setFullName] = useState<string>('');
  const [gender, setGender] = useState<'Lalaki (Male)' | 'Babae (Female)' | 'LGBTQ+' | 'Mas pinipiling huwag sabihin (Prefer not to say)'>('Babae (Female)');
  const [birthdate, setBirthdate] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [contactNo, setContactNo] = useState<string>('');

  // PWD details
  const [isPwd, setIsPwd] = useState<boolean>(true);
  const [hasPwdId, setHasPwdId] = useState<'may_id' | 'wala' | 'processing'>('may_id');
  const [pwdIdNo, setPwdIdNo] = useState<string>('');
  const [disabilityVisibility, setDisabilityVisibility] = useState<DisabilityVisibility>('apparent');
  const [selectedDisabilities, setSelectedDisabilities] = useState<OfficialDisabilityCategory[]>(['Physical']);
  const [disabilitySpecifyOthers, setDisabilitySpecifyOthers] = useState<string>('');

  // Sectors & Economic
  const [selectedSectors, setSelectedSectors] = useState<IntersectoralSector[]>(['PWD', 'Women Sector']);
  const [economicStatus, setEconomicStatus] = useState<EconomicStatus>('Nagtatrabaho (Employed)');
  const [economicStatusOthers, setEconomicStatusOthers] = useState<string>('');

  // Skills & Aspirations
  const [selectedExistingSkills, setSelectedExistingSkills] = useState<string[]>(['Basic Sewing (Manwal na Pananahi)']);
  const [customExistingSkill, setCustomExistingSkill] = useState<string>('');
  const [selectedSkillsToLearn, setSelectedSkillsToLearn] = useState<string[]>(['Industrial High-Speed Sewing Operation', 'Industrial Overlock / Edging Mastery']);
  const [customSkillToLearn, setCustomSkillToLearn] = useState<string>('');
  const [isLivelihoodMemberInterest, setIsLivelihoodMemberInterest] = useState<boolean>(true);

  // Guardian
  const [hasGuardian, setHasGuardian] = useState<boolean>(false);
  const [guardianName, setGuardianName] = useState<string>('');
  const [guardianContact, setGuardianContact] = useState<string>('');
  const [guardianSkills, setGuardianSkills] = useState<string>('');

  // Privacy Consent
  const [dpaConsent, setDpaConsent] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Toggle helpers
  const toggleDisability = (category: OfficialDisabilityCategory) => {
    if (selectedDisabilities.includes(category)) {
      setSelectedDisabilities(selectedDisabilities.filter(c => c !== category));
    } else {
      setSelectedDisabilities([...selectedDisabilities, category]);
    }
  };

  const toggleSector = (sec: IntersectoralSector) => {
    if (selectedSectors.includes(sec)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sec));
    } else {
      setSelectedSectors([...selectedSectors, sec]);
    }
  };

  const toggleExistingSkill = (skill: string) => {
    if (selectedExistingSkills.includes(skill)) {
      setSelectedExistingSkills(selectedExistingSkills.filter(s => s !== skill));
    } else {
      setSelectedExistingSkills([...selectedExistingSkills, skill]);
    }
  };

  const toggleSkillToLearn = (skill: string) => {
    if (selectedSkillsToLearn.includes(skill)) {
      setSelectedSkillsToLearn(selectedSkillsToLearn.filter(s => s !== skill));
    } else {
      setSelectedSkillsToLearn([...selectedSkillsToLearn, skill]);
    }
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customExistingSkill.trim() && !selectedExistingSkills.includes(customExistingSkill.trim())) {
      setSelectedExistingSkills([...selectedExistingSkills, customExistingSkill.trim()]);
      setCustomExistingSkill('');
    }
  };

  const addCustomSkillToLearn = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillToLearn.trim() && !selectedSkillsToLearn.includes(customSkillToLearn.trim())) {
      setSelectedSkillsToLearn([...selectedSkillsToLearn, customSkillToLearn.trim()]);
      setCustomSkillToLearn('');
    }
  };

  // Step Validation
  const validateAndNext = () => {
    setValidationError(null);
    if (activeStep === 1) {
      if (!fullName.trim()) {
        setValidationError(language === 'tl' ? 'Pakilagay ang inyong buong pangalan.' : 'Please enter your full name.');
        return;
      }
      if (!birthdate) {
        setValidationError(language === 'tl' ? 'Pakipili ang inyong petsa ng kapanganakan.' : 'Please provide your date of birth.');
        return;
      }
      if (!address.trim()) {
        setValidationError(language === 'tl' ? 'Pakilagay ang inyong kumpletong tirahan o pook.' : 'Please enter your community address or pook.');
        return;
      }
      if (!contactNo.trim()) {
        setValidationError(language === 'tl' ? 'Pakilagay ang inyong contact number para sa follow-up.' : 'Please provide a valid contact number.');
        return;
      }
    } else if (activeStep === 2) {
      if (isPwd && selectedDisabilities.length === 0) {
        setValidationError(language === 'tl' ? 'Pakipili ang kahit isang kategorya ng inyong kapansanan.' : 'Please select at least one disability category.');
        return;
      }
      if (isPwd && selectedDisabilities.includes('Others') && !disabilitySpecifyOthers.trim()) {
        setValidationError(language === 'tl' ? 'Pakitukoy ang uri ng kapansanan sa "Iba pa".' : 'Please specify the disability details under "Others".');
        return;
      }
    } else if (activeStep === 3) {
      if (selectedSectors.length === 0) {
        setValidationError(language === 'tl' ? 'Pakipili ang kahit isang sektor na inyong kinabibilangan.' : 'Please select at least one sector.');
        return;
      }
    }
    playChime('click');
    setActiveStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submission
  const handleSubmitApplication = () => {
    if (!dpaConsent) {
      setValidationError(language === 'tl' ? 'Kailangan ang inyong pahintulot (Data Privacy Act) upang maiproseso ang aplikasyon.' : 'Data Privacy Act consent is required to process your application.');
      playChime('alert');
      return;
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newRef = `BUPCA-APP-2026-${randomDigits}`;

    const newApp: MembershipApplication = {
      id: `app-${Date.now()}`,
      referenceNumber: newRef,
      applicationType: appType,
      fullName: fullName.trim(),
      gender,
      birthdate,
      address: address.trim(),
      contactNo: contactNo.trim(),
      isPwd,
      hasPwdId,
      pwdIdNo: pwdIdNo.trim() || undefined,
      disabilityVisibility: isPwd ? disabilityVisibility : 'none',
      disabilityCategories: isPwd ? selectedDisabilities : [],
      disabilitySpecifyOthers: disabilitySpecifyOthers.trim() || undefined,
      sectors: selectedSectors,
      economicStatus,
      economicStatusOthers: economicStatusOthers.trim() || undefined,
      existingSkills: selectedExistingSkills,
      skillsToLearn: selectedSkillsToLearn,
      isLivelihoodMemberInterest,
      guardianName: hasGuardian ? guardianName.trim() : undefined,
      guardianSkills: hasGuardian && guardianSkills.trim() ? guardianSkills.split(',').map(s => s.trim()) : undefined,
      guardianContact: hasGuardian ? guardianContact.trim() : undefined,
      status: 'pending_review',
      submissionDate: new Date().toISOString().split('T')[0],
      dpaConsent: true,
    };

    // Store in localStorage
    try {
      const existing = localStorage.getItem('pwd_bupca_applications');
      const appsList: MembershipApplication[] = existing ? JSON.parse(existing) : [];
      appsList.unshift(newApp);
      localStorage.setItem('pwd_bupca_applications', JSON.stringify(appsList));
    } catch {
      // Fallback
    }

    playChime('success');
    setSubmittedApp(newApp);
    setActiveStep(6);
    setTimeout(() => {
      const card = document.getElementById('confirmation-card');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }
    }, 100);
  };

  // Lookup function
  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;

    try {
      const existing = localStorage.getItem('pwd_bupca_applications');
      const appsList: MembershipApplication[] = existing ? JSON.parse(existing) : [];
      
      const found = appsList.find(a => 
        a.referenceNumber.toLowerCase() === searchRef.trim().toLowerCase() ||
        a.fullName.toLowerCase().includes(searchRef.trim().toLowerCase())
      );

      if (found) {
        setSearchResult(found);
        playChime('success');
      } else {
        // Also check mockData
        import('@/data/mockData').then(({ mockApplications }) => {
          const mockFound = mockApplications.find(a => 
            a.referenceNumber.toLowerCase() === searchRef.trim().toLowerCase() ||
            a.fullName.toLowerCase().includes(searchRef.trim().toLowerCase())
          );
          if (mockFound) {
            setSearchResult(mockFound);
            playChime('success');
          } else {
            setSearchResult('not_found');
            playChime('alert');
          }
        });
      }
    } catch {
      setSearchResult('not_found');
    }
  };

  const copyReferenceCode = () => {
    if (submittedApp?.referenceNumber) {
      navigator.clipboard.writeText(submittedApp.referenceNumber);
      setCopiedRef(true);
      playChime('click');
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col transition-colors selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main id="main-content" className="flex-1 pb-24">
        {/* Editorial Header Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/50">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            {/* Bilingual and Tagline Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {language === 'tl' ? 'Opisyal na Pagpaparehistro' : 'Official Public Registration'}
              </span>

              {/* Language Switcher Pill */}
              <div className="inline-flex items-center p-1 rounded-full bg-slate-800/90 border border-slate-700 shadow-inner">
                <button
                  type="button"
                  onClick={() => { setLanguage('tl'); playChime('click'); }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    language === 'tl'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Filipino (Tagalog)
                </button>
                <button
                  type="button"
                  onClick={() => { setLanguage('en'); playChime('click'); }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
              {language === 'tl' ? (
                <>Maging Miyembro ng <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-amber-200">PWD BUPCA</span></>
              ) : (
                <>Become a Member of <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-amber-200">PWD BUPCA</span></>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              {language === 'tl'
                ? 'Pagpapatala sa Asosasyon ng mga May Kapansanan at Programa sa Pangkabuhayan ng Brgy. UP Campus. Sama-samang pag-angat sa kasanayan at dangal.'
                : 'Official membership and livelihood program intake for persons with determination and community partner sectors in Barangay UP Campus.'}
            </p>

            {/* Quick Status Lookup Banner */}
            <div className="mt-8 max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-white/20 shadow-xl">
              <form onSubmit={handleCheckStatus} className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-200 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchRef}
                  onChange={(e) => setSearchRef(e.target.value)}
                  placeholder={language === 'tl' ? 'May Reference Code na? (e.g. BUPCA-APP-xxxx)' : 'Have a Reference Code? (e.g. BUPCA-APP-xxxx)'}
                  className="w-full bg-transparent text-white placeholder-slate-300 text-xs sm:text-sm focus:outline-hidden px-2 py-1.5"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-md cursor-pointer whitespace-nowrap shrink-0"
                >
                  {language === 'tl' ? 'Alamin ang Katayuan' : 'Track Status'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Modal / Card for Track Status Results */}
        {searchResult && (
          <div className="max-w-3xl mx-auto -mt-6 px-4 mb-8">
            <div className="bg-white dark:bg-zinc-900 border-2 border-blue-500/40 rounded-3xl p-6 shadow-2xl relative">
              <button 
                onClick={() => setSearchResult(null)}
                className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
              >
                ✕ Close
              </button>

              {searchResult === 'not_found' ? (
                <div className="text-center py-4">
                  <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                    {language === 'tl' ? 'Walang nahanap na aplikasyon' : 'No Application Found'}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {language === 'tl' 
                      ? 'Pakisuri kung tama ang inyong Reference Code o magpatuloy sa pagsusumite ng bagong form.'
                      : 'Please verify the reference code or fill out the application below.'}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {language === 'tl' ? 'Katayuan ng Aplikasyon' : 'Application Status'}
                      </span>
                      <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                        {searchResult.fullName}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">Ref: {searchResult.referenceNumber}</p>
                    </div>

                    <div className="text-right">
                      {searchResult.status === 'approved' && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {language === 'tl' ? 'APRUWADO (Approved Member)' : 'APPROVED MEMBER'}
                        </span>
                      )}
                      {searchResult.status === 'pending_review' && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300">
                          <Clock className="w-4 h-4 text-amber-600" />
                          {language === 'tl' ? 'NILILITIS NG STAFF (Under Review)' : 'UNDER REVIEW'}
                        </span>
                      )}
                      {searchResult.status === 'needs_info' && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-300">
                          <Info className="w-4 h-4 text-indigo-600" />
                          {language === 'tl' ? 'MAY KAILANGANG DOKUMENTO' : 'ADDITIONAL INFO NEEDED'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-zinc-400 font-semibold">{language === 'tl' ? 'Uri ng Aplikasyon' : 'Application Scope'}:</p>
                      <p className="font-bold text-zinc-800 dark:text-zinc-200 capitalize">{searchResult.applicationType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 font-semibold">{language === 'tl' ? 'Petsa ng Pagsusumite' : 'Submitted Date'}:</p>
                      <p className="font-bold text-zinc-800 dark:text-zinc-200">{searchResult.submissionDate}</p>
                    </div>
                    {searchResult.assignedMembershipNo && (
                      <div className="sm:col-span-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-700 dark:text-blue-300 font-bold uppercase">{language === 'tl' ? 'Opisyal na Membership No:' : 'Official Membership No:'}</p>
                          <p className="text-lg font-black text-blue-900 dark:text-blue-200 font-mono">{searchResult.assignedMembershipNo}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                          {language === 'tl' ? 'Aktibong Miyembro' : 'Active Credential'}
                        </span>
                      </div>
                    )}
                    {searchResult.reviewNotes && (
                      <div className="sm:col-span-2 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold">{language === 'tl' ? 'Tala mula sa Admin / Staff' : 'Staff Remarks'}:</p>
                        <p className="text-zinc-700 dark:text-zinc-300 mt-1">{searchResult.reviewNotes}</p>
                      </div>
                    )}

                    {/* Member ID Card Render for Approved Members */}
                    {searchResult.status === 'approved' && (
                      <div className="sm:col-span-2 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-blue-600" />
                            {language === 'tl' ? 'Inyong Digital PWD BUPCA Member ID Card' : 'Your Digital PWD BUPCA Member ID Card'}
                          </span>
                        </div>
                        <div className="flex justify-center p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                          <MemberIDCard member={searchResult} mode="interactive" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step Progression Bar */}
        {activeStep <= 5 ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-blue-600 transition-all duration-300 -translate-y-1/2 z-0" 
                style={{ width: `${((activeStep - 1) / 4) * 100}%` }}
              />

              {[
                { num: 1, title: language === 'tl' ? 'Pangalan at Tirahan' : 'Personal & Contact' },
                { num: 2, title: language === 'tl' ? 'Kapansanan at PDAO' : 'Disability & PDAO' },
                { num: 3, title: language === 'tl' ? 'Sektor at Katayuan' : 'Sector & Status' },
                { num: 4, title: language === 'tl' ? 'Kasanayan at Livelihood' : 'Skills & Aspirations' },
                { num: 5, title: language === 'tl' ? 'Pagsusuri at Pahintulot' : 'Review & Consent' },
              ].map((step) => (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (step.num < activeStep) {
                        setActiveStep(step.num);
                        playChime('click');
                      }
                    }}
                    disabled={step.num > activeStep}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all shadow-md ${
                      activeStep === step.num
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 scale-110'
                        : activeStep > step.num
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white dark:bg-zinc-800 text-zinc-400 border border-zinc-300 dark:border-zinc-700'
                    }`}
                  >
                    {activeStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                  </button>
                  <span className="hidden sm:block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mt-2 text-center max-w-[90px] leading-tight">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Step 6 Spacer to ensure card never sticks to the dark banner */
          <div className="pt-12 sm:pt-16" />
        )}

        {/* Validation Alert */}
        {validationError && (
          <div className="max-w-3xl mx-auto px-4 mb-6">
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center gap-3 text-rose-800 dark:text-rose-300 shadow-sm animate-pulse">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-semibold">{validationError}</span>
            </div>
          </div>
        )}

        {/* Application Form Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl p-6 sm:p-10 transition-all">
            
            {/* STEP 1: Basic Information */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                      {language === 'tl' ? 'Hakbang 1: Pangunahing Impormasyon' : 'Step 1: Basic Information'}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {language === 'tl' ? 'Pangalan, kaarawan, at lokasyon sa Barangay UP Campus' : 'Full legal name, birthday, and residence location'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakText(language === 'tl' ? 'Hakbang 1: Pangunahing Impormasyon. Ilagay ang inyong buong pangalan, kasarian, petsa ng kapanganakan, tirahan sa UP Campus, at numero ng telepono.' : 'Step 1: Basic Information. Please enter your name, gender, birthdate, UP Campus address, and phone number.')}
                    className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition cursor-pointer"
                    title={language === 'tl' ? 'Pakinggan ang gabay' : 'Listen to instructions'}
                  >
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  </button>
                </div>

                {/* Scope of Application */}
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40">
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-2">
                    {language === 'tl' ? 'Anong Uri ng Pagpapatala ang Inyong Aplayan?' : 'Select Application Type:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'both', labelTl: 'General PWD + Livelihood Program', labelEn: 'Both PWD & Livelihood Cell', desc: 'Pinaka-inirerekomenda' },
                      { id: 'pwd_membership', labelTl: 'General PWD Membership Lang', labelEn: 'General PWD Membership Only', desc: 'Para sa PDAO advocacy & benefits' },
                      { id: 'livelihood_membership', labelTl: 'Livelihood Cooperative Lang', labelEn: 'Livelihood Program Only', desc: 'Bukas sa Solo Parent, OSY, Women' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => { setAppType(t.id as ApplicationType); playChime('click'); }}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          appType === t.id
                            ? 'bg-white dark:bg-zinc-800 border-blue-600 ring-2 ring-blue-500 shadow-sm'
                            : 'bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:bg-white'
                        }`}
                      >
                        <p className="text-xs font-bold text-zinc-900 dark:text-white">
                          {language === 'tl' ? t.labelTl : t.labelEn}
                        </p>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {language === 'tl' ? 'Buong Pangalan (Full Name) *' : 'Full Legal Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maria Joyzel San Valentin"
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {language === 'tl' ? 'Kasarian (Gender / Sex) *' : 'Gender / Sex *'}
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition"
                    >
                      <option value="Babae (Female)">Babae (Female)</option>
                      <option value="Lalaki (Male)">Lalaki (Male)</option>
                      <option value="LGBTQ+">LGBTQIA+</option>
                      <option value="Mas pinipiling huwag sabihin (Prefer not to say)">Mas pinipiling huwag sabihin (Prefer not to say)</option>
                    </select>
                  </div>

                  {/* Birthdate */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {language === 'tl' ? 'Petsa ng Kapanganakan (Birthdate) *' : 'Date of Birth *'}
                    </label>
                    <input
                      type="date"
                      required
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition"
                    >
                    </input>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {language === 'tl' ? 'Tirahan (Address / Pook sa UP Campus) *' : 'Community Address / Pook *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={language === 'tl' ? 'Hal: 8B CV Francisco St., Pook Amorsolo, UP Campus' : 'e.g. 8B CV Francisco St., Pook Amorsolo, UP Campus'}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition"
                  />
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                    {language === 'tl' ? 'Tukuyin ang kalye, numero ng bahay, at pangalan ng Pook (Amorsolo, Dagohoy, Palaris, Hardin, atbp.)' : 'Include house no., street, and Pook name.'}
                  </p>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {language === 'tl' ? 'Contact No. (Mobile / Cellphone) *' : 'Mobile / Contact Phone No. *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    placeholder="+63 9xx xxx xxxx"
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition font-mono"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Disability & PDAO Information */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                      {language === 'tl' ? 'Hakbang 2: Kapansanan at Katayuang PDAO' : 'Step 2: Disability & PDAO Information'}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {language === 'tl' ? 'Batay sa opisyal na Membership Form ng PWD BUPCA at QC PDAO' : 'Official classification pursuant to RA 7277 / Magna Carta for PWDs'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakText(language === 'tl' ? 'Hakbang 2: Kapansanan. Piliin kung ikaw ay PWD, kung may ID o wala, at tukuyin ang kategorya tulad ng pisikal, pandinig, paningin, o iba pa.' : 'Step 2: Disability details. Specify if you are a PWD, ID status, and select applicable disability categories.')}
                    className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  </button>
                </div>

                {/* Ikaw ba ay PWD? */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-2">
                    {language === 'tl' ? 'Ikaw ba ay PWD (Person with Determination / Disability)? *' : 'Are you a Person with Determination / Disability? *'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => { setIsPwd(true); playChime('click'); }}
                      className={`py-3 px-4 rounded-xl font-bold text-sm border transition cursor-pointer ${
                        isPwd
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
                      }`}
                    >
                      {language === 'tl' ? 'Oo, Ako ay PWD' : 'Yes, I am a PWD'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsPwd(false); playChime('click'); }}
                      className={`py-3 px-4 rounded-xl font-bold text-sm border transition cursor-pointer ${
                        !isPwd
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
                      }`}
                    >
                      {language === 'tl' ? 'Hindi (Katuwang na Sektor / Livelihood)' : 'No (Partner Sector / OSY)'}
                    </button>
                  </div>
                </div>

                {isPwd ? (
                  <>
                    {/* May ID o Wala */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                          {language === 'tl' ? 'May PWD ID o Wala? *' : 'PWD ID Card Status *'}
                        </label>
                        <select
                          value={hasPwdId}
                          onChange={(e) => setHasPwdId(e.target.value as any)}
                          className="w-full pl-3.5 pr-10 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs sm:text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition cursor-pointer"
                        >
                          <option value="may_id">{language === 'tl' ? 'May ID (May PDAO ID)' : 'With PDAO / LGU ID'}</option>
                          <option value="wala">{language === 'tl' ? 'Wala pang ID (Nais magpatulong)' : 'No ID yet (Need assistance)'}</option>
                          <option value="processing">{language === 'tl' ? 'Pino-proseso (Renewal / In process)' : 'In Renewal / Processing'}</option>
                        </select>
                      </div>

                      {hasPwdId === 'may_id' && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                            {language === 'tl' ? 'PWD ID Number (Kung mayroon)' : 'PWD ID Card Number'}
                          </label>
                          <input
                            type="text"
                            value={pwdIdNo}
                            onChange={(e) => setPwdIdNo(e.target.value)}
                            placeholder="e.g. QC-137404-2024-xxxx"
                            className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition font-mono"
                          />
                        </div>
                      )}
                    </div>

                    {/* Uri ng Kapansanan: Apparent / Non-Apparent */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {language === 'tl' ? 'Uri ng Kapansanan (Visibility) *' : 'Disability Visibility *'}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => { setDisabilityVisibility('apparent'); playChime('click'); }}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            disabilityVisibility === 'apparent'
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500'
                              : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          <p className="text-xs font-bold">Apparent (Kitang-kita)</p>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Physical mobility, wheelchair, white cane, crutches</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => { setDisabilityVisibility('non_apparent'); playChime('click'); }}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            disabilityVisibility === 'non_apparent'
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500'
                              : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          <p className="text-xs font-bold">Non-Apparent (Hindi Lantad)</p>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Hearing, psychosocial, CKD, internal/cognitive</p>
                        </button>
                      </div>
                    </div>

                    {/* Kategorya ng Kapansanan (Multiple Select Checkboxes) */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {language === 'tl' ? 'Kategorya ng Kapansanan (Piliin lahat ng angkop) *' : 'Disability Category (Select all applicable) *'}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                        {OFFICIAL_DISABILITY_CATEGORIES.map((cat) => {
                          const isSelected = selectedDisabilities.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => { toggleDisability(cat.id); playChime('click'); }}
                              className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-blue-100 ring-1 ring-blue-500'
                                  : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                                isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-zinc-400 bg-white dark:bg-zinc-800'
                              }`}>
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold leading-tight">
                                  {language === 'tl' ? cat.filipino : cat.english}
                                </p>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">{cat.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedDisabilities.includes('Others') && (
                      <div>
                        <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                          {language === 'tl' ? 'Tukuyin ang "Iba Pang Kapansanan" (Others: Specify) *' : 'Please specify other disability *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={disabilitySpecifyOthers}
                          onChange={(e) => setDisabilitySpecifyOthers(e.target.value)}
                          placeholder="e.g. Rare metabolic disorder / Lupus"
                          className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
                    <p className="font-bold flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-600" />
                      {language === 'tl' ? 'Livelihood & Sector Partner Track' : 'Livelihood & Sector Partner Track'}
                    </p>
                    <p className="mt-1">
                      {language === 'tl'
                        ? 'Ang PWD BUPCA Livelihood Hub ay bukas din para sa mga Solo Parents, Out-of-School Youth, Kababaihan, at Senior Citizens na katuwang sa produksyon ng sustainable handicrafts.'
                        : 'The PWD BUPCA livelihood center welcomes solo parents, out-of-school youth, women survivors, and seniors as co-makers in sustainable upcycled crafts.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Sectors & Economic Status */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                      {language === 'tl' ? 'Hakbang 3: Sektor at Katayuang Pangkabuhayan' : 'Step 3: Sector & Economic Status'}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {language === 'tl' ? 'May iba ka pa bang sektor na kinabibilangan? At ano ang iyong kasalukuyang hanapbuhay?' : 'Intersectional community affiliations and current occupation'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakText(language === 'tl' ? 'Hakbang 3: Sektor at Katayuan. Piliin ang mga sektor tulad ng Solo Parent, Kababaihan, Kabataan, Senior, o LGBTQ. Piliin din kung ikaw ay nagtatrabaho, nagnenegosyo, o nag-aaral.' : 'Step 3: Sector and status. Choose sectors you belong to and your economic occupation status.')}
                    className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  </button>
                </div>

                {/* Sektor na Kinabibilangan */}
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-2">
                    {language === 'tl' ? 'May Iba Ka Pa Bang Sektor na Kinabibilangan? (Piliin lahat ng angkop) *' : 'Intersectional Sectors Affiliated With (Check all that apply) *'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {INTERSECTORAL_SECTORS.map((sec) => {
                      const isSelected = selectedSectors.includes(sec.id);
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => { toggleSector(sec.id); playChime('click'); }}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-blue-100 ring-1 ring-blue-500'
                              : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                          }`}
                        >
                          <span className="text-xs font-bold">
                            {language === 'tl' ? sec.filipino : sec.english}
                          </span>
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-zinc-400 bg-white dark:bg-zinc-800'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Economic Status */}
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-2">
                    {language === 'tl' ? 'Katayuang Pangkabuhayan (Economic Status) *' : 'Current Economic Status *'}
                  </label>
                  <div className="space-y-2">
                    {ECONOMIC_STATUS_OPTIONS.map((eco) => {
                      const isSelected = economicStatus === eco.id;
                      return (
                        <button
                          key={eco.id}
                          type="button"
                          onClick={() => { setEconomicStatus(eco.id); playChime('click'); }}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-blue-100 ring-2 ring-blue-500'
                              : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800'
                          }`}
                        >
                          <span className="text-xs font-bold">
                            {language === 'tl' ? eco.filipino : eco.english}
                          </span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-zinc-400'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {economicStatus === 'Iba pa (Others)' && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {language === 'tl' ? 'Pakitukoy ang inyong hanapbuhay o estado:' : 'Please describe your economic status:'}
                    </label>
                    <input
                      type="text"
                      value={economicStatusOthers}
                      onChange={(e) => setEconomicStatusOthers(e.target.value)}
                      placeholder="Hal. Labandera, Freelance encoder, Nagtitinda ng meryenda"
                      className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: Skills, Training & Guardian Support */}
            {activeStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                      {language === 'tl' ? 'Hakbang 4: Kasanayan at Pagsasanay' : 'Step 4: Skills, Training & Aspirations'}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {language === 'tl' ? 'Anu-ano ang iyong kasalukuyang skills at ano ang nais mong matutunan?' : 'Your current craft skills and machinery training you wish to learn'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakText(language === 'tl' ? 'Hakbang 4: Kasanayan. Piliin ang inyong alam nang gawin tulad ng pananahi, paggupit, o pag-overlock. Piliin din ang nais ninyong matutunang kasanayan sa livelihood workshop.' : 'Step 4: Skills. Check skills you have and those you wish to learn.')}
                    className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  </button>
                </div>

                {/* Existing Skills */}
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {language === 'tl' ? 'Ano ang Iyong Kasalukuyang Skills? (Existing Skills)' : 'What are your current skills?'}
                  </label>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-2.5">
                    {language === 'tl' ? 'Piliin ang mga alam mo nang gawin kahit basic level:' : 'Select any skills you are familiar with:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS_INVENTORY_OPTIONS.map((skill) => {
                      const isSelected = selectedExistingSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => { toggleExistingSkill(skill); playChime('click'); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{skill}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Existing Skill */}
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      value={customExistingSkill}
                      onChange={(e) => setCustomExistingSkill(e.target.value)}
                      placeholder={language === 'tl' ? 'Iba pang skill (e.g. Crocheting, Pagkumpuni)...' : 'Other skill...'}
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addCustomSkill}
                      className="px-3 py-2 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      + Idagdag
                    </button>
                  </div>
                </div>

                {/* Skills to Learn */}
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {language === 'tl' ? 'Ano ang mga Kasanayan na Gustong Matutunan? (Desired Skills to Learn)' : 'What skills or machinery do you want to learn?'}
                  </label>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-2.5">
                    {language === 'tl' ? 'Gagamitin ito ng pamunuan upang magplano ng mga libreng training at machine assignment:' : 'Used to assign training cohorts and machines:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS_TO_LEARN_OPTIONS.map((skill) => {
                      const isSelected = selectedSkillsToLearn.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => { toggleSkillToLearn(skill); playChime('click'); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                              : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                          }`}
                        >
                          {isSelected ? '★ ' : '+ '}{skill}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Desired Skill */}
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      value={customSkillToLearn}
                      onChange={(e) => setCustomSkillToLearn(e.target.value)}
                      placeholder={language === 'tl' ? 'Iba pang gustong matutunan...' : 'Other training desired...'}
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addCustomSkillToLearn}
                      className="px-3 py-2 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      + Idagdag
                    </button>
                  </div>
                </div>

                {/* Livelihood Program Interest Toggle */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                      {language === 'tl' ? 'Miyembro ba kayo o nais sumali sa Livelihood Program ng PWD BUPCA?' : 'Join or enroll in the PWD BUPCA Livelihood Cooperative?'}
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                      {language === 'tl' ? 'Magkakaroon ng access sa mga makinang pantahi at weekly piece-rate livelihood earnings.' : 'Access to high-speed machines, subsidized fabrics, and piece-rate income.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsLivelihoodMemberInterest(!isLivelihoodMemberInterest); playChime('click'); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
                      isLivelihoodMemberInterest
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {isLivelihoodMemberInterest ? (language === 'tl' ? 'Oo, Nais Sumali' : 'Yes, Enrolling') : (language === 'tl' ? 'Hindi Muna' : 'Not now')}
                  </button>
                </div>

                {/* Assisted / Guardian Details (Optional) */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300">
                      {language === 'tl' ? 'May Kasamang Magulang o Guardian? (Assisted Member)' : 'Has Parent or Guardian Support?'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setHasGuardian(!hasGuardian)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
                    >
                      {hasGuardian ? (language === 'tl' ? 'Tanggalin ang Guardian' : 'Remove') : (language === 'tl' ? '+ Maglagay ng Guardian' : '+ Add Guardian')}
                    </button>
                  </div>

                  {hasGuardian && (
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                          {language === 'tl' ? 'Pangalan ng Guardian / Magulang' : 'Parent / Guardian Full Name'}
                        </label>
                        <input
                          type="text"
                          value={guardianName}
                          onChange={(e) => setGuardianName(e.target.value)}
                          placeholder="e.g. Nanay Teresita Santos"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                            {language === 'tl' ? 'Skills ng Magulang o Guardian' : 'Guardian Skills'}
                          </label>
                          <input
                            type="text"
                            value={guardianSkills}
                            onChange={(e) => setGuardianSkills(e.target.value)}
                            placeholder="e.g. Pagluluto, Manwal na pananahi"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                            {language === 'tl' ? 'Contact No. ng Guardian' : 'Guardian Phone'}
                          </label>
                          <input
                            type="tel"
                            value={guardianContact}
                            onChange={(e) => setGuardianContact(e.target.value)}
                            placeholder="+63 9xx xxx xxxx"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 5: Review & Consent */}
            {activeStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                      {language === 'tl' ? 'Hakbang 5: Pagsusuri at Pahintulot (DPA)' : 'Step 5: Review & Privacy Consent'}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {language === 'tl' ? 'Panghuling pagtingin sa iyong impormasyon bago isumite sa staff' : 'Review your intake submission and certify compliance with RA 10173'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakText(language === 'tl' ? 'Hakbang 5: Pagsusuri at Pahintulot. Pakisuri ang inyong mga isinumiteng datos at lagyan ng tsek ang pahintulot sa Data Privacy Act bago i-click ang submit.' : 'Step 5: Review and consent. Please review your details and check the Data Privacy Act consent.')}
                    className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  </button>
                </div>

                {/* Summary Card */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-700">
                    <div>
                      <span className="text-zinc-400 text-xs uppercase font-bold">{language === 'tl' ? 'Aplikante' : 'Applicant'}:</span>
                      <p className="font-bold text-zinc-900 dark:text-white text-base">{fullName}</p>
                      <p className="text-zinc-500">{gender} • {birthdate}</p>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs uppercase font-bold">{language === 'tl' ? 'Tirahan & Contact' : 'Address & Contact'}:</span>
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200">{address}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-mono font-bold">{contactNo}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-700">
                    <div>
                      <span className="text-zinc-400 text-xs uppercase font-bold">{language === 'tl' ? 'Katayuang PWD' : 'Disability Category'}:</span>
                      <p className="font-bold text-zinc-800 dark:text-zinc-200">
                        {isPwd ? (selectedDisabilities.join(', ') || 'PWD Member') : 'Non-PWD Sector Partner'}
                      </p>
                      {pwdIdNo && <p className="text-zinc-500 font-mono">ID: {pwdIdNo}</p>}
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs uppercase font-bold">{language === 'tl' ? 'Sektor at Trabaho' : 'Sector & Occupation'}:</span>
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedSectors.join(', ')}</p>
                      <p className="text-zinc-500">{economicStatus}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-400 text-xs uppercase font-bold">{language === 'tl' ? 'Aspirasyon sa Pagsasanay' : 'Desired Training'}:</span>
                    <p className="text-zinc-700 dark:text-zinc-300 mt-1">
                      {selectedSkillsToLearn.join(', ') || 'Nais magsanay sa mga makina'}
                    </p>
                  </div>
                </div>

                {/* Data Privacy Act Notice */}
                <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200">
                        {language === 'tl' ? 'Pahintulot sa Data Privacy Act (RA 10173)' : 'Data Privacy Act Compliance (RA 10173)'}
                      </h4>
                      <p className="text-[11px] text-blue-800 dark:text-blue-300 mt-1 leading-relaxed">
                        {language === 'tl'
                          ? 'Ako ay nagbibigay ng kusang-loob na pahintulot sa PWD BUPCA Inc. upang kolektahin at gamitin ang aking mga datos para lamang sa pagproseso ng membership, pagsasanay, at tulong-pangkabuhayan ayon sa batas.'
                          : 'I hereby authorize PWD BUPCA Inc. to process and store my personal and sensitive information strictly for membership validation, training cohorts, and livelihood program services in accordance with RA 10173.'}
                      </p>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 mt-3 pt-3 border-t border-blue-200/60 dark:border-blue-900/60 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dpaConsent}
                      onChange={(e) => { setDpaConsent(e.target.checked); playChime('click'); }}
                      className="w-5 h-5 rounded-md text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-blue-950 dark:text-blue-100">
                      {language === 'tl' ? 'Sumasang-ayon ako at pinatutunayang totoo ang lahat ng datos. *' : 'I agree and certify that all details submitted are truthful. *'}
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 6: Confirmation Screen */}
            {activeStep === 6 && submittedApp && (
              <div id="confirmation-card" className="text-center py-6 space-y-6 scroll-mt-28">
                <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                    {language === 'tl' ? 'Matagumpay na Naisumite' : 'Application Submitted Successfully'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mt-2">
                    {language === 'tl' ? 'Maraming Salamat, Kasama!' : 'Thank You for Applying!'}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mt-1">
                    {language === 'tl'
                      ? 'Nakatala na ang inyong aplikasyon. Susuriin ito ng Admin at Staff ng PWD BUPCA para sa pagsasaayos ng inyong membership at kasanayan sa livelihood.'
                      : 'Your application has been logged into the review queue. Our administrative officers will verify your details for membership badge and workshop cohort.'}
                  </p>
                </div>

                {/* Reference Code Card */}
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border-2 border-blue-500/40 shadow-md">
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {language === 'tl' ? 'Inyong Reference Tracking Code' : 'Your Reference Tracking Code'}
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <span className="font-mono text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-300">
                      {submittedApp.referenceNumber}
                    </span>
                    <button
                      type="button"
                      onClick={copyReferenceCode}
                      className="p-2 rounded-xl bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 transition shadow-xs cursor-pointer"
                      title="Copy code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  {copiedRef && (
                    <p className="text-[11px] font-bold text-emerald-600 mt-1">✓ Copied to clipboard!</p>
                  )}
                  <p className="text-[11px] text-zinc-500 mt-2">
                    {language === 'tl' ? 'Itabi ang code na ito upang masubaybayan ang katayuan sa itaas ng pahinang ito.' : 'Save this tracking code to look up your status anytime.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold text-xs sm:text-sm hover:bg-zinc-50 cursor-pointer shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    {language === 'tl' ? 'I-print ang Resibo / Rekord' : 'Print Application Slip'}
                  </button>

                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
                  >
                    <span>{language === 'tl' ? 'Tingnan ang mga Workshop' : 'Explore Programs'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Buttons (Steps 1 to 5) */}
            {activeStep <= 5 && (
              <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-800 mt-8">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => { setActiveStep(prev => prev - 1); playChime('click'); }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs sm:text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'tl' ? 'Bumalik' : 'Back'}</span>
                  </button>
                ) : <div />}

                {activeStep < 5 ? (
                  <button
                    type="button"
                    onClick={validateAndNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <span>{language === 'tl' ? 'Kasunod (Next)' : 'Next Step'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitApplication}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{language === 'tl' ? 'Isumite ang Aplikasyon' : 'Submit Application'}</span>
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
