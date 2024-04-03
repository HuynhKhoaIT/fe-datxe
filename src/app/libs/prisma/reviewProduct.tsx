import prisma from "../prismadb";
import { getProductSimpleByUuID } from "./product";

export async function createReviewProduct(data: any) {
    try {
        const rs = await prisma.reviewsProduct.create({
            data: {                
                productId: Number(data.productId),
                orderId: Number(data.orderId),
                star: Number(data.star ?? 1),
                message: data.message?.toString(),
                createdId: Number(data.createdId),
                status: 'PUBLIC',
            }
        });
        return rs;
    } catch (error) {
        return { error };
    }
}
export async function getReviewsProduct(uuId:string,requestData: any) {
    let currentPage = 1;
    let take = 10;
    let limit = 10;
    if (requestData.limit) {
        take = parseInt(requestData.limit);
    }
    let page = requestData.page;
    if (page) {
        currentPage = Number(page);
    }
    const skip = take * (currentPage - 1);
    let product = await getProductSimpleByUuID(uuId);
    const [reviews, total] = await prisma.$transaction([
        prisma.reviewsProduct.findMany({
            take: take,
            skip: skip,
            orderBy: {
                id: "desc",
            },
            where: {
                productId: product?.id,
                status: 'PUBLIC'
            },
            include: {
                user: true
            }
        }),
        prisma.reviewsProduct.count({
            where: {
                productId: product?.id,
                status: 'PUBLIC'
            }
        })
    ]);
    const totalPage = Math.ceil(total / limit);

    // let reviewsRs = JSON.parse(JSON.stringify(reviews));


    return {
        data: reviews,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: totalPage,
        status: 200,
    };
}