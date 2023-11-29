import './assets/css/nice-select.min.css';
import { SlideBanners } from './components/home/slideBanners';
import { getProductsHot } from '@/utils/product';
import { getCategories } from '@/utils/category';
import { IProduct } from '@/interfaces/product';
import { getGaragesNear } from '@/utils/garage';
import Product from './components/product/product';
import Categories from './components/category/categories';
import { IGarage } from '@/interfaces/garage';
import { getServiceHot } from '@/utils/service';
export default async function Home() {
    const initialCategoryData = await getCategories();
    const initialGarageData: IGarage[] = await getGaragesNear({ limit: 8 });
    const initialProductData: IProduct[] = await getProductsHot({ limit: 8 });
    const initialServiceData: IProduct[] = await getServiceHot({ limit: 8 });

    return (
        <main className="main  bg-white">
            <div className="hero-section">
                <div className="container">
                    <SlideBanners />
                </div>
            </div>
            <div className="car-category pt-40 pb-40 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Danh mục
                                </span>
                                <h2 className="site-title">
                                    Dịch vụ <span>Nổi bật</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <Categories initialCategoryData={initialCategoryData} garageId={0} />
                </div>
            </div>

            <div className="car-area bg pt-40 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Nổi bật
                                </span>
                                <h2 className="site-title">
                                    Sản phẩm <span>Hot</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <Product initialProductData={initialProductData} />
                </div>
            </div>

            <div className="car-area bg pt-40 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Nổi bật
                                </span>
                                <h2 className="site-title">
                                    Dịch vụ <span>Hot</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <Product initialProductData={initialServiceData} />
                </div>
            </div>
        </main>
    );
}
