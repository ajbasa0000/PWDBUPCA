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
  AssetStatus
} from '@/types';
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
  Sparkles
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
}

type EntityCategory = 'assets' | 'members' | 'products' | 'locations' | 'supplies';

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
}) => {
  const { playChime, speakText } = useAccessibility();
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

  // Form State for Member / User
  const [userForm, setUserForm] = useState({
    fullName: '',
    username: '',
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
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else if (activeCategory === 'products') {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else if (activeCategory === 'supplies') {
      setSupplies((prev) => prev.filter((s) => s.id !== id));
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
        setUsers((prev) =>
          prev.map((u) => (u.id === editingId ? { ...u, ...userForm } : u))
        );
      } else {
        const newUser: UserProfile = {
          id: `usr-${Date.now()}`,
          ...userForm,
        };
        setUsers((prev) => [newUser, ...prev]);
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
            Full CRUD configuration for machinery, staff/members, store catalog, and supplies.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs cursor-pointer transition self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New {activeCategory.slice(0, -1).toUpperCase()}</span>
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
