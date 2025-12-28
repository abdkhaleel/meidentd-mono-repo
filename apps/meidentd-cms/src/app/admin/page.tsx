'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    LayoutDashboard, 
    LogOut, 
    FileText, 
    ExternalLink, 
    ArrowRight, 
    Activity, 
    ShieldCheck, 
    Cpu, 
    Clock,
    Server,
    Zap
} from 'lucide-react';

const DigitalClock = () => {
    const [time, setTime] = useState<string>('');
    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, []);
    return <span className="font-mono tabular-nums">{time}</span>;
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-2 border-cyan-400 rounded-full animate-spin [animation-duration:1.5s]"></div>
            <div className="absolute inset-4 border-b-2 border-emerald-500 rounded-full animate-spin [animation-duration:2s]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <Zap size={20} className="text-white animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-1">
             <p className="text-sm font-mono text-blue-400 tracking-widest uppercase animate-pulse">Initializing Core</p>
             <p className="text-[10px] font-mono text-slate-600">Loading modules...</p>
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 50 } 
    }
  };

  return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
    >
      
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">System Active</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-slate-400 mt-2 font-light text-lg">
            Welcome back, <span className="text-blue-400 font-medium">{session?.user?.name || 'Admin'}</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-black/20 border border-white/5 text-slate-400 text-sm font-mono mr-2">
                <Clock size={14} className="text-blue-500" />
                <DigitalClock />
            </div>

            <Link 
                href="/" 
                target="_blank"
                className="group flex items-center px-4 py-2.5 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
            >
                <ExternalLink size={16} className="mr-2 group-hover:text-blue-400 transition-colors" />
                Live Uplink
            </Link>
          
            <button 
                onClick={() => signOut({ callbackUrl: window.location.origin })}
                className="group flex items-center px-4 py-2.5 text-sm font-medium text-white bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300"
            >
                <LogOut size={16} className="mr-2 group-hover:text-red-400 transition-colors" />
                Terminate Session
            </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="relative group p-6 rounded-2xl bg-[#0b1120]/50 border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex justify-between items-start">
            <div>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Network Status</p>
                <p className="text-2xl font-bold text-white">Online</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded w-fit">
                    <Activity size={10} />
                    <span>STABLE 99.9%</span>
                </div>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Server size={20} />
            </div>
          </div>
        </div>
        
        <div className="relative group p-6 rounded-2xl bg-[#0b1120]/50 border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex justify-between items-start">
            <div>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Access Level</p>
                <p className="text-2xl font-bold text-white">Administrator</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-purple-400 font-mono bg-purple-500/10 px-2 py-1 rounded w-fit">
                    <ShieldCheck size={10} />
                    <span>ROOT PRIVILEGES</span>
                </div>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <Cpu size={20} />
            </div>
          </div>
        </div>
        
        <div className="relative group p-6 rounded-2xl bg-[#0b1120]/50 border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex justify-between items-start">
            <div>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">System Version</p>
                <p className="text-2xl font-bold text-white">v2.4.0</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-orange-400 font-mono bg-orange-500/10 px-2 py-1 rounded w-fit">
                    <Zap size={10} />
                    <span>BUILD 2024.12</span>
                </div>
            </div>
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                <LayoutDashboard size={20} />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-4">
            <span>Quick Protocols</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link href="/admin/pages" className="group relative overflow-hidden bg-[#161f36]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
            

            <div className="absolute -top-6 -right-6 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 rotate-12">
              <FileText size={140} />
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <FileText size={28} className="text-blue-400 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Content Management</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed font-light">
                Initialize page editor protocols. Modify structure, content, and SEO parameters.
              </p>
              
              <span className="inline-flex items-center text-xs font-mono font-bold text-blue-400 uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                <span>Execute</span> 
                <ArrowRight size={14} className="ml-2" />
              </span>
            </div>
          </Link>

          <Link href="/" target="_blank" className="group relative overflow-hidden bg-[#161f36]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
            
            <div className="absolute -top-6 -right-6 text-white/5 group-hover:text-cyan-500/10 transition-colors duration-500 rotate-12">
              <ExternalLink size={140} />
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <ExternalLink size={28} className="text-cyan-400 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Production View</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed font-light">
                Visualize current deployment status. Verify content rendering on the live environment.
              </p>
              
              <span className="inline-flex items-center text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                <span>Access Uplink</span> 
                <ArrowRight size={14} className="ml-2" />
              </span>
            </div>
          </Link>

        </div>
      </motion.div>
    </motion.div>
  );
}