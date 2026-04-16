'use client';

import { categories } from '@/lib/products';

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryBar({ active, onChange }: Props) {
  return (
    <div className="px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide items-center">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex-shrink-0 text-[13px] px-5 py-2 rounded-2xl transition-all duration-300 whitespace-nowrap font-semibold
            ${active === cat.id
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 ring-2 ring-emerald-500/20'
              : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200'
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
