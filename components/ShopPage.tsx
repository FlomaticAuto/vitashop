'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import CategoryBar from '@/components/CategoryBar';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartCount, setCartCount] = useState(3);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        search.trim() === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-50 glass-header h-16 flex items-center justify-between px-6 gap-4">
        <div className="text-[22px] font-bold text-gray-900 flex-shrink-0 tracking-tight">
          Vita<span className="text-emerald-600">Shop</span>
        </div>

        <div className="flex-1 max-w-md hidden md:flex items-center gap-2 bg-white/50 border border-gray-200 rounded-2xl px-4 h-10 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search vitamins, supplements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[14px] text-gray-700 outline-none w-full placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCartCount((c) => c + 1)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-100 product-card-shadow transition-transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white px-6 py-16 md:py-24 text-center">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-[12px] font-bold text-emerald-700 bg-emerald-50 rounded-full tracking-wider uppercase">
            Premium Wellness 🌿
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Your daily wellness, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">delivered to your door.</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            South Africa&apos;s trusted source for vitamins, minerals &amp; supplements — direct from leading brands with pharmacist-verified quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white text-[15px] font-semibold px-8 py-3.5 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
              Shop Now
            </button>
            <button className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 text-[15px] font-semibold px-8 py-3.5 rounded-2xl transition-all hover:bg-gray-50">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Category bar */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <CategoryBar active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Main Grid Area */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Section label */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-[14px] text-gray-500">Curated collection for your health goals</p>
          </div>
          {filtered.length !== products.length && (
            <span className="text-[13px] font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
              {filtered.length} found
            </span>
          )}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-[18px] font-bold text-gray-900">No products found</p>
            <p className="text-[14px] text-gray-500 mt-1 max-w-xs mx-auto">Try adjusting your search or category filters to find what you&apos;re looking for.</p>
            <button 
              onClick={() => { setSearch(''); setActiveCategory('all'); }}
              className="mt-6 text-emerald-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust bar */}
      <footer className="mt-12 bg-gray-900 text-white rounded-t-[40px] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold mb-6">Vita<span className="text-emerald-400">Shop</span></div>
              <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                Empowering South Africans to take control of their health with premium, accessible, and verified wellness products.
              </p>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'Twitter'].map(s => (
                  <div key={s} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 transition-colors cursor-pointer text-[12px]">
                    {s[0]}
                  </div>
                ))}
              </div>
            </div>
            
            {[
              { icon: '🚚', title: 'Free delivery', sub: 'Orders over R500' },
              { icon: '🔒', title: 'Secure checkout', sub: '256-bit SSL' },
              { icon: '✅', title: 'Authentic', sub: 'Pharmacist verified' },
              { icon: '↩️', title: 'Easy returns', sub: '30-day policy' },
            ].map((t) => (
              <div key={t.title} className="flex flex-col gap-2">
                <span className="text-2xl mb-2">{t.icon}</span>
                <span className="text-[16px] font-bold">{t.title}</span>
                <span className="text-[14px] text-gray-400">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[13px] text-gray-500">© 2025 VitaShop (Pty) Ltd · Johannesburg, South Africa</p>
            <div className="flex gap-6 text-[13px] text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
