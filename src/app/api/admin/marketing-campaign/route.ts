import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createMarketingCampaign, getMarketingCampaign } from '@/app/libs/prisma/marketingCampaign';
import { createMarketingCampaignDetail } from '@/app/libs/prisma/marketingCampaignDetail';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        let garageId = 0;
        if (searchParams.get('garage')) {
            garageId = Number(searchParams.get('garage'));
        }

        const requestData = {
            s: searchParams.get('s'),
            limit: searchParams.get('limit'),
            page: searchParams.get('page'),
        };

        const marketingCampaign = await getMarketingCampaign(garageId, requestData);
        return NextResponse.json(marketingCampaign);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();

        const marketingCampaign = await createMarketingCampaign(json);
        return new NextResponse(JSON.stringify(marketingCampaign), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
