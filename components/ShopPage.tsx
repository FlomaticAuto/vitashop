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
    <div className="min-h-screen bg-gray-50">

      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-6 gap-4">
        <div className="text-[18px] font-medium text-gray-900 flex-shrink-0">
          Vita<span className="text-emerald-600">Shop</span>
        </div>

        <div className="flex-1 max-w-xs flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-9">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search vitamins, supplements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={() => setCartCount((c) => c + 1)}
          className="flex-shrink-0 flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Cart
          <span className="bg-emerald-600 text-white text-[11px] font-medium rounded-full w-[18px] h-[18px] flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 text-center px-6 py-8">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Your daily wellness, delivered</h1>
        <p className="text-[13px] text-gray-500 max-w-md mx-auto mb-4">
          South Africa&apos;s trusted source for vitamins, minerals &amp; supplements — direct from leading brands.
        </p>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium px-5 py-2.5 rounded-lg transition-colors">
          Shop all products
        </button>
      </section>

      {/* Category bar */}
      <CategoryBar active={activeCategory} onChange={setActiveCategory} />

      {/* Section label */}
      <div className="px-6 pt-5 pb-2">
        <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
          Featured products
          {filtered.length !== products.length && (
            <span className="ml-2 normal-case tracking-normal font-normal text-gray-400">
              — {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </p>
      </div>

      {/* Product grid */}
      <main className="px-6 pb-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-[15px]">No products found</p>
            <p className="text-[13px] mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Trust bar */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
          {[
            { icon: '🚚', title: 'Free delivery', sub: 'Orders over R500' },
            { icon: '🔒', title: 'Secure checkout', sub: '256-bit SSL' },
            { icon: '✅', title: 'Authentic products', sub: 'Pharmacist verified' },
            { icon: '↩️', title: 'Easy returns', sub: '30-day policy' },
          ].map((t) => (
            <div key={t.title} className="flex flex-col items-center py-4 text-center px-4">
              <span className="text-lg mb-1">{t.icon}</span>
              <span className="text-[12px] font-medium text-gray-700">{t.title}</span>
              <span className="text-[11px] text-gray-400">{t.sub}</span>
            </div>
          ))}
        </div>
        <div className="text-center py-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">© 2025 VitaShop (Pty) Ltd · Johannesburg, South Africa</p>
        </div>
      </footer>

    </div>
  );
}
