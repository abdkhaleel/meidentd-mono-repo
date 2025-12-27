import Link from 'next/link';
import { Heart, Code2 } from 'lucide-react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto z-10">
      

      <div className="bg-brand-secondary border-t-4 border-brand-primary shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-2 text-xs text-brand-bright/70">
              <Code2 size={14} />
              <span>
                &copy; {currentYear} <span className="font-semibold text-white">Meiden CMS</span>. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-300 font-medium tracking-wide">
              <span className="opacity-80">Made</span>
              <span className="opacity-80">by</span>
              
              
                <span className="font-bold border-b border-transparent group-hover:border-brand-primary pb-0.5">
                  MRA Softec Private Limited
                </span>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}