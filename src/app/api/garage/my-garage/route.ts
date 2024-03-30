import { getGarageByDlbdId } from '@/app/libs/prisma/garage';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = Number(session.user?.garageId);
            const garages = await getGarageByDlbdId(garageId);

            return NextResponse.json(garages);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
