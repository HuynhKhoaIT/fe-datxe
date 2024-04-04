import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = Number(process.env.GARAGE_DEFAULT);
            const customer = await prisma.customer.create({
                data: {
                    fullName: json.fullName,
                    phoneNumber: json.phoneNumber,
                    garageId: Number(garageId),
                    status: 'PUBLIC',
                },
            });

            return new NextResponse(JSON.stringify(customer), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
