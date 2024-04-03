import { DefaultSession, DefaultUser } from 'next-auth';
interface IUser extends DefaultUser {
    phone?: string;
    address?: string;
    token?: string;
    garageId?: string;
    isAdmin?: string;
    role?: string;
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
