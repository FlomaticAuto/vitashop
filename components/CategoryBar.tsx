'use client';

import { categories } from '@/lib/products';

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryBar({ active, onChange }: Props) {
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex-shrink-0 text-[12px] px-4 py-1.5 rounded-full border transition-colors duration-100 whitespace-nowrap
            ${active === cat.id
              ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-medium'
              : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
