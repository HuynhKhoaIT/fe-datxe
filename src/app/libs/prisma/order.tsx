import { NextRequest } from "next/server";
import prisma from "../prismadb";
import { createCar } from "./car";
import { createCustomer, getMyCustomers } from "./customer";
import { randomString } from "@/utils";

export async function getOrders(garage: Number, requestData: any) {
  try {
    let titleFilter = "";
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
    let createdById = {};
    if (requestData.createdById) {
      createdById = 1;
    }
    let step = {};
    if (requestData.step) {
      step = Number(requestData.step);
    }
    let method = {};
    if (requestData.method) {
      method = requestData.method;
    }

    let customerId = {};
    if (Number(requestData.customerId)) {
      customerId = Number(requestData.customerId);
    }
    let carId = {};
    if (Number(requestData.carId)) {
      carId = Number(requestData.carId);
    }

    const [data, total] = await prisma.$transaction([
      prisma.order.findMany({
        take: take,
        skip: skip,
        orderBy: {
          id: "desc",
        },
        where: {
          status: {
            not: "DELETE",
          },
          createdById,
          step,
          customerId,
          carId,
          // method,
          garageId: garageId,
        },
        include: {
          serviceAdvisor: true,
          car: true,
          customer: true,
          orderDetails: {
            select: {
              productId: true,
              note: true,
              priceSale: true,
              price: true,
              subTotal: true,
              saleType: true,
              quantity: true,
              product: {
                select: {
                  name: true,
                  sku: true,
                  images: true,
                },
              },
            },
          },
        },
      }),
      prisma.order.count({
        where: {
          status: {
            not: "DELETE",
          },
          createdById,
          step,
          // method,
          customerId,
          carId,
          garageId: garageId,
        },
      }),
    ]);
    return {
      data: data,
      total: total,
      currentPage: currentPage,
      limit: limit,
      totalPage: Math.ceil(total / limit),
      status: 200,
    };
  } catch (error) {
    return { error };
  }
}
export async function getMyOrders(requestData: any) {
  console.log(requestData.phoneNumber);
  try {
    const customers = await getMyCustomers(requestData.phoneNumber);
    let customerIdArray: [number] = [0];
    customers.forEach((c) => {
      customerIdArray.push(c.id);
    });
    if (customers) {
      let titleFilter = "";
      const searchText = requestData.s;
      if (searchText) {
        titleFilter = searchText;
      }
      let garageId = {};
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
      let createdById = {};
      if (requestData.createdById) {
        createdById = 1;
      }
      let step = {};
      if (requestData.step) {
        step = requestData.step;
      }
      let method = {};
      if (requestData.method) {
        method = requestData.method;
      }
      const [data, total] = await prisma.$transaction([
        prisma.order.findMany({
          take: take,
          skip: skip,
          orderBy: {
            id: "desc",
          },
          where: {
            status: {
              not: "DELETE",
            },
            createdById,
            step,
            method,
            customerId: {
              in: customerIdArray,
            },
          },
          include: {
            serviceAdvisor: true,
            car: true,
            customer: true,
            orderDetails: {
              select: {
                productId: true,
                note: true,
                priceSale: true,
                price: true,
                subTotal: true,
                saleType: true,
                quantity: true,
                product: {
                  select: {
                    name: true,
                    sku: true,
                    images: true,
                  },
                },
              },
            },
          },
        }),
        prisma.order.count({
          where: {
            status: {
              not: "DELETE",
            },
            createdById,
          },
        }),
      ]);
      return {
        data: data,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: Math.ceil(total / limit),
        status: 200,
      };
    }
  } catch (error) {
    return { error };
  }
}
export async function findOrder(id: Number, request: any) {
  try {
    const rs = await prisma.order.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        garage: true,
        orderDetails: {
          select: {
            productId: true,
            note: true,
            priceSale: true,
            price: true,
            subTotal: true,
            saleType: true,
            saleValue: true,
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return rs;
  } catch (error) {
    return { error };
  }
}
export async function getOrderBySlug(slug: string) {
  try {
    const rs = await prisma.order.findFirst({
      where: {
        slug: slug,
      },
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            productId: true,
            note: true,
            priceSale: true,
            price: true,
            subTotal: true,
            saleType: true,
            saleValue: true,
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
        garage: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return rs;
  } catch (error) {
    return { error };
  }
}
export async function getOrderByCode(code: string) {
  try {
    const rs = await prisma.order.findFirst({
      where: {
        code: code,
      },
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            productId: true,
            note: true,
            priceSale: true,
            price: true,
            subTotal: true,
            saleType: true,
            saleValue: true,
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
        garage: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return rs;
  } catch (error) {
    return { error };
  }
}

export async function reportTrafictDashboard(
  dateStart: string,
  dateEnd: string,
  garageId: number
) {
  const order = await prisma.order.findMany({
    where: {
      OR: [
        {
          dateTime: {
            gte: new Date(dateStart),
          },
          garageId,
          status: {
            not: 'DELETE'
          }
        },
        {
          dateTime: {
            gte: new Date(dateStart),
          },
          dateDone: {
            lte: new Date(dateEnd),
          },
          garageId,
          status: {
            not: 'DELETE'
          }
        },
      ],
    },
  });
  return order;
}

export async function createOrder(json: any) {
  try {
    let customerId = 1;
    let garageId = 2;
    if (json.detail[0].garageId) {
      garageId = Number(json.detail[0].garageId);
    }

    if ((!json.customerId || json.customerId == 0) && json.phoneNumber) {
      // check and create customer
      // check customer via phone number
      let phoneNumber = json.phoneNumber;
      if (phoneNumber) {
        const customerFind = await prisma.customer.findFirst({
          where: {
            phoneNumber: phoneNumber,
            status: "PUBLIC",
            garageId: garageId,
          },
        });
        if (customerFind) {
          customerId = customerFind.id;
        } else {
          let customerJson = {
            fullName: json.fullName,
            phoneNumber: json.phoneNumber,
            address: json.address,
            garageId: Number(garageId),
            status: "PUBLIC",
          };
          let cusNew = await createCustomer(customerJson);
          if (cusNew) {
            customerId = cusNew.customer?.id ?? 0;
          }
        }
      }
      // end check customer
    } else {
      customerId = json.customerId;
    }
    //get carID
    let carId = Number(json.carId);
    if (carId) {
      let carOrder = await prisma.car.findFirst({
        where: {
          id: Number(carId),
          status: "PUBLIC",
        },
      });

      if (carOrder?.garageId != Number(garageId)) {
        const carNewData = JSON.parse(JSON.stringify(carOrder));
        carNewData.garageId = garageId;
        carNewData.customerId = customerId;
        delete carNewData.id;
        let carNew = await createCar(carNewData);
        carId = Number(carNew?.car?.id);
      }
    } else {
      const carAdmin = await createCar({
        customerId: Number(customerId),
        numberPlates: json.numberPlates,
        carBrandId: Number(json.carBrandId),
        carNameId: Number(json.carNameId),
        carYearId: Number(json.carYearId),
        status: "PUBLIC",
        garageId: Number(process.env.GARAGE_DEFAULT),
      });
      const carNew = await createCar({
        customerId: Number(customerId),
        numberPlates: json.numberPlates,
        carBrandId: Number(json.carBrandId),
        carNameId: Number(json.carNameId),
        carYearId: Number(json.carYearId),
        status: "PUBLIC",
        garageId: Number(garageId),
      });
      if (carNew) {
        carId = Number(carNew.car?.id);
      }
    }

    let orderDetails: any = [];
    if (json.detail) {
      json.detail.forEach(function (data: any) {
        orderDetails.push({
          productId: Number(data.productId),
          note: data.note,
          price: Number(data.price ?? 0),
          priceSale: Number(data.priceSale ?? 0),
          saleType: data.saleType,
          saleValue: data.saleValue.toString(),
          quantity: Number(data.quantity ?? 1),
          subTotal: Number(data.subTotal ?? 0),
          garageId: Number(garageId ?? 1),
          createdBy: Number(json.createdBy ?? 1),
        });
      });
    }
    let orderCode = (await getCodeForOrder()) ?? "";
    let data = {
      code: orderCode,
      slug: orderCode.toLowerCase(),
      customerId: Number(customerId),
      carId: Number(carId),
      dateTime: json.dateTime ?? new Date(),
      customerRequest: json.customerRequest ?? "",
      customerNote: json.customerNote ?? "",
      note: json.note ?? "",
      priorityLevel: Number(json.priorityLevel ?? 1),
      orderCategoryId: Number(json.orderCategoryId ?? 1),
      brandId: Number(json.carBrandId),
      modelId: Number(json.carNameId),
      yearId: Number(json.carYearId),
      subTotal: Number(json.subTotal),
      total: Number(json.total),
      garageId: Number(garageId),
      serviceAdvisorId: Number(json.serviceAdvisorId ?? 1),
      orderDetails: {
        createMany: {
          data: orderDetails,
        },
      },
    };
    const order = await prisma.order.create({
      data: data,
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
      },
    });
    return { order };
  } catch (error) {
    return { error };
  }
}

export async function updateOrder(id: Number, json: any) {
  try {
    let customerId = 1;
    let carId = 1;
    if ((!json.customerId || json.customerId == 0) && json.phoneNumber) {
      // check and create customer
      // check customer via phone number
      let phoneNumber = json.phoneNumber;
      if (phoneNumber) {
        const customerFind = await prisma.customer.findFirst({
          where: { phoneNumber: phoneNumber },
        });
        if (customerFind) {
          customerId = customerFind.id;
        } else {
          let cusNew = await createCustomer(json);
          if (cusNew) {
            customerId = cusNew.customer?.id ?? 0;
          }
        }
      }
      // end check customer
    } else {
      customerId = json.customerId;
    }
    if (!json.carId) {
      // begin check isset car
      let numberPlates = json.numberPlates;
      if (numberPlates) {
        const carFind = await prisma.car.findFirst({
          where: { numberPlates: numberPlates },
        });
        if (carFind) {
          carId = carFind.id;
        } else {
          let jsonCar = json;
          jsonCar.customerId = customerId;
          let carNew = await createCar(jsonCar);
          if (carNew) {
            carId = carNew?.car?.id ?? 0;
          }
        }
      }
      // end check car
    } else {
      carId = json.carId;
    }
    let orderDetails: any = [];
    if (json.detail) {
      json.detail.forEach(function (data: any) {
        orderDetails.push({
          productId: Number(data.productId),
          note: data.note,
          price: Number(data.price ?? 0),
          priceSale: Number(data.priceSale ?? 0),
          saleType: data.saleType,
          saleValue: data.saleValue.toString(),
          quantity: Number(data.quantity ?? 1),
          subTotal: Number(data.subTotal ?? 0),
          garageId: Number(json.garageId ?? 1),
          createdBy: Number(json.createdBy ?? 1),
        });
      });
    }

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        code: (await codeGeneration(json.garageId)).toString(),
        customer: {
          connect: {
            id: Number(customerId),
          },
        },
        car: {
          connect: {
            id: Number(carId),
          },
        },
        dateTime: json.dateTime,
        customerRequest: json.customerRequest,
        customerNote: json.customerNote,
        note: json.note,
        priorityLevel: Number(json.priorityLevel),
        orderCategory: {
          connect: {
            id: Number(json.orderCategoryId),
          },
        },
        brandId: Number(json.carBrandId),
        modelId: Number(json.carNameId),
        yearId: Number(json.carYearId),
        step: Number(json.step),
        subTotal: Number(json.subTotal),
        total: Number(json.total),
        garage: {
          connect: {
            id: Number(json.garageId),
          },
        },
        serviceAdvisor: {
          connect: {
            id: Number(json.serviceAdvisorId),
          },
        },
        orderDetails: {
          deleteMany: {},
          createMany: {
            data: orderDetails,
          },
        },
      },
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            productId: true,
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
      },
    });
    return { order };
  } catch (error) {
    return { error };
  }
}
export async function updateOrderStatus(id: Number, status: string) {
  const order = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      status: status,
    },
  });
  return order;
}
export async function updateOrderStep(
  id: Number,
  step: any,
  cancelReason: string
) {
  const order = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      step: Number(step),
      cancelReason,
    },
  });
  return order;
}
export async function codeGeneration(garageId: Number) {
  let num = "1";
  const order = await prisma.order.findFirst({
    where: {
      garageId: Number(garageId),
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  if (!order) {
    return num.padStart(6, "0");
  } else {
    num = (parseInt(order.code) + 1).toString();
    return num.padStart(6, "0");
  }
}

export async function getCodeForOrder() {
  let str = randomString(9).toUpperCase();
  const c = await getOrderBySlug(str);
  if (!c) {
    return str;
  }
  await getCodeForOrder();
}
