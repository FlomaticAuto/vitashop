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
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-colors duration-150 flex flex-col">
      {/* Image area */}
      <div className="h-[148px] bg-gray-50 border-b border-gray-100 flex items-center justify-center p-2">
        <ProductImage
          barcode={product.barcode}
          fallbackImage={product.fallbackImage}
          name={product.name}
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {product.badge && (
          <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-1.5 w-fit ${badgeStyles[product.badge]}`}>
            {product.badgeLabel}
          </span>
        )}

        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-0.5">
          {product.brand}
        </p>
        <p className="text-[13px] font-medium text-gray-900 leading-snug mb-1.5">
          {product.name}
        </p>
        <p className="text-[11px] text-gray-500 leading-relaxed mb-3 flex-1">
          {product.desc}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[15px] font-semibold text-emerald-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through ml-1.5">{product.originalPrice}</span>
            )}
            <p className="text-[10px] text-gray-400">per pack</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all duration-100">
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
