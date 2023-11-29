import { useEffect, useState } from 'react';
import { ICategory } from '@/interfaces/category';
import { CategoryItem } from './categoryItem';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { getCategories } from '@/utils/category';

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
            {/* <CategoryItem category={category} key={index} /> */}
            {initialCategoryData?.map((category: ICategory, index) => (
                <CategoryItem category={category} key={index} garageId={garageId} />
            ))}
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
