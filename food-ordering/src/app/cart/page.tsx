"use client"
import { useCart } from '@/store/cart'

export default function CartPage() {
  const { items, setQuantity, remove } = useCart()
  const subtotal = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Your cart</h1>
      <div className="mt-6 space-y-4">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between rounded border p-4">
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-sm text-gray-600">${(i.priceCents / 100).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3">
              <input type="number" min={1} className="w-16 rounded border px-2 py-1" value={i.quantity} onChange={(e) => setQuantity(i.id, Number(e.target.value))} />
              <button className="text-red-600" onClick={() => remove(i.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-medium">Subtotal</span>
        <span className="text-lg font-semibold">${(subtotal / 100).toFixed(2)}</span>
      </div>
      <a href="/checkout" className="mt-6 inline-block rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark">Checkout</a>
    </main>
  )
}

