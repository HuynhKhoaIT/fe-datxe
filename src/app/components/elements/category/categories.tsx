'use client';
import { useEffect, useState } from 'react';
import { ICategory } from '@/interfaces/category';
import { CategoryItem } from './categoryItem';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { getCategories } from '@/utils/category';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CategoryProps {
    categoies: ICategory[];
}

export default function Categories({
    initialCategoryData,
    garageId,
}: {
    initialCategoryData: ICategory[];
    garageId: any;
}) {
    console.log('initialCategoryData', initialCategoryData);
    return (
        <div className="row d-flex flex-row flex-nowrap">
            <Swiper
                slidesPerView={6}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {initialCategoryData?.map((category: ICategory, index) => (
                    <SwiperSlide>
                        <CategoryItem category={category} key={index} garageId={garageId} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<CategoryProps>> {
    // Fetch data to generate dynamic paths
    const categorylist = await getCategories();

    return {
        props: {
            categoies: categorylist,
        },
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    return {
        paths: [],
        fallback: false, // Set to 'blocking' or true if needed
    };
}
