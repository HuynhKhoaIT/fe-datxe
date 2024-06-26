import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { slugify } from '@/utils/index';
type ResponseBody = { errors: { message: string }[] } | { username: string };
import { getProducts } from '@/app/libs/prisma/product';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { generateUUID } from '@/utils/until';
import { authOptions } from '../../auth/[...nextauth]/route';
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        // return NextResponse.json(session);
        if (session && session.user?.role == 'ADMINGARAGE') {
            const { searchParams } = new URL(request.url);
            const categoryId = searchParams.get('categoryId');
            const brandIdFilter = searchParams.get('brand');
            let titleFilter = '';
            const searchText = searchParams.get('s');
            if (searchText) {
                titleFilter = searchText;
            }
            let currentPage = 1;
            let take = 10;
            let limit = Number(searchParams.get('limit'));
            let page = searchParams.get('page');

            if (page) {
                currentPage = parseInt(page);
            }
            if (limit) {
                take = Number(limit);
            } else {
                limit = 10;
            }
            const skip = take * (currentPage - 1);
            let statusFilter = 'PUBLIC';
            if (searchParams.get('status')) {
                statusFilter = searchParams.get('status')!.toUpperCase();
            }
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));

            const requestData = {
                category: categoryId,
                brand: brandIdFilter,
                s: titleFilter,
                limit: limit,
                page: page,
                garageId: garageId,
                isProduct: searchParams.get('isProduct'),
            };
            const products = await getProducts(requestData);

            return NextResponse.json(products);
        } else {
            throw new Error(' ');
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session && session.user?.role == 'ADMINGARAGE') {
            let catArr: any = [];
            let brandArr: any = [];
            let createdBy = 0;

            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            let isProduct = true;

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
                let brandArrTemp: any = [];
                json.brands.forEach(function (b: any) {
                    const assignedAt = new Date();
                    const assignedBy = session?.user?.name ?? 'Admin';
                    if (b.yearId) {
                        const yearArr = b.yearId.split(',');
                        yearArr.forEach(function (y: any) {
                            let yO = {
                                assignedBy: assignedBy,
                                assignedAt: assignedAt,
                                carBrandType: 'CARYEAR',
                                carModel: {
                                    connect: {
                                        id: Number(y),
                                    },
                                },
                            };
                            if (!brandArrTemp.includes(Number(y))) {
                                brandArrTemp.push(Number(y));
                                brandArr.push(yO);
                            }
                        });
                    }
                    if (b.nameId) {
                        let bO = {
                            assignedBy: assignedBy,
                            assignedAt: assignedAt,
                            carBrandType: 'CARNAME',
                            carModel: {
                                connect: {
                                    id: Number(b.nameId),
                                },
                            },
                        };
                        if (!brandArrTemp.includes(Number(b.nameId))) {
                            brandArrTemp.push(Number(b.nameId));
                            brandArr.push(bO);
                        }
                    }
                    if (b.brandId) {
                        let cO = {
                            assignedBy: assignedBy,
                            assignedAt: assignedAt,
                            carBrandType: 'CARYEAR',
                            carModel: {
                                connect: {
                                    id: Number(b.brandId),
                                },
                            },
                        };
                        if (!brandArrTemp.includes(Number(b.brandId))) {
                            brandArrTemp.push(Number(b.brandId));
                            brandArr.push(cO);
                        }
                    }
                });
            }
            if (session?.user?.id) {
                createdBy = Number(session.user.id);
            }
            if (typeof json.isProduct !== 'undefined') {
                isProduct = Number(json.isProduct) == 1 ? true : false;
            }
            const product = await prisma.product.create({
                data: {
                    name: json.title,
                    uuID: generateUUID(),
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
                    createdBy: createdBy,
                    garageId: garageId,
                    supplierId: Number(json.supplierId ?? 1),
                    productBrandId: Number(json.productBrandId ?? 1),
                    isProduct: isProduct,
                    categories: {
                        create: catArr,
                    },
                    brands: {
                        create: brandArr,
                    },
                    brandDetail: JSON.stringify(json.brands),
                },
            });

            const updatedPost = await prisma.product.update({
                where: {
                    id: Number(product.id),
                },
                data: {
                    slug: slugify(product.name.toString()) + '-' + product.id,
                },
            });

            return new NextResponse(JSON.stringify(updatedPost), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
