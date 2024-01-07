import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');
        const searchText = searchParams.get('s');
        const session = await getServerSession(authOptions);
        let categoriesonproducts = {};
        let name = {
            search: '',
        };
        if (searchText) {
            name = {
                search: searchText.toString(),
            };
        }
        if (categoryId) {
            categoriesonproducts = {
                some: {
                    category: {
                        id: parseInt(categoryId!),
                    },
                },
            };
        }
        const productFindData = {
            take: 10,
            where: {
                categoriesonproducts,
                // title: {
                //     search: searchText,
                // },
            },
            include: {
                categoriesonproducts: true,
            },
        };
        if (session?.user?.token) {
            const products = await prisma.product.findMany(productFindData);

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
        let catArr: any = [];
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

        if (session?.user?.token) {
            const product = await prisma.product.create({
                data: {
                    title: json.title.toString(),
                    slug: json.title.toString(),
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
                    categoriesonproducts: {
                        create: catArr,
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
