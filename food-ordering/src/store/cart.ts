import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = { id: string; name: string; priceCents: number; quantity: number }

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  remove: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
          set({ items: get().items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i)) })
        } else {
          set({ items: [...get().items, { ...item, quantity }] })
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      setQuantity: (id, quantity) => set({ items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)) }),
      clear: () => set({ items: [] }),
    }),
    { name: 'foodly-cart' }
  )
)

