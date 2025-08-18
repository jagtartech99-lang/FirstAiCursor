"use client"
import { useCart } from '@/store/cart'

export default function AddToCart({ id, name, priceCents }: { id: string; name: string; priceCents: number }) {
  const add = useCart((s) => s.add)
  return (
    <button onClick={() => add({ id, name, priceCents })} className="mt-3 rounded-md bg-brand px-3 py-1.5 text-white hover:bg-brand-dark">
      Add to cart
    </button>
  )
}

