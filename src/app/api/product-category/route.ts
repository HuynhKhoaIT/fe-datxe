import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getCategories } from '@/app/libs/prisma/category';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        let garageId = {};
        if (searchParams.get('garage')) {
            garageId = Number(searchParams.get('garage'));
        }
        if (session?.user?.garageId) {
            garageId = session?.user?.garageId;
        }
        const requestData = {
            garageId: garageId,
            session: session,
        };
        const productCategory = await getCategories(requestData);
        return NextResponse.json(productCategory);
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const productCategory = await prisma.productCategory.create({
            data: json,
        });

        return new NextResponse(JSON.stringify(productCategory), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
