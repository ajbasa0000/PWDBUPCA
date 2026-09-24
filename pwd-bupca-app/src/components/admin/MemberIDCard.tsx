'use client';

import React, { useState } from 'react';
import { MembershipApplication } from '@/types';
import { 
  Printer, 
  QrCode, 
  ShieldCheck, 
  User, 
  Heart, 
  Phone, 
  MapPin, 
  CreditCard,
  Info
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface MemberIDCardProps {
  member: MembershipApplication;
  mode?: 'interactive' | 'preview_only';
}

/**
 * Clean, Dedicated Front Side of the Official PWD BUPCA Member ID Card
 * CR-80 Standard Format: 85.6mm x 53.98mm (~420px x 252px)
 */
export const MemberIDCardFront: React.FC<{ member: MembershipApplication }> = ({ member }) => {
  const memberNo = member.assignedMembershipNo || member.referenceNumber;

  return (
    <div className="w-full max-w-[420px] h-[252px] rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-4 flex flex-col justify-between shadow-xl border border-slate-300 dark:border-zinc-700 relative overflow-hidden select-none font-sans shrink-0">
      {/* Decorative Security Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 15% 20%, #38bdf8 0%, transparent 45%), radial-gradient(circle at 85% 80%, #818cf8 0%, transparent 45%)'
        }}
      />
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

      {/* Header: Organization Identity */}
      <div className="flex items-center justify-between border-b border-white/20 pb-2 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white font-black text-base flex items-center justify-center shadow-md border border-white/20">
            PB
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-[12px] tracking-tight block text-white uppercase">
              PWD BUPCA Inc.
            </span>
            <span className="text-[8.5px] font-medium text-blue-200 block tracking-wider uppercase">
              Barangay UP Campus Association
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[8px] font-extrabold tracking-wider uppercase">
            <ShieldCheck className="w-2.5 h-2.5" />
            Verified Member
          </span>
          <span className="block text-[8px] text-slate-300 font-mono mt-0.5 font-bold">
            VALID 2026-2028
          </span>
        </div>
      </div>

      {/* Body: Photo & Member Particulars */}
      <div className="flex items-center gap-3.5 my-auto relative z-10">
        {/* Photo Placeholder */}
        <div className="w-20 h-24 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-white/30 flex flex-col items-center justify-center shrink-0 shadow-md relative overflow-hidden group">
          <User className="w-10 h-10 text-slate-400" />
          <div className="absolute bottom-0 inset-x-0 bg-blue-600/90 py-0.5 text-center text-[7.5px] font-black tracking-widest text-white uppercase">
            BUPCA
          </div>
        </div>

        {/* Member Details */}
        <div className="flex-1 min-w-0 space-y-1">
          <div>
            <span className="text-[8px] font-bold text-blue-300 uppercase tracking-widest block">
              Pangalan / Member Name
            </span>
            <h3 className="font-black text-[14px] sm:text-[15px] leading-tight text-white uppercase truncate tracking-tight">
              {member.fullName}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[8.5px]">
            <div>
              <span className="text-slate-400 font-semibold uppercase block text-[7.5px]">
                Membership ID
              </span>
              <span className="font-mono font-bold text-amber-300 block text-[9.5px]">
                {memberNo}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase block text-[7.5px]">
                PDAO / QC ID
              </span>
              <span className="font-mono font-bold text-slate-200 block text-[9.5px] truncate">
                {member.pwdIdNo || 'Registered PWD'}
              </span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 font-semibold uppercase block text-[7.5px]">
              Disability Category & Visibility
            </span>
            <div className="flex flex-wrap items-center gap-1 mt-0.5">
              <span className="px-1.5 py-0.2 rounded bg-white/10 text-white font-bold text-[8px] truncate max-w-[170px]">
                {member.disabilityCategories.length > 0 ? member.disabilityCategories.join(', ') : 'PWD Member'}
              </span>
              {member.disabilityVisibility && (
                <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-200 text-[7.5px] capitalize font-medium">
                  {member.disabilityVisibility.replace('_', ' ')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Legal Citation & Address */}
      <div className="border-t border-white/20 pt-1.5 flex items-center justify-between text-[8px] relative z-10">
        <div className="flex items-center gap-1 text-slate-300 truncate max-w-[250px]">
          <MapPin className="w-2.5 h-2.5 text-blue-400 shrink-0" />
          <span className="truncate font-medium">{member.address}</span>
        </div>
        <div className="text-[7.5px] font-mono text-slate-400 shrink-0 font-bold">
          RA 7277 / RA 10173
        </div>
      </div>
    </div>
  );
};

/**
 * Clean, Dedicated Back Side of the Official PWD BUPCA Member ID Card
 * CR-80 Standard Format: 85.6mm x 53.98mm (~420px x 252px)
 */
export const MemberIDCardBack: React.FC<{ member: MembershipApplication }> = ({ member }) => {
  return (
    <div className="w-full max-w-[420px] h-[252px] rounded-2xl bg-white text-slate-900 p-4 flex flex-col justify-between shadow-xl border-2 border-slate-300 relative overflow-hidden select-none font-sans shrink-0">
      {/* Top: Emergency & Health Credentials */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
          <span className="text-[8.5px] font-extrabold uppercase tracking-wider text-blue-800 flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 text-rose-500" />
            Emergency & Health Credentials
          </span>
          <span className="text-[8px] font-mono font-bold text-slate-500">
            Hotline: 0920 555 1212
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[8px]">
          <div className="space-y-1">
            <div>
              <span className="text-slate-400 font-bold block text-[7px] uppercase">
                Contact Number
              </span>
              <span className="font-bold text-slate-800">{member.contactNo || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[7px] uppercase">
                Guardian / Emergency Contact
              </span>
              <span className="font-bold text-slate-800 truncate block">
                {member.guardianName || 'Barangay UP Campus PWD Desk'}
              </span>
              {member.guardianContact && (
                <span className="text-slate-600 block text-[7px]">{member.guardianContact}</span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div>
              <span className="text-slate-400 font-bold block text-[7px] uppercase">
                Intersectoral Affiliation
              </span>
              <span className="font-bold text-slate-800 truncate block">
                {member.sectors.length > 0 ? member.sectors.join(', ') : 'Community Resident'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[7px] uppercase">
                Economic Classification
              </span>
              <span className="font-bold text-slate-800 truncate block">
                {member.economicStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Signature & QR Code Security Verification */}
      <div className="flex items-center justify-between gap-3 my-auto pt-1">
        <div className="flex-1 space-y-2">
          <div>
            <div className="border-b border-slate-400 w-36 h-5 flex items-end">
              <span className="text-[7.5px] font-serif italic text-blue-900 mx-auto">
                {member.fullName}
              </span>
            </div>
            <span className="text-[6.5px] font-bold text-slate-500 uppercase block mt-0.5">
              Lagda ng Miyembro / Holder Signature
            </span>
          </div>

          <div>
            <div className="border-b border-slate-400 w-36 h-5 flex items-end">
              <span className="text-[7.5px] font-bold text-slate-800 mx-auto uppercase">
                Marilyn Morales
              </span>
            </div>
            <span className="text-[6.5px] font-bold text-slate-500 uppercase block mt-0.5">
              Pangulo, PWD BUPCA Inc. / Authorized
            </span>
          </div>
        </div>

        {/* QR Code Validation Box */}
        <div className="flex flex-col items-center shrink-0">
          <div className="w-16 h-16 p-1 rounded-lg border-2 border-slate-300 bg-white flex items-center justify-center shadow-xs">
            <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h4v4h-4v-4zm-4-4h2v2h-2v-2zm2 4h2v4h-2v-4zm2-2h4v2h-4v-2zm-4 4h2v2h-2v-2zm4-6h2v2h-2v-2zm-2-2h4v2h-4v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z" />
            </svg>
          </div>
          <span className="text-[6.5px] font-mono text-slate-400 font-bold mt-0.5">
            SCAN TO VERIFY
          </span>
        </div>
      </div>

      {/* Disclaimer at Bottom */}
      <div className="border-t border-slate-200 pt-1 text-center">
        <p className="text-[6px] text-slate-400 leading-tight">
          This card is non-transferable and issued under the authority of PWD BUPCA Inc. and Republic Act 7277. If found, please return to PWD BUPCA Center, Pook Dagohoy / Area 2, Barangay UP Campus, Quezon City.
        </p>
      </div>
    </div>
  );
};

/**
 * Standard MemberIDCard with simple, bulletproof tab toggle (Front Side | Back Side)
 */
export const MemberIDCard: React.FC<MemberIDCardProps> = ({
  member,
  mode = 'interactive'
}) => {
  const { playChime } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');

  const handlePrint = () => {
    playChime('click');
    window.print();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tab Switcher Controls (No 3D, purely reliable) */}
      {mode === 'interactive' && (
        <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-[420px] mb-4 print:hidden">
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => { setActiveTab('front'); playChime('click'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'front'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Front Side
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('back'); playChime('click'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'back'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Back Side
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs hover:opacity-90 transition cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      )}

      {/* Card Render Container (Responsively centered and scrollable on small mobile) */}
      <div className="w-full flex justify-center overflow-x-auto py-1 px-1">
        <div className="scale-[0.82] xs:scale-90 sm:scale-100 origin-top shrink-0 transition-transform">
          {activeTab === 'front' ? (
            <MemberIDCardFront member={member} />
          ) : (
            <MemberIDCardBack member={member} />
          )}
        </div>
      </div>

      {mode === 'interactive' && (
        <p className="text-[11px] text-slate-400 mt-3 text-center print:hidden flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          Standard CR-80 PVC card format (85.6mm × 53.98mm). Click Front/Back above to inspect.
        </p>
      )}
    </div>
  );
};

/**
 * Batch Print Sheet Modal (Front Only, Back Only, or Both Sides)
 */
interface MemberBatchPrintDialogProps {
  members: MembershipApplication[];
  onClose: () => void;
}

export const MemberBatchPrintDialog: React.FC<MemberBatchPrintDialogProps> = ({
  members,
  onClose
}) => {
  const { playChime } = useAccessibility();
  const [selectedSide, setSelectedSide] = useState<'both' | 'front_only' | 'back_only'>('front_only');
  const [targetPookFilter, setTargetPookFilter] = useState<string>('all');

  const approvedMembers = members.filter(m => m.status === 'approved');

  const filteredMembers = approvedMembers.filter(m => {
    if (targetPookFilter === 'all') return true;
    return m.address.toLowerCase().includes(targetPookFilter.toLowerCase());
  });

  const handlePrint = () => {
    playChime('click');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-zinc-900/60 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                Batch ID Card Credential Printer
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Ready for standard A4 / Letter PVC sheet or cardstock printing ({filteredMembers.length} approved members)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print All ({filteredMembers.length})</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* Modal Controls Bar */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600 dark:text-zinc-400">Print Side:</span>
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setSelectedSide('front_only')}
                className={`px-3 py-1 rounded-lg font-bold transition ${selectedSide === 'front_only' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-zinc-400'}`}
              >
                Front Only
              </button>
              <button
                onClick={() => setSelectedSide('back_only')}
                className={`px-3 py-1 rounded-lg font-bold transition ${selectedSide === 'back_only' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-zinc-400'}`}
              >
                Back Only
              </button>
              <button
                onClick={() => setSelectedSide('both')}
                className={`px-3 py-1 rounded-lg font-bold transition ${selectedSide === 'both' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-zinc-400'}`}
              >
                Both Sides (2-Pass)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600 dark:text-zinc-400">Filter by Pook:</span>
            <select
              value={targetPookFilter}
              onChange={(e) => setTargetPookFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-slate-800 dark:text-zinc-200"
            >
              <option value="all">All Pook & Communities ({approvedMembers.length})</option>
              <option value="Amorsolo">Pook Amorsolo</option>
              <option value="Dagohoy">Pook Dagohoy</option>
              <option value="Palaris">Pook Palaris</option>
              <option value="Area 2">Area 2</option>
            </select>
          </div>
        </div>

        {/* Modal Scrollable Sheet Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100 dark:bg-zinc-950">
          {filteredMembers.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <CreditCard className="w-12 h-12 mx-auto mb-2 text-slate-400" />
              <p className="font-bold">No approved members found for the selected filter.</p>
              <p className="text-xs">Approve members in the Membership & Intake hub first.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
                  <div className="w-full flex items-center justify-between mb-3 print:hidden text-[11px] font-bold text-slate-500">
                    <span>{member.fullName}</span>
                    <span className="font-mono text-blue-600">{member.assignedMembershipNo || member.referenceNumber}</span>
                  </div>

                  {selectedSide === 'both' ? (
                    <div className="space-y-4 w-full flex flex-col items-center">
                      <div className="w-full flex flex-col items-center">
                        <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest mb-1.5 print:hidden">--- Front Side ---</span>
                        <MemberIDCardFront member={member} />
                      </div>
                      <div className="w-full flex flex-col items-center">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 print:hidden">--- Back Side ---</span>
                        <MemberIDCardBack member={member} />
                      </div>
                    </div>
                  ) : selectedSide === 'back_only' ? (
                    <MemberIDCardBack member={member} />
                  ) : (
                    <MemberIDCardFront member={member} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
