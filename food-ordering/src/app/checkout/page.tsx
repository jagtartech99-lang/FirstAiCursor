"use client"
import { useState } from 'react'
import { useCart } from '@/store/cart'

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const [address, setAddress] = useState({ line1: '', city: '', state: '', postalCode: '' })
  const [payment, setPayment] = useState<'CARD' | 'WALLET' | 'CASH'>('CARD')
  const [loading, setLoading] = useState(false)
  const total = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)

  async function placeOrder() {
    setLoading(true)
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, address, paymentMethod: payment }),
    })
    setLoading(false)
    if (res.ok) {
      clear()
      window.location.href = '/orders'
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Address line 1</label>
            <input className="mt-1 w-full rounded border px-3 py-2" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-700">City</label>
              <input className="mt-1 w-full rounded border px-3 py-2" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700">State</label>
              <input className="mt-1 w-full rounded border px-3 py-2" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Postal code</label>
              <input className="mt-1 w-full rounded border px-3 py-2" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700">Payment</label>
            <select className="mt-1 w-full rounded border px-3 py-2" value={payment} onChange={(e) => setPayment(e.target.value as any)}>
              <option value="CARD">Credit card</option>
              <option value="WALLET">Digital wallet</option>
              <option value="CASH">Cash on delivery</option>
            </select>
          </div>
        </div>
        <div className="rounded border p-4">
          <h2 className="font-medium">Order summary</h2>
          <div className="mt-3 space-y-2">
            {items.map((i) => (
              <div key={i.id} className="flex items-center justify-between text-sm">
                <span>{i.name} × {i.quantity}</span>
                <span>${((i.priceCents * i.quantity) / 100).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <span className="font-medium">Total</span>
            <span className="font-semibold">${(total / 100).toFixed(2)}</span>
          </div>
          <button onClick={placeOrder} disabled={loading || items.length === 0} className="mt-4 w-full rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark disabled:opacity-60">{loading ? 'Placing…' : 'Place order'}</button>
        </div>
      </div>
    </main>
  )
}

