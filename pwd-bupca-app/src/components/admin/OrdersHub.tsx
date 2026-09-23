'use client';

import React, { useState } from 'react';
import { StoreOrder } from '@/types';
import { ShoppingCart, CheckCircle, Clock, PackageCheck, Truck, Phone, MapPin } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface OrdersHubProps {
  orders: StoreOrder[];
  onUpdateStatus: (orderId: string, newStatus: StoreOrder['status']) => void;
}

export const OrdersHub: React.FC<OrdersHubProps> = ({
  orders,
  onUpdateStatus
}) => {
  const { playChime, speakText } = useAccessibility();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_production' | 'ready_for_pickup' | 'completed'>('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleStatusChange = (orderId: string, status: StoreOrder['status']) => {
    playChime('success');
    onUpdateStatus(orderId, status);
    speakText(`Order status updated to ${status.replace('_', ' ')}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Orders</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            {orders.length}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">All time orders</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Gross Revenue</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            ₱{totalRevenue.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">Funds artisan piece-rates</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">In Production</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            {orders.filter(o => o.status === 'in_production').length}
          </span>
          <span className="text-[11px] text-blue-600 font-medium mt-0.5 block">At UP CHE stations</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Ready For Pickup</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
            {orders.filter(o => o.status === 'ready_for_pickup').length}
          </span>
          <span className="text-[11px] text-purple-600 font-medium mt-0.5 block">Area 2 Hub</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="font-bold text-base text-slate-900 dark:text-white">
            Customer Order Queue
          </h2>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['all', 'pending', 'in_production', 'ready_for_pickup', 'completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => {
                  playChime('click');
                  setFilter(st);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize cursor-pointer transition ${
                  filter === st
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/60'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {order.orderNumber}
                  </span>
                  <span className="text-slate-300 dark:text-zinc-700">•</span>
                  <span className="text-slate-400">{order.createdAt}</span>
                  <span className="text-slate-300 dark:text-zinc-700">•</span>
                  <span className="text-slate-500 font-medium">
                    {order.paymentMethod}
                  </span>
                </div>

                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                  {order.customerName}
                </h3>

                <div className="text-xs text-slate-400 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3" />
                    <span>{order.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{order.address}</span>
                  </div>
                </div>

                <div className="pt-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {order.items.map((it, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300"
                      >
                        {it.quantity}x {it.productName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Control & Pricing */}
              <div className="flex flex-col justify-between items-end min-w-[180px]">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Total</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    ₱{order.totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="w-full space-y-1.5 mt-3">
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleStatusChange(order.id, 'in_production')}
                      className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer transition ${
                        order.status === 'in_production'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      Production
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, 'ready_for_pickup')}
                      className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer transition ${
                        order.status === 'ready_for_pickup'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      Ready
                    </button>
                  </div>
                  <button
                    onClick={() => handleStatusChange(order.id, 'completed')}
                    className={`w-full py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
                      order.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'
                    }`}
                  >
                    Mark Fulfilled
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
