import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Reader from '@/components/Reader';

interface EbookDetail {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  coverUrl: string;
}

async function getEbookDetails(id: string): Promise<EbookDetail> {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ebooks/${id}`, {
    headers: {
      Cookie: `token=${token}`
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 401) redirect('/login');
    throw new Error('Failed to fetch ebook details');
  }

  const data = await res.json();
  return data.data;
}

export default async function EbookReaderPage({ params }: { params: { id: string } }) {
  const ebook = await getEbookDetails(params.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{ebook.title}</h1>
        <p className="text-lg text-gray-600 mt-2">By {ebook.author}</p>
      </div>
      
      <Reader title={ebook.title} content={ebook.content} />
    </div>
  );
}
