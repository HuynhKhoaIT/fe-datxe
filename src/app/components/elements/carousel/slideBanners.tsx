'use client';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';

const SlideBanners = () => {
    return (
        <div className="row">
            <div className="col-md-8">
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    // scrollbar={{ draggable: f }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide>
                        <img src="/assets/img/slider/h1.png" alt="" className="img-full full-width w-100" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/img/slider/b2.jpg" alt="" className="img-full full-width w-100" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="col-md-4 d-flex flex-column align-items-center justify-content-center slider-background">
                <div className="text-banner">
                    <h3>
                        <span>Dành cho </span>chuyên gia
                    </h3>
                    <p>Bạn là gara/ nhà cung cấp phụ tung. Hãy tham gia để trở thành chuyên gia ngay hôm nay.</p>
                </div>
                <Link href={'https://v2.dlbd.vn/register'} className="pd-t-50">
                    <button className="btn theme-btn" type="button">
                        Đăng ký
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { SlideBanners };
