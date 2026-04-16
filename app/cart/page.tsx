'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartStore';

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 80;

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, total, count } = useCart();

  const subtotal = total();
  const deliveryFree = subtotal >= FREE_DELIVERY_THRESHOLD;
  const delivery = deliveryFree ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + delivery;
  const progressPct = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 h-14 flex items-center px-6 gap-4">
        <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors text-[13px]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to shop
        </Link>
        <div className="ml-auto text-[18px] font-semibold text-gray-900">
          Super<span className="text-emerald-600">Buys</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          {count() > 0 && (
            <span className="bg-emerald-100 text-emerald-700 text-[13px] font-semibold px-2.5 py-0.5 rounded-full">
              {count()} item{count() !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-24 gap-4 text-center px-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-9 h-9 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">Your cart is empty</p>
              <p className="text-[13px] text-gray-400 mt-1">Add some vitamins to get started</p>
            </div>
            <Link
              href="/"
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-medium px-6 py-2.5 rounded-xl transition-colors"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left: Items ── */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              {/* Free delivery progress */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <span className="text-[13px] font-medium text-gray-700">
                      {deliveryFree
                        ? 'You qualify for free delivery!'
                        : `Add R${remaining.toFixed(2)} more for free delivery`}
                    </span>
                  </div>
                  {deliveryFree && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">FREE</span>
                  )}
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Product rows */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-gray-800">Items in your cart</h2>
                  <button
                    onClick={clearCart}
                    className="text-[12px] text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                {items.map(({ product, qty }) => {
                  const lineTotal = product.priceNum * qty;
                  return (
                    <div key={product.id} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      {/* Image */}
                      <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="object-contain w-16 h-16"
                          unoptimized
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 mb-0.5">{product.brand}</p>
                        <p className="text-[14px] font-semibold text-gray-900 leading-snug">{product.name}</p>
                        <p className="text-[12px] text-gray-400 mt-0.5 line-clamp-1">{product.desc}</p>
                        <p className="text-[13px] text-gray-500 mt-1">
                          R{product.priceNum.toFixed(2)} each
                        </p>
                      </div>

                      {/* Qty + price + remove */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQty(product.id, qty - 1)}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-[14px] font-semibold text-gray-900 border-x border-gray-200 h-9 flex items-center justify-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQty(product.id, qty + 1)}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[15px] font-bold text-gray-900">R{lineTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue shopping */}
              <Link
                href="/"
                className="flex items-center gap-2 text-[13px] text-emerald-600 hover:text-emerald-700 font-medium transition-colors w-fit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Continue shopping
              </Link>
            </div>

            {/* ── Right: Order summary ── */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-20">
                <div className="px-5 py-4 border-b border-gray-50">
                  <h2 className="text-[15px] font-semibold text-gray-800">Order summary</h2>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {/* Line items */}
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex justify-between items-start text-[13px]">
                      <span className="text-gray-600 leading-snug pr-4">
                        {product.name}
                        <span className="text-gray-400 ml-1">×{qty}</span>
                      </span>
                      <span className="text-gray-800 font-medium flex-shrink-0">
                        R{(product.priceNum * qty).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-gray-100 pt-3 space-y-2">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-800 font-medium">R{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-500">Delivery</span>
                      <span className={`font-medium ${deliveryFree ? 'text-emerald-600' : 'text-gray-800'}`}>
                        {deliveryFree ? 'FREE' : `R${delivery.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="text-[15px] font-bold text-gray-900">Total</span>
                    <span className="text-[20px] font-bold text-gray-900">R{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="px-5 pb-5 space-y-2">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-[15px] py-3.5 rounded-xl transition-all">
                    Checkout →
                  </button>
                  <p className="text-center text-[11px] text-gray-400 mt-1">Secure checkout · SSL encrypted</p>
                </div>

                {/* Trust badges */}
                <div className="border-t border-gray-50 px-5 py-4 grid grid-cols-2 gap-3">
                  {[
                    { icon: '🔒', label: 'Secure payment' },
                    { icon: '↩️', label: '30-day returns' },
                    { icon: '✅', label: 'Authentic products' },
                    { icon: '🚚', label: 'Fast delivery' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                      <span className="text-base">{b.icon}</span>
                      <span className="text-[11px] text-gray-500">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
