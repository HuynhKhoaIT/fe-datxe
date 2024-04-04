import { stringToHash } from '@/utils/until';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Số điện thoại',
            credentials: {
                phone: { label: 'Phone', type: 'text', placeholder: '090909000' },
                password: { label: 'Mật khẩu', type: 'password' },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch('https://v2.dlbd.vn/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: credentials?.phone,
                        password: credentials?.password,
                    }),
                });

                const user = await res.json();
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    // return user.user;
                    return Promise.resolve(user.user);
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.phone = user.phone;
                token.address = user.address;
                token.token = user.token;
                token.garageId = user.garageId;
                token.isAdmin = user.garageId;
                token.role = user.role;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: '/dang-nhap',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
