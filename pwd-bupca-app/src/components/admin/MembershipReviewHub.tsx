'use client';

import React, { useState } from 'react';
import { 
  MembershipApplication, 
  ApplicationStatus, 
  OfficialDisabilityCategory,
  EquipmentAsset 
} from '@/types';
import { 
  UserCheck, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Eye, 
  FileSpreadsheet, 
  Printer, 
  Sparkles, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Wrench, 
  Download,
  Calendar,
  Briefcase,
  CreditCard
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { MemberIDCard, MemberBatchPrintDialog } from '@/components/admin/MemberIDCard';

interface MembershipReviewHubProps {
  applications: MembershipApplication[];
  onUpdateApplication: (updated: MembershipApplication) => void;
  assets?: EquipmentAsset[];
}

export const MembershipReviewHub: React.FC<MembershipReviewHubProps> = ({
  applications,
  onUpdateApplication,
  assets = []
}) => {
  const { playChime } = useAccessibility();
  const [filterTab, setFilterTab] = useState<'all' | 'pending' | 'approved' | 'needs_info'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);
  const [viewingCardMember, setViewingCardMember] = useState<MembershipApplication | null>(null);
  const [showBatchPrint, setShowBatchPrint] = useState<boolean>(false);

  // Modal Action State
  const [reviewNoteInput, setReviewNoteInput] = useState('');
  const [assignMembershipNoInput, setAssignMembershipNoInput] = useState('');
  const [assignMachineInput, setAssignMachineInput] = useState('');

  // Counts
  const pendingCount = applications.filter(a => a.status === 'pending_review').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const needsInfoCount = applications.filter(a => a.status === 'needs_info').length;

  // Filtered List
  const filteredApps = applications.filter((app) => {
    const matchesFilter = 
      filterTab === 'all' ? true :
      filterTab === 'pending' ? app.status === 'pending_review' :
      filterTab === 'approved' ? app.status === 'approved' :
      app.status === 'needs_info';

    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.pwdIdNo && app.pwdIdNo.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const openAppDetails = (app: MembershipApplication) => {
    setSelectedApp(app);
    setReviewNoteInput(app.reviewNotes || '');
    setAssignMembershipNoInput(app.assignedMembershipNo || `BUPCA-MEM-2026-${String(Math.floor(10 + Math.random() * 90))}`);
    playChime('click');
  };

  const handleApprove = (app: MembershipApplication) => {
    const updated: MembershipApplication = {
      ...app,
      status: 'approved',
      assignedMembershipNo: assignMembershipNoInput.trim() || app.assignedMembershipNo || `BUPCA-MEM-2026-${Date.now().toString().slice(-3)}`,
      reviewedDate: new Date().toISOString().split('T')[0],
      reviewedBy: 'Aaron Christian J. Basa (Superuser)',
      reviewNotes: reviewNoteInput.trim() || app.reviewNotes,
    };
    onUpdateApplication(updated);
    setSelectedApp(updated);
    playChime('success');
  };

  const handleRequestInfo = (app: MembershipApplication) => {
    const updated: MembershipApplication = {
      ...app,
      status: 'needs_info',
      reviewedDate: new Date().toISOString().split('T')[0],
      reviewedBy: 'Aaron Christian J. Basa (Superuser)',
      reviewNotes: reviewNoteInput.trim() || 'Please submit updated medical certificate or barangay residency endorsement.',
    };
    onUpdateApplication(updated);
    setSelectedApp(updated);
    playChime('alert');
  };

  const handleReject = (app: MembershipApplication) => {
    if (!window.confirm('Are you sure you want to mark this application as rejected?')) return;
    const updated: MembershipApplication = {
      ...app,
      status: 'rejected',
      reviewedDate: new Date().toISOString().split('T')[0],
      reviewedBy: 'Aaron Christian J. Basa (Superuser)',
      reviewNotes: reviewNoteInput.trim() || 'Application does not meet current barangay residency criteria.',
    };
    onUpdateApplication(updated);
    setSelectedApp(null);
    playChime('alert');
  };

  // CSV Export for QC PDAO / Barangay UP Campus
  const exportToCSV = () => {
    const headers = [
      'Reference No',
      'Membership No',
      'Full Name',
      'Gender',
      'Birthdate',
      'Address',
      'Contact',
      'Is PWD',
      'PWD ID',
      'Disability Categories',
      'Sectors',
      'Economic Status',
      'Existing Skills',
      'Desired Training',
      'Status',
      'Submission Date',
      'Staff Remarks'
    ];

    const rows = applications.map(a => [
      `"${a.referenceNumber}"`,
      `"${a.assignedMembershipNo || 'N/A'}"`,
      `"${a.fullName}"`,
      `"${a.gender}"`,
      `"${a.birthdate}"`,
      `"${a.address}"`,
      `"${a.contactNo}"`,
      `"${a.isPwd ? 'YES' : 'NO'}"`,
      `"${a.pwdIdNo || 'N/A'}"`,
      `"${a.disabilityCategories.join('; ')}"`,
      `"${a.sectors.join('; ')}"`,
      `"${a.economicStatus}"`,
      `"${a.existingSkills.join('; ')}"`,
      `"${a.skillsToLearn.join('; ')}"`,
      `"${a.status}"`,
      `"${a.submissionDate}"`,
      `"${a.reviewNotes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PWD_BUPCA_Membership_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    playChime('success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-bold mb-3 uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5 text-blue-300" />
              Barangay UP Campus Intake Registry
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Membership & Livelihood Review Hub
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Screen, verify, and approve incoming community registration applications. Link approved artisans with machinery assets and QC PDAO registry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setShowBatchPrint(true);
                playChime('click');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm border border-blue-400/40 shadow-md backdrop-blur-md transition cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Print Member ID Cards</span>
            </button>

            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Roster (CSV)</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10 text-white">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-300 font-bold">Total Applicants</span>
            <p className="text-2xl font-black mt-0.5">{applications.length}</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30">
            <span className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Pending Review
            </span>
            <p className="text-2xl font-black text-amber-300 mt-0.5">{pendingCount}</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
            <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approved Members
            </span>
            <p className="text-2xl font-black text-emerald-300 mt-0.5">{approvedCount}</p>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-400/30">
            <span className="text-xs text-indigo-300 font-bold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Action Required
            </span>
            <p className="text-2xl font-black text-indigo-300 mt-0.5">{needsInfoCount}</p>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 shrink-0">
          <button
            onClick={() => { setFilterTab('pending'); playChime('click'); }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              filterTab === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            <span>Pending</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/20 text-slate-950 font-black">
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => { setFilterTab('approved'); playChime('click'); }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              filterTab === 'approved'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            <span>Approved</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-black">
              {approvedCount}
            </span>
          </button>
          <button
            onClick={() => { setFilterTab('needs_info'); playChime('click'); }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              filterTab === 'needs_info'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            Needs Info
          </button>
          <button
            onClick={() => { setFilterTab('all'); playChime('click'); }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              filterTab === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            All ({applications.length})
          </button>
        </div>

        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, ref code, Pook address, or PWD ID..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Applicants Roster Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-[11px] font-black uppercase tracking-wider">
                <th className="py-3.5 px-4">Applicant & Code</th>
                <th className="py-3.5 px-4">Residence & Pook</th>
                <th className="py-3.5 px-4">Disability & Sector</th>
                <th className="py-3.5 px-4">Skills / Desired Training</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs sm:text-sm">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400">
                    No applications found matching the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr 
                    key={app.id} 
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors group cursor-pointer"
                    onClick={() => openAppDetails(app)}
                  >
                    {/* Applicant & Code */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                          {app.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {app.fullName}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px] text-zinc-500">
                            <span>{app.referenceNumber}</span>
                            {app.assignedMembershipNo && (
                              <span className="font-bold text-blue-600 dark:text-blue-400">({app.assignedMembershipNo})</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Residence & Pook */}
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-1.5 max-w-[200px]">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 leading-snug truncate">
                          {app.address}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-400 mt-1 pl-5">{app.contactNo}</p>
                    </td>

                    {/* Disability & Sector */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {app.isPwd ? (
                          app.disabilityCategories.map(cat => (
                            <span key={cat} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                              {cat}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200">
                            Sector Partner
                          </span>
                        )}
                        {app.sectors.filter(s => s !== 'PWD').map(s => (
                          <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Skills / Aspirations */}
                    <td className="py-4 px-4">
                      <div className="max-w-[220px]">
                        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                          {app.existingSkills.length > 0 ? app.existingSkills.join(', ') : 'None listed'}
                        </p>
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 truncate">
                          Aims: {app.skillsToLearn.length > 0 ? app.skillsToLearn.join(', ') : 'Open to any'}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {app.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Approved
                        </span>
                      )}
                      {app.status === 'pending_review' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" /> Pending
                        </span>
                      )}
                      {app.status === 'needs_info' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-300">
                          <AlertCircle className="w-3 h-3 text-blue-600" /> Needs Info
                        </span>
                      )}
                      {app.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300">
                          <XCircle className="w-3 h-3 text-rose-600" /> Rejected
                        </span>
                      )}
                    </td>

                    {/* Action button */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {app.status === 'approved' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingCardMember(app);
                              playChime('click');
                            }}
                            className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 transition cursor-pointer"
                            title="Print / View Official Member ID Card"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openAppDetails(app);
                          }}
                          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 transition text-zinc-600 dark:text-zinc-300 cursor-pointer"
                          title="Review dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal / Dossier Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Application Dossier
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Ref: {selectedApp.referenceNumber}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                  {selectedApp.fullName}
                </h3>
                <p className="text-xs text-zinc-500">
                  Submitted on {selectedApp.submissionDate} • {selectedApp.applicationType.replace('_', ' ').toUpperCase()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {selectedApp.status === 'approved' && (
                  <button
                    type="button"
                    onClick={() => {
                      setViewingCardMember(selectedApp);
                      playChime('click');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-xs hover:bg-blue-100 transition cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>View Member ID Card</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Dossier Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[11px] font-bold text-zinc-400 uppercase">Personal & Residence</span>
                <p className="font-bold text-zinc-900 dark:text-white mt-1">{selectedApp.gender} • Born {selectedApp.birthdate}</p>
                <p className="text-zinc-700 dark:text-zinc-300 mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  {selectedApp.address}
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-mono font-bold mt-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {selectedApp.contactNo}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[11px] font-bold text-zinc-400 uppercase">PWD & PDAO Status</span>
                <p className="font-bold text-zinc-900 dark:text-white mt-1">
                  {selectedApp.isPwd ? 'Official PWD Member' : 'Intersectional Sector Partner'}
                </p>
                {selectedApp.pwdIdNo ? (
                  <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">ID: {selectedApp.pwdIdNo}</p>
                ) : (
                  <p className="text-amber-600 text-xs mt-1">No PDAO ID on file (Needs registration assistance)</p>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedApp.disabilityCategories.map(c => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 text-[10px] font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Economic & Guardian */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 sm:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase">Economic Status & Affiliated Sectors</span>
                    <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">{selectedApp.economicStatus}</p>
                    <p className="text-zinc-500 mt-0.5">Sectors: {selectedApp.sectors.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase">Assisting Guardian / Parent</span>
                    {selectedApp.guardianName ? (
                      <div>
                        <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">{selectedApp.guardianName}</p>
                        <p className="text-zinc-500 text-xs">Phone: {selectedApp.guardianContact || 'N/A'}</p>
                      </div>
                    ) : (
                      <p className="text-zinc-400 italic mt-1">Self-represented applicant</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills & Livelihood Matching */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 sm:col-span-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                  Skills & Machine Matching Assessment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300">Existing Craft Competencies:</p>
                    <p className="text-zinc-800 dark:text-zinc-200 mt-0.5 font-medium">
                      {selectedApp.existingSkills.length > 0 ? selectedApp.existingSkills.join(', ') : 'None listed'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300">Desired Machinery & Training:</p>
                    <p className="text-zinc-800 dark:text-zinc-200 mt-0.5 font-medium">
                      {selectedApp.skillsToLearn.length > 0 ? selectedApp.skillsToLearn.join(', ') : 'Open to all programs'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Decision Workspace */}
            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Staff Review & Official Assignment
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                    Assign Official Membership No.
                  </label>
                  <input
                    type="text"
                    value={assignMembershipNoInput}
                    onChange={(e) => setAssignMembershipNoInput(e.target.value)}
                    placeholder="e.g. BUPCA-MEM-2026-042"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 font-mono text-xs font-bold text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                    Machinery Allocation (Optional)
                  </label>
                  <select
                    value={assignMachineInput}
                    onChange={(e) => setAssignMachineInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200"
                  >
                    <option value="">No machine assigned yet</option>
                    {assets.map((ast) => (
                      <option key={ast.id} value={ast.assetTag}>
                        {ast.assetTag} - {ast.name} ({ast.locationName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Staff Verification Notes & Endorsement Remarks
                </label>
                <textarea
                  rows={2}
                  value={reviewNoteInput}
                  onChange={(e) => setReviewNoteInput(e.target.value)}
                  placeholder="e.g. Verified Pook Amorsolo residency via voter's cert. Qualified for Singer Portable Sewing Machine batch."
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleReject(selectedApp)}
                  className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 font-bold text-xs transition cursor-pointer"
                >
                  Reject Application
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRequestInfo(selectedApp)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold text-xs hover:bg-zinc-50 cursor-pointer"
                  >
                    Request More Info
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(selectedApp)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Grant Membership</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Single Member ID Card Modal */}
      {viewingCardMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-lg w-full p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                  ID
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Official Member Credential
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {viewingCardMember.fullName} ({viewingCardMember.assignedMembershipNo || viewingCardMember.referenceNumber})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingCardMember(null)}
                className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Member ID Card Interactive Rendering */}
            <div className="py-2">
              <MemberIDCard member={viewingCardMember} mode="interactive" />
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingCardMember(null)}
                className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Print Sheet Dialog */}
      {showBatchPrint && (
        <MemberBatchPrintDialog
          members={applications}
          onClose={() => setShowBatchPrint(false)}
        />
      )}
    </div>
  );
};
