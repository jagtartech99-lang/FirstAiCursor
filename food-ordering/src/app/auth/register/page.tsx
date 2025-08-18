"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) {
      await signIn('credentials', { email: form.email, password: form.password, redirect: false })
      router.push('/restaurants')
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Name</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required/>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required/>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required/>
        </div>
        <button disabled={loading} className="w-full rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark disabled:opacity-60">
          {loading ? 'Creating…' : 'Create account'}
        </button>
        <p className="text-sm text-gray-600">Already have an account? <a href="/auth/login" className="text-brand hover:underline">Sign in</a></p>
      </form>
    </main>
  )
}

