import prisma from "../prismadb";

export async function createReviewGarage(data: any) {
    try {
        const rs = await prisma.reviewsGarage.create({
            data: {                
                garageId: Number(data.garageId),
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

export async function getReviewsGarage(garageId:number,requestData: any) {
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
    const [reviews, total] = await prisma.$transaction([
        prisma.reviewsGarage.findMany({
            take: take,
            skip: skip,
            orderBy: {
                id: "desc",
            },
            where: {
                garageId,
                status: 'PUBLIC'
            }
        }),
        prisma.reviewsGarage.count({
            where: {
                garageId,
                status: 'PUBLIC'
            }
        })
    ]);
    const totalPage = Math.ceil(total / limit);
    return {
        data: reviews,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: totalPage,
        status: 200,
    };
}