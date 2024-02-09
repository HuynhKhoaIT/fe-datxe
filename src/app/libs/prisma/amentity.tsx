import { NextResponse } from "next/server";
import prisma from "../prismadb";
export async function createAmentity(data: any) {
    const rs = await prisma.amenities.create({
        data: {
            title: data.title
        }
    })
    return NextResponse.json(rs)
}

export async function getAmentity(){
    const rs = await prisma.amenities.findMany();
    return rs;
}