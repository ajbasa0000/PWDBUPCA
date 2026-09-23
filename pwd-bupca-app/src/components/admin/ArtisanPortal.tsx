'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  Play, 
  Square, 
  Package, 
  Scissors, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  DollarSign,
  AlertCircle,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { 
  EquipmentAsset, 
  WorkshopLocation, 
  DTRRecord, 
  StoreProduct, 
  SupplyItem, 
  SupplyRequest,
  StoreOrder
} from '@/types';
import { useAccessibility } from '@/context/AccessibilityContext';
import { AuthUserSession } from './AdminLogin';

interface ArtisanPortalProps {
  currentUser: AuthUserSession;
  assets: EquipmentAsset[];
  locations: WorkshopLocation[];
  products: StoreProduct[];
  supplies: SupplyItem[];
  supplyRequests: SupplyRequest[];
  orders: StoreOrder[];
  dtrHistory: DTRRecord[];
  onClockIn: (assetId: string, dtrData: Partial<DTRRecord> & { productId?: string; pieceRate?: number }) => void;
  onClockOut: (dtrId: string, unitsProduced: number, durationHours: number, fabricUsed: number) => void;
  onRequestSupply: (request: Partial<SupplyRequest>) => void;
}

export const ArtisanPortal: React.FC<ArtisanPortalProps> = ({
  currentUser,
  assets,
  locations,
  products,
  supplies,
  supplyRequests,
  orders,
  dtrHistory,
  onClockIn,
  onClockOut,
  onRequestSupply
}) => {
  const { playChime, speakText } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'dtr' | 'supplies' | 'orders'>('dtr');

  // Clock In / Out State
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || '');
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [hoursInput, setHoursInput] = useState<number>(4.0);
  const [unitsInput, setUnitsInput] = useState<number>(10);
  const [fabricInput, setFabricInput] = useState<number>(2.5);
  const [shiftNotes, setShiftNotes] = useState<string>('Morning craft shift. Standard lockstitch run.');

  // Active Clocked In Shift Tracking
  const [activeShift, setActiveShift] = useState<{
    assetId: string;
    assetName: string;
    clockInTime: string;
    productId: string;
  } | null>(null);

  // Supply Request Modal / Form State
  const [selectedSupplyId, setSelectedSupplyId] = useState<string>(supplies[0]?.id || '');
  const [requestQty, setRequestQty] = useState<number>(5);
  const [requestPurpose, setRequestPurpose] = useState<string>('Batch production for artisan store orders');
  const [showSupplySuccess, setShowSupplySuccess] = useState(false);

  // Filtered lists for this user
  const userSupplyRequests = supplyRequests.filter(
    r => r.operatorName.toLowerCase().includes(currentUser.fullName.toLowerCase()) ||
         r.operatorId === currentUser.username ||
         currentUser.fullName.toLowerCase().includes(r.operatorName.toLowerCase())
  );

  const userDtrLogs = dtrHistory.filter(
    d => d.operatorName.toLowerCase().includes(currentUser.fullName.toLowerCase()) ||
         d.operatorId === currentUser.username
  );

  // Selected Product Information
  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];
  const pieceRate = currentProduct?.defaultPieceRate || 75;
  const estimatedPieceEarnings = unitsInput * pieceRate;
  const estimatedHourlyEarnings = hoursInput * 85;
  const estimatedTotalTakeHome = estimatedPieceEarnings + estimatedHourlyEarnings;

  // Handle Clock In
  const handleStartShift = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find(a => a.id === selectedAssetId);
    if (!asset) return;

    playChime('success');
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActiveShift({
      assetId: asset.id,
      assetName: asset.name,
      clockInTime: nowStr,
      productId: selectedProductId
    });

    onClockIn(asset.id, {
      operatorName: currentUser.fullName,
      productType: currentProduct?.name || 'Upcycled Craft',
      unitsProduced: 0,
      durationHours: 0,
      productId: currentProduct?.id,
      pieceRate: pieceRate
    });

    speakText(`Clocked in at ${asset.name}. Shift started.`);
  };

  // Handle Clock Out & Output Recording
  const handleEndShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeShift) return;

    playChime('success');
    const asset = assets.find(a => a.id === activeShift.assetId);

    onClockIn(activeShift.assetId, {
      operatorName: currentUser.fullName,
      productType: currentProduct?.name || 'Upcycled Craft',
      unitsProduced: unitsInput,
      materialsUsed: [{ itemName: 'Upcycled Denim / Fabric Scraps', quantity: fabricInput, unit: 'meters' }],
      durationHours: hoursInput,
      productId: currentProduct?.id,
      pieceRate: pieceRate,
      notes: shiftNotes
    });

    speakText(`Shift completed! Recorded ${unitsInput} units of ${currentProduct?.name}. Estimated earnings: ₱${estimatedTotalTakeHome}.`);
    setActiveShift(null);
  };

  // Handle Supply Request
  const handleSupplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = supplies.find(s => s.id === selectedSupplyId);
    if (!item) return;

    playChime('success');
    onRequestSupply({
      id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      operatorId: currentUser.username,
      operatorName: currentUser.fullName,
      supplyId: item.id,
      supplyName: item.name,
      quantityRequested: requestQty,
      unit: item.unit,
      purpose: requestPurpose,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0]
    });

    setShowSupplySuccess(true);
    setTimeout(() => setShowSupplySuccess(false), 4000);
    speakText(`Supply request submitted for ${requestQty} ${item.unit} of ${item.name}.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Artisan Member Portal • Station Shift Terminal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Mabuhay, {currentUser.fullName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            Log your daily machinery clock-ins, record finished craft outputs, and request grant-subsidized raw materials.
          </p>
        </div>

        {/* Quick Shift Status Badge */}
        <div className={`px-5 py-4 rounded-2xl border flex items-center gap-3 ${
          activeShift
            ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
            : 'bg-slate-50 dark:bg-zinc-800/60 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300'
        }`}>
          <Clock className={`w-6 h-6 ${activeShift ? 'text-amber-600 animate-spin' : 'text-slate-400'}`} />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider block">
              Current Station Shift
            </span>
            <span className="text-sm font-extrabold block">
              {activeShift ? `Clocked in at ${activeShift.assetName}` : 'No Active Clock-In'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-zinc-800 pb-3">
        <button
          onClick={() => { playChime('click'); setActiveTab('dtr'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'dtr'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>DTR & Production Output</span>
        </button>

        <button
          onClick={() => { playChime('click'); setActiveTab('supplies'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'supplies'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-50'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Raw Material Supplies</span>
        </button>

        <button
          onClick={() => { playChime('click'); setActiveTab('orders'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Pending Store Orders</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 font-extrabold">
            {orders.filter(o => o.status === 'in_production' || o.status === 'pending').length}
          </span>
        </button>
      </div>

      {/* TAB 1: DTR CLOCK IN / CLOCK OUT & PRODUCTION RECORDING */}
      {activeTab === 'dtr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Action Card: Clock In / End Shift Form */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    {activeShift ? 'Record Shift Output & Clock Out' : 'Machine Station Clock-In'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {activeShift ? 'Submit your completed batch and hours to receive payroll credit' : 'Select your workstation machine to begin your shift'}
                  </p>
                </div>
              </div>
            </div>

            {!activeShift ? (
              /* CLOCK IN FORM */
              <form onSubmit={handleStartShift} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Assigned Equipment / Workstation
                  </label>
                  <select
                    value={selectedAssetId}
                    onChange={(e) => setSelectedAssetId(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  >
                    {assets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        [{asset.assetTag}] {asset.name} • {asset.locationName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Target Craft Product for This Shift
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  >
                    {products.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} (Piece-Rate Credit: ₱{prod.defaultPieceRate || 75}/unit)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Subsidized Station Guarantee</span>
                  </div>
                  <p>
                    Hourly training allowance of ₱85/hr is automatically added to your piece-rate output. All raw fabrics, threads, and machine oils are 100% subsidized by PWD BUPCA grants.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Clock In & Start Machine Session</span>
                </button>
              </form>
            ) : (
              /* CLOCK OUT & RECORD OUTPUT FORM */
              <form onSubmit={handleEndShift} className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Shift ongoing on <strong>{activeShift.assetName}</strong></span>
                  </div>
                  <span className="font-bold px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 text-[11px]">
                    Started at {activeShift.clockInTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Monitored Hours
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="12"
                      value={hoursInput}
                      onChange={(e) => setHoursInput(parseFloat(e.target.value) || 0)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-bold"
                    />
                    <span className="text-[10px] text-slate-400">@ ₱85/hr (₱{hoursInput * 85})</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Finished Units Produced
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={unitsInput}
                      onChange={(e) => setUnitsInput(parseInt(e.target.value) || 0)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-bold"
                    />
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                      @ ₱{pieceRate}/ea (₱{unitsInput * pieceRate})
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Fabric Used (Meters)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={fabricInput}
                      onChange={(e) => setFabricInput(parseFloat(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-bold"
                    />
                    <span className="text-[10px] text-emerald-600">100% Subsidized</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Shift Remarks / Notes
                  </label>
                  <input
                    type="text"
                    value={shiftNotes}
                    onChange={(e) => setShiftNotes(e.target.value)}
                    placeholder="e.g. Completed double-stitched strap reinforcement"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-xs font-medium"
                  />
                </div>

                {/* Live Take-Home Preview */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                      Estimated Take-Home Credit
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-300">
                      ₱{hoursInput * 85} (Hourly) + ₱{unitsInput * pieceRate} (Piece Rate)
                    </span>
                  </div>
                  <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                    ₱{estimatedTotalTakeHome.toLocaleString()}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>Clock Out & Log Completed Units</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Recent Station Logs */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Your Verified DTR Logs</span>
              </h3>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {userDtrLogs.length} Records
              </span>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {userDtrLogs.length > 0 ? (
                userDtrLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {log.assetName}
                      </span>
                      <span className="text-[10px] text-slate-400">{log.clockIn}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 dark:text-zinc-400 font-medium">
                        {log.productType}
                      </span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                        {log.unitsProduced} units ({log.durationHours || 4} hrs)
                      </span>
                    </div>

                    {log.notes && (
                      <p className="text-[11px] text-slate-400 italic">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
                  No previous DTR logs recorded for this account. Clock in above to generate your first verified record.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RAW MATERIAL SUPPLIES (REQUEST & TRACK) */}
      {activeTab === 'supplies' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Request Form */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Requisition Raw Materials
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  100% Subsidized materials for community craft production
                </p>
              </div>
            </div>

            {showSupplySuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Supply request submitted. Logistics team will allocate materials shortly.</span>
              </div>
            )}

            <form onSubmit={handleSupplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Select Raw Supply Material
                </label>
                <select
                  value={selectedSupplyId}
                  onChange={(e) => setSelectedSupplyId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500"
                >
                  {supplies.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Stock: {s.stock} {s.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Quantity Needed
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={requestQty}
                  onChange={(e) => setRequestQty(parseInt(e.target.value) || 1)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Production Purpose
                </label>
                <input
                  type="text"
                  value={requestPurpose}
                  onChange={(e) => setRequestPurpose(e.target.value)}
                  placeholder="e.g. Batch of 20 Upcycled Denim Tote Bags"
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-medium"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs">
                Zero deduction from your wage. Subsidized 100% by PWD BUPCA institutional grant funds.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Package className="w-4 h-4" />
                <span>Submit Requisition</span>
              </button>
            </form>
          </div>

          {/* Supply Status Queue */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Your Material Requisitions
                </h3>
                <p className="text-xs text-slate-500">Track pending and released supplies for your workstation</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                {userSupplyRequests.length} Requests
              </span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {userSupplyRequests.length > 0 ? (
                userSupplyRequests.map((req, idx) => (
                  <div
                    key={req.id ? `${req.id}-${idx}` : `req-${idx}`}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-800 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {req.supplyName}
                      </div>
                      <p className="text-xs text-slate-500">
                        Purpose: {req.purpose}
                      </p>
                      <span className="text-[11px] text-slate-400 block">
                        Requested on {req.requestDate}
                      </span>
                    </div>

                    <div className="text-right shrink-0 space-y-1.5">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {req.quantityRequested} {req.unit}
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${
                        req.status === 'approved'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : req.status === 'pending'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                      }`}>
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
                  No material requests filed yet. Submit a request using the form on the left.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PENDING STORE ORDERS (COMMUNITY TRANSACTION DASHBOARD) */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-xs font-bold mb-1 border border-amber-200">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span>Production Pipeline</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Pending Transactions & Production Orders
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Live customer orders that require artisan craftsmanship and fulfillment
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-zinc-300">
                Total Orders: {orders.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {order.orderNumber}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    order.status === 'in_production'
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200'
                      : order.status === 'ready_for_pickup'
                      ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200'
                      : order.status === 'completed'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200'
                  }`}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {order.customerName}
                  </h4>
                  <p className="text-xs text-slate-400">{order.createdAt}</p>
                </div>

                {/* Items to Craft */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/50 dark:border-zinc-800">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Deliverables To Craft:
                  </span>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-zinc-300">
                        {item.quantity}x {item.productName}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₱{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200/50 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Valuation:</span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ₱{order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
