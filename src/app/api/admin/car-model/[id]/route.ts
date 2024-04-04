import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;
        const brands = await prisma.carModels.findMany({
            where: {
                parentId: Number(id),
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
