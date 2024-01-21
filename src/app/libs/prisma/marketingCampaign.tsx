import prisma from "../prismadb";
export async function getMarketingCampaign(garage: Number,requestData: any) {

    let titleFilter = '';
    const searchText = requestData.s;
    if (searchText) {
        titleFilter = searchText;
    }
    let garageId = {};
    if (garage) {
        garageId = Number(garage);
    }
    let currentPage = 1;
    let take = 10;
    let limit = Number(requestData.limit);
    let page = requestData.page;

    if (page) {
        currentPage = Number(page);
    }
    if (limit) {
        take = Number(limit);
    } else {
        limit = 10;
    }
    const skip = take * (currentPage - 1);
    

    const [data,total] = await prisma.$transaction([
        prisma.marketingCampaign.findMany({
            take: take,
            skip: skip,
            orderBy: {
                id: 'desc',
            },
            where: {
                AND: [
                    {
                        title: {
                            contains: titleFilter
                        },
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
        }),
        prisma.marketingCampaign.count()
    ]);
    return {
        data: data,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: Math.ceil(total / limit),
        status: 200
    };
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
                    productId: Number(data.productId),
                    note: data.note,
                    price: Number(data.price),
                    priceSale: Number(data.priceSale ?? 0),
                    saleType: data.saleType,
                    saleValue: Number(data.saleValue).toString(),
                    quantity: Number(data.quantity),
                    garageId: Number(json.garageId),
                    createdBy: Number(json.createdBy),
                });
            });
        }
        // return detail;
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
                        data: detail
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
        return {marketingCampaign};
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
                    priceSale: Number(data.priceSale ?? 0),
                    saleType: data.saleType,
                    saleValue: data.saleValue.toString(),
                    quantity: Number(data.quantity),
                    subTotal: Number(data.subTotal),
                    garageId: Number(data.garageId),
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
                    deleteMany: {},
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