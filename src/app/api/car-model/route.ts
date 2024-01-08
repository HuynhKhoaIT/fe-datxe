import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try {
        const brands = await prisma.carModels.findMany({
            where: {
                parentId: 0,
            },
            orderBy: {
                title: 'asc',
            },
        });
        return NextResponse.json(brands);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
