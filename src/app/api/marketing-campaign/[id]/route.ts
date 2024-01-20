import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const marketingCampaign = await prisma.marketingCampaign.findUnique({
            where: {
                id: parseInt(id.toString()),
            },
        });
        return NextResponse.json(marketingCampaign);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const json = await request.json();

        const updatedPost = await prisma.marketingCampaign.update({
            where: {
                id: parseInt(id.toString()),
            },
            data: {
                title: json.title,
                dateTimeStart: json.dateTimeStart,
                dateTimeEnd: json.dateTimeEnd,
                garageId: json.garageId,
                createdBy: json.createdBy,
                status: json.status,
            },
        });

        // const marketingCampaign = await createMarketingCampaign(json);
        // const marketingCampaignDetail = json.detail;
        // if (marketingCampaignDetail) {
        //     marketingCampaignDetail.forEach(async function (d: any) {
        //         await createMarketingCampaignDetail(d);
        //     });
        // }

        return new NextResponse(JSON.stringify(updatedPost), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }

    const deletePost = await prisma.marketingCampaign.update({
        where: {
            id: parseInt(id.toString()),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
