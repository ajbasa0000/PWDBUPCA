'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Activity, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  ArrowRightLeft, 
  Map as MapIcon, 
  List, 
  UserCheck, 
  FileText, 
  Printer, 
  Search, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Tag,
  Building,
  RotateCcw
} from 'lucide-react';
import { EquipmentAsset, WorkshopLocation, DTRRecord, StoreProduct } from '@/types';
import { useAccessibility } from '@/context/AccessibilityContext';

const AssetInteractiveMap = dynamic(
  () => import('./AssetInteractiveMap').then((mod) => mod.AssetInteractiveMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] rounded-2xl bg-slate-100 dark:bg-zinc-800 animate-pulse flex items-center justify-center text-xs text-slate-400">
        Loading interactive workshop map...
      </div>
    )
  }
);

interface AssetTrackerProps {
  assets: EquipmentAsset[];
  locations: WorkshopLocation[];
  products?: StoreProduct[];
  onClockIn: (assetId: string, dtrData: Partial<DTRRecord> & { productId?: string; pieceRate?: number }) => void;
  onRelocate: (assetId: string, targetLocationId: string, reason: string) => void;
  onUpdateAsset?: (updated: EquipmentAsset) => void;
}

export const AssetTracker: React.FC<AssetTrackerProps> = ({
  assets,
  locations,
  products = [],
  onClockIn,
  onRelocate,
  onUpdateAsset
}) => {
  const { playChime, speakText } = useAccessibility();
  const [selectedLocationId, setSelectedLocationId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeAsset, setActiveAsset] = useState<EquipmentAsset | null>(assets[0] || null);

  // View mode: 'inventory' table, 'cards', or 'map'
  const [viewMode, setViewMode] = useState<'inventory' | 'cards' | 'map'>('inventory');

  // DTR Modal Form state
  const [showDTRModal, setShowDTRModal] = useState<boolean>(false);
  const [operatorName, setOperatorName] = useState('Elena Santos');
  const [fabricUsed, setFabricUsed] = useState(3.0);
  const [unitsProduced, setUnitsProduced] = useState(12);
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'prod-1');

  // Relocation Modal state
  const [showRelocateModal, setShowRelocateModal] = useState<boolean>(false);
  const [targetLocationId, setTargetLocationId] = useState(locations[0]?.id || '');
  const [relocateReason, setRelocateReason] = useState('Scheduled workshop rotation for UP CHE Training');

  // Memorandum Receipt (MR) Issuance Modal
  const [showMRIssueModal, setShowMRIssueModal] = useState<boolean>(false);
  const [mrIssuedToInput, setMrIssuedToInput] = useState<string>('');
  const [mrNumberInput, setMrNumberInput] = useState<string>('');
  const [mrPurposeInput, setMrPurposeInput] = useState<string>('');
  const [mrConditionInput, setMrConditionInput] = useState<'Brand New' | 'Slightly Used' | 'Refurbished good as New' | 'Good Condition'>('Good Condition');
  const [mrLocationInput, setMrLocationInput] = useState<string>('');

  // MR Print Modal
  const [showMRPrintSlip, setShowMRPrintSlip] = useState<boolean>(false);

  // Return Machine Modal
  const [showReturnModal, setShowReturnModal] = useState<boolean>(false);
  const [returnConditionInput, setReturnConditionInput] = useState<string>('Returned in good working order with all needles and presser feet intact.');

  const activeProduct = products.find(p => p.id === selectedProductId) || products[0];
  const activePieceRate = activeProduct?.defaultPieceRate || 75;

  // Filtered Assets
  const filteredAssets = assets.filter((asset) => {
    const matchesLoc = selectedLocationId === 'all' || asset.locationId === selectedLocationId;
    const matchesCat = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.brand && asset.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (asset.serialNo && asset.serialNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (asset.issuedTo && asset.issuedTo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (asset.locationName && asset.locationName.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesLoc && matchesCat && matchesSearch;
  });

  const handleDTRSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAsset) return;
    playChime('success');
    const prodName = activeProduct?.name || 'Upcycled Livelihood Product';
    onClockIn(activeAsset.id, {
      operatorName,
      productType: prodName,
      unitsProduced,
      materialsUsed: [{ itemName: 'Upcycled Fabric Scrap', quantity: fabricUsed, unit: 'meters' }],
      durationHours: 4.0,
      productId: activeProduct?.id || 'prod-1',
      pieceRate: activePieceRate
    });
    setShowDTRModal(false);
    speakText(`Operation logged: ${unitsProduced} units of ${prodName}.`);
  };

  const handleRelocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAsset) return;
    playChime('success');
    onRelocate(activeAsset.id, targetLocationId, relocateReason);
    setShowRelocateModal(false);
    speakText(`Machine transferred successfully.`);
  };

  const openMRIssueDialog = (asset: EquipmentAsset) => {
    setActiveAsset(asset);
    setMrIssuedToInput(asset.issuedTo || '');
    setMrNumberInput(asset.mrNumber || `MR-2026-${String(Math.floor(10 + Math.random() * 90))}`);
    setMrPurposeInput(asset.purpose || 'Production of Upcycled Lifestyle Goods');
    setMrConditionInput(asset.conditionUponIssue || 'Good Condition');
    setMrLocationInput(asset.locationName || '');
    setShowMRIssueModal(true);
    playChime('click');
  };

  const handleMRIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAsset) return;
    const updated: EquipmentAsset = {
      ...activeAsset,
      issuedTo: mrIssuedToInput.trim().toUpperCase(),
      mrNumber: mrNumberInput.trim().toUpperCase(),
      purpose: mrPurposeInput.trim(),
      conditionUponIssue: mrConditionInput,
      dateIssued: new Date().toISOString().split('T')[0],
      locationName: mrLocationInput.trim() || activeAsset.locationName,
      status: 'in_use',
      currentOperator: {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: `${mrIssuedToInput.trim()} (MR Custodian)`,
        clockedInAt: '08:00 AM'
      }
    };
    if (onUpdateAsset) onUpdateAsset(updated);
    setActiveAsset(updated);
    setShowMRIssueModal(false);
    playChime('success');
    speakText(`Machine issued under Memorandum Receipt to ${mrIssuedToInput}.`);
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAsset) return;
    const updated: EquipmentAsset = {
      ...activeAsset,
      status: 'idle',
      currentOperator: undefined,
      dateReturned: new Date().toISOString().split('T')[0],
      conditionUponReturn: returnConditionInput.trim()
    };
    if (onUpdateAsset) onUpdateAsset(updated);
    setActiveAsset(updated);
    setShowReturnModal(false);
    playChime('success');
    speakText(`Machine marked as returned to hub inventory.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card: 19 Authentic Machines & Custodianship Metrics */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Barangay UP Campus Fixed Asset Registry
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Machinery & Equipment Custodianship Hub
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Live tracking of all 19 industrial lockstitch, edging, and portable sewing machines across Pook Amorsolo, Pook Palaris, Hardin ng Doña Aurora, and Central Workshops.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20 flex items-center">
              <button
                onClick={() => { setViewMode('inventory'); playChime('click'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'inventory' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>MR Inventory List</span>
              </button>
              <button
                onClick={() => { setViewMode('cards'); playChime('click'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'cards' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => { setViewMode('map'); playChime('click'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'map' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Satellite Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real Inventory Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10 text-white">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-300 font-bold block">Physical Machinery</span>
            <span className="text-2xl font-black mt-0.5 block">{assets.length} Units</span>
            <span className="text-[10px] text-slate-400">Juki, Siruba, Singer, China</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
            <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Issued to Artisans (MR)
            </span>
            <span className="text-2xl font-black text-emerald-300 mt-0.5 block">
              {assets.filter(a => a.issuedTo || a.status === 'in_use').length} Units
            </span>
            <span className="text-[10px] text-emerald-400">Active community custodians</span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-400/30">
            <span className="text-xs text-blue-300 font-bold flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              Available for Issuance
            </span>
            <span className="text-2xl font-black text-blue-300 mt-0.5 block">
              {assets.filter(a => !a.issuedTo && a.status !== 'maintenance').length} Units
            </span>
            <span className="text-[10px] text-blue-400">Ready in hub stock</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30">
            <span className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              Overlock & High-Speed
            </span>
            <span className="text-2xl font-black text-amber-300 mt-0.5 block">
              {assets.filter(a => a.category.includes('Industrial')).length} Units
            </span>
            <span className="text-[10px] text-amber-400">11 Industrial Grade Machines</span>
          </div>
        </div>
      </div>

      {/* Control & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by FA No (e.g. SM-EM-2026-01), brand, custodian, or serial..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Equipment' },
            { id: 'Industrial High Speed Machine', label: 'High Speed (Juki L-1A)' },
            { id: 'Industrial Edging Machine', label: 'Edging / Overlock (Juki/Siruba)' },
            { id: 'Portable Sewing Machine', label: 'Portable (Singer)' },
            { id: 'Old Sewing Machine', label: 'Lola Makina' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); playChime('click'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: MR INVENTORY TABLE (Official Master Accountability Register) */}
      {viewMode === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Table Column */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Memorandum Receipt & Machinery Registry ({filteredAssets.length} machines)
                </h3>
                <p className="text-xs text-slate-400">Click any machine to inspect full specs or issue an official MR slip.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-800/60 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-[140px] whitespace-nowrap">FA Number</th>
                    <th className="py-3.5 px-4 w-[210px]">Type & Machine Model</th>
                    <th className="py-3.5 px-4 w-[180px]">Accountable Custodian</th>
                    <th className="py-3.5 px-4 min-w-[170px]">Location / Pook</th>
                    <th className="py-3.5 px-4 w-[110px] whitespace-nowrap">Condition</th>
                    <th className="py-3.5 px-4 w-[110px] text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
                  {filteredAssets.map((asset) => {
                    const isSelected = activeAsset?.id === asset.id;
                    return (
                      <tr
                        key={asset.id}
                        onClick={() => { setActiveAsset(asset); playChime('click'); }}
                        className={`hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50/70 dark:bg-blue-950/40 font-medium' : ''
                        }`}
                      >
                        {/* FA Number & Brand */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                            {asset.assetTag}
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-black uppercase bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 mt-1 inline-block">
                            {asset.brand}
                          </span>
                        </td>

                        {/* Type & Model */}
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900 dark:text-white leading-tight">
                            {asset.name}
                          </p>
                          {asset.serialNo && (
                            <p className="font-mono text-[10px] text-slate-400 mt-0.5">{asset.serialNo}</p>
                          )}
                        </td>

                        {/* Custodian */}
                        <td className="py-3.5 px-4">
                          {asset.issuedTo ? (
                            <div>
                              <span className="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                                <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{asset.issuedTo}</span>
                              </span>
                              {asset.mrNumber && (
                                <p className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">
                                  {asset.mrNumber}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 italic">
                              Unissued / In Stock
                            </span>
                          )}
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            <span className="text-slate-600 dark:text-slate-300 leading-snug">
                              {asset.locationName}
                            </span>
                          </div>
                        </td>

                        {/* Condition */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            asset.conditionUponIssue === 'Brand New' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200'
                              : asset.conditionUponIssue === 'Refurbished good as New'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200'
                              : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                          }`}>
                            {asset.conditionUponIssue || 'Good Condition'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => openMRIssueDialog(asset)}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold text-[11px] transition cursor-pointer"
                              title="Update or Issue Memorandum Receipt"
                            >
                              MR
                            </button>
                            <button
                              onClick={() => {
                                setActiveAsset(asset);
                                playChime('click');
                                setShowDTRModal(true);
                              }}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition cursor-pointer"
                            >
                              DTR
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Selected Machine Dossier & MR Card */}
          <div className="lg:col-span-4">
            {activeAsset ? (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-5 sm:p-6 shadow-sm sticky top-24 space-y-5">
                
                {/* Header */}
                <div className="border-b border-slate-100 dark:border-zinc-800 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-1 rounded-lg">
                      {activeAsset.assetTag}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">
                      {activeAsset.brand}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2">
                    {activeAsset.name}
                  </h3>
                  {activeAsset.modelOrClass && (
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      Model / Class: {activeAsset.modelOrClass} {activeAsset.color ? `• ${activeAsset.color}` : ''}
                    </p>
                  )}
                  {activeAsset.serialNo && (
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Serial: {activeAsset.serialNo}
                    </p>
                  )}
                </div>

                {/* Accountability & Custodian Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/80 dark:border-zinc-700 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Memorandum Receipt (MR) Custodian
                  </span>
                  {activeAsset.issuedTo ? (
                    <div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        {activeAsset.issuedTo}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                        <div>
                          <span className="text-slate-400">MR Number:</span>
                          <p className="font-mono font-bold text-blue-600 dark:text-blue-400">{activeAsset.mrNumber || 'Pending'}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Date Issued:</span>
                          <p className="font-bold text-slate-700 dark:text-slate-300">{activeAsset.dateIssued || '2025/2026'}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400">Condition Upon Issue:</span>
                          <p className="font-semibold text-emerald-700 dark:text-emerald-400">{activeAsset.conditionUponIssue || 'Good Condition'}</p>
                        </div>
                        {activeAsset.purpose && (
                          <div className="col-span-2">
                            <span className="text-slate-400">Purpose:</span>
                            <p className="text-slate-600 dark:text-slate-300 italic">{activeAsset.purpose}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 text-center">
                      <p className="text-xs text-slate-400 italic">No custodian assigned. Unit in warehouse stock.</p>
                      <button
                        onClick={() => openMRIssueDialog(activeAsset)}
                        className="mt-2 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 cursor-pointer shadow-xs"
                      >
                        + Issue MR to Member
                      </button>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Current Station / Address
                  </span>
                  <div className="flex items-start gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{activeAsset.locationName}</span>
                  </div>
                  <button
                    onClick={() => setShowRelocateModal(true)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline pt-1 inline-flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>Transfer machine to another Pook / Hub</span>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openMRIssueDialog(activeAsset)}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Edit MR Data</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowMRPrintSlip(true);
                        playChime('click');
                      }}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span>Print MR Slip</span>
                    </button>
                  </div>

                  {activeAsset.issuedTo && (
                    <button
                      onClick={() => {
                        setShowReturnModal(true);
                        playChime('click');
                      }}
                      className="w-full py-2.5 rounded-xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-100 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Log Return / Turn Over to Hub</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      playChime('click');
                      setShowDTRModal(true);
                    }}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Clock-In / Daily Time Record (DTR)</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 text-xs">
                Select an equipment unit from the list to view MR details.
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: CARDS GRID */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => { setActiveAsset(asset); playChime('click'); }}
              className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                activeAsset?.id === asset.id
                  ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                    {asset.assetTag}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300">
                    {asset.brand}
                  </span>
                </div>
                <h3 className="font-black text-base text-slate-900 dark:text-white mt-2 leading-tight">
                  {asset.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{asset.specifications}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Accountability:</span>
                  {asset.issuedTo ? (
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {asset.issuedTo}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">In Stock</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[160px]">
                    {asset.locationName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openMRIssueDialog(asset);
                  }}
                  className="flex-1 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs hover:bg-blue-100 cursor-pointer"
                >
                  Manage MR
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveAsset(asset);
                    setShowDTRModal(true);
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 cursor-pointer"
                >
                  Log DTR
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 3: SATELLITE MAP */}
      {viewMode === 'map' && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Pook Satellite Map & Community Cell Distribution
            </h3>
            <span className="text-xs text-slate-400">Interactive Leaflet visualization</span>
          </div>

          <AssetInteractiveMap
            locations={locations}
            assets={assets}
            selectedLocationId={selectedLocationId}
            onSelectLocation={(locId) => setSelectedLocationId(locId)}
            onSelectAsset={(ast) => setActiveAsset(ast)}
          />
        </div>
      )}

      {/* MODAL 1: MEMORANDUM RECEIPT (MR) ISSUANCE & ACCOUNTABILITY FORM */}
      {showMRIssueModal && activeAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                  Property & Supply Accountability
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  Memorandum Receipt (MR) Form
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Unit: {activeAsset.name} ({activeAsset.assetTag})</p>
              </div>
              <button 
                onClick={() => setShowMRIssueModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleMRIssueSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Issued To (Artisan / Member Custodian Name) *
                </label>
                <input
                  type="text"
                  required
                  value={mrIssuedToInput}
                  onChange={(e) => setMrIssuedToInput(e.target.value)}
                  placeholder="e.g. ROSA ZALUN, JOYZEL SAN VALENTIN, GAYZELLE CALABIO"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    MR Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={mrNumberInput}
                    onChange={(e) => setMrNumberInput(e.target.value)}
                    placeholder="e.g. MR-2026-009"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Condition Upon Issue *
                  </label>
                  <select
                    value={mrConditionInput}
                    onChange={(e) => setMrConditionInput(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Slightly Used">Slightly Used</option>
                    <option value="Refurbished good as New">Refurbished good as New</option>
                    <option value="Good Condition">Good Condition</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Location / Specific Pook Residence *
                </label>
                <input
                  type="text"
                  required
                  value={mrLocationInput}
                  onChange={(e) => setMrLocationInput(e.target.value)}
                  placeholder="e.g. 8B CV Francisco St., Pook Amorsolo, UP Campus"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Purpose of Issuance
                </label>
                <textarea
                  rows={2}
                  value={mrPurposeInput}
                  onChange={(e) => setMrPurposeInput(e.target.value)}
                  placeholder="e.g. Livelihood production of upcycled denim eco-bags and utility pouches."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMRIssueModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
                >
                  Save & Sign MR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE OFFICIAL MEMORANDUM RECEIPT SLIP */}
      {showMRPrintSlip && activeAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-300 space-y-6">
            
            {/* Header */}
            <div className="text-center border-b pb-4">
              <span className="text-xs uppercase font-extrabold text-blue-800 tracking-wider">Republic of the Philippines • Quezon City</span>
              <h2 className="text-xl font-black mt-1">PWD BUPCA INC.</h2>
              <p className="text-xs text-slate-600">Persons with Disabilities - Barangay UP Campus Association</p>
              <h3 className="text-base font-bold uppercase tracking-widest mt-3 text-slate-800 underline">
                MEMORANDUM RECEIPT FOR EQUIPMENT & MACHINERY
              </h3>
              <p className="text-xs font-mono font-bold text-blue-700 mt-1">MR No: {activeAsset.mrNumber || 'MR-2026-UNASSIGNED'}</p>
            </div>

            {/* Slip Content Table */}
            <div className="text-xs space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Property / FA Number</span>
                  <span className="font-mono font-black text-sm">{activeAsset.assetTag}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Date Issued</span>
                  <span className="font-bold">{activeAsset.dateIssued || new Date().toISOString().split('T')[0]}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Equipment Description</span>
                  <span className="font-bold text-sm">{activeAsset.name}</span>
                  <span className="block text-slate-600 text-[11px]">Brand: {activeAsset.brand} • Model: {activeAsset.modelOrClass || 'Standard'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Serial / Mfg Number</span>
                  <span className="font-mono font-bold">{activeAsset.serialNo || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Condition Upon Issue</span>
                  <span className="font-bold text-emerald-700">{activeAsset.conditionUponIssue || 'Good Condition'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Assigned Station / Location</span>
                  <span className="font-bold">{activeAsset.locationName}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200/60 text-[11px] text-slate-700 leading-relaxed">
                <strong>Accountability Clause:</strong> I hereby acknowledge receipt of the machinery/equipment described above in good working condition. I agree to keep and operate this equipment in furtherance of PWD BUPCA livelihood programs, exercise due diligence in its maintenance, and return the same upon recall or relocation by the Association.
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="text-center">
                  <div className="border-b border-slate-400 pb-1 font-black uppercase text-sm">
                    {activeAsset.issuedTo || '___________________________'}
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-1">Name & Signature of Custodian</span>
                  <span className="text-[10px] text-slate-400">PWD BUPCA Member Artisan</span>
                </div>

                <div className="text-center">
                  <div className="border-b border-slate-400 pb-1 font-black uppercase text-sm">
                    AARON CHRISTIAN J. BASA
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-1">Property Custodian / Authorized Officer</span>
                  <span className="text-[10px] text-slate-400">PWD BUPCA Inc. Executive Board</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowMRPrintSlip(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: LOG RETURN OF MACHINE */}
      {showReturnModal && activeAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Log Machine Return / Turn Over
            </h3>
            <p className="text-xs text-slate-400">
              Returning <strong>{activeAsset.name}</strong> from custodian <strong>{activeAsset.issuedTo}</strong>.
            </p>

            <form onSubmit={handleReturnSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Condition Upon Return *
                </label>
                <textarea
                  rows={3}
                  required
                  value={returnConditionInput}
                  onChange={(e) => setReturnConditionInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReturnModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  Confirm Turn Over to Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: DTR MODAL */}
      {showDTRModal && activeAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Daily Time Record (DTR)
            </h3>
            <p className="text-xs text-slate-400">
              Unit: {activeAsset.name} ({activeAsset.assetTag})
            </p>

            <form onSubmit={handleDTRSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Artisan / Operator Name *
                </label>
                <input
                  type="text"
                  required
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Product Crafted *
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Piece rate: ₱{p.defaultPieceRate || 65})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Units Finished *
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={unitsProduced}
                    onChange={(e) => setUnitsProduced(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Fabric Used (meters) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={0.1}
                    value={fabricUsed}
                    onChange={(e) => setFabricUsed(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDTRModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Record Shift & Earnings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: RELOCATE MODAL */}
      {showRelocateModal && activeAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Relocate Machine
            </h3>
            <p className="text-xs text-slate-400">
              Transfer {activeAsset.name} ({activeAsset.assetTag})
            </p>

            <form onSubmit={handleRelocateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Target Location *</label>
                <select
                  value={targetLocationId}
                  onChange={(e) => setTargetLocationId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>{l.name} - {l.address}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Transfer Reason *</label>
                <input
                  type="text"
                  required
                  value={relocateReason}
                  onChange={(e) => setRelocateReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRelocateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
