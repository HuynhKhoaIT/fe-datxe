'use client';
import Categories from '@/app/components/category/categories';
import Product from '@/app/components/product/product';
import { ICategory } from '@/interfaces/category';
import { IGarage } from '@/interfaces/garage';
import { IProduct } from '@/interfaces/product';
import { getCategoriesByGar } from '@/utils/category';
import { getGarage } from '@/utils/garage';
import { getProductByGar } from '@/utils/product';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconBuildingStore, IconStar, IconCar, IconUsers, IconUserCheck } from '@tabler/icons-react';

export default function Home({ params }: { params: { slug: string } }) {
    const searchParams = useSearchParams();
    const garageId: string = searchParams.get('garageId') || '';
    const [initialCategoryData, setInitialCategoryData] = useState<ICategory[]>([]);
    const [garageData, setGarageData] = useState<IGarage>();
    const [initialProductData, setInitialProductData] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (garageId?.length > 0) {
                    const categoryData = await getCategoriesByGar(garageId);
                    setInitialCategoryData(categoryData);
                } else {
                    const categoryData = await getCategoriesByGar(params.slug);
                    setInitialCategoryData(categoryData);
                }

                const garage = await getGarage(params.slug);
                setGarageData(garage?.data);
                const productData = await getProductByGar(garageId, 8);
                setInitialProductData(productData);
            } catch (error) {
                // Xử lý lỗi khi có lỗi trong quá trình gọi API
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Gọi hàm fetchData khi component được mount
    }, [params.slug]); // Thêm params.slug vào dependency array để useEffect chạy lại khi params.slug thay đổi (nếu params.slug là một dependency)
    return (
        <main className="main">
            <div className="">
                <div className="garage-info-section">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col col-md-4 garage-info-left">
                                <div className="banner-garage-box">
                                    <div className="garage-info d-flex align-items-center">
                                        <div
                                            className="garage-logo"
                                            style={{ width: '70px', height: 'auto', marginRight: '20px' }}
                                        >
                                            <img src={garageData?.logo} alt="" />
                                        </div>
                                        <div className="garage-title">
                                            <h5>{garageData?.name}</h5>
                                            <p>{garageData?.code}</p>
                                        </div>
                                    </div>
                                    <div className="garage-contact">
                                        <div className="garage-contact-inner row">
                                            <div className="col-md-6">
                                                <button
                                                    style={{ width: '100%' }}
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                >
                                                    Liên hệ
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <button
                                                    type="button"
                                                    style={{ width: '100%' }}
                                                    className="btn btn-outline-warning"
                                                >
                                                    Theo dõi
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-3 garage-info-right">
                                <ul>
                                    <li>
                                        <span>
                                            <IconBuildingStore size={16} />{' '}
                                        </span>
                                        Sản phẩm: <span style={{ color: 'var(--theme-color)' }}>100+</span>
                                    </li>
                                    <li>
                                        <span>
                                            <IconCar size={16} />{' '}
                                        </span>
                                        Dịch vụ: <span style={{ color: 'var(--theme-color)' }}>200+</span>
                                    </li>
                                    <li>
                                        <span>
                                            <IconStar size={16} />{' '}
                                        </span>
                                        Đánh giá: <span style={{ color: 'var(--theme-color)' }}>4/5</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col col-md-3 garage-info-right">
                                <ul>
                                    <li>
                                        <span>
                                            <IconUserCheck size={16} />{' '}
                                        </span>
                                        Tham Gia: <span style={{ color: 'var(--theme-color)' }}>Ngày 22/12/2020</span>
                                    </li>
                                    <li>
                                        <span>
                                            <IconUsers size={16} />{' '}
                                        </span>
                                        Đang theo dõi: <span style={{ color: 'var(--theme-color)' }}>1k</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col col-md-2">
                                <Link href={`/dat-lich?garage=${garageId}`} style={{ width: '100%' }}>
                                    <button type="button" style={{ width: '100%' }} className="btn btn-warning">
                                        Đặt lịch
                                    </button>
                                </Link>
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
                    <div className="list-category ">
                        <Categories initialCategoryData={initialCategoryData} />
                    </div>
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
