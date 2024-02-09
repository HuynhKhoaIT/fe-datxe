import { createAmentity, getAmentity } from '@/app/libs/prisma/amentity';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const rs = await getAmentity();
        return NextResponse.json(rs);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const errors: string[] = [];
        const amentity = await createAmentity(json);
        return NextResponse.json({ amentity });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
