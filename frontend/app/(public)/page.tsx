import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          Listen to your favorite books in{' '}
          <span className="relative whitespace-nowrap text-blue-600">
            Indian Languages
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Vidoebooks is the premier digital library allowing you to read or listen to an expansive collection of literature in Hindi, Tamil, Bengali, Telugu, and more.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Link
            href="/store"
            className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Browse Store
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-blue-50 px-8 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-100"
          >
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
