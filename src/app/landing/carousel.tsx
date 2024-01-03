import React from "react";
import { SlideBanners } from "../components/elements/carousel/slideBanners";
import Link from "next/link";
export default function Carousel() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <SlideBanners />
        </div>
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center slider-background">
          <div className="text-banner">
            <h3>
              <span>Dành cho </span>chuyên gia
            </h3>
            <p>
              Bạn là gara/ nhà cung cấp phụ tung. Hãy tham gia để trở thành
              chuyên gia ngay hôm nay.
            </p>
          </div>
          <Link href={"https://v2.dlbd.vn/register"} className="pd-t-50">
            <button className="btn theme-btn" type="button">
              Đăng ký
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
