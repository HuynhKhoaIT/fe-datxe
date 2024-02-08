import RenderContext from "@/app/components/elements/RenderContext";
import LandingDesktop from "@/app/layout/desktop/landing";
import RuaXe from "@/assets/images/landing/rua-xe.png";
import PhuKien from "@/assets/images/landing/phu-kien.png";
import MamLop from "@/assets/images/landing/mam-lop.png";
import DoanhNghiep from "@/assets/images/landing/doanh-nghiep.png";
import ChuyenGia from "@/assets/images/landing/chuyen-gia.png";
import ChamSocXe from "@/assets/images/landing/cham-soc-xe.png";
import BaoDuong from "@/assets/images/landing/bao-duong.png";
import AcQuy from "@/assets/images/landing/ac-quy.png";
import BlogImage1 from "@/assets/images/blog/blog1.png";
import BlogImage2 from "@/assets/images/blog/blog2.png";
import BlogImage3 from "@/assets/images/blog/blog3.png";
import BlogImage4 from "@/assets/images/blog/blog4.png";

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
const data = [
  {
    id: "1",
    name: "Chủ xe",
    children: [
      {
        id: "1",
        title: "Rửa xe",
        subTitle: "Tìm kiếm mọi thứ bạn cần, hàng tạp hoá và hơn thế nữa.",
        image: RuaXe.src,
      },
      {
        id: "2",
        title: "Phụ kiện &  Đồ chơi",
        subTitle: "Tìm kiếm mọi thứ bạn cần, hàng tạp hoá và hơn thế nữa.",
        image: PhuKien.src,
      },
      {
        id: "3",
        title: "Mâm & lốp",
        subTitle: "Tìm kiếm mọi thứ bạn cần, hàng tạp hoá và hơn thế nữa.",
        image: MamLop.src,
      },
      {
        id: "4",
        title: "Chăm sóc xe",
        subTitle: "Tìm kiếm mọi thứ bạn cần, hàng tạp hoá và hơn thế nữa.",
        image: ChamSocXe.src,
      },
      {
        id: "5",
        title: "Ắc quy",
        subTitle: "Tìm kiếm mọi thứ bạn cần, hàng tạp hoá và hơn thế nữa.",
        image: AcQuy.src,
      },
      {
        id: "6",
        title: "Bảo dưỡng định kỳ",
        subTitle: "Tìm kiếm mọi thứ bạn cần, hàng tạp hoá và hơn thế nữa.",
        image: BaoDuong.src,
      },
    ],
  },
  {
    id: "2",
    name: "Chuyên gia",
    children: [
      {
        id: "1",
        title: "Trở thành chuyên gia",
        subTitle: "Tìm kiếm mọi thứ bạn cần, hàng tạp hoá và hơn thế nữa.",
        image: ChuyenGia.src,
      },
    ],
  },
  {
    id: "3",
    name: "Doanh nghiệp",
    children: [
      {
        id: "1",
        title: "Trở thành doanh nghiệp",
        subTitle: "Tìm kiếm mọi thứ bạn cần, hàng tạp hoá và hơn thế nữa.",
        image: DoanhNghiep.src,
      },
    ],
  },
];
export default async function Landing() {
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: LandingDesktop,
        },
        mobile: {
          defaultTheme: LandingDesktop,
        },
      }}
      data={data}
      blogs={blogs}
    />
  );
}
