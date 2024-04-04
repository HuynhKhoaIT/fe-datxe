import { getCustomers } from '@/app/libs/prisma/customer';
import prisma from '@/app/libs/prismadb';
import { getProductsFromDLBD } from '@/utils/product';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.token) {
            const products = await getProductsFromDLBD(session.user?.token);
            return NextResponse.json(products);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
