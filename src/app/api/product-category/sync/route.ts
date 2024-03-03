import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getGarageByDlbdId } from '@/app/libs/prisma/garage';
import { syncCategoryFromDlbd } from '@/app/libs/prisma/category';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const cats = await request.json();
        if (session?.user?.garageId) {
            const garage = await getGarageByDlbdId(Number(session?.user?.garageId));
            if (garage) {
                const rs = await syncCategoryFromDlbd(cats, garage?.id);
                return NextResponse.json(rs);
            }
            return NextResponse.json(cats);
        }
        return NextResponse.json(session?.user?.garageId, {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
