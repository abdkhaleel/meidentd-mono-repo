'use client';

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Edit, Trash2, Plus, Image as ImageIcon, 
  Save, X, Upload, Loader2, GripVertical, 
  ChevronRight, AlertTriangle, CornerDownRight,
  FileText, ExternalLink, Terminal, Hash, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import AddSectionForm from "@/components/admin/AddSectionForm";
import { KhaleelEditor } from "khaleel-editor";
import "khaleel-editor/dist/khaleel-editor.css";

export type ImageData = {
  id: string;
  url: string;
  caption: string | null;
  altText: string;
};

export type DocumentData = {
  id: string;
  url: string;
  title: string | null;
  filename: string;
  fileSize: number | null;
};

export type SectionData = {
  id: string;
  title: string;
  content: string;
  order: number;
  children: SectionData[];
  images: ImageData[];
  documents: DocumentData[];
};

export type PageData = {
  id: string;
  title: string;
  slug: string;
  sections: SectionData[];
};

function ModalWrapper({ 
  children, 
  maxWidth = "max-w-4xl" 
}: { 
  children: React.ReactNode; 
  maxWidth?: string 
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className={`relative bg-[#0f1629] border border-white/10 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col overflow-hidden ring-1 ring-white/5`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-50" />
        {children}
      </motion.div>
    </div>,
    document.body
  );
}

function ImageCard({ img, onDelete, onUpdate }: { 
  img: ImageData; 
  onDelete: (id: string) => void; 
  onUpdate: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState(img.caption || '');
  const [altText, setAltText] = useState(img.altText || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/images/${img.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, altText }),
      });

      if (!res.ok) throw new Error('Failed to update');
      
      onUpdate(); 
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save details');
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-[#161f36] p-4 rounded-lg border border-blue-500/30 shadow-lg flex flex-col gap-3 h-full">
        <div>
          <label className="block text-[10px] font-mono font-bold text-blue-400 uppercase mb-1">Caption</label>
          <input 
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full text-sm px-3 py-2 bg-black/30 border border-white/10 rounded text-white focus:border-blue-500/50 outline-none"
            placeholder="Image caption..."
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono font-bold text-blue-400 uppercase mb-1">Alt Text</label>
          <input 
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full text-sm px-3 py-2 bg-black/30 border border-white/10 rounded text-white focus:border-blue-500/50 outline-none"
            placeholder="SEO Alt text"
          />
        </div>
        <div className="mt-auto flex gap-2 pt-2">
          <button 
            onClick={() => setIsEditing(false)}
            className="flex-1 py-1.5 text-xs font-mono text-slate-400 bg-white/5 hover:bg-white/10 rounded transition-colors"
          >
            CANCEL
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 py-1.5 text-xs font-mono font-bold text-black bg-blue-500 hover:bg-blue-400 rounded shadow-lg shadow-blue-500/20 transition-colors flex justify-center items-center"
          >
            {isSaving ? <Loader2 className="animate-spin w-3 h-3" /> : 'SAVE'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative aspect-video bg-black/20 rounded-lg overflow-hidden border border-white/10">
      <img src={img.url} alt={img.altText} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-200 backdrop-blur-sm">
        <button 
          onClick={() => setIsEditing(true)} 
          className="p-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
          title="Edit Details"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDelete(img.id)} 
          className="p-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all"
          title="Delete Image"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 border-t border-white/5 px-3 py-2">
        {img.caption ? (
           <p className="text-xs text-slate-300 font-medium truncate">{img.caption}</p>
        ) : (
           <p className="text-[10px] text-slate-500 truncate italic font-mono">NO_CAPTION_DATA</p>
        )}
      </div>
    </div>
  );
}

