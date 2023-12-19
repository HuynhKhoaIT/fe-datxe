"use client";
import {
  IconPhone,
  IconLocation,
  IconMail,
  IconCaretRight,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTwitter,
  IconSend,
} from "@tabler/icons-react";
import download from "../../../assets/images/Keu_goi_tai_ap.png";
import android from "../../../assets/images/Android.png";
import ios from "../../../assets/images/IOS.png";
import Link from "next/link";

const MyFooter = () => (
  <footer className="footer-area">
    <div className="footer-widget">
      <div className="container">
        <div className="row footer-widget-wrapper pt-100 pb-70">
          <div className="col-md-6 col-lg-4">
            <div className="footer-widget-box about-us">
              <div className="d-flex align-items-center footer-logo">
                <img
                  src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
                  alt=""
                />
                <p className="mb-0">DatXe - Nền tảng đặt dịch vụ ô tô</p>
              </div>

              <p className="mb-3 footer-widget-box__content">
                Đặt lịch dịch vụ, mua hàng hoá tại 63 tỉnh thành trên toàn quốc.
                Nhiều gói dịch vụ hấp dẫn đang phù hợp với dòng xe của bạn đang
                giảm từ 10% - 30%. Hãy trải nghiệm ngay!
              </p>
              <div className="dowload-app">
                <img className="download-app__img" src={download.src} alt="" />
                <div className="download-app__img2">
                  <a
                    href="https://apps.apple.com/us/app/datxe/id6444442159"
                    target="_blank"
                  >
                    <img src={ios.src} alt="" />
                  </a>
                  <span className="mb-0">Hoặc</span>
                  <a
                    href="https://play.google.com/store/apps/details?id=dev.taivan.flutter_app_dlbd&pli=1"
                    target="_blank"
                  >
                    <img src={android.src} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="footer-widget-box list">
              <h4 className="footer-widget-title">Về DatXe</h4>
              <ul className="footer-list">
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Giới thiệu DatXe
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Chính sách & quyền
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Tuyển dụng
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Chính sách bảo hành
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="footer-widget-box list">
              <h4 className="footer-widget-title">TT hỗ trợ</h4>
              <ul className="footer-list">
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Câu hỏi thường gặp
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Hỗ trợ Chuyên gia
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Hỗ trợ người dùng
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Truyền thông & thương hiệu
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Đối tác & cộng tác viên
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconCaretRight size={16} /> Cộng đồng
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-2">
            <div className="footer-widget-box list">
              <h4 className="footer-widget-title">Có gì mới</h4>
              <div className="footer-newsletter">
                <p>Luôn cập nhập những thông tin mới phù hợp với bạn.</p>
                <div className="subscribe-form">
                  <form action="#">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                    />
                    <button className="theme-btn" type="submit">
                      Đăng ký ngay <IconSend size={16} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-md-6 align-self-center">
            <p className="copyright-text">
              &copy; Copyright <span id="date"></span> <a href="#"> DATXE </a>{" "}
              All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 align-self-center">
            <ul className="footer-social">
              <li>
                <a href="#">
                  <IconBrandFacebook size={16} />
                </a>
              </li>
              <li>
                <a href="#">
                  <IconBrandTwitter size={16} />
                </a>
              </li>
              <li>
                <a href="#">
                  <IconBrandInstagram size={16} />
                </a>
              </li>
              <li>
                <a href="#">
                  <IconBrandYoutube size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export { MyFooter };
