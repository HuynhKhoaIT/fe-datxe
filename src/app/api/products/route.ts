import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { getProductsClient } from '@/app/libs/prisma/product';
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');
        const brandIdFilter = searchParams.get('brand');
        let titleFilter = '';
        const searchText = searchParams.get('s');
        if (searchText) {
            titleFilter = searchText;
        }
        let currentPage = 1;
        let take = 10;
        let limit = Number(searchParams.get('limit'));
        let page = searchParams.get('page');

        if (page) {
            currentPage = parseInt(page);
        }
        if (limit) {
            take = Number(limit);
        } else {
            limit = 10;
        }
        const skip = take * (currentPage - 1);

        const requestData = {
            category: categoryId,
            brand: brandIdFilter,
            s: titleFilter,
            limit: limit,
            page: page,
            isProduct: searchParams.get('isProduct'),
        };
        const products = await getProductsClient(requestData);

        return NextResponse.json(products);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
