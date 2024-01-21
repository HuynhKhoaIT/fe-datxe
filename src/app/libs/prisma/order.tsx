import { NextRequest } from "next/server";
import prisma from "../prismadb";
import { createCar } from "./car";
import { createCustomer } from "./customer";


export async function getOrders(request: NextRequest){
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: {
                    not: 'DELETE',
                },
            },
            include: {
                serviceAdvisor: true,
                car: true,
                customer: true,
                 orderDetails: {
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
                    }
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
        return {orders};
    } catch (error) {
        return { error };
    }
    
}
export async function findOrders(id: Number,request: NextRequest){
    try {
        const rs = await prisma.order.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                serviceAdvisor: true,
                car: true,
                customer: true,
                 orderDetails: {
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
                    }
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
        return rs;
    } catch (error) {
        return { error };
    }
    
}
export async function createOrder(json: any) {
    try {
        
        let customerId = 0;
        let carId = 0;
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
        }else{
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
        }else{
            carId = json.carId;
        }
        let orderDetails: any = [];
        if(json.detail){
            json.detail.forEach(function (data: any) {
                orderDetails.push({
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
        
        const order = await prisma.order.create({
            data: {
                code: (await codeGeneration(json.garageId)).toString(),
                customerId: customerId,
                carId: Number(carId),
                dateTime: json.dateTime,
                customerRequest: json.customerRequest,
                customerNote: json.customerNote,
                note: json.note,
                priorityLevel: Number(json.priorityLevel),
                orderCategoryId: Number(json.orderCategoryId),
                brandId: Number(json.carBrandId),
                modelId: Number(json.carNameId),
                yearId: Number(json.carYearId),
                garageId: Number(json.garageId),
                serviceAdvisorId: Number(json.serviceAdvisorId),
                orderDetails: {
                    createMany : {
                        data:orderDetails
                    }
                }
            },
            include: {
                serviceAdvisor: true,
                car: true,
                customer: true,
                orderDetails: {
                    select: {
                        quantity: true,
                        product: {
                            select:{
                                name: true,
                                sku: true,
                                images:true
                            }
                        }
                    }
                }
            },
        });
        return {order};
    } catch (error) {
        return { error };
    }
}
export async function codeGeneration(garageId: Number){
    let num = '1';
    const order = await prisma.order.findFirst({
        where: {
            garageId: Number(garageId),
        },
        orderBy: [
            {
              id: 'desc',
            },
        ],
    });

    if(!order){
        return num.padStart(6, '0');
    }else{
        num = (parseInt(order.code) + 1).toString();
        return num.padStart(6, '0');
    }
}
