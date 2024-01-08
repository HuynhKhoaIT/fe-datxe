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
            const products = await prisma.product.findUnique({
                where: {
                    id: parseInt(id.toString()),
                },
                include: {
                    categories: true,
                    brands: true,
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
        const session = await getServerSession(authOptions);
        if (1) {
            const id = params.id;

            let catArr: any = [];
            if (!id) {
                return new NextResponse("Missing 'id' parameter");
            }
            const json = await request.json();

            if (!json.categories) {
                return new NextResponse("Missing 'categoryId' parameter");
            } else {
                json.categories.forEach(function (id: number) {
                    catArr.push({
                        assignedBy: session?.user?.name ?? '',
                        assignedAt: new Date(),

                        category: {
                            connect: {
                                id: parseInt(id.toString()),
                            },
                        },
                    });
                });
            }
            const updatedPost = await prisma.product.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: json.title,
                    price: json.price,
                    salePrice: json.salePrice,
                    productId: json.productId ?? 0,
                    description: json.description ?? '',
                    timeSaleStart: json.timeSaleStart ?? null,
                    timeSaleEnd: json.timeSaleEnd ?? null,
                    quantity: json.quantity ?? 0,
                    images: json.images ?? null,
                    metaDescription: json.metaDescription ?? null,
                    status: json.status,
                    createdBy: 1,
                    garageId: 0,
                    categories: {
                        deleteMany: {},
                        create: json.categories.map((cat: number) => ({
                            assignedBy: session?.user?.name ?? '',
                            assignedAt: new Date(),
                            category: {
                                connect: {
                                    id: Number(cat),
                                },
                            },
                        })),
                    },
                },
                include: {
                    categories: true,
                },
            });

            return new NextResponse(JSON.stringify(updatedPost), {
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

    const product = await prisma.product.update({
        where: {
            id: parseInt(id.toString()),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
