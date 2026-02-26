'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Colors matching actual meidentd.in website
const COLORS = {
  white: '#ffffff',
  lightGray: '#f5f5f5',
  mediumGray: '#e0e0e0',
  darkGray: '#333333',
  textGray: '#666666',
  darkBlue: '#003366',
  lightBlue: '#0066cc',
};

const HERO_IMAGES = [
  '/images/hero/hero1.jpg',
  '/images/hero/hero2.jpg',
  '/images/hero/hero3.jpg',
  '/images/hero/hero4.jpg',
  '/images/hero/hero5.jpg',
];

const NEWS = [
  {
    date: '2024-10-03',
    title: 'Meiden T&D receives a large-scale order for a part of Traction substation equipment to be used in India\'s Mumbai-Ahmedabad High Speed Rail Project.',
    category: 'Information'
  },
  {
    date: '2024-06-11',
    title: 'Meiden T&D receives certificate of appreciation for running its plant on Green Fuel.',
    category: 'Information'
  },
  {
    date: '2024-07-20',
    title: 'Meiden T&D celebrates its Annual Day.',
    category: 'Information'
  },
  {
    date: '2024-04-24',
    title: 'Notice of system maintenance.',
    category: 'Information'
  },
];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  return (
      <div className="relative w-full bg-gray-900 overflow-hidden">
        <div className="relative h-96 md:h-[500px]">
          <img
              src={HERO_IMAGES[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
          />

          {/* Navigation Buttons */}
          <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 transition-colors"
              aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 transition-colors"
              aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/40 px-3 py-1">
            {currentIndex + 1} / {HERO_IMAGES.length}
          </div>
        </div>
      </div>
  );
}

function NewsSection() {
  return (
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-8">
          <div className="flex gap-4 border-b border-gray-300 mb-6">
            <button
                className="pb-4 font-bold text-gray-900 border-b-2 border-gray-900"
                style={{ color: COLORS.darkBlue }}
            >
              News Releases
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {NEWS.map((item, idx) => (
              <a
                  key={idx}
                  href={`/news-release.php?data=${idx}`}
                  className="block p-4 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="text-sm text-gray-500 min-w-max">{item.date}</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                    <div className="text-gray-900 text-sm leading-relaxed hover:underline">
                      {item.title}
                    </div>
                  </div>
                </div>
              </a>
          ))}
        </div>
      </div>
  );
}

function CategoriesSection() {
  return (
      <div style={{ backgroundColor: COLORS.lightGray }} className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Category 1 */}
            <Link
                href="https://www.google.com/maps/place/Building+10,+Tower+C/@28.493262,77.085909,17z/data=!3m1!4b1!4m5!3m4!1s0x390d19eea6362009:0x3f09a13b45a094c5!8m2!3d28.493262!4d77.0880977?hl=en"
                className="group block overflow-hidden hover:opacity-80 transition-opacity"
            >
              <div className="mb-4">
                <img
                    src="/images/home-category-1.jpg"
                    alt="Access"
                    className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold" style={{ color: COLORS.darkBlue }}>
                  Access
                </h3>
                <img src="/images/meidensha-icon.png" alt="" className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Location and contact information</p>
            </Link>

            {/* Category 2 */}
            <a
                href="https://www.meidensha.com/onemeiden/"
                className="group block overflow-hidden hover:opacity-80 transition-opacity"
            >
              <div className="mb-4">
                <img
                    src="/images/home-category-2.gif"
                    alt="One Meiden"
                    className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold" style={{ color: COLORS.darkBlue }}>
                  One MEIDEN
                </h3>
                <img src="/images/meidensha-icon.png" alt="" className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Global Meidensha network</p>
            </a>
          </div>
        </div>
      </div>
  );
}

function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white border border-gray-400 text-gray-700 px-4 py-2 text-sm font-bold hover:bg-gray-100 transition-colors"
      >
        ⇧ Top
      </button>
  );
}

export default function HomePage() {
  return (
      <main style={{ backgroundColor: COLORS.white }}>
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* News Section */}
        <NewsSection />

        {/* Categories Section */}
        <CategoriesSection />

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Footer Note */}
        <div style={{ backgroundColor: COLORS.lightGray }} className="text-center py-8 text-xs text-gray-600">
          <p>Meiden T&D India Limited</p>
          <p className="mt-2">Copyright © MEIDEN T&D (INDIA) LIMITED All rights reserved.</p>
        </div>
      </main>
  );
}