import { Product } from '@/lib/products';
import ProductImage from './ProductImage';

const badgeStyles: Record<string, string> = {
  popular: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  new: 'bg-blue-50 text-blue-800 border border-blue-200',
  sale: 'bg-orange-50 text-orange-800 border border-orange-200',
};

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 product-card-shadow transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      {/* Image area */}
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
          <ProductImage
            barcode={product.barcode}
            fallbackImage={product.fallbackImage}
            name={product.name}
          />
        </div>
        
        {product.badge && (
          <div className={`absolute top-4 left-4 z-20 text-[11px] font-bold px-3 py-1 rounded-xl shadow-sm ${badgeStyles[product.badge]}`}>
            {product.badgeLabel}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600/70 bg-emerald-50 px-2 py-0.5 rounded-md">
            {product.brand}
          </span>
          <span className="text-[11px] text-gray-400">• {product.category}</span>
        </div>
        
        <h3 className="text-[16px] font-bold text-gray-900 leading-[1.3] mb-2 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-[13px] text-gray-500 leading-relaxed mb-6 line-clamp-2">
          {product.desc}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[18px] font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-[12px] text-gray-400 line-through font-medium">{product.originalPrice}</span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 font-medium">Free Delivery</p>
          </div>
          
          <button className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center transition-all duration-300 hover:bg-emerald-600 hover:rotate-90 group-hover:shadow-lg active:scale-90">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
