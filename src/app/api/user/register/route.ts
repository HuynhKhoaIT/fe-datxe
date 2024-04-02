import { NextResponse } from 'next/server';
import { registerUser } from '@/app/libs/prisma/user';
import { sha256, sha224 } from 'js-sha256';
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const hash = sha256(`${json.phoneNumber}|@|${json.id}`);
        if (hash == json.hash) {
            const rs = await registerUser({
                id: json.id,
                email: json.email,
                phoneNumber: json.phone,
                role: 'CUSTOMER',
                garageId: 2,
            });
            return NextResponse.json(rs);
        }

        throw new Error('Chua dang nhap');
    } catch (error: any) {
        console.log(error);
        return new NextResponse(error.message, { status: 500 });
    }
}
