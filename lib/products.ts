export type BadgeType = 'popular' | 'new' | 'sale' | null;

export interface Product {
  id: string;
  brand: string;
  name: string;
  desc: string;
  price: string;
  originalPrice?: string;
  badge: BadgeType;
  badgeLabel: string;
  image: string;   // local /public/products/ path
  category: string;
}

export const products: Product[] = [
  {
    id: 'centrum-active',
    brand: 'Centrum',
    name: 'Centrum Active Multivitamin',
    desc: 'Elevated B-vitamins, iron, ginseng & antioxidants for active lifestyles. 30 tablets.',
    price: 'R209.99',
    badge: 'popular',
    badgeLabel: 'Best seller',
    image: '/products/centrum-active.jpg',
    category: 'multivitamins',
  },
  {
    id: 'centrum-lutein',
    brand: 'Centrum',
    name: 'Centrum with Lutein',
    desc: 'Multivitamin enriched with Lutein & Zeaxanthin for vision & immune support. 30 tabs.',
    price: 'R219.99',
    badge: 'new',
    badgeLabel: 'New',
    image: '/products/centrum-lutein.jpg',
    category: 'multivitamins',
  },
  {
    id: 'berocca-performance',
    brand: 'Berocca',
    name: 'Berocca Performance Orange',
    desc: 'Effervescent B-vitamin complex for energy, focus & mental sharpness. 15 tablets.',
    price: 'R149.99',
    badge: 'popular',
    badgeLabel: 'Best seller',
    image: '/products/berocca-performance.jpg',
    category: 'energy',
  },
  {
    id: 'berocca-boost',
    brand: 'Berocca',
    name: 'Berocca Boost Energy',
    desc: 'Extra guarana for sustained energy release. Sugar-free effervescent. 10 tabs.',
    price: 'R139.99',
    badge: null,
    badgeLabel: '',
    image: '/products/berocca-boost.jpg',
    category: 'energy',
  },
  {
    id: 'staminogro',
    brand: 'Staminogro',
    name: 'Staminogro Energy & Fertility',
    desc: 'Comprehensive support for energy production, vitality & reproductive health. 60 caps.',
    price: 'R249.99',
    badge: null,
    badgeLabel: '',
    image: '/products/staminogro.jpg',
    category: 'multivitamins',
  },
  {
    id: 'biogen',
    brand: 'Biogen',
    name: 'Biogen Daily Nutritional Stack',
    desc: 'Premium SA brand. Complete daily vitamin & mineral formula. 60 capsules.',
    price: 'R219.99',
    badge: 'new',
    badgeLabel: 'New',
    image: '/products/biogen.jpg',
    category: 'multivitamins',
  },
  {
    id: 'caltrate',
    brand: 'Caltrate',
    name: 'Caltrate 600+D3 Bone Health',
    desc: 'High-potency calcium with Vitamin D3 for strong bones & teeth. 60 tablets.',
    price: 'R169.99',
    badge: 'popular',
    badgeLabel: 'Popular',
    image: '/products/caltrate.jpg',
    category: 'calcium',
  },
  {
    id: 'calc-vita',
    brand: 'Cal-C-Vita',
    name: 'Cal-C-Vita Effervescent',
    desc: 'Calcium + Vitamin C effervescent. Immune & bone support. Citrus flavour. 20 tabs.',
    price: 'R89.99',
    originalPrice: 'R109.00',
    badge: 'sale',
    badgeLabel: 'On special',
    image: '/products/calc-vita.jpg',
    category: 'calcium',
  },
  {
    id: 'menacal',
    brand: 'MenaCal.7',
    name: 'MenaCal.7 Calcium K2+D3',
    desc: 'Triple-action formula — K2 directs calcium to bones, not arteries. 30 capsules.',
    price: 'R299.99',
    badge: null,
    badgeLabel: '',
    image: '/products/menacal.jpg',
    category: 'calcium',
  },
  {
    id: 'ciplaton',
    brand: 'Ciplaton',
    name: 'Ciplaton Energy Multivitamin',
    desc: 'Iron-enriched multivitamin for sustained energy & vitality. 30 tablets.',
    price: 'R129.99',
    badge: null,
    badgeLabel: '',
    image: '/products/ciplaton.jpg',
    category: 'energy',
  },
  {
    id: 'vitaforce',
    brand: 'Vitaforce',
    name: 'Vitaforce Ultra Vitamin A-Z',
    desc: 'Comprehensive A to Z formula with 26 essential vitamins & minerals. 60 tablets.',
    price: 'R179.99',
    badge: 'popular',
    badgeLabel: 'Popular',
    image: '/products/vitaforce.jpg',
    category: 'multivitamins',
  },
  {
    id: 'bio-strath',
    brand: 'Bio-Strath',
    name: 'Bio-Strath Daily Tonic',
    desc: 'Natural herbal yeast tonic rich in B-vitamins, amino acids & trace elements. 100ml.',
    price: 'R239.99',
    badge: null,
    badgeLabel: '',
    image: '/products/bio-strath.jpg',
    category: 'multivitamins',
  },
];

export const categories = [
  { id: 'all', label: 'All products' },
  { id: 'multivitamins', label: 'Multivitamins' },
  { id: 'calcium', label: 'Calcium & Bone' },
  { id: 'energy', label: 'Energy & Performance' },
];
