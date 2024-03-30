import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { reportTrafictDashboard } from '@/app/libs/prisma/order';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            const { searchParams } = new URL(request.url);
            // const garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            // return NextResponse.json({ garageId: garageId });
            const rs = await reportTrafictDashboard(searchParams.get('dateStart')!, searchParams.get('dateEnd')!, 14);
            return NextResponse.json(rs);
        } else {
            throw new Error('Chua dang nhap');
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
