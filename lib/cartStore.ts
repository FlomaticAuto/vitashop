import { create } from 'zustand';
import { Product } from './products';

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, { product, qty: 1 }], isOpen: true };
    });
  },

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.product.id !== id) })),

  updateQty: (id, qty) =>
    set((state) => ({
      items:
        qty <= 0
          ? state.items.filter((i) => i.product.id !== id)
          : state.items.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    })),

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, i) => sum + i.product.priceNum * i.qty, 0),

  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}));
