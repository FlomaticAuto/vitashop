import { NextRequest, NextResponse } from 'next/server';

function barcodeToPath(barcode: string): string {
  const padded = barcode.padStart(13, '0');
  return `${padded.slice(0, 3)}/${padded.slice(3, 6)}/${padded.slice(6, 9)}/${padded.slice(9)}`;
}

// Candidate image filenames to try on Open Food Facts CDN
function getCandidateUrls(barcode: string): string[] {
  const path = barcodeToPath(barcode);
  const base = `https://images.openfoodfacts.org/images/products/${path}`;
  return [
    `${base}/front_en.3.400.jpg`,
    `${base}/front_en.4.400.jpg`,
    `${base}/front_en.5.400.jpg`,
    `${base}/front_en.6.400.jpg`,
    `${base}/front_en.14.400.jpg`,
    `${base}/front.3.400.jpg`,
    `${base}/front.4.400.jpg`,
    `${base}/front.5.400.jpg`,
    `${base}/1.400.jpg`,
    `${base}/2.400.jpg`,
  ];
}

async function tryFetchOffApi(barcode: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json?fields=image_front_url,image_url`,
      {
        headers: { 'User-Agent': 'VitaShop/1.0 (vitashop@example.com)' },
        next: { revalidate: 86400 }, // cache for 24h
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === 1 && data.product) {
      return data.product.image_front_url || data.product.image_url || null;
    }
  } catch {
    // fall through
  }
  return null;
}

async function tryImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const barcode = request.nextUrl.searchParams.get('barcode');
  if (!barcode) {
    return NextResponse.json({ error: 'barcode required' }, { status: 400 });
  }

  // 1. Try the OFF API first (most accurate)
  const apiUrl = await tryFetchOffApi(barcode);
  if (apiUrl) {
    return NextResponse.json(
      { url: apiUrl },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      }
    );
  }

  // 2. Try candidate CDN URLs
  const candidates = getCandidateUrls(barcode);
  for (const url of candidates) {
    const ok = await tryImageUrl(url);
    if (ok) {
      return NextResponse.json(
        { url },
        {
          headers: {
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
          },
        }
      );
    }
  }

  // 3. Nothing found — tell client to use fallback
  return NextResponse.json({ url: null }, { status: 404 });
}
