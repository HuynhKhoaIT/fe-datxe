import prisma from "../prismadb";

export async function createOrderDetail(orderId: Number,data: any) {
    try {
        const orderDetail = await prisma.orderDetail.create({
            data: {                
                orderId: Number(orderId),
                productId: data.productId,
                note: data.note,
                price: Number(data.price),
                priceSale: Number(data.priceSale),
                saleType: data.saleType,
                quantity: Number(data.quantity),
                subTotal: Number(data.subTotal ?? 0),
                garageId: Number(data.garageId),
                createdBy: data.createdBy,
                status: data.status
            }
        });
        return orderDetail;
    } catch (error) {
      return { error };
    }
}