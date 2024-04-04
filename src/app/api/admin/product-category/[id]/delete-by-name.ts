import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function DELETE(request: NextRequest, { params }: { params: { garageId: number } }) {
    // const title = params.id;
    const title = '';
    if (!title) {
        return new NextResponse("Missing 'title' parameter");
    }

    const deletePost = await prisma.productCategory.updateMany({
        where: {
            AND: [
                {
                    garageId: 1,
                    title: {
                        contains: title,
                    },
                },
            ],
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
