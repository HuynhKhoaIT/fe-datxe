import { NextResponse } from 'next/server';
import { registerUser } from '@/app/libs/prisma/user';
import { sha256, sha224 } from 'js-sha256';

export async function GET(request: Request) {
    return new Response('Hello1, Next.js!', {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const hash = sha256(`${json.phoneNumber}|@|${Number(json.id)}`);
        if (hash == json.hash) {
            const rs = await registerUser({
                id: json.id,
                fullName: json.name,
                email: json.email,
                phoneNumber: json.phoneNumber,
                role: 'CUSTOMER',
                garageId: json.garageId,
            });
            return NextResponse.json(rs);
        }

        throw new Error('Chua dang nhap');
    } catch (error: any) {
        console.log(error);
        return new NextResponse(error.message, { status: 500 });
    }
}
