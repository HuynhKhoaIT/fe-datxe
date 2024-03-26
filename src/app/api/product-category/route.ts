import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getCategories } from '@/app/libs/prisma/category';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const { searchParams } = new URL(request.url);
            let page = 1;
            if (searchParams.get('page')) {
                page = Number(searchParams.get('page'));
            }
            const requestData = {
                s: searchParams.get('s'),
                limit: 10,
                take: 10,
                page: page,
                garageId: 14,
                status: 'PUBLIC',
            };
            const productCategory = await getCategories(requestData);
            return NextResponse.json(productCategory);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            json.garageId = garageId;
            const productCategory = await prisma.productCategory.create({
                data: json,
            });
            return new NextResponse(JSON.stringify(productCategory), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
