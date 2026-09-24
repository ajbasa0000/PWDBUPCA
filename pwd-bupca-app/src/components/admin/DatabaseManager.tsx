'use client';

import React, { useState } from 'react';
import { 
  EquipmentAsset, 
  UserProfile, 
  StoreProduct, 
  WorkshopLocation, 
  SupplyItem,
  UserRole,
  DisabilityType,
  AssetStatus,
  PartnerClient,
  OrgMilestone
} from '@/types';
import { mockMilestones } from '@/data/mockData';
import { 
  Database, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Check, 
  X, 
  SlidersHorizontal,
  Wrench,
  Users,
  ShoppingBag,
  MapPin,
  Package,
  Sparkles,
  Key,
  Eye,
  EyeOff,
  Handshake,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface DatabaseManagerProps {
  assets: EquipmentAsset[];
  setAssets: React.Dispatch<React.SetStateAction<EquipmentAsset[]>>;
  locations: WorkshopLocation[];
  setLocations: React.Dispatch<React.SetStateAction<WorkshopLocation[]>>;
  products: StoreProduct[];
  setProducts: React.Dispatch<React.SetStateAction<StoreProduct[]>>;
  users: UserProfile[];
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
  supplies: SupplyItem[];
  setSupplies: React.Dispatch<React.SetStateAction<SupplyItem[]>>;
  partners: PartnerClient[];
  setPartners: React.Dispatch<React.SetStateAction<PartnerClient[]>>;
  milestones?: OrgMilestone[];
  setMilestones?: React.Dispatch<React.SetStateAction<OrgMilestone[]>>;
}

type EntityCategory = 'assets' | 'members' | 'products' | 'locations' | 'supplies' | 'partners' | 'milestones';

export const DatabaseManager: React.FC<DatabaseManagerProps> = ({
  assets,
  setAssets,
  locations,
  setLocations,
  products,
  setProducts,
  users,
  setUsers,
  supplies,
  setSupplies,
  partners,
  setPartners,
  milestones: externalMilestones,
  setMilestones: setExternalMilestones,
}) => {
  const { playChime, speakText } = useAccessibility();
  const [internalMilestones, setInternalMilestones] = useState<OrgMilestone[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pwd_bupca_milestones');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return mockMilestones;
  });

  const milestones = externalMilestones || internalMilestones;
  const setMilestones = setExternalMilestones || setInternalMilestones;

  const [activeCategory, setActiveCategory] = useState<EntityCategory>('assets');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State for Asset
  const [assetForm, setAssetForm] = useState({
    assetTag: '',
    name: '',
    category: 'Industrial High Speed Machine' as EquipmentAsset['category'],
    brand: 'JUKI INTERNATIONAL' as EquipmentAsset['brand'],
    locationId: locations[0]?.id || '',
    status: 'idle' as AssetStatus,
    specifications: '',
    lastMaintenance: '2026-03-20',
  });

  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [showModalPassword, setShowModalPassword] = useState(false);

  // Form State for Member / User
  const [userForm, setUserForm] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    role: 'member_operator' as UserRole,
    disability: 'None' as DisabilityType,
    phone: '',
  });

  // Form State for Product
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Upcycled Eco-Bags' as StoreProduct['category'],
    price: 350,
    stock: 20,
    artisanName: '',
    materialsUsed: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
  });

  // Form State for Supply
  const [supplyForm, setSupplyForm] = useState({
    name: '',
    category: 'Raw Fabrics',
    unit: 'meters',
    stock: 50,
    minThreshold: 10,
    costPerUnit: 0,
    isSubsidized: true,
  });

  // Form State for Partner / Client
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    category: 'Academic & UP Units' as PartnerClient['category'],
    logo: '/partners/UNIVERSITY OF THE PHILIPPINES.png',
    description: '',
    collaborationType: 'Training & Facilities' as PartnerClient['collaborationType'],
    websiteUrl: '',
    activeStatus: true,
  });

  // Form State for Milestone
  const [milestoneForm, setMilestoneForm] = useState({
    year: '2026',
    dateRange: 'January – June 2026',
    title: '',
    subtitle: '',
    category: 'Livelihood' as OrgMilestone['category'],
    summary: '',
    achievementsText: '',
    partnersInvolvedText: '',
    beneficiaryCount: 20,
    grossIncome: 0,
    unitsProduced: 0,
    featured: true,
  });

  // Open Create Modal
  const handleOpenCreate = () => {
    playChime('click');
    setEditingId(null);
    if (activeCategory === 'assets') {
      setAssetForm({
        assetTag: `SM-HS-2026-${Math.floor(10 + Math.random() * 90)}`,
        name: '',
        category: 'Industrial High Speed Machine',
        brand: 'JUKI INTERNATIONAL',
        locationId: locations[0]?.id || '',
        status: 'idle',
        specifications: '',
        lastMaintenance: new Date().toISOString().split('T')[0],
      });
    } else if (activeCategory === 'members') {
      setUserForm({
        fullName: '',
        username: `user_${Math.floor(10 + Math.random() * 90)}`,
        password: 'determination2026',
        email: '',
        role: 'member_operator',
        disability: 'None',
        phone: '+63 9',
      });
    } else if (activeCategory === 'products') {
      setProductForm({
        name: '',
        category: 'Upcycled Eco-Bags',
        price: 350,
        stock: 25,
        artisanName: 'PWD BUPCA Member',
        materialsUsed: 'Upcycled denim & recycled cotton',
        description: '',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
      });
    } else if (activeCategory === 'supplies') {
      setSupplyForm({
        name: '',
        category: 'Raw Fabrics',
        unit: 'meters',
        stock: 50,
        minThreshold: 10,
        costPerUnit: 0,
        isSubsidized: true,
      });
    } else if (activeCategory === 'partners') {
      setPartnerForm({
        name: '',
        category: 'Academic & UP Units',
        logo: '/partners/UNIVERSITY OF THE PHILIPPINES.png',
        description: '',
        collaborationType: 'Training & Facilities',
        websiteUrl: '',
        activeStatus: true,
      });
    } else if (activeCategory === 'milestones') {
      setMilestoneForm({
        year: '2026',
        dateRange: 'January – June 2026',
        title: '',
        subtitle: '',
        category: 'Livelihood',
        summary: '',
        achievementsText: '',
        partnersInvolvedText: '',
        beneficiaryCount: 20,
        grossIncome: 0,
        unitsProduced: 0,
        featured: true,
      });
    }
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (id: string) => {
    playChime('click');
    setEditingId(id);

    if (activeCategory === 'assets') {
      const ast = assets.find((a) => a.id === id);
      if (ast) {
        setAssetForm({
          assetTag: ast.assetTag,
          name: ast.name,
          category: ast.category,
          brand: ast.brand || 'JUKI INTERNATIONAL',
          locationId: ast.locationId,
          status: ast.status,
          specifications: ast.specifications,
          lastMaintenance: ast.lastMaintenance,
        });
      }
    } else if (activeCategory === 'members') {
      const u = users.find((item) => item.id === id);
      if (u) {
        setUserForm({
          fullName: u.fullName,
          username: u.username || '',
          password: u.password || 'determination2026',
          email: u.email || '',
          role: u.role,
          disability: u.disability,
          phone: u.phone,
        });
      }
    } else if (activeCategory === 'products') {
      const p = products.find((prod) => prod.id === id);
      if (p) {
        setProductForm({
          name: p.name,
          category: p.category,
          price: p.price,
          stock: p.stock,
          artisanName: p.artisanName,
          materialsUsed: p.materialsUsed,
          description: p.description,
          image: p.image,
        });
      }
    } else if (activeCategory === 'supplies') {
      const s = supplies.find((item) => item.id === id);
      if (s) {
        setSupplyForm({
          name: s.name,
          category: s.category,
          unit: s.unit,
          stock: s.stock,
          minThreshold: s.minThreshold,
          costPerUnit: s.costPerUnit,
          isSubsidized: s.isSubsidized,
        });
      }
    } else if (activeCategory === 'partners') {
      const part = partners.find((p) => p.id === id);
      if (part) {
        setPartnerForm({
          name: part.name,
          category: part.category,
          logo: part.logo,
          description: part.description || '',
          collaborationType: part.collaborationType,
          websiteUrl: part.websiteUrl || '',
          activeStatus: part.activeStatus,
        });
      }
    } else if (activeCategory === 'milestones') {
      const mls = milestones.find((m) => m.id === id);
      if (mls) {
        setMilestoneForm({
          year: mls.year,
          dateRange: mls.dateRange,
          title: mls.title,
          subtitle: mls.subtitle || '',
          category: mls.category,
          summary: mls.summary,
          achievementsText: mls.achievements ? mls.achievements.join('\n') : '',
          partnersInvolvedText: mls.partnersInvolved ? mls.partnersInvolved.join(', ') : '',
          beneficiaryCount: mls.beneficiaryCount || 0,
          grossIncome: mls.grossIncome || 0,
          unitsProduced: mls.unitsProduced || 0,
          featured: mls.featured ?? true,
        });
      }
    }
    setIsModalOpen(true);
  };

  // Delete Action
  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    playChime('alert');

    if (activeCategory === 'assets') {
      setAssets((prev) => prev.filter((a) => a.id !== id));
    } else if (activeCategory === 'members') {
      setUsers((prev) => {
        const updated = prev.filter((u) => u.id !== id);
        try {
          localStorage.setItem('pwd_bupca_users', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } else if (activeCategory === 'products') {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else if (activeCategory === 'supplies') {
      setSupplies((prev) => prev.filter((s) => s.id !== id));
    } else if (activeCategory === 'partners') {
      setPartners((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        try {
          localStorage.setItem('pwd_bupca_partners', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } else if (activeCategory === 'milestones') {
      setMilestones((prev) => {
        const updated = prev.filter((m) => m.id !== id);
        try {
          localStorage.setItem('pwd_bupca_milestones', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
    speakText(`Deleted ${name}`);
  };

  // Submit Form (Save or Update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('success');

    if (activeCategory === 'assets') {
      const targetLocation = locations.find((l) => l.id === assetForm.locationId);
      if (editingId) {
        setAssets((prev) =>
          prev.map((a) =>
            a.id === editingId
              ? {
                  ...a,
                  ...assetForm,
                  locationName: targetLocation?.name || a.locationName,
                }
              : a
          )
        );
      } else {
        const newAsset: EquipmentAsset = {
          id: `ast-${Date.now()}`,
          ...assetForm,
          locationName: targetLocation?.name || 'Assigned Workshop',
        };
        setAssets((prev) => [newAsset, ...prev]);
      }
    } else if (activeCategory === 'members') {
      if (editingId) {
        setUsers((prev) => {
          const updated = prev.map((u) => (u.id === editingId ? { ...u, ...userForm } : u));
          try {
            localStorage.setItem('pwd_bupca_users', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      } else {
        const newUser: UserProfile = {
          id: `usr-${Date.now()}`,
          ...userForm,
        };
        setUsers((prev) => {
          const updated = [newUser, ...prev];
          try {
            localStorage.setItem('pwd_bupca_users', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      }
    } else if (activeCategory === 'products') {
      if (editingId) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  ...productForm,
                  artisanStory: `${productForm.artisanName} crafts this piece at UP Diliman workshops.`,
                }
              : p
          )
        );
      } else {
        const newProduct: StoreProduct = {
          id: `prod-${Date.now()}`,
          ...productForm,
          artisanStory: `${productForm.artisanName} crafts this piece at UP Diliman workshops.`,
        };
        setProducts((prev) => [newProduct, ...prev]);
      }
    } else if (activeCategory === 'supplies') {
      if (editingId) {
        setSupplies((prev) =>
          prev.map((s) => (s.id === editingId ? { ...s, ...supplyForm } : s))
        );
      } else {
        const newSupply: SupplyItem = {
          id: `sup-${Date.now()}`,
          ...supplyForm,
        };
        setSupplies((prev) => [newSupply, ...prev]);
      }
    } else if (activeCategory === 'partners') {
      if (editingId) {
        setPartners((prev) => {
          const updated = prev.map((p) => (p.id === editingId ? { ...p, ...partnerForm } : p));
          try {
            localStorage.setItem('pwd_bupca_partners', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      } else {
        const newPartner: PartnerClient = {
          id: `part-${Date.now()}`,
          ...partnerForm,
        };
        setPartners((prev) => {
          const updated = [newPartner, ...prev];
          try {
            localStorage.setItem('pwd_bupca_partners', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      }
    } else if (activeCategory === 'milestones') {
      const achievements = milestoneForm.achievementsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const partnersInvolved = milestoneForm.partnersInvolvedText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      if (editingId) {
        setMilestones((prev) => {
          const updated = prev.map((m) =>
            m.id === editingId
              ? {
                  ...m,
                  year: milestoneForm.year,
                  dateRange: milestoneForm.dateRange,
                  title: milestoneForm.title,
                  subtitle: milestoneForm.subtitle || undefined,
                  category: milestoneForm.category,
                  summary: milestoneForm.summary,
                  achievements,
                  partnersInvolved,
                  beneficiaryCount: milestoneForm.beneficiaryCount || undefined,
                  grossIncome: milestoneForm.grossIncome || undefined,
                  unitsProduced: milestoneForm.unitsProduced || undefined,
                  featured: milestoneForm.featured,
                }
              : m
          );
          try {
            localStorage.setItem('pwd_bupca_milestones', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      } else {
        const newMilestone: OrgMilestone = {
          id: `mls-${Date.now()}`,
          year: milestoneForm.year,
          dateRange: milestoneForm.dateRange,
          title: milestoneForm.title,
          subtitle: milestoneForm.subtitle || undefined,
          category: milestoneForm.category,
          summary: milestoneForm.summary,
          achievements,
          partnersInvolved,
          beneficiaryCount: milestoneForm.beneficiaryCount || undefined,
          grossIncome: milestoneForm.grossIncome || undefined,
          unitsProduced: milestoneForm.unitsProduced || undefined,
          featured: milestoneForm.featured,
        };
        setMilestones((prev) => {
          const updated = [newMilestone, ...prev];
          try {
            localStorage.setItem('pwd_bupca_milestones', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      }
    }

    setIsModalOpen(false);
    speakText(`Saved successfully.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Category Selector */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Database & Master Records Manager
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full CRUD configuration for machinery, staff/members, store catalog, supplies, partners & clients, and milestones.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs cursor-pointer transition self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New {activeCategory === 'partners' ? 'Partner/Client' : activeCategory === 'milestones' ? 'Milestone' : activeCategory.slice(0, -1).toUpperCase()}</span>
        </button>
      </div>

      {/* Category Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'assets', label: `Assets (${assets.length})`, icon: Wrench },
            { id: 'members', label: `Members & Users (${users.length})`, icon: Users },
            { id: 'products', label: `Store Catalog (${products.length})`, icon: ShoppingBag },
            { id: 'supplies', label: `Supplies Stock (${supplies.length})`, icon: Package },
            { id: 'partners', label: `Partners & Clients (${partners.length})`, icon: Handshake },
            { id: 'milestones', label: `Milestones (${milestones.length})`, icon: Calendar },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playChime('click');
                  setActiveCategory(cat.id as EntityCategory);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                    : 'bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeCategory}...`}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* DATA TABLE BY CATEGORY */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs overflow-hidden">
        
        {/* 1. ASSETS TABLE */}
        {activeCategory === 'assets' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Asset Tag</th>
                  <th className="py-2.5 px-3">Equipment Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Workshop Location</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {assets
                  .filter((a) =>
                    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    a.assetTag.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((ast) => (
                    <tr key={ast.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-2.5 px-3 font-mono font-semibold text-blue-600 dark:text-blue-400">
                        {ast.assetTag}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                        {ast.name}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{ast.category}</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{ast.locationName}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          ast.status === 'online' || ast.status === 'in_use'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : ast.status === 'idle'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {ast.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(ast.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                            title="Edit Asset"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(ast.id, ast.name)}
                            className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 cursor-pointer"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. MEMBERS & USERS TABLE */}
        {activeCategory === 'members' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Full Name</th>
                  <th className="py-2.5 px-3">Username</th>
                  <th className="py-2.5 px-3">Password</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Disability Group</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {users
                  .filter((u) =>
                    u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (u.username && u.username.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                        {u.fullName}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {u.username || <span className="text-slate-400 font-normal italic">not set</span>}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-zinc-700 w-fit">
                          <span>
                            {visiblePasswords[u.id] ? (u.password || 'determination2026') : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setVisiblePasswords(prev => ({ ...prev, [u.id]: !prev[u.id] }))}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            title={visiblePasswords[u.id] ? "Hide password" : "Show password"}
                          >
                            {visiblePasswords[u.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          u.role === 'superuser'
                            ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                            : u.role === 'admin'
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{u.disability}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{u.phone}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(u.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 cursor-pointer"
                            title="Edit Member"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(u.id, u.fullName)}
                            className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 cursor-pointer"
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. STORE PRODUCTS TABLE */}
        {activeCategory === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Artisan</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Inventory</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {products
                  .filter((p) =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.artisanName.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-zinc-700"
                        />
                        <span>{prod.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{prod.category}</td>
                      <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{prod.artisanName}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">₱{prod.price}</td>
                      <td className="py-2.5 px-3 font-mono">{prod.stock} in stock</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(prod.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id, prod.name)}
                            className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. SUPPLIES INVENTORY TABLE */}
        {activeCategory === 'supplies' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Item Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Current Stock</th>
                  <th className="py-2.5 px-3">Min Threshold</th>
                  <th className="py-2.5 px-3">Subsidy</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {supplies
                  .filter((s) =>
                    s.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((sup) => (
                    <tr key={sup.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                        {sup.name}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{sup.category}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                        {sup.stock} {sup.unit}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{sup.minThreshold} {sup.unit}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          100% Subsidized
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(sup.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 cursor-pointer"
                            title="Edit Supply"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(sup.id, sup.name)}
                            className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 cursor-pointer"
                            title="Delete Supply"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. PARTNERS & CLIENTS TABLE */}
        {activeCategory === 'partners' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Organization / Client</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Collaboration / Engagement</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {partners
                  .filter((p) =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.collaborationType.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((part) => (
                    <tr key={part.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white p-1 border border-slate-200 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-xs">
                          <img
                            src={part.logo}
                            alt={part.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              // Fallback on broken image
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate max-w-[200px] sm:max-w-xs">{part.name}</span>
                            {part.websiteUrl && (
                              <a
                                href={part.websiteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-blue-600 transition"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal line-clamp-1">
                            {part.description}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300">
                          {part.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {part.collaborationType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            part.activeStatus
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${part.activeStatus ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                          {part.activeStatus ? 'Active Partner' : 'Archived'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(part.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 cursor-pointer"
                            title="Edit Partner/Client"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(part.id, part.name)}
                            className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 cursor-pointer"
                            title="Delete Partner/Client"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 6. MILESTONES TABLE */}
        {activeCategory === 'milestones' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Year & Milestone</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Revenue / Output</th>
                  <th className="py-2.5 px-3">Beneficiaries</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {milestones
                  .filter((m) =>
                    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    m.year.includes(searchQuery) ||
                    m.category.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((mls) => (
                    <tr key={mls.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                            {mls.year}
                          </span>
                          <span className="truncate max-w-[200px] sm:max-w-xs">{mls.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block truncate mt-0.5">
                          {mls.dateRange} • {mls.summary}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300">
                          {mls.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {mls.grossIncome ? (
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            ₱{mls.grossIncome.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11px]">—</span>
                        )}
                        {mls.unitsProduced ? (
                          <span className="text-[10px] text-slate-400 block">{mls.unitsProduced} units</span>
                        ) : null}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-300">
                        {mls.beneficiaryCount ? `${mls.beneficiaryCount} artisans` : '—'}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(mls.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 cursor-pointer"
                            title="Edit Milestone"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(mls.id, mls.title)}
                            className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 cursor-pointer"
                            title="Delete Milestone"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* CRUD MODAL FORM */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white capitalize">
                {editingId ? 'Edit' : 'Create New'} {activeCategory.slice(0, -1)}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-3.5 text-xs">
              
              {/* ASSET FORM FIELDS */}
              {activeCategory === 'assets' && (
                <>
                  <div>
                    <label className="block font-medium mb-1">Asset Tag *</label>
                    <input
                      type="text"
                      required
                      value={assetForm.assetTag}
                      onChange={(e) => setAssetForm({ ...assetForm, assetTag: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Equipment Name *</label>
                    <input
                      type="text"
                      required
                      value={assetForm.name}
                      onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
                      placeholder="e.g. Juki High-Speed Industrial Lockstitch #3"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Category</label>
                      <select
                        value={assetForm.category}
                        onChange={(e) => setAssetForm({ ...assetForm, category: e.target.value as EquipmentAsset['category'] })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      >
                        <option value="Industrial High Speed Machine">Industrial High Speed Machine</option>
                        <option value="Industrial Edging Machine">Industrial Edging Machine</option>
                        <option value="Portable Sewing Machine">Portable Sewing Machine</option>
                        <option value="Old Sewing Machine">Old Sewing Machine (Lola Makina)</option>
                        <option value="Heavy Cutting Table">Heavy Cutting Table</option>
                        <option value="Heat Press">Heat Press</option>
                        <option value="Crafting Station">Crafting Station</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Brand</label>
                      <select
                        value={assetForm.brand}
                        onChange={(e) => setAssetForm({ ...assetForm, brand: e.target.value as EquipmentAsset['brand'] })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      >
                        <option value="JUKI INTERNATIONAL">JUKI INTERNATIONAL</option>
                        <option value="SIRUBA">SIRUBA</option>
                        <option value="SINGER">SINGER</option>
                        <option value="CHINA">CHINA</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Stationed Workshop Location</label>
                    <select
                      value={assetForm.locationId}
                      onChange={(e) => setAssetForm({ ...assetForm, locationId: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    >
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Operational Status</label>
                    <select
                      value={assetForm.status}
                      onChange={(e) => setAssetForm({ ...assetForm, status: e.target.value as AssetStatus })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    >
                      <option value="online">Online / In Production</option>
                      <option value="idle">Idle / Standby</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Technical Specifications</label>
                    <textarea
                      rows={2}
                      value={assetForm.specifications}
                      onChange={(e) => setAssetForm({ ...assetForm, specifications: e.target.value })}
                      placeholder="e.g. Servo direct-drive with ergonomic knee lifter"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                </>
              )}

              {/* MEMBERS & USER FORM */}
              {activeCategory === 'members' && (
                <>
                  <div>
                    <label className="block font-medium mb-1">Member Full Name *</label>
                    <input
                      type="text"
                      required
                      value={userForm.fullName}
                      onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })}
                      placeholder="e.g. Carlos Mendoza"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Username / Identifier *</label>
                      <input
                        type="text"
                        required
                        value={userForm.username}
                        onChange={(e) => setUserForm({ ...userForm, username: e.target.value.toLowerCase() })}
                        placeholder="e.g. user1 or grootadmin"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        placeholder="e.g. user1@pwd-bupca.org"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">System Role</label>
                      <select
                        value={userForm.role}
                        onChange={(e) => setUserForm({ ...userForm, role: e.target.value as UserRole })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      >
                        <option value="member_operator">Member Operator (Artisan)</option>
                        <option value="admin">Admin / Workshop Supervisor</option>
                        <option value="superuser">Superuser / Executive</option>
                        <option value="customer">Customer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium mb-1 flex items-center justify-between">
                        <span>Password *</span>
                        <button
                          type="button"
                          onClick={() => setShowModalPassword(!showModalPassword)}
                          className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {showModalPassword ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                          {showModalPassword ? 'Hide' : 'Show'}
                        </button>
                      </label>
                      <div className="relative">
                        <input
                          type={showModalPassword ? "text" : "password"}
                          required
                          value={userForm.password}
                          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                          placeholder="e.g. determination2026"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-xs pr-8"
                        />
                        <Key className="w-3.5 h-3.5 absolute right-2.5 top-3 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Disability Classification</label>
                    <select
                      value={userForm.disability}
                      onChange={(e) => setUserForm({ ...userForm, disability: e.target.value as DisabilityType })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    >
                      <option value="Hearing">Hearing Impaired</option>
                      <option value="Visual">Visual Impairment</option>
                      <option value="Physical/Motor">Physical / Mobility Impaired</option>
                      <option value="Speech">Speech Impaired</option>
                      <option value="Cognitive/Neurodivergent">Cognitive / Neurodivergent</option>
                      <option value="None">None / Ally Staff</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={userForm.phone}
                      onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                      placeholder="+63 9..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                </>
              )}

              {/* PRODUCT FORM */}
              {activeCategory === 'products' && (
                <>
                  <div>
                    <label className="block font-medium mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. Upcycled Denim Lunch Tote"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Price (₱) *</label>
                      <input
                        type="number"
                        required
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Stock Quota</label>
                      <input
                        type="number"
                        required
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Artisan Attribution</label>
                    <input
                      type="text"
                      required
                      value={productForm.artisanName}
                      onChange={(e) => setProductForm({ ...productForm, artisanName: e.target.value })}
                      placeholder="e.g. Nanay Linda & Elena Santos"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Sustainable Materials</label>
                    <input
                      type="text"
                      value={productForm.materialsUsed}
                      onChange={(e) => setProductForm({ ...productForm, materialsUsed: e.target.value })}
                      placeholder="e.g. Upcycled jeans and cotton lining"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Product Description</label>
                    <textarea
                      rows={2}
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                </>
              )}

              {/* SUPPLY FORM */}
              {activeCategory === 'supplies' && (
                <>
                  <div>
                    <label className="block font-medium mb-1">Supply Item Name *</label>
                    <input
                      type="text"
                      required
                      value={supplyForm.name}
                      onChange={(e) => setSupplyForm({ ...supplyForm, name: e.target.value })}
                      placeholder="e.g. Heavy Duty Thread (Beige)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Category</label>
                      <input
                        type="text"
                        value={supplyForm.category}
                        onChange={(e) => setSupplyForm({ ...supplyForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Unit of Measure</label>
                      <input
                        type="text"
                        value={supplyForm.unit}
                        onChange={(e) => setSupplyForm({ ...supplyForm, unit: e.target.value })}
                        placeholder="meters, spools, pcs"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Current Stock *</label>
                      <input
                        type="number"
                        required
                        value={supplyForm.stock}
                        onChange={(e) => setSupplyForm({ ...supplyForm, stock: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Alert Threshold</label>
                      <input
                        type="number"
                        value={supplyForm.minThreshold}
                        onChange={(e) => setSupplyForm({ ...supplyForm, minThreshold: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* PARTNER / CLIENT FORM */}
              {activeCategory === 'partners' && (
                <>
                  <div>
                    <label className="block font-medium mb-1">Organization / Partner Name *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      placeholder="e.g. Quezon City PDAO, BPI Foundation, UP ISSI"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Sector / Category</label>
                      <select
                        value={partnerForm.category}
                        onChange={(e) =>
                          setPartnerForm({
                            ...partnerForm,
                            category: e.target.value as PartnerClient['category'],
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      >
                        <option value="Academic & UP Units">Academic & UP Units</option>
                        <option value="Government & City Units">Government & City Units</option>
                        <option value="Corporate & Banking">Corporate & Banking</option>
                        <option value="NGO & Civil Society">NGO & Civil Society</option>
                        <option value="Community & Fraternal">Community & Fraternal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Collaboration Type</label>
                      <select
                        value={partnerForm.collaborationType}
                        onChange={(e) =>
                          setPartnerForm({
                            ...partnerForm,
                            collaborationType: e.target.value as PartnerClient['collaborationType'],
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      >
                        <option value="Institutional Partner">Institutional Partner</option>
                        <option value="LGU & Government Sponsor">LGU & Government Sponsor</option>
                        <option value="Corporate Client / Patron">Corporate Client / Patron</option>
                        <option value="Training & Facilities">Training & Facilities</option>
                        <option value="Advocacy & Community">Advocacy & Community</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Logo Path or Image URL *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.logo}
                      onChange={(e) => setPartnerForm({ ...partnerForm, logo: e.target.value })}
                      placeholder="/partners/UNIVERSITY OF THE PHILIPPINES.png"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-[11px]"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Path in /public/partners or remote HTTPS image URL.
                    </p>
                  </div>

                  {/* Logo Preview */}
                  {partnerForm.logo && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700">
                      <div className="w-12 h-12 bg-white rounded-md p-1 border border-slate-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                        <img
                          src={partnerForm.logo}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 truncate">
                        Preview: {partnerForm.name || 'Untitled Organization'}
                      </span>
                    </div>
                  )}

                  <div>
                    <label className="block font-medium mb-1">Website URL (Optional)</label>
                    <input
                      type="url"
                      value={partnerForm.websiteUrl}
                      onChange={(e) => setPartnerForm({ ...partnerForm, websiteUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Engagement Description</label>
                    <textarea
                      rows={2}
                      value={partnerForm.description}
                      onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })}
                      placeholder="Summary of partnership, sponsorships, or orders placed..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="partnerActiveStatus"
                      checked={partnerForm.activeStatus}
                      onChange={(e) => setPartnerForm({ ...partnerForm, activeStatus: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="partnerActiveStatus" className="text-slate-700 dark:text-slate-300 font-medium">
                      Active Partner / Client (Shown on website)
                    </label>
                  </div>
                </>
              )}

              {/* MILESTONE FORM */}
              {activeCategory === 'milestones' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Year *</label>
                      <input
                        type="text"
                        required
                        value={milestoneForm.year}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, year: e.target.value })}
                        placeholder="2026"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Date Range *</label>
                      <input
                        type="text"
                        required
                        value={milestoneForm.dateRange}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, dateRange: e.target.value })}
                        placeholder="January – June 2026"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Milestone Title *</label>
                    <input
                      type="text"
                      required
                      value={milestoneForm.title}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                      placeholder="e.g. Amber's & BPI Corporate Orders Milestone"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Subtitle / Tagline (Optional)</label>
                    <input
                      type="text"
                      value={milestoneForm.subtitle}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, subtitle: e.target.value })}
                      placeholder="e.g. Mass Production for Major Enterprises & Uniform Upcycling"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Category</label>
                      <select
                        value={milestoneForm.category}
                        onChange={(e) =>
                          setMilestoneForm({
                            ...milestoneForm,
                            category: e.target.value as OrgMilestone['category'],
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      >
                        <option value="Livelihood">Livelihood</option>
                        <option value="Enterprise">Enterprise</option>
                        <option value="Institutional">Institutional</option>
                        <option value="Renovation">Renovation</option>
                        <option value="Disaster Response">Disaster Response</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Gross Revenue (₱)</label>
                      <input
                        type="number"
                        value={milestoneForm.grossIncome}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, grossIncome: parseFloat(e.target.value) || 0 })}
                        placeholder="0"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Beneficiary Count</label>
                      <input
                        type="number"
                        value={milestoneForm.beneficiaryCount}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, beneficiaryCount: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Units Produced</label>
                      <input
                        type="number"
                        value={milestoneForm.unitsProduced}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, unitsProduced: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Summary Description *</label>
                    <textarea
                      rows={2}
                      required
                      value={milestoneForm.summary}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, summary: e.target.value })}
                      placeholder="Brief narrative of the milestone and its community impact..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Key Outcomes / Achievements (1 per line)</label>
                    <textarea
                      rows={2}
                      value={milestoneForm.achievementsText}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, achievementsText: e.target.value })}
                      placeholder="Generated ₱85,000 gross revenue&#10;Rescued 8 sacks of discarded fabric"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Partners Involved (Comma separated)</label>
                    <input
                      type="text"
                      value={milestoneForm.partnersInvolvedText}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, partnersInvolvedText: e.target.value })}
                      placeholder="Bank of the Philippine Islands, UP CHE, Amber's"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="milestoneFeatured"
                      checked={milestoneForm.featured}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, featured: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="milestoneFeatured" className="text-slate-700 dark:text-slate-300 font-medium">
                      Featured Milestone (Prominently displayed)
                    </label>
                  </div>
                </>
              )}

              <div className="flex gap-2.5 pt-3 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
