import RenderContext from "@/app/components/elements/RenderContext";
import ExpertDetailPageDesktop from "@/app/layout/desktop/chuyen-gia/ExpertDetailPage";
import ExpertDetailPageMobile from "@/app/layout/mobile/chuyen-gia/ExpertDetailPage";
import { getProductById } from "@/app/libs/prisma/product";
import { apiUrl } from "@/constants";
import BlogImage1 from "@/assets/images/blog/blog1.png";
import BlogImage2 from "@/assets/images/blog/blog2.png";
import BlogImage3 from "@/assets/images/blog/blog3.png";
import BlogImage4 from "@/assets/images/blog/blog4.png";
import IconFaceBook from "@/assets/icons/faceBook.svg";
import IconZalo from "@/assets/icons/zalo.svg";
import IconIg from "@/assets/icons/instagram.svg";

async function getExpertDetail(garageId: number) {
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
async function getServices(garageId: number) {
  const res = await fetch(
    `${apiUrl}api/products?isProduct=0&gara=${garageId}&limit=8`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
async function getProducts(garageId: number) {
  const res = await fetch(
    `${apiUrl}api/products?isProduct=1&gara=${garageId}&limit=8`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
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
];

const socials = [
  { id: "1", name: "SHARE ON FACEBOOK", image: IconFaceBook.src },
  { id: "2", name: "SHARE ON ZALO", image: IconZalo.src },
  { id: "3", name: "SHARE ON INSTAGRAM", image: IconIg.src },
];

const convenients = [
  { id: "1", name: "Cà phê", image: BlogImage1.src, properties: 129768 },
  { id: "2", name: "Điều hoà", image: BlogImage2.src, properties: 129768 },
  { id: "3", name: "Máy sấy", image: BlogImage3.src, properties: 129768 },
  { id: "4", name: "Giặc giũ", image: BlogImage4.src, properties: 129768 },
  { id: "5", name: "Bi-a", image: BlogImage4.src, properties: 129768 },
];
export default async function DetailProduct({
  params,
}: {
  params: { slug: number };
}) {
  const expertDetail: any = await getExpertDetail(9);
  const categories = await getCategories(9);
  const services = await getServices(9);
  const products = await getProducts(9);

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: ExpertDetailPageDesktop,
        },
        mobile: {
          defaultTheme: ExpertDetailPageMobile,
        },
      }}
      expertDetail={expertDetail}
      categories={categories}
      services={services}
      products={products}
      blogs={blogs}
      socials={socials}
      convenients={convenients}
    />
  );
}
