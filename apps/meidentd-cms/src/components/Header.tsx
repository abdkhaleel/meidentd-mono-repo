'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Loader2, ArrowRight } from 'lucide-react';

type PageSummary = {
    id: string;
    title: string;
    slug: string;
};

const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Products', href: '/products' },
    { name: 'Quality Policy', href: '/quality-policy' },
    { name: 'Contact', href: '/contact-us' },
    { name: 'Careers', href: 'https://meidensha.zohorecruit.in/jobs/Careers', external: true },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dynamicPages, setDynamicPages] = useState<PageSummary[]>([]);
    const [isHoveringMore, setIsHoveringMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        async function fetchPages() {
            try {
                const res = await fetch('/api/pages');
                if (res.ok) {
                    const pages: PageSummary[] = await res.json();
                    const staticSlugs = new Set(NAV_LINKS.map(link => link.href.replace(/^\//, '')));
                    const filtered = pages.filter(page => !staticSlugs.has(page.slug));
                    setDynamicPages(filtered);
                }
            } catch (error) {
                console.error("Failed to load navigation", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPages();
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* Simple header with meidentd.in design */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300 h-20">
                <div className="container mx-auto px-6 md:px-12 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img
                            src="/images/cmn_logo01.svg"
                            alt="MEIDEN T&D India"
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-0">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className={`px-4 py-5 text-sm font-medium transition-colors border-b-2 border-transparent ${
                                    isActive(link.href)
                                        ? 'text-blue-700 border-blue-700'
                                        : 'text-gray-700 hover:text-blue-700 hover:border-blue-700'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* More Dropdown - shows dynamic pages */}
                        {dynamicPages.length > 0 && (
                            <div
                                className="relative group px-4 py-5"
                                onMouseEnter={() => setIsHoveringMore(true)}
                                onMouseLeave={() => setIsHoveringMore(false)}
                            >
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
                                >
                                    More <ChevronDown size={14} className={`transition-transform ${isHoveringMore ? 'rotate-180' : ''}`} />
                                </button>

                                {isHoveringMore && (
                                    <div className="absolute right-0 top-full pt-2 w-56 bg-white border border-gray-300 shadow-md z-10">
                                        {loading ? (
                                            <div className="flex justify-center py-6 text-gray-400">
                                                <Loader2 className="animate-spin" size={20} />
                                            </div>
                                        ) : (
                                            <>
                                                {dynamicPages.length > 0 ? (
                                                    <div className="max-h-64 overflow-y-auto">
                                                        {dynamicPages.map(page => (
                                                            <Link
                                                                key={page.id}
                                                                href={`/${page.slug}`}
                                                                className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-700 transition-colors border-b border-gray-200 last:border-b-0 group"
                                                            >
                                                                {page.title}
                                                                <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-gray-500">No pages found</div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Toggle Navigation"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white lg:hidden pt-20">
                    <div className="h-full overflow-y-auto px-6 pb-20">
                        {/* Mobile Navigation Links */}
                        <nav className="flex flex-col space-y-0">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                    className={`py-4 px-4 text-lg font-medium border-b border-gray-200 transition-colors ${
                                        isActive(link.href)
                                            ? 'text-blue-700 bg-blue-50 pl-4 border-l-4 border-blue-700 border-b-0'
                                            : 'text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* More Pages in Mobile */}
                            {dynamicPages.length > 0 && (
                                <>
                                    <div className="py-4 px-4 text-sm font-bold text-gray-500 uppercase border-b border-gray-200 mt-4">
                                        More Information
                                    </div>
                                    {loading ? (
                                        <div className="flex justify-center py-6 text-gray-400">
                                            <Loader2 className="animate-spin" size={20} />
                                        </div>
                                    ) : (
                                        <>
                                            {dynamicPages.map(page => (
                                                <Link
                                                    key={page.id}
                                                    href={`/${page.slug}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="py-3 px-4 text-gray-700 border-b border-gray-200 hover:bg-gray-50 hover:text-blue-700 transition-colors"
                                                >
                                                    {page.title}
                                                </Link>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}