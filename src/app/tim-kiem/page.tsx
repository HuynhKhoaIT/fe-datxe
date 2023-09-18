'use client';
import { getProductsByName } from '@/utils/product';
import { IProduct } from '@/interfaces/product';
import { ProductItem } from '../components/product/productItem';
import { useSearchParams } from 'next/navigation';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Sort } from '../components/shop-sort/sort';
import { Pagination } from '../components/pagination-area/pagination-area';
export default async function Search() {
    const searchParams = useSearchParams(); // Get URLSearchParams object

    const searchQuery = searchParams.toString(); // Convert URLSearchParams to a string
    const data_search = await getProductsByName(searchQuery); // Pass the searchQuery string to the function
    console.log(searchQuery);
    return (
        <main className="main">
            <div className="shop-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            <div className="col-md-12">
                                <Sort />
                            </div>
                            <div className="shop-item-wrapper">
                                <div className="row">
                                    {data_search.map((item: IProduct, index) => (
                                        <ProductItem product={item} key={index} />
                                    ))}
                                </div>
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
