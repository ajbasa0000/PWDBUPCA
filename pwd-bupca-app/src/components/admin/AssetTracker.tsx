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
  ArrowUpRight,
  Map as MapIcon,
  List
} from 'lucide-react';
import { EquipmentAsset, WorkshopLocation, DTRRecord, StoreProduct } from '@/types';
import { useAccessibility } from '@/context/AccessibilityContext';

// Dynamically import Leaflet Map (SSR: false to prevent window undefined error)
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
}

export const AssetTracker: React.FC<AssetTrackerProps> = ({
  assets,
  locations,
  products = [],
  onClockIn,
  onRelocate
}) => {
  const { playChime, speakText } = useAccessibility();
  const [selectedLocationId, setSelectedLocationId] = useState<string>('all');
  const [activeAsset, setActiveAsset] = useState<EquipmentAsset | null>(assets[0] || null);
  
  // DTR Modal Form state
  const [showDTRModal, setShowDTRModal] = useState<boolean>(false);
  const [operatorName, setOperatorName] = useState('Elena Santos');
  const [fabricUsed, setFabricUsed] = useState(3.0);
  const [unitsProduced, setUnitsProduced] = useState(12);
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'prod-1');

  // Find active product and piece rate
  const activeProduct = products.find(p => p.id === selectedProductId) || products[0];
  const activePieceRate = activeProduct?.defaultPieceRate || 75;

  // Relocation Modal state
  const [showRelocateModal, setShowRelocateModal] = useState<boolean>(false);
  const [targetLocationId, setTargetLocationId] = useState(locations[0]?.id || '');
  const [relocateReason, setRelocateReason] = useState('Scheduled workshop rotation for UP CHE Training');

  const [viewMode, setViewMode] = useState<'map' | 'nodes'>('map');

  const filteredAssets = selectedLocationId === 'all' 
    ? assets 
    : assets.filter(a => a.locationId === selectedLocationId);

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
    speakText(`Operation logged: ${unitsProduced} units of ${prodName} at ₱${activePieceRate} each.`);
  };

  const handleRelocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAsset) return;
    playChime('success');
    onRelocate(activeAsset.id, targetLocationId, relocateReason);
    setShowRelocateModal(false);
    speakText(`Asset relocated successfully.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Soft Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Equipment</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            {assets.length} Units
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Across 3 workshop hubs</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Online & Active</span>
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            {assets.filter(a => a.status === 'online' || a.status === 'in_use').length}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">Active Production</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Standby / Idle</span>
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            {assets.filter(a => a.status === 'idle').length}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Available for shift</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>Maintenance</span>
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            {assets.filter(a => a.status === 'maintenance').length}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Scheduled tune-up</span>
        </div>
      </div>

      {/* Location Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => {
            playChime('click');
            setSelectedLocationId('all');
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition ${
            selectedLocationId === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
              : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
          }`}
        >
          All Locations ({assets.length})
        </button>
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => {
              playChime('click');
              setSelectedLocationId(loc.id);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
              selectedLocationId === loc.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-3 h-3" />
            <span>{loc.name}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Clean Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stationary Hubs & Asset List */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Workshop Campus Hubs & Interactive Map */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Workshop Stations & Live Map (UP Diliman)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visual map of stationed machines and workshops across campus.
                </p>
              </div>

              {/* Map / Grid View Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg border border-slate-200/60 dark:border-zinc-700">
                <button
                  onClick={() => {
                    playChime('click');
                    setViewMode('map');
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    viewMode === 'map'
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Map View</span>
                </button>
                <button
                  onClick={() => {
                    playChime('click');
                    setViewMode('nodes');
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    viewMode === 'nodes'
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Grid Cards</span>
                </button>
              </div>
            </div>

            {/* Render Interactive Map or Node Grid based on viewMode */}
            {viewMode === 'map' ? (
              <AssetInteractiveMap
                locations={locations}
                assets={assets}
                selectedLocationId={selectedLocationId}
                onSelectLocation={(locId) => setSelectedLocationId(locId)}
                onSelectAsset={(ast) => setActiveAsset(ast)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {locations.map((loc) => {
                  const count = assets.filter(a => a.locationId === loc.id).length;
                  const onlineCount = assets.filter(a => a.locationId === loc.id && (a.status === 'online' || a.status === 'in_use')).length;
                  const isSelected = selectedLocationId === loc.id;
                  return (
                    <div
                      key={loc.id}
                      className={`p-3.5 rounded-xl border transition cursor-pointer ${
                        isSelected 
                          ? 'border-blue-500/80 bg-blue-50/40 dark:bg-blue-950/20' 
                          : 'border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 bg-slate-50/50 dark:bg-zinc-800/30'
                      }`}
                      onClick={() => {
                        playChime('click');
                        setSelectedLocationId(loc.id);
                      }}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-600 dark:text-slate-300 truncate">
                          {loc.name.split(' ')[0]}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-white dark:bg-zinc-800 text-slate-600 border border-slate-200/60 dark:border-zinc-700">
                          {onlineCount}/{count} In-Use
                        </span>
                      </div>
                      <h3 className="font-semibold text-xs text-slate-900 dark:text-white mt-1.5 line-clamp-1">
                        {loc.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{loc.address}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Asset List */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              Equipment Units ({filteredAssets.length})
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-zinc-800">
              {filteredAssets.map((asset) => {
                const isSelected = activeAsset?.id === asset.id;
                return (
                  <div
                    key={asset.id}
                    onClick={() => {
                      playChime('click');
                      setActiveAsset(asset);
                    }}
                    className={`py-3.5 px-3 rounded-xl transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected 
                        ? 'bg-blue-50/50 dark:bg-blue-950/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">
                          {asset.assetTag}
                        </span>
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          {asset.name}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        <span>{asset.locationName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {asset.status === 'online' || asset.status === 'in_use' ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>In Production</span>
                        </span>
                      ) : asset.status === 'idle' ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          <span>Idle</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Maintenance</span>
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playChime('click');
                          setActiveAsset(asset);
                          setShowDTRModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-medium cursor-pointer shadow-2xs"
                      >
                        Log DTR
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Unit Operational Inspector */}
        <div className="lg:col-span-5">
          {activeAsset ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs sticky top-24 space-y-5">
              
              <div className="border-b border-slate-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {activeAsset.assetTag}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeAsset.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {activeAsset.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{activeAsset.specifications}</p>
              </div>

              {/* Stationed Hub */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-wide block">Current Location</span>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{activeAsset.locationName}</span>
                </div>
                <button
                  onClick={() => setShowRelocateModal(true)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline pt-1 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowRightLeft className="w-3 h-3" />
                  <span>Transfer machine location</span>
                </button>
              </div>

              {/* Operator Status */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-wide block">Active Operator</span>
                {activeAsset.currentOperator ? (
                  <div>
                    <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                      {activeAsset.currentOperator.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Clocked In: {activeAsset.currentOperator.clockedInAt}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No operator currently clocked in.</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    playChime('click');
                    setShowDTRModal(true);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <Clock className="w-4 h-4" />
                  <span>Clock-In / Daily Time Record (DTR)</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 text-xs">
              Select an equipment unit to view details.
            </div>
          )}
        </div>

      </div>

      {/* CLEAN DTR MODAL */}
      {showDTRModal && activeAsset && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Daily Time Record (DTR)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Unit: {activeAsset.name} ({activeAsset.assetTag})
            </p>

            <form onSubmit={handleDTRSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Artisan Name *
                </label>
                <input
                  type="text"
                  required
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Batch Product *
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₱{p.defaultPieceRate || 60}/unit rate
                    </option>
                  ))}
                  {products.length === 0 && (
                    <>
                      <option value="prod-1">BUPCA Signature Denim Tote (₱75/unit)</option>
                      <option value="prod-2">Foldable Fabric Bread Basket (₱55/unit)</option>
                      <option value="prod-3">Compact Denim Utility Pouch (₱45/unit)</option>
                      <option value="prod-4">Community Patchwork Apron (₱85/unit)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Fabric Used (m)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={fabricUsed}
                    onChange={(e) => setFabricUsed(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Finished Units
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={unitsProduced}
                    onChange={(e) => setUnitsProduced(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Piece-Rate per Unit:</span>
                  <span className="font-semibold">₱{activePieceRate}/unit</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold pt-1 border-t border-blue-100 dark:border-blue-900/50">
                  <span>Computed Artisan Credit:</span>
                  <span className="text-blue-700 dark:text-blue-300 font-mono">₱{(unitsProduced * activePieceRate).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDTRModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-xs"
                >
                  Clock-In Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLEAN RELOCATION MODAL */}
      {showRelocateModal && activeAsset && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Relocate Unit
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Move {activeAsset.name}
            </p>

            <form onSubmit={handleRelocateSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Target Location *</label>
                <select
                  value={targetLocationId}
                  onChange={(e) => setTargetLocationId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Reason</label>
                <input
                  type="text"
                  required
                  value={relocateReason}
                  onChange={(e) => setRelocateReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRelocateModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
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
