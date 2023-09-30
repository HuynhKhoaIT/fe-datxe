import Categories from '@/app/components/category/categories';
import Product from '@/app/components/product/product';
import { IProduct } from '@/interfaces/product';
import { getCategoriesByGar } from '@/utils/category';
import { getGarage } from '@/utils/garage';
import { getProductByGar } from '@/utils/product';

export default async function Home({ params }: { params: { slug: number } }) {
    const initialCategoryData = await getCategoriesByGar();
    const garageData = await getGarage(params.slug);
    const initialProductData: IProduct[] = await getProductByGar(params.slug, 8);

    return (
        <main className="main">
            <div className="">
                <div className="garage-info-section">
                    <div className="container">
                        <div className="row">
                            <div className="col col-md-7">
                                <div className="banner-garage-box">
                                    <div className="garage-info">
                                        <div className="garage-logo">
                                            <img src={garageData.logo} alt="" />
                                        </div>
                                        <div className="garage-title">
                                            <h5>{garageData.name}</h5>
                                            <p>{garageData.code}</p>
                                        </div>
                                    </div>
                                    <div className="garage-contact">
                                        <div className="garage-contact-inner">
                                            <button className="btn btn-phone" type="button">
                                                Liên hệ
                                            </button>
                                            <button className="btn btn-phone" type="button">
                                                Theo dõi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-5">
                                <ul>
                                    <li>Sản phẩm</li>
                                    <li>Dịch vụ</li>
                                    <li>Đánh giá</li>
                                    <li>Tham Gia:</li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                    <Categories initialCategoryData={initialCategoryData} />
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
                                    Sản phẩm / Dịch vụ <span>Hot</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <Product initialProductData={initialProductData} />
                </div>
            </div>

            {/* <!-- blog area --> */}
            {/* <div className="blog-area pt-60 pb-60">
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
                                    <img src="/assets/img/blog/01.jpg" alt="Thumb" />
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
                                    <img src="/assets/img/blog/02.jpg" alt="Thumb" />
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
                                    <img src="/assets/img/blog/03.jpg" alt="Thumb" />
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
            </div> */}
            {/* <!-- blog area end --> */}
        </main>
    );
}
