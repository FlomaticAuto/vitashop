'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count, clearCart } = useCart();

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const grandTotal = total() + (total() >= 500 ? 0 : 80);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-30" onClick={closeCart} />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-40 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-semibold text-gray-900">Your cart</h2>
            {count() > 0 && (
              <span className="bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                {count()} item{count() !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-700">Your cart is empty</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Add some vitamins to get started</p>
            </div>
            <button onClick={closeCart} className="mt-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium px-5 py-2 rounded-lg transition-colors">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto py-1">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-14 h-14 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <Image src={product.image} alt={product.name} width={48} height={48} className="object-contain w-12 h-12" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600">{product.brand}</p>
                    <p className="text-[12px] font-medium text-gray-900 leading-snug line-clamp-2">{product.name}</p>
                    <p className="text-[13px] font-semibold text-gray-800 mt-0.5">R{(product.priceNum * qty).toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button onClick={() => removeItem(product.id)} className="text-gray-300 hover:text-red-400 transition-colors p-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => updateQty(product.id, qty - 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-50 text-base leading-none">−</button>
                      <span className="w-6 text-center text-[12px] font-semibold text-gray-900 border-x border-gray-200 h-7 flex items-center justify-center">{qty}</span>
                      <button onClick={() => updateQty(product.id, qty + 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-50 text-base leading-none">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-5 py-4">
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-[12px] text-gray-500">
                  <span>Subtotal</span>
                  <span>R{total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[12px] text-gray-500">
                  <span>Delivery</span>
                  <span className={total() >= 500 ? 'text-emerald-600 font-medium' : ''}>
                    {total() >= 500 ? 'FREE' : 'R80.00'}
                  </span>
                </div>
                {total() < 500 && (
                  <p className="text-[11px] text-emerald-600 bg-emerald-50 rounded-lg px-3 py-1.5">
                    Add R{(500 - total()).toFixed(2)} more for free delivery
                  </p>
                )}
                <div className="flex justify-between text-[14px] font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>R{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-[14px] py-3 rounded-xl transition-all">
                Checkout →
              </button>
              <button onClick={clearCart} className="w-full mt-2 text-[11px] text-gray-400 hover:text-red-400 transition-colors py-1">
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
