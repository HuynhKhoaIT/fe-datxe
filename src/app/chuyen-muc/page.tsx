import { CategoryItem } from '../components/category/categoryItem';
import { Pagination } from '@/app/components/pagination-area/pagination-area';
import { ICategory } from '@/interfaces/category';
import { getCategories } from '@/utils/category';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Sort } from '../components/shop-sort/sort';
export default async function Category() {
    const category_list = await getCategories();
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
            <div className="shop-area bg pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            {/* <div className="col-md-12">
                                <Sort />
                            </div> */}
                            <div className="shop-item-wrapper">
                                <div className="row">
                                    {category_list?.map((category: ICategory, index) => (
                                        <CategoryItem key={index} category={category} />
                                    ))}
                                </div>
                            </div>
                            <div className="pagination-area mt-4">
                                <Pagination />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
