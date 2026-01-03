import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const privateRoutes = ['/private', '/dashboard', '/admin', '/secret'];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;

  const isAuthenticated = Boolean(token);
  const isUser = token?.role === 'user';
  const isPrivateRoute = privateRoutes.some(route => reqPath.startsWith(route));
  console.log({ token, isAuthenticated, isUser, reqPath, isPrivateRoute });

  console.log(req.url);

  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL('/api/auth/signin', req.url);
    loginUrl.searchParams.set('callbackUrl', reqPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: [
    '/private/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    '/secret/:path*',
  ],
};
