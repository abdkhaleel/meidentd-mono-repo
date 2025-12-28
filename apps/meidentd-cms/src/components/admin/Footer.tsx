import Link from 'next/link';
import { Cpu, Activity, Zap } from 'lucide-react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto z-10 relative">
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      
      <div className="bg-[#0f1629]/80 backdrop-blur-md border-t border-white/5 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 py-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            
            <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-6 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="tracking-widest uppercase">System Operational</span>
              </div>
              
              <div className="hidden md:block w-px h-3 bg-white/10" />
              
              <div className="flex items-center gap-1.5 group transition-colors hover:text-blue-400">
                <Cpu size={12} className="opacity-70" />
                <span>
                  &copy; {currentYear} <span className="font-bold text-slate-300 group-hover:text-white transition-colors">Meiden CMS</span>
                </span>
                <span className="opacity-50">v2.4.0</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              
              
                <span className="text-slate-400 font-medium group-hover:text-blue-300 transition-colors">Made by</span>
                <span className="flex items-center gap-1.5 font-bold text-slate-200 group-hover:text-white transition-colors">
                  <Zap size={10} className="text-blue-500 group-hover:fill-blue-400 transition-all" />
                  MRA Softec
                </span>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}