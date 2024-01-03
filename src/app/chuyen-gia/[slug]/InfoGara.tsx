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
import Link from "next/link";
import React from "react";
export default function InfoGara({ garageData }: any) {
  return (
    <div className="row">
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
  );
}
