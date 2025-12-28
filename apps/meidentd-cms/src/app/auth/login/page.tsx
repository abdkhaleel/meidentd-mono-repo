'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        await new Promise(r => setTimeout(r, 600));

        try {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                setError('Authentication failed. Invalid credentials.');
                setLoading(false);
            }
            else if (result?.ok) {
                router.refresh(); 
                router.push('/admin');
            }
        } catch (error) {
            setError('System error. Connection refused.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b1120] relative flex items-center justify-center overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>

                <div className="absolute inset-0" 
                     style={{ 
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                     }}>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="w-full max-w-md px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <div className="flex justify-between items-end mb-6 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                        <span>Secure Connection</span>
                        <span>V.2.0.4</span>
                    </div>

                    <div className="group relative bg-[#0f1629]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
                        
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

                        <div className="p-8 md:p-10">
                            <div className="text-center mb-10 space-y-2">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                    <ShieldCheck size={24} />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                                    Meiden CMS
                                </h2>
                                <p className="text-sm text-slate-400 font-light">
                                    Enter your credentials to access the mainframe.
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                
                                <div className="space-y-2">
                                    <label htmlFor="username" className="block text-xs font-mono font-bold text-blue-300/80 uppercase tracking-wider ml-1">
                                        Identity
                                    </label>
                                    <div className="relative group/input">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-400 transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="block w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/10 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 font-sans text-sm"
                                            placeholder="admin@meiden.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-xs font-mono font-bold text-blue-300/80 uppercase tracking-wider ml-1">
                                        Passcode
                                    </label>
                                    <div className="relative group/input">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-400 transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/10 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 font-sans text-sm"
                                            placeholder="••••••••••••"
                                        />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {error && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                                                <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                                                <span className="font-light">{error}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full group overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 focus:ring-offset-[#0b1120]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 transition-all duration-300 group-hover:opacity-100 opacity-80" />
                                    <div className="relative bg-[#0b1120] rounded-lg px-4 py-3 group-hover:bg-opacity-0 transition-all duration-300">
                                        <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                                            {loading ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin text-white/80" />
                                                    <span>Authenticating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Initiate Session</span>
                                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                        
                        <div className="px-8 py-4 bg-black/20 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>SYSTEM ONLINE</span>
                            </div>
                            <span>ENCRYPTED :: SHA-256</span>
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-600 font-mono">
                            &copy; {new Date().getFullYear()} Meiden T&D India.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}