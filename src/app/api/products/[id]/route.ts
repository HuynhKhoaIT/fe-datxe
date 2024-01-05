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
        if (session?.user?.token) {
            const products = await prisma.product.findUnique({
                where: {
                    id: parseInt(id.toString()),
                },
            });
            return NextResponse.json(products);
        }
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
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id.toString()),
            },
        });

        const updatedPost = await prisma.product.update({
            where: {
                id: parseInt(id.toString()),
            },
            data: json,
        });

        return new NextResponse(JSON.stringify(product), {
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

    const deletePost = await prisma.product.delete({
        where: {
            id: parseInt(id.toString()),
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
