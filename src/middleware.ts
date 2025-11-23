export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/my-library/:path*', '/profile/:path*'],
};
