import { NextRequest } from "next/server";
import prisma from "../prismadb";
import convertToSlug from "@/utils/until";


export async function getPosts(requestData: any){
    
    try {
        
    let titleFilter = '';
    const searchText = requestData.s;
    if (searchText) {
        titleFilter = searchText;
    }
    let garageId = {};
    let currentPage = 1;
    let take = 10;
    let limit = Number(requestData.limit);
    let page = requestData.page;

    if (page) {
        currentPage = Number(page);
    }
    if (limit) {
        take = Number(limit);
    } else {
        limit = 10;
    }
    const skip = take * (currentPage - 1); 
    let createdById = {};
    if(requestData.createdById){
        createdById = 1
    }
    let step = {};
    if(requestData.step){
        step = requestData.step;
    }
    let method = {}
    if(requestData.method){
        method = requestData.method;
    }
    const [data,total] = await prisma.$transaction([   
        prisma.post.findMany({
            take: take,
            skip: skip,
            orderBy: {
                id: 'desc',
            },
            where: {
                title: {
                    contains: titleFilter
                },
                status: {
                    not: 'DELETE',
                },
                garageId: garageId
            },
            include: {
                categories: true
            },
        }),
        prisma.post.count({
            where: {
                status: {
                    not: 'DELETE',
                },
                title: {
                    contains: titleFilter
                },
                garageId: garageId
            },
        })
    ]);
    return {
        data: data,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: Math.ceil(total / limit),
        status: 200
    };
    } catch (error) {
        return { error };
    }
    
}

export async function createPost(post: any) {
    try {
        post.slug = convertToSlug(post.slug);
        const rs = await prisma.post.create({ data: post });
        return rs;
    } catch (error) {
        return { error };
    }
}