export { default } from 'next-auth/middleware'
export const config = { matcher: ['/cart', '/checkout', '/orders/:path*', '/profile'] }

