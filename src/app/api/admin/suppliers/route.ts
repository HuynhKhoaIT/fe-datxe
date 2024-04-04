import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        let garageId = {};
        if (searchParams.get('garage')) {
            garageId = Number(searchParams.get('garage'));
        }
        const suppiler = await prisma.suppiler.findMany({
            where: {
                AND: [
                    {
                        status: {
                            not: 'DELETE',
                        },
                        garageId,
                    },
                ],
            },
        });
        return NextResponse.json(suppiler);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        let garageId = Number(process.env.GARAGE_DEFAULT);
        if (json.garageId) {
            garageId = Number(json.garageId);
        }
        const suppiler = await prisma.suppiler.create({
            data: {
                title: json.title,
                description: json.description,
                garageId: garageId,
                status: json.status,
            },
        });

        return new NextResponse(JSON.stringify(suppiler), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
