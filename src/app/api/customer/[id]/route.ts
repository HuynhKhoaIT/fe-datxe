import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;

        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const session = await getServerSession(authOptions);
        if (1) {
            const customers = await prisma.customer.findUnique({
                where: {
                    id: parseInt(id.toString()),
                },
                include:{
                    cars: true
                }
            });
            return NextResponse.json(customers);
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
            let createdBy = 1;
            let garageId = 1;
            if (!id) {
                return new NextResponse("Missing 'id' parameter");
            }
            const json = await request.json();
            
            if (session?.user?.id) {
                createdBy = Number(session.user.id);
                garageId = Number(session.user.garageId);
            }
            let updateData = {
                fullName: json.fullName,
                phoneNumber: json.phoneNumber,
                cityId: parseInt(json.cityId),
                districtId: parseInt(json.districtId),
                wardId: parseInt(json.wardId),
                address: json.address,
                dob: json.dob,
                description: json.description,
                sex: json.sex,
                garageId: parseInt(json.garageId),
                status: json.status,
            };
            const updatedCat = await prisma.customer.update({
                where: {
                    id: Number(id),
                },
                data: updateData,
            });

            return new NextResponse(JSON.stringify(updatedCat), {
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

    const rs = await prisma.customer.update({
        where: {
            id: parseInt(id.toString()),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
