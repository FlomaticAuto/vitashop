'use client';

import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cartStore';

const badgeStyles: Record<string, string> = {
  popular: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  new:     'bg-blue-50 text-blue-800 border border-blue-200',
  sale:    'bg-orange-50 text-orange-800 border border-orange-200',
};

const categoryLabel: Record<string, string> = {
  multivitamins: 'multivitamins',
  calcium:       'calcium & bone',
  energy:        'energy',
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all duration-150 flex flex-col">

      {/* Image */}
      <div className="h-[160px] bg-gray-50 border-b border-gray-100 flex items-center justify-center p-3">
        <Image
          src={product.image}
          alt={product.name}
          width={140}
          height={130}
          className="object-contain max-h-[134px] w-auto"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {product.badge && (
          <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-2 w-fit ${badgeStyles[product.badge]}`}>
            {product.badgeLabel}
          </span>
        )}

        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600">{product.brand}</span>
          <span className="text-gray-200">·</span>
          <span className="text-[10px] text-gray-400">{categoryLabel[product.category]}</span>
        </div>

        <p className="text-[13px] font-semibold text-gray-900 leading-snug mb-1.5">{product.name}</p>
        <p className="text-[11px] text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-3">{product.desc}</p>

        <div className="flex items-end justify-between pt-2 border-t border-gray-50">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-[10px] text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 font-medium">Free Delivery</p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="w-8 h-8 bg-gray-900 hover:bg-emerald-600 active:scale-95 text-white text-lg font-light rounded-full flex items-center justify-center transition-all duration-150 flex-shrink-0"
            aria-label={`Add ${product.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