function DocumentCard({ doc, onDelete, onUpdate }: { 
  doc: DocumentData; 
  onDelete: (id: string) => void; 
  onUpdate: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(doc.title || doc.filename);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/documents/${doc.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error('Failed to update');
      onUpdate(); 
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save details');
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-[#161f36] p-4 rounded-lg border border-blue-500/30 shadow-lg flex flex-col gap-3 h-full">
        <div>
          <label className="block text-[10px] font-mono font-bold text-blue-400 uppercase mb-1">Display Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm px-3 py-2 bg-black/30 border border-white/10 rounded text-white focus:border-blue-500/50 outline-none"
            placeholder="Document title..."
          />
        </div>
        <div className="mt-auto flex gap-2 pt-2">
          <button 
            onClick={() => setIsEditing(false)}
            className="flex-1 py-1.5 text-xs font-mono text-slate-400 bg-white/5 hover:bg-white/10 rounded transition-colors"
          >
            CANCEL
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 py-1.5 text-xs font-mono font-bold text-black bg-blue-500 hover:bg-blue-400 rounded shadow-lg shadow-blue-500/20 transition-colors flex justify-center items-center"
          >
            {isSaving ? <Loader2 className="animate-spin w-3 h-3" /> : 'SAVE'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative aspect-video bg-[#161f36]/40 rounded-lg overflow-hidden border border-white/10 flex flex-col hover:border-blue-500/30 transition-colors">
      <div className="flex-1 flex items-center justify-center bg-white/5">
        <FileText className="w-12 h-12 text-slate-600 group-hover:text-blue-400 transition-colors" />
      </div>
      
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-200 backdrop-blur-sm">
        <a 
          href={doc.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-white/10 text-white rounded-lg hover:bg-blue-500 transition-all border border-white/10"
          title="View Document"
        >
          <ExternalLink size={16} />
        </a>
        <button 
          onClick={() => setIsEditing(true)} 
          className="p-2 bg-white/10 text-white rounded-lg hover:bg-blue-500 transition-all border border-white/10"
          title="Edit Title"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDelete(doc.id)} 
          className="p-2 bg-white/10 text-white rounded-lg hover:bg-red-500 transition-all border border-white/10"
          title="Delete Document"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="bg-[#0b1120] p-3 border-t border-white/5">
        <p className="text-xs font-bold text-slate-200 truncate" title={doc.title || doc.filename}>
          {doc.title || doc.filename}
        </p>
        <p className="text-[10px] text-slate-500 truncate font-mono mt-0.5">
          {doc.filename}
        </p>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  isDeleting 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  title: string; 
  message: React.ReactNode; 
  isDeleting: boolean; 
}) {
  if (!isOpen) return null;

  return (
    <ModalWrapper maxWidth="max-w-md">
      <div className="p-8 text-center bg-[#0f1629]">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-2 tracking-wide uppercase">{title}</h3>
        <div className="text-sm text-slate-400 mb-8 font-light">{message}</div>
        
        <div className="flex gap-3 justify-center">
          <button 
            onClick={onClose}
            disabled={isDeleting}
            className="px-5 py-3 text-slate-400 bg-white/5 hover:bg-white/10 rounded-lg font-mono text-xs border border-white/5 transition-colors"
          >
            ABORT
          </button>
          <button 
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-3 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 rounded-lg font-mono text-xs font-bold flex items-center transition-colors"
          >
            {isDeleting ? <Loader2 className="animate-spin mr-2" size={14} /> : <Trash2 size={14} className="mr-2" />}
            CONFIRM_DELETE
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

function EditSectionModal({ section, onClose, onUpdate }: { section: SectionData, onClose: () => void, onUpdate: () => void }) {
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const getInitialContent = () => {
    try {
      return JSON.parse(section.content);
    } catch (e) {
      return section.content;
    }
  };

  const handleEditorUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/sections/${section.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            title, 
            content, 
            order: section.order 
        })
      });
      if (!res.ok) throw new Error('Failed to update');
      onUpdate();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ModalWrapper>
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0b1120]">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Edit size={16} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">Edit Section Data</h3>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-[#0f1629]">
        <form id="edit-form" onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-mono font-bold text-blue-400 uppercase mb-2">Section Identifier</label>
            <input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:border-blue-500/50 focus:bg-blue-900/10 outline-none transition-all font-sans"
            />
          </div>
          
          <div className="bg-white rounded-lg border border-white/10 overflow-hidden shadow-inner">
            <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/50"></div>
                </div>
                <span className="text-[10px] text-gray-500 font-mono ml-2">WYSIWYG_EDITOR_V1</span>
            </div>
            
            <div className="min-h-[400px] bg-white [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus-visible:outline-none">
                <KhaleelEditor 
                    initialContent={getInitialContent()} 
                    onSave={(json) => setContent(JSON.stringify(json))}
                    onUpload={handleEditorUpload}
                />
            </div>
          </div>
          
          {error && <div className="p-3 bg-red-500/10 text-red-300 text-sm rounded-lg border border-red-500/20 flex items-center gap-2"><AlertTriangle size={16}/>{error}</div>}
        </form>
      </div>

      <div className="px-6 py-5 border-t border-white/5 bg-[#0b1120] flex justify-end gap-3">
        <button onClick={onClose} type="button" className="px-6 py-2.5 text-slate-400 font-mono text-xs hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          DISCARD
        </button>
        <button 
          form="edit-form"
          type="submit" 
          disabled={isSaving} 
          className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-600/20 flex items-center transition-all font-mono text-xs tracking-wider"
        >
          {isSaving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
          COMMIT_CHANGES
        </button>
      </div>
    </ModalWrapper>
  );
}

function ImageManagerModal({ section, onClose, onUpdate }: { section: SectionData, onClose: () => void, onUpdate: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('sectionId', section.id);

    try {
      const res = await fetch('/api/images/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      onUpdate();
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const executeDelete = async () => {
    if (!imageToDelete) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/images/${imageToDelete}`, { method: 'DELETE' });
      onUpdate();
      setImageToDelete(null);
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ModalWrapper maxWidth="max-w-3xl">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0b1120]">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">Visual Database</h3>
          <p className="text-xs text-blue-400 font-mono mt-1">TARGET: {section.title}</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-white/10">
          <X size={20} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto max-h-[60vh] bg-[#0f1629]">
        <div className="mb-8">
          <div className="relative border border-dashed border-white/20 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/50 rounded-xl transition-all cursor-pointer h-28 flex items-center justify-center group overflow-hidden">
            <input 
                type="file" 
                onChange={handleUpload} 
                accept="image/*"
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                ) : (
                  <Upload className="w-8 h-8 mb-2" />
                )}
                <span className="text-xs font-mono font-bold tracking-wider">
                  {uploading ? 'UPLOADING_DATA_STREAM...' : 'INITIATE_UPLOAD_SEQUENCE'}
                </span>
            </div>
          </div>
        </div>

        {section.images.length === 0 ? (
          <div className="text-center py-12 bg-black/20 rounded-xl border border-white/5 border-dashed">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-6 h-6 text-slate-600" />
            </div>
            <p className="text-xs text-slate-500 font-mono">NO_VISUAL_DATA_FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {section.images.map(img => (
              <ImageCard 
                key={img.id} 
                img={img} 
                onDelete={(id) => setImageToDelete(id)}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmModal 
        isOpen={!!imageToDelete}
        onClose={() => setImageToDelete(null)}
        onConfirm={executeDelete}
        title="Purge Visual Asset"
        isDeleting={isDeleting}
        message="This action will permanently delete the selected file from the server. Recovery is not possible."
      />
    </ModalWrapper>
  );
}

function DocumentManagerModal({ section, onClose, onUpdate }: { section: SectionData, onClose: () => void, onUpdate: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [docToDelete, setDocToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('sectionId', section.id);

    try {
      const res = await fetch('/api/documents/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      onUpdate();
    } catch (err) {
      alert('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const executeDelete = async () => {
    if (!docToDelete) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/documents/${docToDelete}`, { method: 'DELETE' });
      onUpdate();
      setDocToDelete(null);
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ModalWrapper maxWidth="max-w-3xl">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0b1120]">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">File Archives</h3>
          <p className="text-xs text-blue-400 font-mono mt-1">TARGET: {section.title}</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-white/10">
          <X size={20} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto max-h-[60vh] bg-[#0f1629]">
        <div className="mb-8">
          <div className="relative border border-dashed border-white/20 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/50 rounded-xl transition-all cursor-pointer h-28 flex items-center justify-center group overflow-hidden">
            <input 
                type="file" 
                onChange={handleUpload} 
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                ) : (
                  <Upload className="w-8 h-8 mb-2" />
                )}
                <span className="text-xs font-mono font-bold tracking-wider">
                  {uploading ? 'TRANSMITTING...' : 'INITIATE_FILE_TRANSFER'}
                </span>
            </div>
          </div>
        </div>

        {(!section.documents || section.documents.length === 0) ? (
          <div className="text-center py-12 bg-black/20 rounded-xl border border-white/5 border-dashed">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-slate-600" />
            </div>
            <p className="text-xs text-slate-500 font-mono">NO_ARCHIVES_FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {section.documents.map(doc => (
              <DocumentCard 
                key={doc.id} 
                doc={doc} 
                onDelete={(id) => setDocToDelete(id)}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmModal 
        isOpen={!!docToDelete}
        onClose={() => setDocToDelete(null)}
        onConfirm={executeDelete}
        title="Delete Archive"
        isDeleting={isDeleting}
        message="This will permanently delete the document from the secure storage."
      />
    </ModalWrapper>
  );
}

function SortableSectionItem({ section, onUpdate, pageId, level }: { section: SectionData, onUpdate: () => void, pageId: string, level: number }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 999 : 1,
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/sections/${section.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete");
      onUpdate();
      setShowDeleteConfirm(false);
    } catch (e) { alert('Error deleting section'); } 
    finally { setIsDeleting(false); }
  };

  const indentClass = level > 0 ? 'ml-6 md:ml-12' : '';
  const docCount = section.documents ? section.documents.length : 0;
  
  return (
    <div ref={setNodeRef} style={style} className={`relative mb-3 ${indentClass}`}>
      
      {level > 0 && (
        <>
            <div className="absolute -left-4 md:-left-8 top-6 w-4 md:w-8 h-px bg-blue-500/20" />
            <div className="absolute -left-4 md:-left-8 -top-3 bottom-0 w-px bg-blue-500/10" />
        </>
      )}

      <div className={`
        bg-[#161f36]/40 backdrop-blur-md rounded-lg border transition-all duration-300 group
        ${isDragging 
            ? 'shadow-[0_0_30px_rgba(59,130,246,0.2)] border-blue-500/50 scale-[1.02]' 
            : 'border-white/5 hover:border-blue-500/30 hover:bg-[#161f36]/80'}
      `}>
        <div className="flex flex-col sm:flex-row sm:items-center p-3 gap-3">
          
          <div className="flex items-center flex-1 gap-3">
            <button 
              {...attributes} 
              {...listeners} 
              className="cursor-grab active:cursor-grabbing p-1.5 text-slate-600 hover:text-blue-400 hover:bg-white/5 rounded transition-colors"
            >
              <GripVertical size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded border border-white/5 bg-black/20">
                  {section.order.toString().padStart(2, '0')}
                </span>
                <h4 className="font-bold text-slate-200 text-sm tracking-wide">{section.title}</h4>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                <span className={`flex items-center gap-1 ${section.images.length > 0 ? 'text-blue-400' : ''}`}>
                  <ImageIcon size={10} /> 
                  {section.images.length} IMG
                </span>
                <span className={`flex items-center gap-1 ${docCount > 0 ? 'text-cyan-400' : ''}`}>
                  <FileText size={10} /> 
                  {docCount} DOC
                </span>
                {section.children?.length > 0 && (
                   <span className="flex items-center gap-1 text-purple-400">
                     <CornerDownRight size={10} /> 
                     {section.children.length} SUB
                   </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-1 sm:border-l sm:border-white/5 sm:pl-3">
            <button 
              onClick={() => setShowImages(true)} 
              className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              title="Manage Images"
            >
              <ImageIcon size={16} />
            </button>
            <button 
              onClick={() => setShowDocs(true)} 
              className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
              title="Manage Documents"
            >
              <FileText size={16} />
            </button>
            <button 
              onClick={() => setShowEdit(true)} 
              className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors" 
              title="Edit Content"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => setShowAddChild(!showAddChild)} 
              className={`p-2 rounded-lg transition-colors ${showAddChild ? 'bg-purple-500/20 text-purple-400' : 'text-slate-500 hover:text-purple-400 hover:bg-purple-500/10'}`}
              title="Add Sub-section"
            >
              <Plus size={16} />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button 
              onClick={() => setShowDeleteConfirm(true)} 
              className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Delete Section"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {showAddChild && (
          <div className="border-t border-white/5 bg-[#0b1120]/50 p-4 animate-in slide-in-from-top-2">
            <AddSectionForm pageId={pageId} parentId={section.id} onSectionAdded={() => { setShowAddChild(false); onUpdate(); }} />
          </div>
        )}
      </div>

      {showEdit && <EditSectionModal section={section} onClose={() => setShowEdit(false)} onUpdate={onUpdate} />}
      {showImages && <ImageManagerModal section={section} onClose={() => setShowImages(false)} onUpdate={onUpdate} />}
      {showDocs && <DocumentManagerModal section={section} onClose={() => setShowDocs(false)} onUpdate={onUpdate} />}

      <DeleteConfirmModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={executeDelete}
        title="Delete Node?"
        isDeleting={isDeleting}
        message={
          <div className="text-left bg-red-500/10 p-4 rounded-lg border border-red-500/20 text-red-200 text-xs">
            <p className="font-bold mb-2 uppercase tracking-wide">Warning: Cascading Delete</p>
            <ul className="list-disc pl-4 space-y-1 opacity-80 font-mono">
              <li>Text content purge</li>
              <li>{section.images.length} linked images</li>
              <li>{docCount} linked documents</li>
              <li>{section.children.length} nested child nodes</li>
            </ul>
          </div>
        }
      />

      {section.children && section.children.length > 0 && (
         <div className="mt-2 relative">
            <SortableList items={section.children} onUpdate={onUpdate} pageId={pageId} level={level + 1} />
         </div>
      )}
    </div>
  );
}

function SortableList({ items, onUpdate, pageId, level = 0 }: { items: SectionData[], onUpdate: () => void, pageId: string, level?: number }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), 
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [sortedItems, setSortedItems] = useState(items);
  useEffect(() => { setSortedItems(items); }, [items]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sortedItems.findIndex((item) => item.id === active.id);
      const newIndex = sortedItems.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(sortedItems, oldIndex, newIndex);
      setSortedItems(newOrder);

      try {
        await Promise.all(newOrder.map((item, index) => 
          fetch(`/api/sections/${item.id}`, {
             method: 'PUT', 
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({ order: index, title: item.title, content: item.content })
          })
        ));
        onUpdate(); 
      } catch (e) { console.error("Reorder failed", e); }
    }
  };

  const renderItems = [...sortedItems].sort((a, b) => a.order - b.order);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={renderItems} strategy={verticalListSortingStrategy}>
        {renderItems.map((section) => (
          <SortableSectionItem 
            key={section.id} 
            section={section} 
            onUpdate={onUpdate} 
            pageId={pageId} 
            level={level} 
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default function PageEditor() {
  const params = useParams();
  const slug = params.slug as string;
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPageData = useCallback(async () => {
    try {
      const res = await fetch(`/api/pages/${slug}`, { cache: 'no-store' });
      if (res.ok) setPage(await res.json());
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  }, [slug]);

  useEffect(() => { fetchPageData(); }, [slug, fetchPageData]);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-blue-400 font-mono text-sm mt-4 animate-pulse">LOADING_INTERFACE...</p>
    </div>
  );
  
  if (!page) return (
    <div className="text-center py-24">
        <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
             <AlertTriangle className="w-8 h-8 text-slate-500" />
        </div>
      <h2 className="text-xl font-display font-bold text-white">404_DATA_NOT_FOUND</h2>
      <p className="text-slate-500 text-sm mt-2">The requested slug vector returned void.</p>
    </div>
  );

  return (
    <div className="pb-24 max-w-6xl mx-auto">
      
      <div className="mb-8 border-b border-white/5 pb-6">
         <nav className="flex items-center text-xs text-slate-500 font-mono mb-4">
            <span className="hover:text-white transition-colors cursor-pointer">SYSTEM</span> 
            <ChevronRight size={12} className="mx-2 opacity-50"/> 
            <span className="hover:text-white transition-colors cursor-pointer">PAGES</span>
            <ChevronRight size={12} className="mx-2 opacity-50"/> 
            <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              {page.slug}
            </span>
         </nav>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">{page.title}</h1>
                <p className="text-slate-400 text-sm mt-2 font-light">Structure and content management interface.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
               <Layers size={14} className="text-blue-400"/>
               {page.sections.length} ACTIVE_NODES
            </div>
         </div>
      </div>

      <div className="space-y-6 min-h-[300px]">
        {page.sections.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 bg-[#161f36]/30 rounded-xl border border-white/5 border-dashed">
              <div className="p-4 bg-white/5 rounded-full mb-4">
                  <Terminal className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-400 font-mono text-sm mb-1">NO_DATA_STREAM</p>
              <p className="text-slate-600 text-xs">Initialize a new content block below.</p>
           </div>
        ) : (
           <SortableList items={page.sections} onUpdate={fetchPageData} pageId={page.id} />
        )}
      </div>

      <div className="mt-12">
         <div className="flex items-center mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <span className="px-4 text-xs font-mono font-bold text-blue-500/50 uppercase tracking-widest flex items-center gap-2">
                <Plus size={12} />
                Initialize New Block
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
         </div>
          <AddSectionForm pageId={page.id} onSectionAdded={fetchPageData} />
      </div>
    </div>
  );
}