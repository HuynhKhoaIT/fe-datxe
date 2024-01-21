import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';

export async function GET(request: NextRequest) {
    try {
        const garages = await prisma.garage.findMany({
            where: {
                AND: [
                    {
                        status: {
                            not: 'DELETE',
                        },
                    },
                ],
            },
            include: {
                cars: true,
            },
        });
        return NextResponse.json(garages);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const errors: string[] = [];
        const garage = await prisma.garage.create({
            data: {
                routeId: Number(json.routeId),
                code: json.code,
                name: json.name,
                shortName: json.shortName,
                logo: json.logo,
                email: json.email,
                phoneNumber: json.phoneNumber,
                website: json.website,
                address: json.address,
                status: json.status,
            },
            include: {
                cars: true,
            },
        });

        return new NextResponse(JSON.stringify(garage), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
