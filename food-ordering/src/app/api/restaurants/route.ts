import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { rating: 'desc' },
    select: { id: true, name: true, cuisine: true, rating: true },
  })
  return NextResponse.json(restaurants)
}

