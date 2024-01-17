import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        let data = {
            categories: {},
            carBrands: {},
            serviceadvisors: {},
            cars: {},
        }
        const categories = await prisma.orderCategory.findMany({
            where: {
                status: {
                    not: 'DELETE',
                },
            },
        });
        data.categories = categories;
        const brands = await prisma.carModels.findMany({
            where: {
                parentId: 0,
            },
            orderBy: {
                title: 'asc',
            },
        });
        data.carBrands = brands;
        const serviceadvisors = await prisma.serviceAdvisor.findMany(); 
        data.serviceadvisors = serviceadvisors;
        const cars = await prisma.car.findMany();
        data.cars = cars;
        return NextResponse.json(data);
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}