export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Foodly</h1>
        <p className="mt-3 text-gray-600">Order from the best restaurants around you.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a className="rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark" href="/restaurants">Browse restaurants</a>
          <a className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50" href="/auth/login">Sign in</a>
        </div>
      </section>
    </main>
  );
}

