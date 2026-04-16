'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'signin' }: Props) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) { setError(null); setSuccess(null); setTab(defaultTab); }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (tab === 'signin') {
      const { error } = await signIn(email, password);
      if (error) { setError(error); }
      else { onClose(); }
    } else {
      if (!fullName.trim()) { setError('Please enter your name.'); setLoading(false); return; }
      const { error } = await signUp(email, password, fullName);
      if (error) { setError(error); }
      else { setSuccess('Account created! Check your email to confirm, then sign in.'); }
    }
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-0">
            <div>
              <h2 className="text-[17px] font-semibold text-gray-900">
                {tab === 'signin' ? 'Sign in' : 'Create account'}
              </h2>
              <p className="text-[12px] text-gray-400 mt-0.5">
                {tab === 'signin' ? 'Welcome back to VitaShop' : 'Join VitaShop today'}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mx-6 mt-4 bg-gray-100 rounded-lg p-1">
            {(['signin', 'signup'] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(null); setSuccess(null); }}
                className={`flex-1 text-[12px] font-medium py-1.5 rounded-md transition-all ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                {t === 'signin' ? 'Sign in' : 'Register'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-3">
            {tab === 'signup' && (
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">Full name</label>
                <input
                  type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="Quintus Lategan" required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Min 6 characters" required minLength={6}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] rounded-lg px-3 py-2">
                {success}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-[13px] py-2.5 rounded-xl transition-colors mt-1"
            >
              {loading ? 'Please wait…' : tab === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="px-6 pb-5 text-center">
            <p className="text-[11px] text-gray-400">
              {tab === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => setTab(tab === 'signin' ? 'signup' : 'signin')} className="text-emerald-600 font-medium hover:underline">
                {tab === 'signin' ? 'Register' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
