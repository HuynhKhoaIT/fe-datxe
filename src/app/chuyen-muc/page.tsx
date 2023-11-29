import { CategoryItem } from '../components/category/categoryItem';
import { Pagination } from '@/app/components/pagination-area/pagination-area';
import { ICategory } from '@/interfaces/category';
import { getCategories } from '@/utils/category';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Sort } from '../components/shop-sort/sort';
import Link from 'next/link';
import { Breadcrumb } from 'antd';
import LayoutListProduct from '../components/layout/LayoutListProduct';
import { Breadcrumbs, Anchor } from '@mantine/core';

export default async function Category() {
    const category_list = await getCategories();
    const items = [
        { title: 'Trang chủ', href: '/', color: 'blue' },
        { title: 'Chuyên mục', href: '', color: 'black' },
    ].map((item, index) => (
        <Link href={item.href} key={index}>
            <span style={{ color: item.color }}>{item.title}</span>
        </Link>
    ));
    return (
        <LayoutListProduct>
            <div>
                <Breadcrumbs style={{ padding: '16px 20px', position: 'absolute' }}>{items}</Breadcrumbs>

                <div className="shop-item-wrapper pt-60 pb-60">
                    <div className="row">
                        {category_list?.map((category: ICategory, index) => (
                            <CategoryItem key={index} category={category} garageId={0} />
                        ))}
                    </div>
                </div>
            </div>
        </LayoutListProduct>
    );
}
