'use client';

import React, { useState, useMemo } from 'react';
import { PayrollRecord, ProductProductionOutput, StoreProduct, UserProfile } from '@/types';
import { 
  DollarSign, 
  Printer, 
  CheckCircle, 
  FileText, 
  Plus, 
  Calculator, 
  Layers, 
  Info, 
  Sparkles, 
  TrendingUp, 
  Trash2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface AccountingPayrollProps {
  payrolls: PayrollRecord[];
  products?: StoreProduct[];
  users?: UserProfile[];
  onApprovePayroll: (payrollId: string) => void;
  onDisbursePayroll?: (payrollId: string) => void;
  onAddPayrollRecord?: (record: PayrollRecord) => void;
}

export const AccountingPayroll: React.FC<AccountingPayrollProps> = ({
  payrolls,
  products = [],
  users = [],
  onApprovePayroll,
  onDisbursePayroll,
  onAddPayrollRecord
}) => {
  const { playChime, speakText } = useAccessibility();
  
  // Modals & View States
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRecord | null>(null);
  const [showAutoComputeModal, setShowAutoComputeModal] = useState<boolean>(false);
  const [showPieceRateReference, setShowPieceRateReference] = useState<boolean>(false);

  // Auto-Compute Form State
  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || 'usr-101');
  const [customOperatorName, setCustomOperatorName] = useState<string>('');
  const [payPeriod, setPayPeriod] = useState<string>('March 16 - March 31, 2026');
  const [dtrHours, setDtrHours] = useState<number>(40);
  const [hourlyRate, setHourlyRate] = useState<number>(85); // ₱85/hr standard allowance
  const [adjustments, setAdjustments] = useState<number>(0);
  const [grantMaterialsSubsidized, setGrantMaterialsSubsidized] = useState<number>(950);

  // Dynamic varied product rows for auto computation
  const [productOutputs, setProductOutputs] = useState<{
    productId: string;
    productName: string;
    unitsProduced: number;
    pieceRate: number;
  }[]>([
    {
      productId: products[0]?.id || 'prod-1',
      productName: products[0]?.name || 'BUPCA Signature Upcycled Denim Tote Bag',
      unitsProduced: 25,
      pieceRate: products[0]?.defaultPieceRate || 75
    }
  ]);

  // Aggregate stats across payroll records
  const totalDisbursed = payrolls.reduce((sum, p) => sum + p.netPayout, 0);
  const totalUnits = payrolls.reduce((sum, p) => sum + (p.totalUnitsProduced || 0), 0);
  const totalSubsidizedMaterials = payrolls.reduce((sum, p) => sum + (p.materialsSubsidizedValue || 0), 0);
  const totalPieceRateEarnings = payrolls.reduce((sum, p) => sum + (p.totalPieceRateEarnings || 0), 0);
  const totalHourlyAllowances = payrolls.reduce((sum, p) => sum + (p.hourlyAllowance || 0), 0);

  // Auto-calculation logic for modal
  const computedHourlyAllowance = dtrHours * hourlyRate;
  const computedPieceRateTotal = useMemo(() => {
    return productOutputs.reduce((sum, item) => sum + (item.unitsProduced * item.pieceRate), 0);
  }, [productOutputs]);
  const computedTotalUnits = useMemo(() => {
    return productOutputs.reduce((sum, item) => sum + item.unitsProduced, 0);
  }, [productOutputs]);
  const computedGrossPay = computedHourlyAllowance + computedPieceRateTotal;
  const computedNetPayout = computedGrossPay + adjustments;

  // Add a product row to the auto-compute form
  const handleAddProductRow = () => {
    playChime('click');
    const defaultProd = products[0] || {
      id: `prod-${Date.now()}`,
      name: 'Custom Upcycled Craft',
      defaultPieceRate: 60
    };
    setProductOutputs(prev => [
      ...prev,
      {
        productId: defaultProd.id,
        productName: defaultProd.name,
        unitsProduced: 10,
        pieceRate: defaultProd.defaultPieceRate || 60
      }
    ]);
  };

  const handleRemoveProductRow = (index: number) => {
    playChime('click');
    if (productOutputs.length > 1) {
      setProductOutputs(prev => prev.filter((_, idx) => idx !== index));
    }
  };

  const handleProductRowChange = (index: number, productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    setProductOutputs(prev => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        productId: prod.id,
        productName: prod.name,
        pieceRate: prod.defaultPieceRate || 60
      };
      return copy;
    });
  };

  const handleUnitsChange = (index: number, units: number) => {
    setProductOutputs(prev => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        unitsProduced: Math.max(0, units)
      };
      return copy;
    });
  };

  const handlePieceRateOverride = (index: number, rate: number) => {
    setProductOutputs(prev => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        pieceRate: Math.max(0, rate)
      };
      return copy;
    });
  };

  // Submit auto-computed payroll record
  const handleCreatePayrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('success');

    const matchedUser = users.find(u => u.id === selectedUserId);
    const artisanName = customOperatorName.trim() || matchedUser?.fullName || 'Artisan Operator';

    const newRecord: PayrollRecord = {
      id: `pay-${Date.now()}`,
      operatorId: selectedUserId,
      operatorName: artisanName,
      payPeriod: payPeriod,
      hoursWorked: dtrHours,
      hourlyRate: hourlyRate,
      hourlyAllowance: computedHourlyAllowance,
      productBreakdown: productOutputs.map(p => ({
        productId: p.productId,
        productName: p.productName,
        unitsProduced: p.unitsProduced,
        pieceRate: p.pieceRate,
        totalEarned: p.unitsProduced * p.pieceRate
      })),
      totalUnitsProduced: computedTotalUnits,
      totalPieceRateEarnings: computedPieceRateTotal,
      materialsSubsidizedValue: grantMaterialsSubsidized,
      grossPay: computedGrossPay,
      adjustmentsOrBonus: adjustments,
      netPayout: computedNetPayout,
      status: 'draft',
      generatedDate: new Date().toISOString().split('T')[0]
    };

    if (onAddPayrollRecord) {
      onAddPayrollRecord(newRecord);
    }
    setShowAutoComputeModal(false);
    speakText(`Payroll computed for ${artisanName}: total take-home ₱${computedNetPayout.toLocaleString()}`);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Labor Payouts</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            ₱{totalDisbursed.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Piece-rates + hourly allowances</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Units Released</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            {totalUnits} Units
          </span>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-0.5 block">
            ₱{totalPieceRateEarnings.toLocaleString()} piece-rate earned
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">DTR Hourly Allowances</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            ₱{totalHourlyAllowances.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">₱85/hr monitored workshop time</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Subsidized Raw Materials</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            ₱{totalSubsidizedMaterials.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">100% Grant Subsidized (₱0 artisan fee)</span>
        </div>
      </div>

      {/* Action Banner & Tools */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 p-4 rounded-2xl border border-blue-100/80 dark:border-zinc-800">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Automated Piece-Rate & DTR Compensation Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automatically calculates wages from varied product releases (Totes, Baskets, Pouches, Aprons) and monitored workshop hours.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              playChime('click');
              setShowPieceRateReference(!showPieceRateReference);
            }}
            className="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Piece-Rate Schedule</span>
          </button>

          <button
            onClick={() => {
              playChime('click');
              setShowAutoComputeModal(true);
            }}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Compute Artisan Payout</span>
          </button>
        </div>
      </div>

      {/* Piece Rate Reference Drawer / Dropdown */}
      {showPieceRateReference && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Official PWD BUPCA Artisan Piece-Rate Schedule</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Approved FY 2026
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every varied product category holds an established piece-rate based on craft complexity and machine time.
              </p>
            </div>
            <button
              onClick={() => setShowPieceRateReference(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Dismiss
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {products.map((prod) => (
              <div key={prod.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
                  {prod.category}
                </span>
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-100 block mt-1 line-clamp-1">
                  {prod.name}
                </span>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-zinc-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Piece-Rate:</span>
                  <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                    ₱{prod.defaultPieceRate || 60}<span className="text-[10px] font-normal text-slate-400">/unit</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>Store Retail:</span>
                  <span className="font-mono">₱{prod.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Member Payroll Ledger */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Artisan Compensation & Piece-Rate Ledger
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Transparent itemized statements showing exact product outputs, units produced, piece-rates, and DTR allowances.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>{payrolls.length} Total Statements</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-medium">
              <tr>
                <th className="py-2.5 px-3">Artisan</th>
                <th className="py-2.5 px-3">Pay Period</th>
                <th className="py-2.5 px-3">DTR Hours</th>
                <th className="py-2.5 px-3">Varied Products Released</th>
                <th className="py-2.5 px-3">Piece Rate</th>
                <th className="py-2.5 px-3">Hourly Allow.</th>
                <th className="py-2.5 px-3">Net Take-Home</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
              {payrolls.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {rec.operatorName}
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{rec.payPeriod}</td>
                  <td className="py-3 px-3 font-mono">
                    {rec.hoursWorked} hrs 
                    <span className="block text-[10px] text-slate-400 font-normal">@ ₱{rec.hourlyRate || 85}/hr</span>
                  </td>
                  
                  {/* Itemized Varied Product Breakdown */}
                  <td className="py-3 px-3">
                    {rec.productBreakdown && rec.productBreakdown.length > 0 ? (
                      <div className="space-y-1">
                        {rec.productBreakdown.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {item.unitsProduced}x
                            </span>
                            <span className="text-slate-500 truncate max-w-[170px]" title={item.productName}>
                              {item.productName}
                            </span>
                            <span className="text-slate-400 text-[10px]">
                              (@₱{item.pieceRate})
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-500">{rec.totalUnitsProduced || 0} Units (Standard)</span>
                    )}
                  </td>

                  <td className="py-3 px-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                    ₱{rec.totalPieceRateEarnings?.toLocaleString() || 0}
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-500">
                    ₱{rec.hourlyAllowance?.toLocaleString() || 0}
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-sm text-slate-900 dark:text-white">
                    ₱{rec.netPayout.toLocaleString()}
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      rec.status === 'disbursed'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : rec.status === 'approved'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {rec.status}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {rec.status === 'draft' && (
                        <button
                          onClick={() => {
                            playChime('click');
                            onApprovePayroll(rec.id);
                            speakText(`Statement for ${rec.operatorName} approved.`);
                          }}
                          className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-semibold text-[11px] cursor-pointer"
                        >
                          Approve
                        </button>
                      )}

                      {rec.status === 'approved' && onDisbursePayroll && (
                        <button
                          onClick={() => {
                            playChime('success');
                            onDisbursePayroll(rec.id);
                            speakText(`Funds marked disbursed to ${rec.operatorName}.`);
                          }}
                          className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] cursor-pointer"
                        >
                          Disburse
                        </button>
                      )}

                      <button
                        onClick={() => {
                          playChime('click');
                          setSelectedPayroll(rec);
                        }}
                        className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 text-slate-700 dark:text-slate-300 font-medium text-[11px] cursor-pointer inline-flex items-center gap-1"
                        title="View & Print Official Pay Stub"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Pay Stub</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AUTO COMPUTE / GENERATE PAYROLL MODAL */}
      {showAutoComputeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span>Auto-Compute Artisan Payroll Batch</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select an artisan, input DTR hours, and log actual varied products produced with individual piece-rates.
                </p>
              </div>
              <button
                onClick={() => setShowAutoComputeModal(false)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePayrollSubmit} className="space-y-4">
              
              {/* Artisan & Pay Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Artisan Operator *
                  </label>
                  <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  >
                    {users.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.fullName} ({u.role.replace('_', ' ')})
                      </option>
                    ))}
                    <option value="custom">Other / Manual Entry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Pay Period *
                  </label>
                  <input
                    type="text"
                    required
                    value={payPeriod}
                    onChange={(e) => setPayPeriod(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              {selectedUserId === 'custom' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Custom Artisan Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customOperatorName}
                    onChange={(e) => setCustomOperatorName(e.target.value)}
                    placeholder="e.g. Maria Teresa Santos"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              )}

              {/* DTR Hours & Hourly Allowance */}
              <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200/80 dark:border-zinc-700 space-y-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  1. DTR Monitored Workshop Hours
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Total Hours Worked</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={dtrHours}
                      onChange={(e) => setDtrHours(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Hourly Rate (₱/hr)</label>
                    <input
                      type="number"
                      min="0"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="sm:text-right flex flex-col justify-end">
                    <span className="text-[11px] text-slate-400">Hourly Allowance:</span>
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                      ₱{computedHourlyAllowance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Varied Products Released with Auto-Computed Piece Rates */}
              <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200/80 dark:border-zinc-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      2. Actual Varied Products Produced & Released
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Each product line multiplies quantity by its designated piece rate.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddProductRow}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {productOutputs.map((item, idx) => {
                    const rowTotal = item.unitsProduced * item.pieceRate;
                    return (
                      <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200/60 dark:border-zinc-700 text-xs">
                        <div className="flex-1">
                          <select
                            value={item.productId}
                            onChange={(e) => handleProductRowChange(idx, e.target.value)}
                            className="w-full px-2 py-1.5 rounded border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-xs truncate"
                          >
                            {products.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name} (Std: ₱{p.defaultPieceRate || 60})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-20">
                            <input
                              type="number"
                              min="0"
                              value={item.unitsProduced}
                              onChange={(e) => handleUnitsChange(idx, parseInt(e.target.value) || 0)}
                              placeholder="Qty"
                              title="Units Produced"
                              className="w-full px-2 py-1.5 rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-center font-bold text-xs"
                            />
                          </div>
                          
                          <span className="text-slate-400">×</span>

                          <div className="w-20">
                            <input
                              type="number"
                              min="0"
                              value={item.pieceRate}
                              onChange={(e) => handlePieceRateOverride(idx, parseFloat(e.target.value) || 0)}
                              placeholder="₱/unit"
                              title="Piece Rate (₱)"
                              className="w-full px-2 py-1.5 rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-center font-mono text-xs"
                            />
                          </div>

                          <div className="w-24 text-right font-mono font-bold text-slate-800 dark:text-slate-100">
                            ₱{rowTotal.toLocaleString()}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveProductRow(idx)}
                            disabled={productOutputs.length <= 1}
                            className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 cursor-pointer"
                            title="Remove Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    Total Output: <strong>{computedTotalUnits} units</strong> across {productOutputs.length} product line(s)
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                    Total Piece-Rate: ₱{computedPieceRateTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Adjustments & Grant Subsidy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Bonus or Adjustments (₱)
                  </label>
                  <input
                    type="number"
                    value={adjustments}
                    onChange={(e) => setAdjustments(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Raw Material Grant Subsidy (₱ Covered)
                  </label>
                  <input
                    type="number"
                    value={grantMaterialsSubsidized}
                    onChange={(e) => setGrantMaterialsSubsidized(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                  <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">
                    Zero deduction from artisan
                  </span>
                </div>
              </div>

              {/* Live Computation Preview Box */}
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white space-y-2">
                <div className="flex justify-between text-xs opacity-90">
                  <span>Hourly Allowance ({dtrHours} hrs @ ₱{hourlyRate}/hr):</span>
                  <span className="font-mono font-semibold">₱{computedHourlyAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs opacity-90">
                  <span>Total Piece-Rate ({computedTotalUnits} units varied):</span>
                  <span className="font-mono font-semibold">₱{computedPieceRateTotal.toLocaleString()}</span>
                </div>
                {adjustments !== 0 && (
                  <div className="flex justify-between text-xs opacity-90">
                    <span>Adjustments / Incentives:</span>
                    <span className="font-mono font-semibold">₱{adjustments.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/20 flex justify-between items-center text-base font-extrabold">
                  <span>Final Net Artisan Payout:</span>
                  <span className="text-xl font-mono">₱{computedNetPayout.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAutoComputeModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Generate Statement
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DETAILED PRINTABLE PAY STUB MODAL */}
      {selectedPayroll && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            
            {/* Stub Header */}
            <div className="border-b border-slate-100 dark:border-zinc-800 pb-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                PWD BUPCA Inc. • Barangay UP Campus, Diliman QC
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block mt-0.5">
                Gawad Tsanselor 2025 Natatanging Samahang Pangkomunidad
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Official Artisan Pay Statement
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{selectedPayroll.payPeriod}</p>
            </div>

            {/* Recipient info */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Artisan Member:</span>
                <strong className="text-slate-900 dark:text-white">{selectedPayroll.operatorName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Statement ID:</span>
                <span className="font-mono text-slate-500">{selectedPayroll.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payout Status:</span>
                <span className="font-semibold text-emerald-600 capitalize">{selectedPayroll.status}</span>
              </div>
            </div>

            {/* Varied Products Released breakdown */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-100 dark:border-zinc-800 pb-1">
                Varied Products Released & Piece-Rate Breakdown
              </span>

              {selectedPayroll.productBreakdown && selectedPayroll.productBreakdown.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedPayroll.productBreakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-50 dark:border-zinc-800">
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 block truncate max-w-[220px]">
                          {item.productName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.unitsProduced} units × ₱{item.pieceRate}/unit
                        </span>
                      </div>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white">
                        ₱{item.totalEarned.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-1 text-slate-800 dark:text-slate-200">
                    <span>Total Piece-Rate Earnings:</span>
                    <span className="font-mono">₱{selectedPayroll.totalPieceRateEarnings.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between py-1 text-slate-600 dark:text-slate-300">
                  <span>Standard Piece Rate ({selectedPayroll.totalUnitsProduced} units):</span>
                  <span className="font-mono">₱{selectedPayroll.totalPieceRateEarnings.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* DTR Hours & Allowances */}
            <div className="space-y-1.5 text-xs border-t border-slate-100 dark:border-zinc-800 pt-2 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Monitored DTR Workshop Time:</span>
                <span className="font-mono">{selectedPayroll.hoursWorked} hrs @ ₱{selectedPayroll.hourlyRate || 85}/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Operational Allowance:</span>
                <span className="font-mono">₱{selectedPayroll.hourlyAllowance.toLocaleString()}</span>
              </div>
              {selectedPayroll.adjustmentsOrBonus ? (
                <div className="flex justify-between text-blue-600 dark:text-blue-400">
                  <span>Incentive / Bonus:</span>
                  <span className="font-mono">+₱{selectedPayroll.adjustmentsOrBonus.toLocaleString()}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 text-[11px]">
                <span>Grant Materials Subsidy (100% Free):</span>
                <span className="font-mono">₱{selectedPayroll.materialsSubsidizedValue.toLocaleString()}</span>
              </div>
            </div>

            {/* Net Payout highlight */}
            <div className="flex justify-between py-3 px-4 text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl">
              <span>Total Member Take-Home:</span>
              <span className="font-mono text-base">₱{selectedPayroll.netPayout.toLocaleString()}</span>
            </div>

            {/* Footer and Print Button */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Stub</span>
              </button>
              <button
                onClick={() => setSelectedPayroll(null)}
                className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium cursor-pointer hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
