'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  barcode: string;
  fallbackImage: string;
  name: string;
}

export default function ProductImage({ barcode, fallbackImage, name }: Props) {
  const [src, setSrc] = useState<string>(fallbackImage);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchImage() {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json?fields=image_front_url,image_url`
        );
        const data = await res.json();
        if (!cancelled && data.status === 1 && data.product) {
          const img = data.product.image_front_url || data.product.image_url;
          if (img) setSrc(img);
        }
      } catch {
        // keep fallback
      }
    }
    fetchImage();
    return () => { cancelled = true; };
  }, [barcode, fallbackImage]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={name}
        width={140}
        height={130}
        className={`object-contain max-h-[130px] transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
          setSrc('/placeholder-vitamin.png');
        }}
        unoptimized
      />
    </div>
  );
}
