import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createReviewProduct } from '@/app/libs/prisma/reviewProduct';

export async function GET(request: Request) {
    try {
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            json.createdId = session.user?.id;
            const review = await createReviewProduct(json);
            return NextResponse.json({
                data: review,
                status: 200,
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
