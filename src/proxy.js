import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const privateRoutes = ['/private', '/dashboard', '/admin', '/secret'];
const adminRoutes = ['/dashboard'];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;

  const isAuthenticated = Boolean(token);

  const isUser = token?.role === 'user';

  const isAdmin = token?.role === 'admin';

  const isPrivateRoute = privateRoutes.some(route => reqPath.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => reqPath.startsWith(route));

  console.log({ token, isAuthenticated, isUser, reqPath, isPrivateRoute });

  console.log(req.url);

  // Logic for Private Route
  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL('/api/auth/signin', req.url);
    loginUrl.searchParams.set('callbackUrl', reqPath);
    return NextResponse.redirect(loginUrl);
  }

  // Logic for Admin Route
  if (isAuthenticated && !isAdmin && isAdminRoute) {
    return NextResponse.rewrite(new URL('/forbidden', req.url));
    // return NextResponse.redirect(new URL('/forbidden', req.url));
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
