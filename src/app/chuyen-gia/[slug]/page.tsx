"use client";
import Categories from "@/app/components/elements/category/categories";
import Product from "@/app/components/elements/product/ListProductHot";
import { ICategory } from "@/interfaces/category";
import { IGarage } from "@/interfaces/garage";
import { IProduct } from "@/interfaces/product";
import { getCategoriesByGar } from "@/utils/category";
import { getGarage } from "@/utils/garage";
import { getProductByGar } from "@/utils/product";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// import './styles.css';
import { Suspense, useEffect, useState } from "react";
import {
  IconBuildingStore,
  IconStar,
  IconCar,
  IconUsers,
  IconUserCheck,
  IconPhoneCall,
  IconEye,
  IconPhoneCheck,
} from "@tabler/icons-react";
import dayjs from "dayjs";

export default function Home({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const garageId: string = searchParams.get("garageId") || "";
  const [initialCategoryData, setInitialCategoryData] = useState<ICategory[]>(
    []
  );
  const [garageData, setGarageData] = useState<IGarage>();
  const [initialProductData, setInitialProductData] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const garage = await getGarage(params.slug).then(async (data) => {
          const productData = await getProductByGar(
            data.data.id?.toString(),
            8
          );
          setInitialProductData(productData);
          const categoryData = await getCategoriesByGar(
            data.data.id?.toString()
          );
          setInitialCategoryData(categoryData);
          return data.data;
        });
        setGarageData(garage);
      } catch (error) {
        // Xử lý lỗi khi có lỗi trong quá trình gọi API
        console.error("Error fetching data:", error);
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
              <div className="col col-md-5 garage-info-left">
                <div className="banner-garage-box">
                  <div className="garage-info d-flex align-items-center">
                    <div className="garage-logo" style={{ width: 90 }}>
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
                          style={{ width: "100%" }}
                          type="button"
                          className="btn btn-outline-primary "
                        >
                          Liên hệ
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          type="button"
                          style={{ width: "100%" }}
                          className="btn btn-outline-warning"
                        >
                          Theo dõi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-md-2 garage-info-right">
                <ul>
                  <li>
                    <span>
                      <IconBuildingStore size={16} />{" "}
                    </span>
                    Sản phẩm:{" "}
                    <span style={{ color: "var(--theme-color)" }}>100+</span>
                  </li>
                  <li>
                    <span>
                      <IconCar size={16} />{" "}
                    </span>
                    Dịch vụ:{" "}
                    <span style={{ color: "var(--theme-color)" }}>200+</span>
                  </li>
                  <li>
                    <span>
                      <IconStar size={16} />{" "}
                    </span>
                    Đánh giá:{" "}
                    <span style={{ color: "var(--theme-color)" }}>
                      {garageData?.rating && (
                        <span>{garageData?.rating.toFixed(1)}/5</span>
                      )}
                    </span>
                  </li>
                  <li>
                    <span>
                      <IconEye size={16} />{" "}
                    </span>
                    Đã xem:{" "}
                    <span style={{ color: "var(--theme-color)" }}>1k</span>
                  </li>
                </ul>
              </div>
              <div className="col col-md-3 garage-info-right">
                <ul>
                  <li>
                    <span>
                      <IconPhoneCall size={16} />{" "}
                    </span>
                    Phone:{" "}
                    <span style={{ color: "var(--theme-color)" }}>
                      {garageData?.phoneNumber}
                    </span>
                  </li>
                  <li>
                    <span>
                      <IconUserCheck size={16} />{" "}
                    </span>
                    Tham Gia:{" "}
                    <span style={{ color: "var(--theme-color)" }}>
                      {dayjs(garageData?.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </li>
                  <li>
                    <span>
                      <IconUsers size={16} />{" "}
                    </span>
                    Đang theo dõi:{" "}
                    <span style={{ color: "var(--theme-color)" }}>1k</span>
                  </li>
                  <li>
                    <span>
                      <IconPhoneCheck size={16} />{" "}
                    </span>
                    Đã liên hệ:{" "}
                    <span style={{ color: "var(--theme-color)" }}>1k</span>
                  </li>
                </ul>
              </div>
              <div className="col col-md-2">
                <Link
                  href={`/dat-lich?garage=${garageData?.id}`}
                  style={{ width: "100%" }}
                >
                  <button
                    type="button"
                    style={{ width: "100%" }}
                    className="btn btn-warning"
                  >
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
            <Suspense fallback="loading...">
              <Categories
                initialCategoryData={initialCategoryData}
                garageId={garageData?.id}
              />
            </Suspense>
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
          <Product
            initialProductData={initialProductData}
            garageId={garageData?.id}
          />
        </div>
      </div>
    </main>
  );
}
