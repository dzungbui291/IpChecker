import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua API, static files, _next, favicon
  const isBypassed = pathname.startsWith('/api')
    || pathname.startsWith('/_next')
    || pathname.startsWith('/favicon')
    || pathname.startsWith('/images')
    || /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|map)$/i.test(pathname);

  if (!isBypassed) {
    // Gọi API track ở nền (không chặn phản hồi chính)
    const url = new URL('/api/track', request.url);
    const headersToForward = [
      'cf-connecting-ip',
      'true-client-ip',
      'x-vercel-forwarded-for',
      'x-forwarded-for',
      'x-real-ip',
      'forwarded',
      'user-agent',
      'referer',
      'x-forwarded-proto',
      'x-forwarded-host',
    ];

    const init: RequestInit = {
      method: 'POST',
      headers: new Headers(
        headersToForward.reduce((acc, key) => {
          const value = request.headers.get(key);
          if (value) acc[key] = value;
          return acc;
        }, {} as Record<string, string>)
      ),
    };

    // Fire-and-forget: không await để tránh tăng latency
    void fetch(url.toString(), init).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|images|.*\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map)).*)'],
};


