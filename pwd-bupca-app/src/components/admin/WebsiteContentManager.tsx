'use client';

import React, { useState } from 'react';
import { WebsiteContent } from '@/data/websiteContent';
import { StoreProduct, LivelihoodProgram, NewsItem, CommunityMember } from '@/types';
import { 
  Globe, 
  Save, 
  RotateCcw, 
  Sparkles, 
  Award, 
  Heart, 
  CheckCircle2, 
  MessageSquare,
  BarChart3,
  ExternalLink,
  ShoppingBag,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Tag,
  DollarSign,
  User,
  Scissors,
  Check
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import Link from 'next/link';

interface ContentManagerProps {
  content: WebsiteContent;
  setContent: React.Dispatch<React.SetStateAction<WebsiteContent>>;
  products: StoreProduct[];
  setProducts: React.Dispatch<React.SetStateAction<StoreProduct[]>>;
}

export const WebsiteContentManager: React.FC<ContentManagerProps> = ({
  content,
  setContent,
  products,
  setProducts
}) => {
  const { playChime, speakText } = useAccessibility();
  
  // Section Navigation Tabs
  const [activeSection, setActiveSection] = useState<'pages' | 'programs' | 'store' | 'news' | 'community'>('pages');
  
  // CMS Landing Form State
  const [formData, setFormData] = useState<WebsiteContent>(content);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Program CRUD Modal State
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [programForm, setProgramForm] = useState<{
    title: string;
    partner: string;
    description: string;
    deliverablesString: string;
    duration: string;
    capacity: number;
    activeStatus: boolean;
  }>({
    title: '',
    partner: '',
    description: '',
    deliverablesString: '',
    duration: '4 Weeks',
    capacity: 15,
    activeStatus: true
  });

  // Store Product CRUD Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Omit<StoreProduct, 'id'>>({
    name: '',
    description: '',
    price: 350,
    category: 'Upcycled Eco-Bags',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    stock: 20,
    artisanName: 'Elena Santos & Nanay Linda',
    artisanStory: 'Crafted at UP CHE Workshop. Elena is deaf-mute artisan who mastered industrial sewing.',
    materialsUsed: 'Upcycled denim remnants, 100% cotton lining, heavy duty canvas base.',
    featured: true,
    defaultPieceRate: 75
  });

  // News CRUD Modal State
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState<Omit<NewsItem, 'id' | 'slug'>>({
    title: '',
    summary: '',
    content: '',
    category: 'Milestone',
    publishedDate: new Date().toISOString().split('T')[0],
    eventDate: '',
    eventLocation: '',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    featured: false,
    author: 'PWD BUPCA Communications'
  });

  // Community Member CRUD Modal State
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState<Omit<CommunityMember, 'id'>>({
    preferredName: '',
    artisanRole: 'Industrial Lockstitch Specialist',
    determinationFocus: 'Artisan with Determination',
    bio: '',
    workshopStation: 'UP CHE Community Workshop',
    specialties: ['Lockstitch Operation', 'Denim Fabric Assembly'],
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    featuredProducts: [],
    joinedYear: '2025',
    consentSigned: true
  });
  const [specialtiesString, setSpecialtiesString] = useState('Lockstitch Operation, Denim Fabric Assembly');

  // Save General Website Content
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('success');
    setContent(formData);
    setSaveSuccess("Landing page content published successfully!");
    speakText("Website content published and updated successfully.");
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  // --- LIVELIHOOD PROGRAM CRUD HANDLERS ---
  const handleOpenCreateProgram = () => {
    playChime('click');
    setEditingProgramId(null);
    setProgramForm({
      title: '',
      partner: 'UP College of Home Economics (UP CHE)',
      description: '',
      deliverablesString: '24-Hour Supervised Machine Hours, Ergonomic Adaptations, Safety Certification',
      duration: '4 Weeks',
      capacity: 15,
      activeStatus: true
    });
    setIsProgramModalOpen(true);
  };

  const handleOpenEditProgram = (prog: LivelihoodProgram) => {
    playChime('click');
    setEditingProgramId(prog.id);
    setProgramForm({
      title: prog.title,
      partner: prog.partner,
      description: prog.description,
      deliverablesString: prog.deliverables.join(', '),
      duration: prog.duration || '4 Weeks',
      capacity: prog.capacity || 15,
      activeStatus: prog.activeStatus !== false
    });
    setIsProgramModalOpen(true);
  };

  const handleDeleteProgram = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the program: "${title}"?`)) {
      playChime('click');
      const updated = (formData.programs || []).filter(p => p.id !== id);
      const newContent = { ...formData, programs: updated };
      setFormData(newContent);
      setContent(newContent);
      setSaveSuccess(`Deleted program "${title}".`);
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('success');

    const deliverablesArray = programForm.deliverablesString
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    let updatedPrograms: LivelihoodProgram[];

    if (editingProgramId) {
      updatedPrograms = (formData.programs || []).map(p => {
        if (p.id === editingProgramId) {
          return {
            ...p,
            title: programForm.title,
            partner: programForm.partner,
            description: programForm.description,
            deliverables: deliverablesArray,
            duration: programForm.duration,
            capacity: programForm.capacity,
            activeStatus: programForm.activeStatus
          };
        }
        return p;
      });
    } else {
      const newProgram: LivelihoodProgram = {
        id: `prog-${Date.now()}`,
        title: programForm.title,
        partner: programForm.partner,
        description: programForm.description,
        deliverables: deliverablesArray,
        duration: programForm.duration,
        capacity: programForm.capacity,
        activeStatus: programForm.activeStatus
      };
      updatedPrograms = [newProgram, ...(formData.programs || [])];
    }

    const newContent = { ...formData, programs: updatedPrograms };
    setFormData(newContent);
    setContent(newContent);
    setIsProgramModalOpen(false);
    setSaveSuccess(editingProgramId ? "Program updated successfully!" : "New livelihood program added!");
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  // --- ARTISAN STORE CRUD HANDLERS ---
  const handleOpenCreateProduct = () => {
    playChime('click');
    setEditingProductId(null);
    setProductForm({
      name: '',
      description: '',
      price: 350,
      category: 'Upcycled Eco-Bags',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
      stock: 25,
      artisanName: 'Elena Santos & Nanay Linda',
      artisanStory: 'Crafted at UP CHE Workshop. Elena is deaf-mute artisan who mastered high-speed sewing machine operation.',
      materialsUsed: 'Upcycled denim offcuts, heavy duck canvas, cotton webbing.',
      featured: true,
      defaultPieceRate: 75
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: StoreProduct) => {
    playChime('click');
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      category: prod.category,
      image: prod.image,
      stock: prod.stock,
      artisanName: prod.artisanName,
      artisanStory: prod.artisanStory,
      materialsUsed: prod.materialsUsed,
      featured: prod.featured ?? false,
      defaultPieceRate: prod.defaultPieceRate || 60
    });
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from the Artisan Store Catalog?`)) {
      playChime('click');
      setProducts(prev => prev.filter(p => p.id !== id));
      setSaveSuccess(`Product "${name}" removed.`);
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('success');

    if (editingProductId) {
      setProducts(prev => prev.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            ...productForm
          };
        }
        return p;
      }));
      setSaveSuccess(`Product "${productForm.name}" updated!`);
    } else {
      const newProd: StoreProduct = {
        id: `prod-${Date.now()}`,
        ...productForm
      };
      setProducts(prev => [newProd, ...prev]);
      setSaveSuccess(`New product "${productForm.name}" published to store!`);
    }

    setIsProductModalOpen(false);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  // --- NEWS & EVENTS CRUD HANDLERS ---
  const handleOpenCreateNews = () => {
    playChime('click');
    setEditingNewsId(null);
    setNewsForm({
      title: '',
      summary: '',
      content: '',
      category: 'Milestone',
      publishedDate: new Date().toISOString().split('T')[0],
      eventDate: '',
      eventLocation: 'Barangay UP Campus, Diliman QC',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      featured: false,
      author: 'PWD BUPCA Communications'
    });
    setIsNewsModalOpen(true);
  };

  const handleOpenEditNews = (item: NewsItem) => {
    playChime('click');
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title,
      summary: item.summary,
      content: item.content,
      category: item.category,
      publishedDate: item.publishedDate,
      eventDate: item.eventDate || '',
      eventLocation: item.eventLocation || '',
      image: item.image,
      featured: item.featured ?? false,
      author: item.author
    });
    setIsNewsModalOpen(true);
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (confirm(`Delete bulletin: "${title}"?`)) {
      playChime('click');
      const updated = (formData.news || []).filter(n => n.id !== id);
      const newContent = { ...formData, news: updated };
      setFormData(newContent);
      setContent(newContent);
      setSaveSuccess(`Deleted bulletin "${title}".`);
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('success');

    let updatedNews: NewsItem[];
    const slug = newsForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (editingNewsId) {
      updatedNews = (formData.news || []).map(n => {
        if (n.id === editingNewsId) {
          return {
            ...n,
            ...newsForm,
            slug
          };
        }
        return n;
      });
    } else {
      const newItem: NewsItem = {
        id: `news-${Date.now()}`,
        ...newsForm,
        slug
      };
      updatedNews = [newItem, ...(formData.news || [])];
    }

    const newContent = { ...formData, news: updatedNews };
    setFormData(newContent);
    setContent(newContent);
    setIsNewsModalOpen(false);
    setSaveSuccess(editingNewsId ? "Bulletin updated!" : "New bulletin published!");
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  // --- COMMUNITY MEMBERS CRUD HANDLERS ---
  const handleOpenCreateMember = () => {
    playChime('click');
    setEditingMemberId(null);
    setMemberForm({
      preferredName: '',
      artisanRole: 'Industrial Lockstitch Specialist',
      determinationFocus: 'Artisan with Determination',
      bio: '',
      workshopStation: 'UP CHE Community Workshop',
      specialties: ['Lockstitch Operation', 'Precision Fabric Seaming'],
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      featuredProducts: [],
      joinedYear: '2025',
      consentSigned: true
    });
    setSpecialtiesString('Lockstitch Operation, Precision Fabric Seaming');
    setIsMemberModalOpen(true);
  };

  const handleOpenEditMember = (mem: CommunityMember) => {
    playChime('click');
    setEditingMemberId(mem.id);
    setMemberForm({
      preferredName: mem.preferredName,
      artisanRole: mem.artisanRole,
      determinationFocus: mem.determinationFocus,
      bio: mem.bio,
      workshopStation: mem.workshopStation,
      specialties: mem.specialties,
      photo: mem.photo,
      featuredProducts: mem.featuredProducts || [],
      joinedYear: mem.joinedYear,
      consentSigned: mem.consentSigned
    });
    setSpecialtiesString(mem.specialties.join(', '));
    setIsMemberModalOpen(true);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (confirm(`Remove profile of "${name}"?`)) {
      playChime('click');
      const updated = (formData.communityMembers || []).filter(m => m.id !== id);
      const newContent = { ...formData, communityMembers: updated };
      setFormData(newContent);
      setContent(newContent);
      setSaveSuccess(`Removed profile for "${name}".`);
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('success');

    const specs = specialtiesString.split(',').map(s => s.trim()).filter(Boolean);
    let updatedMembers: CommunityMember[];

    if (editingMemberId) {
      updatedMembers = (formData.communityMembers || []).map(m => {
        if (m.id === editingMemberId) {
          return {
            ...m,
            ...memberForm,
            specialties: specs
          };
        }
        return m;
      });
    } else {
      const newMember: CommunityMember = {
        id: `mem-${Date.now()}`,
        ...memberForm,
        specialties: specs
      };
      updatedMembers = [...(formData.communityMembers || []), newMember];
    }

    const newContent = { ...formData, communityMembers: updatedMembers };
    setFormData(newContent);
    setContent(newContent);
    setIsMemberModalOpen(false);
    setSaveSuccess(editingMemberId ? "Artisan profile updated!" : "New artisan profile added!");
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Website Content Manager & CMS
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full CRUD management for Landing Page Storytelling, Livelihood Training Programs, and Artisan Virtual Store.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span>Home</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/programs"
            target="_blank"
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span>Programs</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/community"
            target="_blank"
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span>Community</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/news"
            target="_blank"
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span>News</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/store"
            target="_blank"
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span>Store</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-zinc-800 pb-2 overflow-x-auto">
        <button
          onClick={() => {
            playChime('click');
            setActiveSection('pages');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
            activeSection === 'pages'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Landing Page & Storytelling</span>
        </button>

        <button
          onClick={() => {
            playChime('click');
            setActiveSection('programs');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
            activeSection === 'programs'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Livelihood Programs ({formData.programs?.length || 0})</span>
        </button>

        <button
          onClick={() => {
            playChime('click');
            setActiveSection('community');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
            activeSection === 'community'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Artisan Community ({formData.communityMembers?.length || 0})</span>
        </button>

        <button
          onClick={() => {
            playChime('click');
            setActiveSection('news');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
            activeSection === 'news'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>News & Bulletins ({formData.news?.length || 0})</span>
        </button>

        <button
          onClick={() => {
            playChime('click');
            setActiveSection('store');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
            activeSection === 'store'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Artisan Store Catalog ({products.length})</span>
        </button>
      </div>

      {/* Save Success Notice */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* TAB 1: LANDING PAGE & STORYTELLING */}
      {activeSection === 'pages' && (
        <form onSubmit={handleSaveContent} className="space-y-6">
          
          {/* SECTION 1: HERO & AWARD NOTICE */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Hero Headline & Badges</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Official Recognition Badge Notice
                </label>
                <input
                  type="text"
                  value={formData.awardNotice}
                  onChange={(e) => setFormData({ ...formData, awardNotice: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitlePrefix}
                    onChange={(e) => setFormData({ ...formData, heroTitlePrefix: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Headline Highlight (Serif Accent)
                  </label>
                  <input
                    type="text"
                    value={formData.heroHighlight}
                    onChange={(e) => setFormData({ ...formData, heroHighlight: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Hero Subheadline Narrative
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubheadline}
                  onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: MISSION & VISION */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
              <Heart className="w-4 h-4 text-rose-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Organization Mission & Vision</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Our Mission Statement
                </label>
                <textarea
                  rows={4}
                  value={formData.missionText}
                  onChange={(e) => setFormData({ ...formData, missionText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Our Long-Term Vision
                </label>
                <textarea
                  rows={4}
                  value={formData.visionText}
                  onChange={(e) => setFormData({ ...formData, visionText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: IMPACT STATS */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Public Impact Metrics</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {formData.stats.map((stat, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200/60 dark:border-zinc-700 space-y-2">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Metric Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...formData.stats];
                        newStats[idx].value = e.target.value;
                        setFormData({ ...formData, stats: newStats });
                      }}
                      className="w-full px-2 py-1 font-bold text-sm rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...formData.stats];
                        newStats[idx].label = e.target.value;
                        setFormData({ ...formData, stats: newStats });
                      }}
                      className="w-full px-2 py-1 text-xs rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: B2B PARTNERSHIP CALLOUT */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
              <Award className="w-4 h-4 text-indigo-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Institutional & Corporate Banner</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Banner Title</label>
                <input
                  type="text"
                  value={formData.partnerCalloutTitle}
                  onChange={(e) => setFormData({ ...formData, partnerCalloutTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Banner Description</label>
                <textarea
                  rows={2}
                  value={formData.partnerCalloutDesc}
                  onChange={(e) => setFormData({ ...formData, partnerCalloutDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Landing Page Changes</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 2: LIVELIHOOD PROGRAMS (FULL CRUD) */}
      {activeSection === 'programs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Vocational Training & Livelihood Programs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage curriculum, institutional academic partners, and deliverables displayed on the public <span className="font-mono text-blue-600 dark:text-blue-400">/programs</span> page.
              </p>
            </div>
            <button
              onClick={handleOpenCreateProgram}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Program</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(formData.programs || []).map((prog) => (
              <div
                key={prog.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      {prog.partner}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditProgram(prog)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                        title="Edit Program"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProgram(prog.id, prog.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Delete Program"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {prog.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Key Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.deliverables.map((item, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Duration: <strong>{prog.duration || 'Flexible'}</strong></span>
                  <span>Cap: <strong>{prog.capacity || 15} Slots</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ARTISAN STORE CATALOG (FULL CRUD) */}
      {activeSection === 'store' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Artisan Virtual Store Products
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage retail products, artisan attributions, stock inventory, and labor piece-rates shown at <span className="font-mono text-blue-600 dark:text-blue-400">/store</span>.
              </p>
            </div>
            <button
              onClick={handleOpenCreateProduct}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Store Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
                        {prod.category}
                      </span>
                    </div>
                    {prod.featured && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                        {prod.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between font-mono">
                      <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                        ₱{prod.price}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {prod.stock} in stock
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {prod.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Artisan:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                          {prod.artisanName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Labor Piece-Rate:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                          ₱{prod.defaultPieceRate || 60}/unit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-1.5 bg-slate-50/50 dark:bg-zinc-800/30">
                  <button
                    onClick={() => handleOpenEditProduct(prod)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(prod.id, prod.name)}
                    className="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ARTISAN COMMUNITY MEMBERS (FULL CRUD) */}
      {activeSection === 'community' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Artisan Community Members & Determination Profiles
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage privacy-safe artisan profiles displayed on <span className="font-mono text-blue-600 dark:text-blue-400">/community</span>. Ensure written DPA RA 10173 consent is on file.
              </p>
            </div>
            <button
              onClick={handleOpenCreateMember}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Artisan Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(formData.communityMembers || []).map((mem) => (
              <div
                key={mem.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={mem.photo}
                      alt={mem.preferredName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
                        Since {mem.joinedYear}
                      </span>
                    </div>
                    {mem.consentSigned && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-bold">
                          DPA Consent ✓
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {mem.preferredName}
                      </h4>
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block">
                        {mem.artisanRole}
                      </span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block">
                        {mem.determinationFocus}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {mem.bio}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 text-[10px] text-slate-400">
                      <span>Station: {mem.workshopStation}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-1.5 bg-slate-50/50 dark:bg-zinc-800/30">
                  <button
                    onClick={() => handleOpenEditMember(mem)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteMember(mem.id, mem.preferredName)}
                    className="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: NEWS & BULLETINS (FULL CRUD) */}
      {activeSection === 'news' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                News, Milestones & Community Bulletins
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Publish events, training announcements, and Gawad Tsanselor milestones displayed on <span className="font-mono text-blue-600 dark:text-blue-400">/news</span>.
              </p>
            </div>
            <button
              onClick={handleOpenCreateNews}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bulletin</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(formData.news || []).map((n) => (
              <div
                key={n.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold uppercase">
                        {n.category}
                      </span>
                    </div>
                    {n.featured && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Published: {n.publishedDate}
                    </span>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                      {n.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {n.summary}
                    </p>

                    {n.eventLocation && (
                      <div className="text-[10px] text-slate-400 truncate pt-1 border-t border-slate-100 dark:border-zinc-800">
                        📍 {n.eventLocation}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-1.5 bg-slate-50/50 dark:bg-zinc-800/30">
                  <button
                    onClick={() => handleOpenEditNews(n)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteNews(n.id, n.title)}
                    className="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE / EDIT LIVELIHOOD PROGRAM --- */}
      {isProgramModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingProgramId ? 'Edit Livelihood Program' : 'Add New Livelihood Program'}
              </h3>
              <button
                onClick={() => setIsProgramModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Program Title *
                </label>
                <input
                  type="text"
                  required
                  value={programForm.title}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  placeholder="e.g. Industrial Sewing Machine Mastery"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Institutional Academic Partner *
                </label>
                <input
                  type="text"
                  required
                  value={programForm.partner}
                  onChange={(e) => setProgramForm({ ...programForm, partner: e.target.value })}
                  placeholder="e.g. UP College of Home Economics (UP CHE)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Program Overview & Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  placeholder="Describe the skills and accessibility accommodations..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Key Deliverables & Competencies (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={programForm.deliverablesString}
                  onChange={(e) => setProgramForm({ ...programForm, deliverablesString: e.target.value })}
                  placeholder="e.g. 24-Hour Supervised Practice, Overlock Edging, Safety Certification"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={programForm.duration}
                    onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                    placeholder="e.g. 4 Weeks (Hands-on)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Cohort Capacity (Slots)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={programForm.capacity}
                    onChange={(e) => setProgramForm({ ...programForm, capacity: parseInt(e.target.value) || 15 })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE / EDIT STORE PRODUCT --- */}
      {isProductModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingProductId ? 'Edit Store Product' : 'Add New Artisan Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Signature Denim Tote Bag"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  >
                    <option value="Upcycled Eco-Bags">Upcycled Eco-Bags</option>
                    <option value="Fabric Baskets">Fabric Baskets</option>
                    <option value="Denim Pouches">Denim Pouches</option>
                    <option value="Upcycled Home Crafts">Upcycled Home Crafts</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Retail Price (₱) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Artisan Labor Piece-Rate (₱/unit) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={productForm.defaultPieceRate || 60}
                    onChange={(e) => setProductForm({ ...productForm, defaultPieceRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Product Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Artisan Name / Team *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.artisanName}
                    onChange={(e) => setProductForm({ ...productForm, artisanName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Materials Used *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.materialsUsed}
                    onChange={(e) => setProductForm({ ...productForm, materialsUsed: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Artisan Story & Community Note
                </label>
                <textarea
                  rows={2}
                  value={productForm.artisanStory}
                  onChange={(e) => setProductForm({ ...productForm, artisanStory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featured-checkbox" className="font-semibold text-slate-700 dark:text-slate-300">
                  Feature this item on the public landing page showcase
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Save Store Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE / EDIT COMMUNITY ARTISAN PROFILE --- */}
      {isMemberModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingMemberId ? 'Edit Artisan Profile' : 'Add New Artisan Profile'}
              </h3>
              <button
                onClick={() => setIsMemberModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Artisan Preferred Community Name *
                </label>
                <input
                  type="text"
                  required
                  value={memberForm.preferredName}
                  onChange={(e) => setMemberForm({ ...memberForm, preferredName: e.target.value })}
                  placeholder="e.g. Elena Santos & Nanay Linda"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Artisan Craft Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.artisanRole}
                    onChange={(e) => setMemberForm({ ...memberForm, artisanRole: e.target.value })}
                    placeholder="e.g. Lead Lockstitch Specialist"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Determination Celebration Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.determinationFocus}
                    onChange={(e) => setMemberForm({ ...memberForm, determinationFocus: e.target.value })}
                    placeholder="e.g. Artisan with Hearing Determination"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Workshop Station *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.workshopStation}
                    onChange={(e) => setMemberForm({ ...memberForm, workshopStation: e.target.value })}
                    placeholder="e.g. UP CHE Workshop"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Year Joined
                  </label>
                  <input
                    type="text"
                    value={memberForm.joinedYear}
                    onChange={(e) => setMemberForm({ ...memberForm, joinedYear: e.target.value })}
                    placeholder="e.g. 2023"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Artisan Photograph URL *
                </label>
                <input
                  type="url"
                  required
                  value={memberForm.photo}
                  onChange={(e) => setMemberForm({ ...memberForm, photo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Craft Specialties & Competencies (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={specialtiesString}
                  onChange={(e) => setSpecialtiesString(e.target.value)}
                  placeholder="e.g. Industrial Lockstitch, Pattern Grading, Overlock Edging"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Community Bio & Artisan Narrative *
                </label>
                <textarea
                  rows={3}
                  required
                  value={memberForm.bio}
                  onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="dpa-consent"
                  checked={memberForm.consentSigned}
                  onChange={(e) => setMemberForm({ ...memberForm, consentSigned: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="dpa-consent" className="font-semibold text-emerald-900 dark:text-emerald-200 text-xs">
                  DPA RA 10173 Informed Consent: Written authorization confirmed on file for public showcase.
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE / EDIT NEWS ITEM --- */}
      {isNewsModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingNewsId ? 'Edit News Bulletin' : 'Add News Bulletin / Event'}
              </h3>
              <button
                onClick={() => setIsNewsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="e.g. PWD BUPCA Wins UP Gawad Tsanselor 2025"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  >
                    <option value="Milestone">Milestone</option>
                    <option value="Event">Event</option>
                    <option value="Training">Training</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Advocacy">Advocacy</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Published Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newsForm.publishedDate}
                    onChange={(e) => setNewsForm({ ...newsForm, publishedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Event Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={newsForm.eventDate}
                    onChange={(e) => setNewsForm({ ...newsForm, eventDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Event Location / Venue
                  </label>
                  <input
                    type="text"
                    value={newsForm.eventLocation}
                    onChange={(e) => setNewsForm({ ...newsForm, eventLocation: e.target.value })}
                    placeholder="e.g. Alonso Hall, UP CHE"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Cover Photo URL *
                </label>
                <input
                  type="url"
                  required
                  value={newsForm.image}
                  onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Brief Summary (Card Blurb) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Article Content *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Author / Desk
                  </label>
                  <input
                    type="text"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="featured-news"
                    checked={newsForm.featured}
                    onChange={(e) => setNewsForm({ ...newsForm, featured: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="featured-news" className="font-semibold text-slate-700 dark:text-slate-300">
                    Feature on top hero
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsNewsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Publish Bulletin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
