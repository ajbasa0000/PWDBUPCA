'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  mockLocations, 
  mockAssets, 
  mockSupplies, 
  mockOrders, 
  mockPayrolls,
  mockProducts,
  mockUsers,
  mockDTRRecords,
  mockApplications,
  mockTrainingCohorts,
  mockPartners
} from '@/data/mockData';
import { defaultWebsiteContent, WebsiteContent } from '@/data/websiteContent';
import { 
  EquipmentAsset, 
  StoreOrder, 
  DTRRecord, 
  SupplyRequest, 
  PayrollRecord,
  WorkshopLocation,
  StoreProduct,
  UserProfile,
  SupplyItem,
  MembershipApplication,
  TrainingCohort,
  PartnerClient
} from '@/types';
import { AssetTracker } from '@/components/admin/AssetTracker';
import { SuppliesOrdering } from '@/components/admin/SuppliesOrdering';
import { OrdersHub } from '@/components/admin/OrdersHub';
import { AccountingPayroll } from '@/components/admin/AccountingPayroll';
import { DatabaseManager } from '@/components/admin/DatabaseManager';
import { WebsiteContentManager } from '@/components/admin/WebsiteContentManager';
import { MembershipReviewHub } from '@/components/admin/MembershipReviewHub';
import { SkillsTrainingMatrix } from '@/components/admin/SkillsTrainingMatrix';
import { FieldWorkerTablet } from '@/components/admin/FieldWorkerTablet';
import { AdminLogin, AuthUserSession } from '@/components/admin/AdminLogin';
import { ArtisanPortal } from '@/components/admin/ArtisanPortal';
import { 
  Activity, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Globe, 
  Code2, 
  Database, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  Volume2, 
  ExternalLink, 
  Sliders,
  LogOut,
  UserCheck,
  ShieldAlert,
  Clock,
  UserPlus,
  GraduationCap,
  Tablet,
  FileText
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function AdminCommandCenter() {
  const { theme, toggleTheme, playChime, speakText } = useAccessibility();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUserSession>({
    username: 'grootadmin',
    fullName: 'Aaron Christian J. Basa',
    role: 'superuser',
    email: 'ajbasa@up.edu.ph'
  });
  const [activeTab, setActiveTab] = useState<'assets' | 'supplies' | 'orders' | 'accounting' | 'intake' | 'skills' | 'field' | 'cms' | 'developer'>('intake');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Interactive Live States
  const [assets, setAssets] = useState<EquipmentAsset[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pwd_bupca_assets');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length >= 19) return parsed;
        }
      } catch (e) {}
    }
    return mockAssets;
  });
  const [locations, setLocations] = useState<WorkshopLocation[]>(mockLocations);
  const [products, setProducts] = useState<StoreProduct[]>(mockProducts);
  const [supplies, setSupplies] = useState<SupplyItem[]>(mockSupplies);
  const [users, setUsers] = useState<UserProfile[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pwd_bupca_users');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return mockUsers;
  });
  const [orders, setOrders] = useState<StoreOrder[]>(mockOrders);
  const [payrolls, setPayrolls] = useState(mockPayrolls);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(defaultWebsiteContent);
  const [dtrRecords, setDtrRecords] = useState<DTRRecord[]>(mockDTRRecords);
  const [applications, setApplications] = useState<MembershipApplication[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pwd_bupca_applications');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return mockApplications;
  });
  const [cohorts, setCohorts] = useState<TrainingCohort[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pwd_bupca_cohorts');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return mockTrainingCohorts;
  });
  const [partners, setPartners] = useState<PartnerClient[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pwd_bupca_partners');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return mockPartners;
  });
  const [supplyRequests, setSupplyRequests] = useState<SupplyRequest[]>([
    {
      id: 'req-1',
      operatorId: 'usr-1',
      operatorName: 'Artisan User 1 (Elena Santos)',
      supplyId: 'sup-1',
      supplyName: 'Donated Upcycled Denim & Canvas Scraps',
      quantityRequested: 10,
      unit: 'meters',
      purpose: 'Batch quota of 25 Signature Denim Totes',
      status: 'approved',
      requestDate: '2026-03-21'
    },
    {
      id: 'req-2',
      operatorId: 'usr-2',
      operatorName: 'Artisan User 2 (Ramil Bautista)',
      supplyId: 'sup-3',
      supplyName: 'Brass Heavy-Duty Zippers (8-inch)',
      quantityRequested: 30,
      unit: 'pieces',
      purpose: 'Batch of 30 Denim Utility Pouches',
      status: 'pending',
      requestDate: '2026-03-22'
    }
  ]);

  // Asset DTR Trigger
  const handleClockIn = (assetId: string, dtr: Partial<DTRRecord>) => {
    setAssets(prev => prev.map(a => {
      if (a.id === assetId) {
        return {
          ...a,
          status: 'online',
          currentOperator: {
            id: 'usr-new',
            name: `${dtr.operatorName} (Active Shift)`,
            clockedInAt: 'Just Now'
          }
        };
      }
      return a;
    }));

    if (dtr.unitsProduced && dtr.unitsProduced > 0) {
      const units = dtr.unitsProduced;
      const hours = dtr.durationHours || 4;
      const hourlyAllowance = hours * 85;
      
      // Determine piece rate from product catalog or DTR payload
      const matchedProduct = products.find(p => p.id === (dtr as any).productId || p.name === dtr.productType);
      const pieceRate = (dtr as any).pieceRate || matchedProduct?.defaultPieceRate || 60;
      const pieceRateEarned = units * pieceRate;
      const gross = hourlyAllowance + pieceRateEarned;

      const newRecord: PayrollRecord = {
        id: `pay-${Date.now()}`,
        operatorId: 'usr-new',
        operatorName: dtr.operatorName || 'Artisan Operator',
        payPeriod: 'March 16 - March 31, 2026',
        hoursWorked: hours,
        hourlyRate: 85,
        hourlyAllowance: hourlyAllowance,
        productBreakdown: [
          {
            productId: matchedProduct?.id || 'prod-custom',
            productName: dtr.productType || matchedProduct?.name || 'Upcycled Community Craft',
            unitsProduced: units,
            pieceRate: pieceRate,
            totalEarned: pieceRateEarned
          }
        ],
        totalUnitsProduced: units,
        totalPieceRateEarnings: pieceRateEarned,
        materialsSubsidizedValue: 450,
        grossPay: gross,
        adjustmentsOrBonus: 0,
        netPayout: gross,
        status: 'draft',
        generatedDate: new Date().toISOString().split('T')[0]
      };

      setPayrolls(prev => [newRecord, ...prev]);
    }
  };

  // Asset Relocation Trigger
  const handleRelocate = (assetId: string, targetLocationId: string, reason: string) => {
    const targetLoc = mockLocations.find(l => l.id === targetLocationId);
    setAssets(prev => prev.map(a => {
      if (a.id === assetId && targetLoc) {
        return {
          ...a,
          locationId: targetLoc.id,
          locationName: targetLoc.name,
          weeklyRelocationHistory: [
            {
              date: new Date().toISOString().split('T')[0],
              from: a.locationName,
              to: targetLoc.name,
              reason
            },
            ...(a.weeklyRelocationHistory || [])
          ]
        };
      }
      return a;
    }));
  };

  // Order Status update
  const handleUpdateOrderStatus = (orderId: string, newStatus: StoreOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const operationsNav = [
    { 
      id: 'intake', 
      label: 'Membership & Intake', 
      badge: `${applications.filter(a => a.status === 'pending_review').length} Pending`,
      icon: UserPlus, 
      desc: 'Screen, approve & assign members' 
    },
    { 
      id: 'field', 
      label: 'Field Worker Tablet', 
      badge: 'Offline PWA',
      icon: Tablet, 
      desc: 'Door-to-door Pook census & audio assist' 
    },
    { 
      id: 'assets', 
      label: 'Asset Operations & DTR', 
      badge: `${assets.filter(a => a.status === 'online' || a.status === 'in_use').length} Active`,
      icon: Activity, 
      desc: 'Machine status & operator logs' 
    },
    { 
      id: 'skills', 
      label: 'Skills & Cohorts', 
      badge: `${cohorts.filter(c => c.status === 'active').length} Active`,
      icon: GraduationCap, 
      desc: 'Training matrix & machine pairing' 
    },
    { 
      id: 'supplies', 
      label: 'Supplies Inventory', 
      badge: 'Subsidized',
      icon: Package, 
      desc: 'Raw fabric & notion requests' 
    },
    { 
      id: 'orders', 
      label: 'Shopping Hub & Orders', 
      badge: `${orders.length} Queue`,
      icon: ShoppingCart, 
      desc: 'Customer order fulfillment' 
    },
    { 
      id: 'accounting', 
      label: 'Accounting & Payroll', 
      badge: `₱${payrolls.reduce((s, p) => s + p.netPayout, 0).toLocaleString()}`,
      icon: DollarSign, 
      desc: 'Artisan piece-rate statements' 
    },
  ] as const;

  const contentAndDevNav = [
    {
      id: 'cms',
      label: 'Website Content Manager',
      badge: 'Public CMS',
      icon: Globe,
      desc: 'Customize stories, mission & stats'
    },
    { 
      id: 'developer', 
      label: 'Developer & Database', 
      badge: 'Master CRUD',
      icon: Code2, 
      desc: 'Schema, tables & raw master data' 
    },
  ] as const;

  // Role-based Navigation Filtering:
  // - member_operator: uses ArtisanPortal directly (DTR, supplies, orders dashboard)
  // - admin: can navigate all except developer & database
  // - superuser: god mode, full access to all modules including developer & database
  const visibleOperationsNav = operationsNav;
  
  const visibleContentAndDevNav = contentAndDevNav.filter(item => {
    if (currentUser.role === 'admin') {
      return item.id !== 'developer'; // Admin cannot see Developer & Database
    }
    return true; // Superuser sees all
  });

  // Render AdminLogin screen if not authenticated
  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLoginSuccess={(userSession) => {
          setCurrentUser(userSession);
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  const handleSignOut = () => {
    playChime('click');
    setIsAuthenticated(false);
  };

  // If logged in as basic artisan user (member_operator):
  // Render clean dedicated Artisan DTR, Supplies & Pending Orders terminal
  if (currentUser.role === 'member_operator') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 flex flex-col transition-colors">
        {/* Artisan Top Navigation */}
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800 px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 text-white flex items-center justify-center font-black text-xl shadow-xs">
              PB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 dark:text-white">PWD BUPCA</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80">
                  Artisan Terminal
                </span>
              </div>
              <p className="text-xs text-slate-400">Daily Station DTR & Requisition Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs">
              <span className="font-bold text-slate-800 dark:text-zinc-200">{currentUser.fullName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold uppercase">
                {currentUser.username}
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition cursor-pointer"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-100 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Artisan Main Body */}
        <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <ArtisanPortal
            currentUser={currentUser}
            assets={assets}
            locations={locations}
            products={products}
            supplies={supplies}
            supplyRequests={supplyRequests}
            orders={orders}
            dtrHistory={dtrRecords}
            onClockIn={handleClockIn}
            onClockOut={(dtrId, units, hours, fabric) => {}}
            onRequestSupply={(newReq) => {
              setSupplyRequests(prev => [newReq as SupplyRequest, ...prev]);
            }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 overflow-hidden transition-colors">
      
      {/* MOBILE BACKDROP */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-zinc-900 border-r border-slate-200/80 dark:border-zinc-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}>
        
        {/* Top: Brand Header */}
        <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 text-white flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
              PB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">PWD BUPCA</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800">
                  Admin
                </span>
              </div>
              <p className="text-xs font-medium text-slate-400 dark:text-zinc-400">Command Center</p>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Middle: Categorized Navigation Links */}
        <div className="flex-1 p-3.5 space-y-5 overflow-y-auto">
          
          {/* Group 1: Operations Management */}
          <div className="space-y-1">
            <span className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Operations & Production
            </span>

            {operationsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playChime('click');
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    <div>
                      <span className="text-xs sm:text-sm block leading-tight">{item.label}</span>
                      <span className="text-[10px] text-slate-400 font-normal block mt-0.5">{item.desc}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Group 2: Publishing & Developer Tools (Role Filtered) */}
          {visibleContentAndDevNav.length > 0 && (
            <div className="space-y-1">
              <span className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Publishing & System
              </span>

              {visibleContentAndDevNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playChime('click');
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer ${
                      isActive
                        ? 'bg-slate-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                      <div>
                        <span className="text-xs sm:text-sm block leading-tight">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-normal block mt-0.5">{item.desc}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-500'
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Public Portal Shortcuts */}
          <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
            <span className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Public Portal
            </span>
            <Link
              href="/"
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800/40"
            >
              <div className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5" />
                <span>Visit Landing Page</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <Link
              href="/store"
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800/40"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Visit Public Store</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <a
              href="/documentation.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>System Docs & PDF Export</span>
              </div>
              <ExternalLink className="w-3 h-3 text-blue-500" />
            </a>
          </div>

        </div>

        {/* Bottom: Admin Profile & Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              {currentUser.fullName.split(' ').map(n => n[0]).slice(0, 2).join('') || 'AB'}
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block leading-tight truncate">
                {currentUser.fullName}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="capitalize">{currentUser.role}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-700 transition cursor-pointer"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition cursor-pointer"
              aria-label="Sign out"
              title="Sign out of Command Center"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </aside>

      {/* MAIN VIEWPORT WITH TOPBAR & CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div>
              <h1 className="font-bold text-base text-slate-900 dark:text-white leading-tight capitalize">
                {activeTab === 'cms' ? 'Website Content Manager' : activeTab === 'developer' ? 'Developer & Master Database' : activeTab.replace('_', ' ')}
              </h1>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                PWD BUPCA Inc. Operations & Monitoring Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playChime('click');
                speakText(`Viewing ${activeTab} module.`);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 text-slate-600 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Audio Cue</span>
            </button>

            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded-lg border border-rose-200/80 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-100 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'intake' && (
              <MembershipReviewHub
                applications={applications}
                assets={assets}
                onUpdateApplication={(updatedApp) => {
                  setApplications(prev => {
                    const next = prev.map(a => a.id === updatedApp.id ? updatedApp : a);
                    try {
                      localStorage.setItem('pwd_bupca_applications', JSON.stringify(next));
                    } catch (e) {}
                    return next;
                  });
                }}
              />
            )}

            {activeTab === 'assets' && (
              <AssetTracker
                assets={assets}
                locations={locations}
                products={products}
                onClockIn={handleClockIn}
                onRelocate={handleRelocate}
                onUpdateAsset={(updatedAsset) => {
                  setAssets(prev => {
                    const next = prev.map(a => a.id === updatedAsset.id ? updatedAsset : a);
                    try {
                      localStorage.setItem('pwd_bupca_assets', JSON.stringify(next));
                    } catch (e) {}
                    return next;
                  });
                }}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsTrainingMatrix
                applications={applications}
                assets={assets}
                cohorts={cohorts}
                onUpdateCohorts={(updatedCohorts) => {
                  setCohorts(updatedCohorts);
                  try {
                    localStorage.setItem('pwd_bupca_cohorts', JSON.stringify(updatedCohorts));
                  } catch (e) {}
                }}
                onUpdateAsset={(updatedAsset) => {
                  setAssets(prev => {
                    const next = prev.map(a => a.id === updatedAsset.id ? updatedAsset : a);
                    try {
                      localStorage.setItem('pwd_bupca_assets', JSON.stringify(next));
                    } catch (e) {}
                    return next;
                  });
                }}
              />
            )}

            {activeTab === 'field' && (
              <FieldWorkerTablet
                currentUser={currentUser}
                onSyncApplications={(newDrafts) => {
                  setApplications(prev => {
                    const merged = [...newDrafts, ...prev];
                    try {
                      localStorage.setItem('pwd_bupca_applications', JSON.stringify(merged));
                    } catch (e) {}
                    return merged;
                  });
                }}
              />
            )}

            {activeTab === 'supplies' && (
              <SuppliesOrdering
                supplies={supplies}
                onRequestSupply={() => {}}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersHub
                orders={orders}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            )}

            {activeTab === 'accounting' && (
              <AccountingPayroll
                payrolls={payrolls}
                products={products}
                users={users}
                onApprovePayroll={(id) => {
                  setPayrolls(payrolls.map(p => p.id === id ? { ...p, status: 'approved' } : p));
                }}
                onDisbursePayroll={(id) => {
                  setPayrolls(payrolls.map(p => p.id === id ? { ...p, status: 'disbursed' } : p));
                }}
                onAddPayrollRecord={(record) => {
                  setPayrolls(prev => [record, ...prev]);
                }}
              />
            )}

            {activeTab === 'cms' && (
              <WebsiteContentManager
                content={websiteContent}
                setContent={setWebsiteContent}
                products={products}
                setProducts={setProducts}
              />
            )}

            {activeTab === 'developer' && (
              currentUser.role === 'superuser' ? (
                <DatabaseManager
                  assets={assets}
                  setAssets={setAssets}
                  locations={locations}
                  setLocations={setLocations}
                  products={products}
                  setProducts={setProducts}
                  users={users}
                  setUsers={setUsers}
                  supplies={supplies}
                  setSupplies={setSupplies}
                  partners={partners}
                  setPartners={setPartners}
                />
              ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-rose-200 dark:border-rose-900/60 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Restricted God-Mode Module</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Developer & Master Database access is exclusively reserved for the Superuser (Aaron Christian J. Basa). Admin accounts cannot modify raw schema tables.
                  </p>
                </div>
              )
            )}
          </div>
        </main>

      </div>

    </div>
  );
}
