import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins =
    process.env.NODE_ENV === 'production'
        ? ['https://up-image.dlbd.vn', 'https://oga.datxe.com']
        : ['http://localhost:3000'];
export function middleware(request: NextRequest) {
    const login = request.cookies.get('login');
    const check_login = !login?.value ? false : true;
    const access_token = request.cookies.get('access_token');
    const check_token = !access_token?.value ? false : true;
    const origin = request.headers.get('origin');

    const res_404 = new NextResponse(null, {
        status: 404,
        statusText: 'Bad request',
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    if (origin && !allowedOrigins.includes(origin)) {
        return res_404;
    }
    if (!check_login && !check_token) {
        return res_404;
    }
    // retrieve the current response
    const res = NextResponse.next();

    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', 'true');
    res.headers.append('Access-Control-Allow-Origin', '*'); // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );

    return res;
}
export { default } from 'next-auth/middleware';
export const config = {
    matcher: ['/dashboard/:path*', '/gio-hang/:path*', '/admin/:path*'],
};
