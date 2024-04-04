import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../../auth/[...nextauth]/route';
import { updateMarketingCampaignStatus } from '@/app/libs/prisma/marketingCampaign';

export async function POST(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const json = await request.json();
        const status = json.status;
        const marketingCampaign = await updateMarketingCampaignStatus(id, status);
        return new NextResponse(JSON.stringify(marketingCampaign), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
