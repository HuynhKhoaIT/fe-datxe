import { NextResponse } from "next/server";
import prisma from "../prismadb";

export async function getProducts(garage: Number,requestData:any) {
  try {
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
      prisma.product.findMany({
        take: take,
        skip: skip,
        orderBy: {
            id: 'desc',
        },
        where: {
          AND: [
              {
                OR:[
                  {
                    name: {
                      contains: titleFilter
                    },
                    sku: {
                      contains: titleFilter
                    }
                  }
                ],
                status: {
                  not: 'DELETE',
                },
                garageId,
              },
          ]
      },
      }),
      prisma.product.count()
    ]);
    return {
      data: data,
      total: total,
      currentPage: currentPage,
      limit: limit,
      totalPage: Math.ceil(total / limit),
      status: 201
    };
  } catch (error) {
    return { error };
  }
}

export async function createProduct(product: any) {
  try {
    const productFromDB = await prisma.product.create({ data: product });
    return { product: productFromDB };
  } catch (error) {
    return { error };
  }
}

export async function updateProduct(id: number, product: any) {
  try {
    const productFromDB = await prisma.product.update({
      where: { id: Number(id) },
      data: product,
    });
    return { product: productFromDB };
  } catch (error) {
    return { error };
  }
}

export async function deleteProduct(id: number) {
  try {
    const product = await prisma.product.delete({ where: { id: Number(id) } });
    return { product };
  } catch (error) {
    return { error };
  }
}

export async function getProductById(id: number) {
  try {
    // const product = await prisma.product.findFirst({
    //   where: {
    //       id: parseInt(id.toString()),
    //   },
    //   include: {
    //       categories: true,
    //       garage: true,
    //       marketingCampaignDetail: {
    //           take: 1,
    //           where: {
    //               marketingCampaign: {
    //                   AND: [
    //                       {
    //                           status: 'PUBLIC',
    //                           dateTimeStart: {
    //                               lte: new Date(),
    //                           },
    //                           dateTimeEnd: {
    //                               gte: new Date(),
    //                           },
    //                       },
    //                   ],
    //               },
    //           },
    //           include: {
    //               marketingCampaign: true,
    //           },
    //       },
    //       reviews:{
    //         where:{
    //           AND:[
    //             {
    //               status: "PUBLIC"
    //             }
    //           ]
    //         },
    //       }
    //   },
    // });
    const [product,avgReview] = await prisma.$transaction([
      prisma.product.findFirst({
        where: {
            id: parseInt(id.toString()),
        },
        include: {
            categories: true,
            garage: true,
            marketingCampaignDetail: {
                take: 1,
                where: {
                    marketingCampaign: {
                        AND: [
                            {
                                status: 'PUBLIC',
                                dateTimeStart: {
                                    lte: new Date(),
                                },
                                dateTimeEnd: {
                                    gte: new Date(),
                                },
                            },
                        ],
                    },
                },
                include: {
                    marketingCampaign: true,
                },
            },
            // reviews:{
              
            //   where:{
            //     AND:[
            //       {
            //         status: "PUBLIC"
            //       }
            //     ]
            //   },
            // }
        },
      }),
      prisma.reviewsProduct.aggregate({
        _avg: {
          star: true
        },
        _count: true,
        where:{
          productId: Number(id),
        },
      })
    ])
    return {product,avgReview};
  } catch (error) {
    return { error };
  }
}

export async function getProductsBestSeller(token: String,json: any) {
  try {
    let titleFilter = '';
    const searchText = json.s;
    if (searchText) {
        titleFilter = searchText;
    }
    let currentPage = 1;
    let take = 10;
    let limit = Number(json.limit);
    let page = json.page;

    if (page) {
        currentPage = Number(page);
    }
    if (limit) {
        take = Number(limit);
    } else {
        limit = 10;
    }
    const skip = take * (currentPage - 1);
    let garageId = {};
    if (json.garage) {
        garageId = Number(json.garage);
    }
    let isProduct = {};
    if (json.isProduct?.length) {
        isProduct = json.isProduct == '1' ? true : false;
    }
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
          take: take,
          skip: skip,
          orderBy: {
            orderDetail:{
              _count: 'desc',
            }
          },
          where: {
              AND: [
                  {
                      name: {
                        contains: titleFilter!,
                      },
                      status: {
                        not: 'DELETE',
                      },
                      garageId,
                      isProduct,
                  },
                  
              ],
          },
          include: {
              categories: true,
              garage: Number(json.includeGarage ?? 0) > 0,
              orderDetail: true
          }
      }),
      prisma.product.count(),
  ]);

  const totalPage = Math.ceil(total / limit);

  return new NextResponse(JSON.stringify({
    data: products,
    total: total,
    currentPage: currentPage,
    limit: limit,
    totalPage: totalPage,
    status: 200,
}));
  } catch (error) {
    return { error };
  }
}
