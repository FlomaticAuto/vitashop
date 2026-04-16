'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  barcode: string;
  directImage: string;
  name: string;
}

// SVG placeholder rendered inline — no external request needed
function Placeholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-300">
      <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
        <rect x="8" y="4" width="48" height="56" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="16" y="12" width="32" height="4" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="16" y="20" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="16" y="27" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="32" cy="44" r="8" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <text x="32" y="48" textAnchor="middle" fontSize="7" fill="currentColor" fontWeight="600" opacity="0.7">{initials}</text>
      </svg>
      <span className="text-[9px] text-gray-300 text-center px-2 leading-tight">{name}</span>
    </div>
  );
}

export default function ProductImage({ barcode, directImage, name }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      // Step 1 — ask our server-side proxy (no CORS, tries multiple OFF variants)
      try {
        const res = await fetch(`/api/product-image?barcode=${barcode}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.url) {
            setSrc(data.url);
            return;
          }
        }
      } catch {
        // fall through
      }

      // Step 2 — use the directImage URL embedded in the product data
      if (!cancelled) {
        setSrc(directImage);
      }
    }

    resolve();
    return () => { cancelled = true; };
  }, [barcode, directImage]);

  if (failed) return <Placeholder name={name} />;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}
      {src && (
        <Image
          src={src}
          alt={name}
          width={140}
          height={130}
          className={`object-contain max-h-[130px] transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            // directImage also failed — try the other candidate
            if (src !== directImage) {
              setSrc(directImage);
            } else {
              setFailed(true);
              setLoading(false);
            }
          }}
          unoptimized
        />
      )}
    </div>
  );
}
