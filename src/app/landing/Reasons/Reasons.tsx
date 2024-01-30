"use client";
import styles from "./index.module.scss";
import OverviewPanel from "../../components/layout/OverviewPanel";
import CardReassons from "./CardReasons";
import Reasons1 from "@/assets/images/reasson1.png";
import Reasons2 from "@/assets/images/reasson2.png";
import Reasons3 from "@/assets/images/reasson3.png";
import SlickCarousel from "../common/SlickCarousell";

export default function Reassons() {
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
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Lí do bạn nên chọn DatXe"
      hiddenShowMore={true}
      id="reassons"
    >
      <SlickCarousel column={3} gap={8}>
        {reassons?.map((data: any, index: number) => (
          <CardReassons data={data} key={index} />
        ))}
      </SlickCarousel>
    </OverviewPanel>
  );
}
