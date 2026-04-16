'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { Database } from '@/lib/supabase/database.types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];

interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

const STATUS_COLOURS: Record<string, string> = {
  pending:    'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed:  'bg-blue-50 text-blue-700 border-blue-200',
  processing: 'bg-purple-50 text-purple-700 border-purple-200',
  shipped:    'bg-indigo-50 text-indigo-700 border-indigo-200',
  delivered:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled:  'bg-red-50 text-red-700 border-red-200',
  refunded:   'bg-gray-50 text-gray-600 border-gray-200',
};

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [tab, setTab] = useState<'orders' | 'profile'>('orders');

  // Redirect if not signed in
  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  // Load orders
  useEffect(() => {
    if (!user) return;
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setOrders((data as OrderWithItems[]) ?? []);
        setOrdersLoading(false);
      });
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const initials = (user.user_metadata?.full_name as string | undefined)
    ?.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
    || user.email?.slice(0, 2).toUpperCase() || 'ME';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="text-[18px] font-semibold text-gray-900">
          Super<span className="text-emerald-600">Buys</span>
        </button>
        <button onClick={signOut} className="text-[12px] text-red-500 hover:text-red-600 border border-red-200 rounded-lg px-3 py-1.5 transition-colors">
          Sign out
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-600 text-white font-bold text-[18px] rounded-full flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-[16px] font-semibold text-gray-900">
              {user.user_metadata?.full_name || 'My Account'}
            </p>
            <p className="text-[13px] text-gray-400">{user.email}</p>
            <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">
              Member since {new Date(user.created_at).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white border border-gray-100 rounded-xl p-1 mb-6 gap-1">
          {(['orders', 'profile'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 text-[13px] font-medium py-2 rounded-lg transition-all ${tab === t ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t === 'orders' ? `Order history (${orders.length})` : 'Profile'}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {tab === 'orders' && (
          <div className="space-y-3">
            {ordersLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-[15px] font-medium text-gray-600 mb-1">No orders yet</p>
                <p className="text-[13px] text-gray-400 mb-4">Your order history will appear here once you place an order.</p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                  Start shopping
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
                    <div>
                      <p className="text-[12px] font-semibold text-gray-900">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {new Date(order.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_COLOURS[order.status]}`}>
                        {order.status}
                      </span>
                      <span className="text-[14px] font-bold text-gray-900">R{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="px-5 py-3 space-y-1.5">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between text-[12px]">
                        <span className="text-gray-600">{item.product_brand} {item.product_name} ×{item.qty}</span>
                        <span className="text-gray-900 font-medium">R{item.line_total.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-50">
                      <span>Delivery</span>
                      <span>{order.delivery_fee === 0 ? 'FREE' : `R${order.delivery_fee.toFixed(2)}`}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile tab */}
        {tab === 'profile' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="text-[14px] font-semibold text-gray-900">Profile details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Full name</label>
                <p className="text-[13px] text-gray-900 bg-gray-50 rounded-lg px-3 py-2">
                  {user.user_metadata?.full_name || '—'}
                </p>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Email</label>
                <p className="text-[13px] text-gray-900 bg-gray-50 rounded-lg px-3 py-2">{user.email}</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-400">
              To update your profile details, contact support or use the Supabase dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
