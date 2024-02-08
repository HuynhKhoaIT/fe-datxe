export { default } from 'next-auth/middleware';
export const config = {
    matcher: ['/dashboard/:path*', '/gio-hang/:path*', '/admin/:path*'],
};
