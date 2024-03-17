import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getCarNameById } from '@/app/libs/prisma/carName';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;

        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const session = await getServerSession(authOptions);
        if (1) {
            const cars = await prisma.car.findUnique({
                where: {
                    id: parseInt(id.toString()),
                },
                include: {
                    customer: true,
                    carStyle: true,
                },
            });
            let carRs = JSON.parse(JSON.stringify(cars));
            let br = await getCarNameById(carRs.carBrandId);
            let md = await getCarNameById(carRs.carNameId);
            let y = await getCarNameById(carRs.carYearId);
            carRs.brandName = br;
            carRs.modelName = md;
            carRs.yearName = y;
            return NextResponse.json(carRs);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const session = await getServerSession(authOptions);
        if (1) {
            const id = params.id;
            if (!id) {
                return new NextResponse("Missing 'id' parameter");
            }
            const json = await request.json();
            let updateData = {
                customerId: parseInt(json.customerId),
                numberPlates: json.numberPlates,
                carBrandId: parseInt(json.carBrandId),
                carNameId: parseInt(json.carNameId),
                carYearId: parseInt(json.carYearId),
                carStyleId: parseInt(json.carStyleId),
                color: json.color,
                vinNumber: json.vinNumber,
                machineNumber: json.machineNumber,
                description: json.description,
                status: json.status,
                garageId: parseInt(json.garageId),
            };
            const updatedCar = await prisma.car.update({
                where: {
                    id: Number(id),
                },
                data: updateData,
                include: {
                    customer: true,
                    carStyle: true,
                },
            });

            return new NextResponse(JSON.stringify(updatedCar), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }

    const rs = await prisma.car.update({
        where: {
            id: parseInt(id.toString()),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
