import './assets/css/nice-select.min.css';
import { SlideBanners } from './components/home/slideBanners';
// import { Search } from './components/search/searchForm';
import { getProductsHot } from '@/utils/product';
import { getCategories } from '@/utils/category';
import { IProduct } from '@/interfaces/product';
import { getGaragesNear } from '@/utils/garage';
import Product from './components/product/product';
import Garages from './components/garage/garages';
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
            {/* <div className="find-car">
                <div className="container">
                    <div className="find-car-form">
                        <h4 className="find-car-title">Tìm kiếm sản phẩm/ dịch vụ</h4>
                        <Search />
                    </div>
                </div>
            </div> */}

            <div className="car-category pt-60 pb-60 bg-white">
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
                    <Categories initialCategoryData={initialCategoryData} />
                </div>
            </div>

            <div className="car-area bg py-120">
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

            <div className="car-area bg pb-120">
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

            {/* <!-- car dealer --> */}
            <div className="car-dealer pb-40 pt-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Chuyên gia
                                </span>
                                <h2 className="site-title">
                                    Tốt nhất <span>gần bạn</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <Garages initialGarageData={initialGarageData} />
                </div>
            </div>
            {/* <!-- car dealer end--> */}

            {/* <!-- blog area --> */}
            <div className="blog-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Our Blog
                                </span>
                                <h2 className="site-title">
                                    Latest News & <span>Blog</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/01.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/02.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/03.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- blog area end --> */}

            {/* <!-- download area --> */}
            {/* <div className="download-area mb-120">
                <div className="container">
                    <div className="download-wrapper">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="download-content">
                                    <div className="site-heading mb-4">
                                        <span className="site-title-tagline justify-content-start">
                                            <i className="flaticon-drive"></i> Get Our App
                                        </span>
                                        <h2 className="site-title mb-10">
                                            Download <span>Our Motex</span> App For Free
                                        </h2>
                                        <p>
                                            There are many variations of passages available but the majority have
                                            suffered in some form going to use a passage by injected humour.
                                        </p>
                                    </div>
                                    <div className="download-btn">
                                        <a href="#">
                                            <i className="fab fa-google-play"></i>
                                            <div className="download-btn-content">
                                                <span>Get It On</span>
                                                <strong>Google Play</strong>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-app-store"></i>
                                            <div className="download-btn-content">
                                                <span>Get It On</span>
                                                <strong>App Store</strong>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="download-img">
                            <img src="assets/img/download/01.png" alt="" />
                        </div>
                    </div>
                </div>
    </div>*/}
        </main>
    );
}
