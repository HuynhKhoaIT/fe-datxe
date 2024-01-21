import prisma from "../prismadb";
import { createMarketingCampaignDetail } from "./marketingCampaignDetail";

export async function getMarketingCampaign(garage: Number,requestData: any) {
    let garageId = {};
    if (garage) {
        garageId = Number(garage);
    }
    const marketingCampaignTotal = await prisma.marketingCampaign.findMany({
        where: {
            AND: [
                {
                    status: {
                        not: 'DELETE',
                    },
                    garageId,
                },
            ],
        },
        include: {
            detail: true
        }
    });
    return {data:marketingCampaignTotal,total:222};
}

export async function findMarketingCampaign(id: Number) {
    const marketingCampaign = await prisma.marketingCampaign.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            detail: true,
        },
    });
    return marketingCampaign;
}

export async function createMarketingCampaign(json: any) {
    try {
        const marketingCampaign = await prisma.marketingCampaign.create({
            data: {                
                title: json.title,
                dateTimeStart: json.dateTimeStart,
                dateTimeEnd: json.dateTimeEnd,
                garageId: json.garageId,
                createdBy: json.createdBy,
                status: json.status,
            },include: {
                detail: true
            }
        });
        if(marketingCampaign){
            const marketingCampaignDetail = json.detail;
            if (marketingCampaignDetail) {
                marketingCampaignDetail.forEach(async function (d: any) {
                    await createMarketingCampaignDetail(marketingCampaign.id,d);
                });
            }
        }
        
        return {marketingCampaign};
    } catch (error) {
        return 'a11';
        return { error };
    }
}

export async function editMarketingCampaign(id: Number,json: any) {
    try {
        
        const deleteDetail = await prisma.marketingCampaignDetail.delete({
            where: {
                marketingCampaignId: Number(id),
            },
        })
        const marketingCampaignDetail = json.detail;
        if (marketingCampaignDetail) {
            marketingCampaignDetail.forEach(async function (d: any) {
                await createMarketingCampaignDetail(id,d);
            });
        }
        const updatedPost = await prisma.marketingCampaign.update({
            where: {
                id: Number(id),
            },
            data: {
                title: json.title,
                dateTimeStart: json.dateTimeStart,
                dateTimeEnd: json.dateTimeEnd,
                garageId: json.garageId,
                createdBy: json.createdBy,
                status: json.status,
            },
            include: {
                detail: true
            }
        });
        const rs = await prisma.marketingCampaign.findFirst({where:{id:Number(id)},include:{detail:true}})
        return rs;
    } catch (error) {
        return { error };
    }
}