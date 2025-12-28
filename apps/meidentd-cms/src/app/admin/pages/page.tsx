'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, Plus, Globe, Loader2, FileText, Trash2, 
  AlertTriangle, X, Type, Search, LayoutTemplate, 
  Terminal, ShieldAlert, ChevronRight, Hash
} from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
}

function DeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  pageTitle, 
  isDeleting 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  pageTitle: string; 
  isDeleting: boolean; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-[#0f1629] border border-red-500/30 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.15)]"
      >
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />
        
        <div className="p-8 pb-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <ShieldAlert size={32} />
          </div>
          
          <h3 className="text-xl font-display font-bold text-white mb-2 tracking-wide">CONFIRM DELETION</h3>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            You are initiating a destructive protocol on <span className="text-red-400 font-mono bg-red-500/10 px-1 rounded">{pageTitle}</span>. 
          </p>
        </div>

        <div className="px-8 pb-6">
          <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-4 text-left">
            <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Irreversible Action</p>
                    <p className="text-xs text-red-200/70 leading-relaxed">
                    Target data structure and associated sub-routines (images, content blocks) will be permanently purged from the mainframe.
                    </p>
                </div>
            </div>
          </div>
        </div>

        <div className="flex border-t border-white/5 bg-black/20">
          <button 
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-4 text-slate-400 font-mono text-xs hover:text-white hover:bg-white/5 transition-colors border-r border-white/5"
          >
            CANCEL_PROTOCOL
          </button>
          <button 
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-4 text-red-400 font-mono text-xs font-bold hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center justify-center gap-2"
          >
            {isDeleting ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
            <span>EXECUTE_DELETE</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ManagePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPages = useCallback(async () => {
    if (pages.length === 0) setLoading(true);
    try {
      const res = await fetch('/api/pages', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch pages');
      const data = await res.json();
      setPages(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [pages.length]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, slug: newSlug }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create page');
      }
      
      setNewTitle('');
      setNewSlug('');
      fetchPages();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePage = async () => {
    if (!pageToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/pages/${pageToDelete.slug}`, { method: 'DELETE' });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Server returned ${res.status}`);
      }

      setPages((prev) => prev.filter((p) => p.id !== pageToDelete.id));
      setPageToDelete(null);
    } catch (err) {
      alert(`Error deleting page: ${(err as Error).message}`);
    } finally {
      setIsDeleting(false);
    }
  };
  
  useEffect(() => {
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') 
      .replace(/^-+|-+$/g, '');
    setNewSlug(generatedSlug);
  }, [newTitle]);


  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Struct Control</h1>
          <p className="text-slate-400 mt-2 font-light">Initialize new vectors or modify existing page schemas.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Terminal size={12} />
            <span>WRITE_ACCESS: GRANTED</span>
        </div>
      </div>
      
      <div className="relative group rounded-2xl bg-[#0b1120]/40 border border-white/5 overflow-hidden transition-all hover:border-blue-500/30">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
        
        <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-500/20 rounded text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <Plus size={16} />
            </div>
            <h3 className="font-bold text-slate-200 text-sm tracking-wide uppercase font-mono">Initialize New Page</h3>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <form onSubmit={handleCreatePage} className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
            
            <div className="w-full lg:flex-1 space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider ml-1">Display Title</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Type size={16} className="text-slate-600 group-focus-within/input:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Mission Overview"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#0f1629] border border-white/10 rounded-lg focus:bg-blue-900/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all text-white placeholder-slate-600 text-sm font-sans"
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider ml-1">Access Vector (Slug)</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash size={16} className="text-slate-600 group-focus-within/input:text-emerald-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="mission-overview"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#0f1629] border border-white/10 rounded-lg focus:bg-emerald-900/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-mono text-sm text-slate-300 placeholder-slate-600"
                />
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`
                  w-full lg:w-auto px-6 py-3 rounded-lg font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300
                  ${isSubmitting 
                    ? 'bg-slate-700 cursor-wait opacity-50' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/20'
                  }
                `}
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} strokeWidth={3} />}
                <span className="font-mono text-xs uppercase tracking-wider">Deploy</span>
              </button>
            </div>
          </form>

          <AnimatePresence>
            {error && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-300 text-sm"
                >
                    <AlertTriangle size={16} className="mr-2 flex-shrink-0 text-red-500" />
                    {error}
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col min-h-[400px]">
        <div className="px-2 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutTemplate size={20} className="text-blue-500" />
            <h2 className="font-bold text-lg text-white tracking-tight">Active Directories</h2>
            <div className="flex items-center justify-center px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-mono font-bold min-w-[24px]">
              {pages.length}
            </div>
          </div>
        </div>

        {loading && pages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 bg-[#0f1629]/30 rounded-2xl border border-white/5 border-dashed">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-blue-500 font-mono">
                    <Loader2 size={16} className="animate-spin" />
                </div>
            </div>
            <p className="text-slate-500 text-xs font-mono mt-4 uppercase tracking-widest animate-pulse">Scanning database...</p>
          </div>
        ) : (
          <div className="grid gap-3">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white/5 rounded-lg border border-white/5 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                <div className="col-span-5">Identity</div>
                <div className="col-span-4">Public Uplink</div>
                <div className="col-span-3 text-right">Protocols</div>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode='popLayout'>
                    {pages.map((page, index) => (
                    <motion.div 
                        key={page.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                        exit={{ opacity: 0, x: 20 }}
                        className="group relative md:grid md:grid-cols-12 md:gap-4 md:items-center bg-[#161f36]/40 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 rounded-xl p-4 transition-all duration-300 hover:bg-[#161f36]/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                    >
                        <div className="col-span-5 flex items-center mb-3 md:mb-0">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-slate-400 flex items-center justify-center mr-4 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-200 group-hover:text-white transition-colors">
                                {page.title}
                                </p>
                                <p className="text-[10px] font-mono text-slate-600 hidden md:block">
                                ID: <span className="text-slate-500">{page.id.substring(0, 8)}...</span>
                                </p>
                            </div>
                        </div>

                        <div className="col-span-4 mb-4 md:mb-0">
                            <a 
                                href={`/${page.slug}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 border border-white/5 text-slate-400 text-xs font-mono hover:text-blue-400 hover:border-blue-500/30 transition-all group/link w-full md:w-auto"
                            >
                                <Globe size={12} className="opacity-50 group-hover/link:opacity-100" />
                                <span className="truncate max-w-[150px]">/{page.slug}</span>
                                <ChevronRight size={10} className="ml-auto opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                            </a>
                        </div>

                        <div className="col-span-3 flex justify-end items-center gap-3 border-t border-white/5 pt-3 md:border-0 md:pt-0">
                            <Link 
                                href={`/admin/pages/edit/${page.slug}`}
                                className="flex items-center px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold font-mono border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
                            >
                                <Edit size={12} className="mr-2" />
                                EDIT
                            </Link>
                            
                            <button
                                onClick={() => setPageToDelete(page)}
                                className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Delete Page"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </motion.div>
                    ))}
                </AnimatePresence>

                {pages.length === 0 && (
                  <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/[0.02]">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4 text-slate-600">
                        <Search size={24} />
                      </div>
                      <p className="text-slate-300 font-medium">System Empty</p>
                      <p className="text-slate-500 text-sm mt-1">Initialize your first structure above.</p>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {pageToDelete && (
            <DeleteModal 
                isOpen={!!pageToDelete}
                onClose={() => setPageToDelete(null)}
                onConfirm={handleDeletePage}
                pageTitle={pageToDelete?.title || ''}
                isDeleting={isDeleting}
            />
        )}
      </AnimatePresence>
    </div>
  );
}