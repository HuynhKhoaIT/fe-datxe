import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');
        let titleFilter = '';
        const searchText = searchParams.get('s');
        if (searchText) {
            titleFilter = searchText;
        }
        let currentPage = 1;
        let take = 10;
        let limit = searchParams.get('limit');
        let page = searchParams.get('page');

        if (page) {
            currentPage = parseInt(page);
        }
        if (limit) {
            take = parseInt(limit);
        }
        const skip = take * (currentPage - 1);
        let statusFilter = 'PUBLIC';
        if (searchParams.get('status')) {
            statusFilter = searchParams.get('status')!.toUpperCase();
        }

        const session = await getServerSession(authOptions);
        let categories = {};
        let name = {
            search: '',
        };
        if (categoryId) {
            categories = {
                some: {
                    category: {
                        id: parseInt(categoryId!),
                    },
                },
            };
        }

        const productFindData = {
            take: take,
            skip: skip,
            where: {
                AND: [
                    {
                        categories,
                        name: {
                            contains: titleFilter!,
                        },
                        // status: {
                        //     contains: '',
                        // },
                    },
                ],
            },
            include: {
                categories: true,
            },
        };
        if (1) {
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
        let brandArr: any = [];
        if (!json.categories) {
            return new NextResponse("Missing 'categoryId' parameter");
        } else {
            json.categories.forEach(function (id: number) {
                catArr.push({
                    assignedBy: session?.user?.name ?? 'Admin',
                    assignedAt: new Date(),
                    category: {
                        connect: {
                            id: parseInt(id.toString()),
                        },
                    },
                });
            });
        }

        if (!json.brands) {
            brandArr = {
                assignedBy: session?.user?.name ?? 'Admin',
                assignedAt: new Date(),
                carBrandType: 'CARBRAND',
                carModel: {
                    connect: {
                        id: 1,
                    },
                },
            };
        } else {
            json.brands.forEach(function (b: any) {
                brandArr.push({
                    assignedBy: session?.user?.name ?? 'Admin',
                    assignedAt: new Date(),
                    carBrandType: b.type,
                    carModel: {
                        connect: {
                            id: Number(b.id),
                        },
                    },
                });
            });
        }

        if (1) {
            const product = await prisma.product.create({
                data: {
                    name: json.title,
                    slug: json.title,
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
                        create: catArr,
                    },
                    brands: {
                        create: brandArr,
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
