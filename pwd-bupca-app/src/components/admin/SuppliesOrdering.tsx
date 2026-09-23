'use client';

import React, { useState } from 'react';
import { SupplyItem, SupplyRequest } from '@/types';
import { Package, Plus, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface SuppliesOrderingProps {
  supplies: SupplyItem[];
  onRequestSupply: (request: Partial<SupplyRequest>) => void;
}

export const SuppliesOrdering: React.FC<SuppliesOrderingProps> = ({
  supplies,
  onRequestSupply
}) => {
  const { playChime, speakText } = useAccessibility();
  const [requests, setRequests] = useState<SupplyRequest[]>([
    {
      id: 'req-1',
      operatorId: 'usr-101',
      operatorName: 'Elena Santos',
      supplyId: 'sup-1',
      supplyName: 'Donated Upcycled Denim & Canvas Scraps',
      quantityRequested: 10,
      unit: 'meters',
      purpose: 'Production quota of 25 Upcycled Denim Totes',
      status: 'approved',
      requestDate: '2026-03-21'
    },
    {
      id: 'req-2',
      operatorId: 'usr-102',
      operatorName: 'Ramil Bautista',
      supplyId: 'sup-3',
      supplyName: 'Brass Heavy-Duty Zippers (8-inch)',
      quantityRequested: 30,
      unit: 'pieces',
      purpose: 'Batch of 30 Denim Utility Pouches',
      status: 'pending',
      requestDate: '2026-03-22'
    }
  ]);

  const [selectedSupply, setSelectedSupply] = useState<SupplyItem | null>(null);
  const [operatorName, setOperatorName] = useState('Elena Santos');
  const [quantity, setQuantity] = useState(5);
  const [purpose, setPurpose] = useState('Weekly production quota');

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupply) return;
    playChime('success');

    const newReq: SupplyRequest = {
      id: `req-${Date.now()}`,
      operatorId: 'usr-curr',
      operatorName,
      supplyId: selectedSupply.id,
      supplyName: selectedSupply.name,
      quantityRequested: quantity,
      unit: selectedSupply.unit,
      purpose,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0]
    };

    setRequests([newReq, ...requests]);
    onRequestSupply(newReq);
    setSelectedSupply(null);
    speakText(`Request recorded.`);
  };

  const handleApprove = (reqId: string) => {
    playChime('success');
    setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'approved' } : r));
  };

  return (
    <div className="space-y-6">
      
      {/* Raw Materials Inventory Cards */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Subsidized Raw Materials & Inventory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Organization-funded fabrics, threads, and hardware for member production.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {supplies.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-50/60 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-500">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                    100% Subsidized
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-1.5">
                  {item.name}
                </h3>
                <div className="mt-2.5 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{item.stock}</span>
                  <span className="text-xs text-slate-400 font-normal">{item.unit} available</span>
                </div>
              </div>

              <button
                onClick={() => {
                  playChime('click');
                  setSelectedSupply(item);
                }}
                className="mt-3.5 w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-medium cursor-pointer shadow-2xs flex items-center justify-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Request Allocation</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Member Requests Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs">
        <h2 className="font-bold text-base text-slate-900 dark:text-white mb-3">
          Supply Requests & Allocations
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-medium">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Artisan</th>
                <th className="py-2.5 px-3">Item</th>
                <th className="py-2.5 px-3">Quantity</th>
                <th className="py-2.5 px-3">Purpose</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-2.5 px-3 font-mono text-slate-400">{req.requestDate}</td>
                  <td className="py-2.5 px-3 font-semibold">{req.operatorName}</td>
                  <td className="py-2.5 px-3">{req.supplyName}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {req.quantityRequested} {req.unit}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{req.purpose}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      req.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {req.status === 'approved' ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {req.status === 'pending' && (
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-2.5 py-1 bg-slate-900 dark:bg-white text-white dark:text-zinc-900 rounded-md font-medium text-[11px] cursor-pointer hover:opacity-90"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clean Request Modal */}
      {selectedSupply && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Request Supplies
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedSupply.name} ({selectedSupply.unit})
            </p>

            <form onSubmit={handleRequestSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Artisan Name *</label>
                <input
                  type="text"
                  required
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Quantity ({selectedSupply.unit}) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Production Batch / Goal *</label>
                <input
                  type="text"
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSupply(null)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
