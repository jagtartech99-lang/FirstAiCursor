import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions as any)) as any
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { items, address, paymentMethod } = body ?? {}
  if (!Array.isArray(items) || items.length === 0) return NextResponse.json({ error: 'Empty cart' }, { status: 400 })

  // Fetch menu items to validate prices
  const menuItems = await prisma.menuItem.findMany({ where: { id: { in: items.map((i: any) => i.id) } } })
  const menuMap = new Map(menuItems.map((m) => [m.id, m]))
  let subtotal = 0
  for (const i of items) {
    const m = menuMap.get(i.id)
    if (!m) return NextResponse.json({ error: 'Invalid item' }, { status: 400 })
    subtotal += m.priceCents * i.quantity
  }

  const deliveryFeeCents = 299
  const totalCents = subtotal + deliveryFeeCents

  const restaurantId = menuItems[0]?.restaurantId
  if (!restaurantId) return NextResponse.json({ error: 'Invalid items' }, { status: 400 })

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      restaurantId,
      status: 'PLACED',
      totalCents,
      deliveryFeeCents,
      addressLine1: address.line1,
      addressLine2: address.line2 ?? null,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      paymentMethod,
      items: {
        create: items.map((i: any) => ({
          menuItemId: i.id,
          quantity: i.quantity,
          priceCents: menuMap.get(i.id)!.priceCents,
        })),
      },
    },
  })

  return NextResponse.json({ id: order.id })
}

export async function GET() {
  const session = (await getServerSession(authOptions as any)) as any
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orders = await prisma.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(orders)
}

