import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getGarageByDlbdId } from '@/app/libs/prisma/garage';
import { syncCategoryFromDlbd } from '@/app/libs/prisma/category';

export async function GET(request: Request) {
    try {
        // const json = await request.json();
        // return { a: 1 };
        const session = await getServerSession(authOptions);
        if (session?.user?.garageId) {
            const garage = await getGarageByDlbdId(Number(session?.user?.garageId));
            const cats = {
                id: 4,
                name: 'MÂM & LỐP',
                description: null,
                thumbnail: 'https://v2.dlbd.vn/storage/uploads/0/product-category/img2023011607104722034800.png',
                garageId: 9,
            };
            if (garage) {
                const rs = await syncCategoryFromDlbd(cats, garage?.id);
                return NextResponse.json(rs);
            }

            return NextResponse.json(cats);
        }

        // return session;
        // const productCategory = await prisma.productCategory.create({
        //     data: json,
        // });
        return NextResponse.json(session?.user?.garageId, {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
