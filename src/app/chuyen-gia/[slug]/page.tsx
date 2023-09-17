// 'use client';
import { ProductItem } from '@/app/components/product/productItem';
import { SideBar } from '@/app/components/shop-sidebar/sideBar';
import { Sort } from '@/app/components/shop-sort/sort';
import { IProduct } from '@/interfaces/product';
import { getProductByGar } from '@/utils/product';
export default async function SingleShop({ params }: { params: { slug: number } }) {
    const products = await getProductByGar(params.slug);
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
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
                                <div className="row align-items-center">
                                    {products.map((product: IProduct, index) => (
                                        <ProductItem product={product} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="pagination-area mt-4">
                                <div aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">
                                                    <i className="far fa-arrow-left"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">
                                                    <i className="far fa-arrow-right"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
