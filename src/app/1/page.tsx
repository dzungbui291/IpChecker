import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
    images: [
      { url: '/images/pic-1.jpg', width: 1200, height: 630, alt: '' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '',
    description: '',
    images: ['/images/pic-1.jpg'],
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <Image
            src="/images/pic-1.jpg"
            alt=""
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}


