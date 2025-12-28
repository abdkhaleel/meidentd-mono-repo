'use client';

import { useState } from 'react';
import { Plus, Type, ListOrdered, AlertTriangle, Layers, Loader2, Database, CornerDownRight, Terminal } from 'lucide-react';

import { KhaleelEditor } from 'khaleel-editor';
import 'khaleel-editor/dist/khaleel-editor.css';

interface AddSectionFormProps {
  pageId: string;
  parentId?: string;
  onSectionAdded: () => void;
}

export default function AddSectionForm({ pageId, parentId, onSectionAdded }: AddSectionFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [order, setOrder] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditorUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    formData.append('pageId', pageId); 
    if (parentId) formData.append('parentId', parentId);

    try {
      const res = await fetch('/api/images/upload', { 
        method: 'POST', 
        body: formData 
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url; 
    } catch (err) {
      console.error(err);
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content, 
          order,
          pageId,
          parentId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create section');
      }

      setTitle('');
      setContent('');
      setOrder(0);
      onSectionAdded();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative group rounded-xl bg-[#0f1629]/60 backdrop-blur-md border border-white/5 overflow-hidden transition-all duration-500 hover:border-blue-500/20 shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-50" />
      
      <div className="bg-[#0b1120] px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`
            p-2.5 rounded-lg border shadow-[0_0_15px_rgba(0,0,0,0.3)]
            ${parentId 
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}
          `}>
            {parentId ? <CornerDownRight size={18} /> : <Layers size={18} />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-display flex items-center gap-2">
              {parentId ? 'Sub-Routine Protocol' : 'Initialize Content Block'}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5 font-mono">
                {parentId ? 'NESTED' : 'ROOT'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {parentId ? 'Appending child node to existing structure.' : 'Allocating new top-level memory sector.'}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-600 font-mono">
            <Terminal size={12} />
            STATUS: READY
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider ml-1">
              Section Identifier <span className="text-red-400">*</span>
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type size={16} className="text-slate-600 group-focus-within/input:text-white transition-colors" />
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#0b1120] border border-white/10 rounded-lg focus:bg-blue-900/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all text-sm text-white placeholder-slate-700 font-sans"
                placeholder="ENTER_TITLE_VECTOR..."
              />
            </div>
          </div>

          <div className="md:col-span-1 space-y-2">
            <label className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider ml-1">
              Priority Index
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ListOrdered size={16} className="text-slate-600 group-focus-within/input:text-white transition-colors" />
              </div>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value, 10))}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#0b1120] border border-white/10 rounded-lg focus:bg-blue-900/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all text-sm text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider ml-1">
                Data Payload
            </label>
            <span className="text-[10px] text-slate-600 font-mono">EDITOR_MODE: ACTIVE</span>
          </div>
          
          <div className="bg-white rounded-lg border border-white/10 overflow-hidden shadow-inner ring-4 ring-white/5">
             <div className="bg-slate-100 border-b border-slate-200 px-3 py-1.5 flex items-center gap-2">
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
                <div className="h-3 w-px bg-slate-300 mx-1"></div>
                <Database size={10} className="text-slate-400" />
                <span className="text-[10px] text-slate-500 font-mono">WYSIWYG_INTERFACE</span>
             </div>
             <div className="min-h-[350px] bg-white text-black [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus-visible:outline-none">
                <KhaleelEditor 
                  initialContent=""
                  onSave={(json) => setContent(JSON.stringify(json))}
                  onUpload={handleEditorUpload}
                />
             </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
            <AlertTriangle size={16} className="flex-shrink-0 text-red-500" />
            <p className="font-mono text-xs">{error}</p>
          </div>
        )}

        <div className="pt-4 flex items-center justify-end border-t border-white/5">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`
              relative overflow-hidden group/btn flex items-center gap-3 px-8 py-3 rounded-lg text-xs font-bold font-mono tracking-wider transition-all duration-300
              ${isSubmitting 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-[1.02]'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>PROCESSING_REQUEST...</span>
              </>
            ) : (
              <>
                <span className="relative z-10 flex items-center gap-2">
                    <Plus size={14} strokeWidth={3} />
                    INITIALIZE_SECTION
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}