"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (!res?.error) router.push('/restaurants')
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button disabled={loading} className="w-full rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-sm text-gray-600">No account? <a href="/auth/register" className="text-brand hover:underline">Create one</a></p>
      </form>
    </main>
  )
}

