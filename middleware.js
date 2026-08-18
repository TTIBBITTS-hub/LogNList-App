import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/login') || pathname.startsWith('/api/login')) {
    return NextResponse.next();
  }

  // The sell pages are the shop window — buyers have to reach them without a
  // password. /api/sell only ever returns listing fields, never the location,
  // the valuation or your own notes.
  if (pathname.startsWith('/sell') || pathname.startsWith('/api/sell')) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get('auth_token');
  const expected = process.env.SESSION_TOKEN;

  if (cookie && expected && cookie.value === expected) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
