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
    return {data:marketingCampaignTotal};
}

export async function findMarketingCampaign(id: Number) {
    const marketingCampaign = await prisma.marketingCampaign.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            detail: {
                select: {
                    productId:true,
                    note: true,
                    priceSale: true,
                    price: true,
                    subTotal: true,
                    saleType: true,
                    quantity: true,
                    product: {
                        select:{
                            name: true,
                            sku: true,
                            images:true
                        }
                    }
                },
            }
        }
    });
    return marketingCampaign;
}

export async function createMarketingCampaign(json: any) {
    try {
        let detail: any = [];
        if(json.detail){
            json.detail.forEach(function (data: any) {
                detail.push({
                    productId: data.productId,
                    note: data.note,
                    price: Number(data.price),
                    priceSale: Number(data.priceSale),
                    saleType: data.saleType,
                    saleValue: data.saleValue,
                    quantity: Number(data.quantity),
                    subTotal: Number(data.subTotal),
                    garageId: Number(json.garageId),
                    createdBy: json.createdBy,
                });
            });
        }
        const marketingCampaign = await prisma.marketingCampaign.create({
            data: {                
                title: json.title,
                dateTimeStart: json.dateTimeStart,
                dateTimeEnd: json.dateTimeEnd,
                garageId: json.garageId,
                createdBy: json.createdBy,
                status: json.status,
                detail: {
                    createMany : {
                        data:detail
                    }
                }
            },
            include: {
                detail: {
                    select: {
                        productId:true,
                        note: true,
                        priceSale: true,
                        price: true,
                        subTotal: true,
                        saleType: true,
                        quantity: true,
                        product: {
                            select:{
                                name: true,
                                sku: true,
                                images:true
                            }
                        }
                    },
                }
            }
        });        
        return marketingCampaign;
    } catch (error) {
        return { error };
    }
}

export async function editMarketingCampaign(id: Number,json: any) {
    try {

        let detail: any = [];
        if(json.detail){
            json.detail.forEach(function (data: any) {
                detail.push({
                    productId: data.productId,
                    note: data.note,
                    price: Number(data.price),
                    priceSale: Number(data.priceSale),
                    saleType: data.saleType,
                    saleValue: data.saleValue,
                    quantity: Number(data.quantity),
                    subTotal: Number(data.subTotal),
                    garageId: Number(json.garageId),
                    createdBy: json.createdBy,
                });
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
                detail: {
                    deleteMany: {
                        
                    },
                    createMany : {
                        data:detail
                    }
                }
            },
            include: {
                detail: {
                    select: {
                        productId:true,
                        note: true,
                        priceSale: true,
                        price: true,
                        subTotal: true,
                        saleType: true,
                        quantity: true,
                        product: {
                            select:{
                                name: true,
                                sku: true,
                                images:true
                            }
                        }
                    },
                }
            }
        });
        
        return updatedPost;
    } catch (error) {
        return { error };
    }
}