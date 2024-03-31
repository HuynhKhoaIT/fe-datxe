import { getCustomersAutoComplete } from '@/app/libs/prisma/customer';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const { searchParams } = new URL(request.url);
            let page = 1;
            if (searchParams.get('page')) {
                page = Number(searchParams.get('page'));
            }
            const requestData = {
                s: searchParams.get('s'),
                phoneNumber: searchParams.get('phoneNumber'),
                limit: 10,
                take: 10,
                page: page,
                garageId: garageId,
                status: 'PUBLIC',
            };
            const customers = await getCustomersAutoComplete(requestData);
            return NextResponse.json(customers);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
