// import NextAuth from 'next-auth';

// declare module 'next-auth' {
//     interface Session {
//         user: {
//             id: number;
//             name: string;
//             email: string;
//             thumbnail: string;
//             token: string;
//             accessToken: string;
//         };
//     }
// }
// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
interface IUser extends DefaultUser {
    phone?: string;
    address?: string;
    token?: string;
    garageId?: Int;
}
declare module 'next-auth' {
    interface User extends IUser {}
    interface Session {
        user?: User;
    }
}
declare module 'next-auth/jwt' {
    interface JWT extends IUser {}
}
