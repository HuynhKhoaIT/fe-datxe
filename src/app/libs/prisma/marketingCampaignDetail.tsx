import prisma from "../prismadb";
export async function createMarketingCampaignDetail(marketingCampaignId: Number,json: any) {
    try {
        const marketingCampaignDetail = await prisma.marketingCampaignDetail.create({
            data: {                
                marketingCampaignId: Number(marketingCampaignId),
                productId: json.productId,
                note: json.note,
                price: json.price,
                priceSale: json.priceSale,
                saleType: json.saleType,
                quantity: json.quantity,
                subTotal: json.subTotal,
                garageId: json.garageId,
                createdBy: json.createdBy
            }
        });
        return {marketingCampaignDetail};
    } catch (error) {
      return { error };
    }
}