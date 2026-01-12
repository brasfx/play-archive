export { default as proxy } from 'next-auth/middleware';

export const config = {
  matcher: ['/my-library/:path*', '/profile', '/friendlist/:path*'],
};
