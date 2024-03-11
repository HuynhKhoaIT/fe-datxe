import { createGarage, getGarages } from '@/app/libs/prisma/garage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const json = await request.json();

        // const errors: string[] = [];
        // const garage = await createGarage(json);
        // return NextResponse.json({ garage });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
