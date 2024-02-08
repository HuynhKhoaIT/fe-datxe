import { createAmentity, getAmentity } from '@/app/libs/prisma/amentity';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const garages = await getAmentity(request);
        return NextResponse.json(garages);
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
