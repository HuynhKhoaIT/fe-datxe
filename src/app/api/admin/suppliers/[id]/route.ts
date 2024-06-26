import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        // const session = await getServerSession(authOptions);
        const suppiler = await prisma.suppiler.findUnique({
            where: {
                id: parseInt(id.toString()),
            },
        });
        return NextResponse.json(suppiler);
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const json = await request.json();

        const updatedPost = await prisma.suppiler.update({
            where: {
                id: parseInt(id.toString()),
            },
            data: {
                title: json.title,
                description: json.description,
                garageId: json.garageId,
                status: json.status,
            },
        });

        return new NextResponse(JSON.stringify(updatedPost), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }

    const deletePost = await prisma.suppiler.update({
        where: {
            id: parseInt(id.toString()),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
