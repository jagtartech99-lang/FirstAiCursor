import { prisma } from '@/lib/prisma'
import React from 'react'
import AddToCart from './product.client'

export default async function RestaurantDetail({ params }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
    include: { menus: true },
  })
  if (!restaurant) return <div className="p-6">Not found</div>
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">{restaurant.name}</h1>
      <p className="text-gray-600">{restaurant.cuisine}</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {restaurant.menus.map((m) => (
          <div key={m.id} className="rounded border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{m.name}</h3>
              <span>${(m.priceCents / 100).toFixed(2)}</span>
            </div>
            {m.description && <p className="mt-1 text-sm text-gray-600">{m.description}</p>}
            <AddToCart id={m.id} name={m.name} priceCents={m.priceCents} />
          </div>
        ))}
      </div>
    </main>
  )
}
