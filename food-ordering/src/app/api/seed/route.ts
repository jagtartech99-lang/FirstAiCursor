import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  const ownerEmail = 'owner@example.com'
  const existing = await prisma.user.findUnique({ where: { email: ownerEmail } })
  let owner = existing
  if (!owner) {
    owner = await prisma.user.create({ data: { name: 'Owner', email: ownerEmail, passwordHash: await bcrypt.hash('password', 10), role: 'OWNER' } })
  }

  const rest = await prisma.restaurant.upsert({
    where: { id: 'seed-rest-1' },
    update: {},
    create: {
      id: 'seed-rest-1',
      name: 'Seed Bistro',
      cuisine: 'International',
      ownerId: owner!.id,
      rating: 4.7,
      menus: {
        create: [
          { name: 'Bruschetta', priceCents: 800, category: 'APPETIZER' },
          { name: 'Steak Frites', priceCents: 2200, category: 'MAIN' },
          { name: 'Chocolate Lava Cake', priceCents: 900, category: 'DESSERT' },
          { name: 'Iced Tea', priceCents: 400, category: 'DRINK' },
        ],
      },
    },
  })
  return NextResponse.json({ ok: true, restaurant: rest.id })
}

