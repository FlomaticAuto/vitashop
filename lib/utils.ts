export function barcodeToPath(barcode: string): string {
  const padded = barcode.padStart(13, '0');
  return (
    padded.slice(0, 3) +
    '/' +
    padded.slice(3, 6) +
    '/' +
    padded.slice(6, 9) +
    '/' +
    padded.slice(9)
  );
}

export function getFallbackImageUrl(barcode: string): string {
  const path = barcodeToPath(barcode);
  return `https://images.openfoodfacts.org/images/products/${path}/front_en.3.400.jpg`;
}
