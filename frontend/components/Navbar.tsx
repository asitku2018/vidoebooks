import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              Vidoebooks
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">About Us</Link>
              <Link href="/store" className="text-base font-medium text-gray-500 hover:text-gray-900">Ebook Store</Link>
              <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">Contact Us</Link>
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <Link href="/login" className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-gray-50">
              Log in
            </Link>
            <Link href="/signup" className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
