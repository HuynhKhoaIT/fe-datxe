import prisma from "../prismadb";

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