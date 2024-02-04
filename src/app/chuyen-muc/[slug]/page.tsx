import RenderContext from "@/app/components/elements/RenderContext";
import { apiUrl } from "@/constants";
import BlogImage1 from "@/assets/images/blog/blog1.png";
import BlogImage2 from "@/assets/images/blog/blog2.png";
import BlogImage3 from "@/assets/images/blog/blog3.png";
import BlogImage4 from "@/assets/images/blog/blog4.png";
import CategoryDetailPageDesktop from "@/app/layout/desktop/danh-muc/CategoryDetailPage";
import CategoryDetailPageMobile from "@/app/layout/mobile/danh-muc/CategoryDetailPage";
import Banner1 from "@/assets/images/banner.png";
import Banner2 from "@/assets/images/bannerExpert.png";

import Reasons1 from "@/assets/images/reasson1.png";
import Reasons2 from "@/assets/images/reasson2.png";
import Reasons3 from "@/assets/images/reasson3.png";
async function getCategoryDetail(garageId: number) {
  const res = await fetch(`${apiUrl}/api/garage/${garageId}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  return data;
}
async function getCategories(garageId: number) {
  const res = await fetch(`${apiUrl}api/product-category?gara=${garageId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getProductsByCategory() {
  const res = await fetch(`${apiUrl}api/products?isProduct=1&limit=12`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data?.data;
}

const blogs = [
  {
    id: "1",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage1.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "2",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage2.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "3",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage3.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "4",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage4.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "5",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage1.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "6",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage2.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "7",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage3.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "8",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage4.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "9",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    image: BlogImage1.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
];
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
const kindProduct = [
  {
    id: "1",
    value: true,
    name: "Sản phẩm",
  },
  {
    id: "2",
    value: false,
    name: "Dịch  vụ",
  },
];
const slideshowData = [
  {
    image: Banner1.src,
  },
  {
    image: Banner2.src,
  },
];

async function getProductsHot(garageId: number) {
  const res = await fetch(
    `${apiUrl}/api/products?isProduct=1&garageId=${garageId}&limit=8`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  return data.data;
}
export default async function DetailCategory({
  params,
}: {
  params: { slug: number };
}) {
  const categoryDetail: any = await getCategoryDetail(9);
  const categories = await getCategories(9);
  const products = await getProductsByCategory();
  const productRelate: any = await getProductsHot(9);

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: CategoryDetailPageDesktop,
        },
        mobile: {
          defaultTheme: CategoryDetailPageMobile,
        },
      }}
      categoryDetail={categoryDetail}
      categories={categories}
      products={products}
      blogs={blogs}
      kindProduct={kindProduct}
      slideshowData={slideshowData}
      productRelate={productRelate}
      reassons={reassons}
    />
  );
}
