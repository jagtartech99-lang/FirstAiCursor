import { prisma } from '@/lib/prisma'

export default async function RestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany({ orderBy: { rating: 'desc' } })
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Restaurants</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((r) => (
          <a key={r.id} href={`/restaurants/${r.id}`} className="rounded-lg border p-4 hover:shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{r.name}</h2>
              <span className="text-sm text-gray-600">{r.rating.toFixed(1)}★</span>
            </div>
            <p className="text-sm text-gray-600">{r.cuisine}</p>
          </a>
        ))}
      </div>
    </main>
  )
}

