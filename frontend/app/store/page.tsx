import Link from 'next/link';

interface Ebook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
}

async function getEbooks(): Promise<Ebook[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ebooks`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch ebooks');
  }
  
  const data = await res.json();
  return data.data;
}

export default async function StorePage() {
  const ebooks = await getEbooks();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Vidoebooks Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ebooks.map((book) => (
          <Link key={book.id} href={`/store/${book.id}`}>
            <div className="group cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={book.coverUrl} 
                alt={`Cover of ${book.title}`} 
                className="w-full h-64 object-cover group-hover:opacity-90"
              />
              <div className="p-4 bg-white">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{book.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
