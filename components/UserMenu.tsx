'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  if (!user) return null;

  const initials = (user.user_metadata?.full_name as string | undefined)
    ?.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
    || user.email?.slice(0, 2).toUpperCase()
    || 'ME';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-full flex items-center justify-center transition-colors"
        aria-label="Account menu"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
          <div className="px-4 py-2.5 border-b border-gray-50">
            <p className="text-[12px] font-semibold text-gray-900 truncate">
              {user.user_metadata?.full_name || 'My Account'}
            </p>
            <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => { router.push('/account'); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My account
          </button>
          <button
            onClick={() => { router.push('/account/orders'); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Order history
          </button>
          <div className="border-t border-gray-50 mt-1">
            <button
              onClick={async () => { await signOut(); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
