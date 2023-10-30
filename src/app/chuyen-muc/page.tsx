import { CategoryItem } from '../components/category/categoryItem';
import { Pagination } from '@/app/components/pagination-area/pagination-area';
import { ICategory } from '@/interfaces/category';
import { getCategories } from '@/utils/category';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Sort } from '../components/shop-sort/sort';
import Link from 'next/link';
import { Breadcrumb } from 'antd';
import LayoutListProduct from '../components/layout/LayoutListProduct';
export default async function Category() {
    const category_list = await getCategories();
    return (
        <LayoutListProduct>
            <div>
                <Breadcrumb
                    separator=">"
                    style={{ padding: '16px 0', position: 'absolute', top: '0', left: 12 }}
                    items={[
                        {
                            title: (
                                <Link href="/" style={{ color: '#1890ff' }}>
                                    Trang chủ
                                </Link>
                            ),
                        },
                        {
                            title: 'Chuyên mục',
                        },
                    ]}
                />
                <div className="shop-item-wrapper">
                    <div className="row">
                        {category_list?.map((category: ICategory, index) => (
                            <CategoryItem key={index} category={category} />
                        ))}
                    </div>
                </div>
            </div>
        </LayoutListProduct>
    );
}
