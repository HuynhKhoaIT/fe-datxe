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