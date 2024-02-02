import { apiUrl } from "@/constants";
import RenderContext from "../components/elements/RenderContext";
import LandingPageDesktop from "../layout/desktop/trang-chu";
import LandingPageMobile from "../layout/mobile/trang-chu";
export const revalidate = 0;
import blog1 from "@/assets/images/blog1.png";
import blog2 from "@/assets/images/blog2.png";
import blog3 from "@/assets/images/blog3.png";
import blog4 from "@/assets/images/blog4.png";

import Reasons1 from "@/assets/images/reasson1.png";
import Reasons2 from "@/assets/images/reasson2.png";
import Reasons3 from "@/assets/images/reasson3.png";
async function getData() {
  const garageId = 9;
  const res = await fetch(`${apiUrl}api/product-category?gara=${garageId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getProductsRelate() {
  const res = await fetch(`${apiUrl}/api/products?isProduct=1&limit=8`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
async function getServicesHot() {
  const res = await fetch(`${apiUrl}/api/products?isProduct=0&limit=8`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
async function getProductsHot() {
  const res = await fetch(`${apiUrl}/api/products?isProduct=1&limit=8`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
const reassons = [
  {
    image: Reasons2.src,
    title: "Đáp ứng mọi nhu cầu của bạn",
    content:
      "Từ dịch vụ rửa xe, mâm & lốp, chăm sóc toàn diện, ắc quy, phụ tùng và cả việc bảo dưỡng định kỳ nữa. Ban có thể so sánh và tìm kiếm hệ thống Chuyên gia trên cả nước.",
  },
  {
    image: Reasons3.src,
    title: "Tùy chọn đặt lịch linh hoạt",
    content:
      "Chuyên gia trải dài trên 63 tỉnh thành, sẵn sàng hỗ trợ mõi khi bạn cần. Đổi lịch hoàn tiền dễ dàng.",
  },
  {
    image: Reasons1.src,
    title: "Thanh toán an toàn và thuận tiện",
    content: "Thanh toán một chạm, an toàn khi giao dịch.",
  },
  {
    image: Reasons2.src,
    title: "Đáp ứng mọi nhu cầu của bạn",
    content:
      "Từ dịch vụ rửa xe, mâm & lốp, chăm sóc toàn diện, ắc quy, phụ tùng và cả việc bảo dưỡng định kỳ nữa. Ban có thể so sánh và tìm kiếm hệ thống Chuyên gia trên cả nước.",
  },
];
const blogs = [
  {
    image: blog3.src,
    title: "Dịch vụ sửa xe uy tin tại HCM ",
    view: 123564300,
  },
  {
    image: blog2.src,
    title: "Khi nào nên bảo dưỡng xe",
    view: 123564300,
  },
  {
    image: blog1.src,
    title: "Hành trình mua siêu xe",
    view: 123564300,
  },
  {
    image: blog4.src,
    title: "Lái xe an toàn, các kiến thức cần nắm",
    view: 123564300,
  },
];
export default async function Home() {
  const categories = await getData();
  const productsRelate = await getProductsRelate();
  const servicesHot = await getServicesHot();
  const productsHot = await getProductsHot();
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: LandingPageDesktop,
        },
        mobile: {
          defaultTheme: LandingPageMobile,
        },
      }}
      categories={categories}
      reassons={reassons}
      productsRelate={productsRelate}
      servicesHot={servicesHot}
      productsHot={productsHot}
      blogs={blogs}
    />
  );
}
