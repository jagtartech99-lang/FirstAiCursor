import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function OrdersPage() {
  const session = (await getServerSession(authOptions as any)) as any
  if (!session?.user?.email) return null
  const user = await prisma.user.findUnique({ where: { email: session.user.email as string } })
  if (!user) return null
  const orders = await prisma.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } })
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Your orders</h1>
      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</span>
              <span className="text-sm font-medium">{o.status}</span>
            </div>
            <div className="mt-2 font-semibold">${(o.totalCents / 100).toFixed(2)}</div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-gray-600">No orders yet.</p>}
      </div>
    </main>
  )
}

