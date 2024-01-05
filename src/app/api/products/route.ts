import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.token) {
            const products = await prisma.product.findMany({
                take: 10,
            });
            return NextResponse.json(products);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        let categoryId = 0;
        if (!json.categoryId) {
            return new NextResponse("Missing 'categoryId' parameter");
        } else {
            categoryId = json.categoryId;
        }

        if (session?.user?.token) {
            const product = await prisma.product.create({
                data: {
                    name: json.name,
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
                        create: [
                            {
                                assignedBy: session.user.name ?? '',
                                assignedAt: new Date(),
                                category: {
                                    connect: {
                                        id: parseInt(categoryId.toString()),
                                    },
                                },
                            },
                        ],
                    },
                },
            });

            return new NextResponse(JSON.stringify(product), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
