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
    <main className="min-h-screen">
      <div className="fixed inset-0">
        <Image
          src="/images/pic-1.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
    </main>
  );
}


