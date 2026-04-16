export type BadgeType = 'popular' | 'new' | 'sale' | null;

export interface Product {
  id: string;
  brand: string;
  name: string;
  desc: string;
  price: string;
  priceNum: number;
  originalPrice?: string;
  badge: BadgeType;
  badgeLabel: string;
  image: string;
  category: string;
}

// Real product images scraped from Google Shopping ZA via Apify
export const products: Product[] = [
  {
    id: 'centrum-active',
    brand: 'Centrum',
    name: 'Centrum Active Multivitamin',
    desc: 'Elevated B-vitamins, iron, ginseng & antioxidants for active lifestyles. 30 tablets.',
    price: 'R209.99', priceNum: 209.99,
    badge: 'popular', badgeLabel: 'Best seller',
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTt04qvcjMquImwfP8y_OvWkmBhkeUpaleqZEq77GeN_BssirH_8LCIjJCeEozX_c5iBPryr1m9JVO5iVuZPXLRw9KZ4mq4EQ',
    category: 'multivitamins',
  },
  {
    id: 'centrum-lutein',
    brand: 'Centrum',
    name: 'Centrum with Lutein',
    desc: 'Multivitamin enriched with Lutein & Zeaxanthin for vision & immune support. 30 tabs.',
    price: 'R219.99', priceNum: 219.99,
    badge: 'new', badgeLabel: 'New',
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSp-djv11uGs1EqSsCu8e9is_lX1Q5_IOifRGIYUTIwCY_Hxo4to6FLQuqtH4aEB7O9S84Jm9yZq0age-b77RSGu5Lk7aJ7Zg',
    category: 'multivitamins',
  },
  {
    id: 'berocca-performance',
    brand: 'Berocca',
    name: 'Berocca Performance Orange',
    desc: 'Effervescent B-vitamin complex for energy, focus & mental sharpness. 15 tablets.',
    price: 'R149.99', priceNum: 149.99,
    badge: 'popular', badgeLabel: 'Best seller',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTuyj_CNC0dAhxeOwbWjDK4tDLKhEtzhcA9z6eYbVXFyICn5DNBvkiCR9BMWhrJrQyWO8xpus6cgM5HkoL_GOt1EvuS7yQL',
    category: 'energy',
  },
  {
    id: 'berocca-boost',
    brand: 'Berocca',
    name: 'Berocca Boost Energy',
    desc: 'Extra guarana for sustained energy release. Sugar-free effervescent. 10 tabs.',
    price: 'R139.99', priceNum: 139.99,
    badge: null, badgeLabel: '',
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRG7PoDqCVZzbzU8J6jpx1PvdDOLa1iMiXNMNm2aK98txenuZIfFC6XSIpwIqziqs1eOh3v2ojmJAo07dd1tQI79ziPm-sErUL0q8Vcg5udSsgQ1mXr01IG',
    category: 'energy',
  },
  {
    id: 'staminogro',
    brand: 'Staminogro',
    name: 'Staminogro Energy & Fertility',
    desc: 'Comprehensive support for energy production, vitality & reproductive health. 60 caps.',
    price: 'R249.99', priceNum: 249.99,
    badge: null, badgeLabel: '',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQCvjV0p_wLfYxbmy9C1lbHAKzrZQRVYQhfrLb0sY0RhfOa4ntm4pHyaNeVtGW1gHajuH7oFcIb5ZwAXHnWTd51CLx9JQw28nzOb8HMs1p-x9SbX950ZsFdMw',
    category: 'multivitamins',
  },
  {
    id: 'biogen',
    brand: 'Biogen',
    name: 'Biogen Daily Nutritional Stack',
    desc: 'Premium SA brand. Complete daily vitamin & mineral formula. 60 capsules.',
    price: 'R219.99', priceNum: 219.99,
    badge: 'new', badgeLabel: 'New',
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSDBP4MI0TDXh-CR7flvaUi9WZe3IguHSovGcDy3MUbVgZ7DW-DgRDJQ6qCRbWWq8FtuvTiq-rbLSCF-0OHzU7ndT43KN2WBNS0XR2zOQRB_LP8aC26-cw2',
    category: 'multivitamins',
  },
  {
    id: 'caltrate',
    brand: 'Caltrate',
    name: 'Caltrate 600+D Bone Health',
    desc: 'High-potency calcium with Vitamin D3 for strong bones & teeth. 60 tablets.',
    price: 'R169.99', priceNum: 169.99,
    badge: 'popular', badgeLabel: 'Popular',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQQitA4lDF_xj1i2kE0ZRDtqln2jAZz2a5hdJAsMrXZiYmJNnfrgF1ikGiX5HMHRNMs7zc0zLNu02E1MYwzo1h8ka6wUY2S3B9upr-U5YWAuPVi-j4N_1l66g',
    category: 'calcium',
  },
  {
    id: 'calc-vita',
    brand: 'Cal-C-Vita',
    name: 'Cal-C-Vita Plus Effervescent',
    desc: 'Calcium + Vitamin C effervescent. Immune & bone support. Citrus flavour. 30 tabs.',
    price: 'R89.99', priceNum: 89.99,
    originalPrice: 'R109.00',
    badge: 'sale', badgeLabel: 'On special',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRAO202tz4GOdb8-no4GekzU566-GJ0sEQ71gR4AfXHniIfgIRENaE2HFtHc5pcOzeoyWUkC6zFi5j7BL6eSt9T4BX8P6lTkQYmf-JB7AypCGZYWLEqltmz',
    category: 'calcium',
  },
  {
    id: 'menacal',
    brand: 'MenaCal.7',
    name: 'MenaCal.7 Calcium K2+D3',
    desc: 'Triple-action formula — K2 directs calcium to bones, not arteries. 30 capsules.',
    price: 'R199.99', priceNum: 199.99,
    badge: null, badgeLabel: '',
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcShlr_iz46EzVCiOMgMeoOU1VACouyvr1Q90ZdG-1J-32pffOR88aZnw_jRurzsPOSYluLp4kGiOCNHe2Ic3gi5YHZEiQMj',
    category: 'calcium',
  },
  {
    id: 'ciplaton',
    brand: 'Ciplaton',
    name: 'Ciplaton Capsules',
    desc: 'Iron-enriched multivitamin capsules for sustained energy & vitality. 60 capsules.',
    price: 'R129.99', priceNum: 129.99,
    badge: null, badgeLabel: '',
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQnU0XV5ywwzcjfzYyNhznr4ayN4FBzGqIzc7IVOS8wW8WvZec-omAw7tSbGrQOTseyrKhOV4DPgmsu0nITi6F04Tr2zvcw3fIDhKRbCtNFHAcSL9S5nad1',
    category: 'energy',
  },
  {
    id: 'vitaforce',
    brand: 'Vitaforce',
    name: 'Vitaforce Ultra Vitamin A-Z',
    desc: 'Comprehensive A to Z formula with 26 essential vitamins & minerals. 60 tablets.',
    price: 'R179.99', priceNum: 179.99,
    badge: 'popular', badgeLabel: 'Popular',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRaKWvaFDR1nFa5iJ-5eQw7MuWjD2GmRRHM_U3dMxggVerM_DrXreBuYlhFz5INQwz8lcn-f7XrBh0MhZR4WZkfWnpHBD_1CA',
    category: 'multivitamins',
  },
  {
    id: 'bio-strath',
    brand: 'Bio-Strath',
    name: 'Bio-Strath Daily Tonic',
    desc: 'Natural herbal yeast tonic rich in B-vitamins, amino acids & trace elements. 100ml.',
    price: 'R219.99', priceNum: 219.99,
    badge: null, badgeLabel: '',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSlF1-UqY2ynaRDME2mRhq4AqVIktQtjHmumDVLHJkA56HpL5tlqryGtvtFI7GDLoG8kuiC3fjMSe7k0qKCC2UKiDWZUeBD',
    category: 'multivitamins',
  },
];

export const categories = [
  { id: 'all', label: 'All products' },
  { id: 'multivitamins', label: 'Multivitamins' },
  { id: 'calcium', label: 'Calcium & Bone' },
  { id: 'energy', label: 'Energy & Performance' },
];
