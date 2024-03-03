import { getCustomers } from '@/app/libs/prisma/customer';
import prisma from '@/app/libs/prismadb';
import { getCustomersFromDLBD } from '@/utils/customers';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';

export async function GET(request: NextRequest) {
    try {
        const customers = await getCustomersFromDLBD('1543|PIjZCXs5AV5fUFhrj8hjlbSEVktDCYNGs5BN8pgE');
        return NextResponse.json(customers);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
