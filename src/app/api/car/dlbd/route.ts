import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getCarsFromDLBD } from '@/utils/car';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.token) {
            const customers = await getCarsFromDLBD(session?.user?.token);
            return NextResponse.json(customers);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
