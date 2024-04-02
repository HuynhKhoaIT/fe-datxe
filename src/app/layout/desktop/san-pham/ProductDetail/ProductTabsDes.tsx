"use client";
import { IProduct } from "@/interfaces/product";
import { Tabs } from "@mantine/core";
import styles from "./ProductTabsDes.module.scss";
import Reviews from "./Review";
const ProductTabsDes = ({
  ProductDetail,
  productReview,
}: {
  ProductDetail: IProduct;
  productReview: any;
}) => {
  console.log(productReview);
  return (
    <Tabs
      defaultValue="description"
      classNames={{ list: styles.list, tabLabel: styles.tabLabel }}
    >
      <Tabs.List>
        <Tabs.Tab value="description">Mô tả</Tabs.Tab>
        <Tabs.Tab value="guarantee">Bảo hành</Tabs.Tab>
        <Tabs.Tab value="evaluate">Đánh giá</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="description">
        🚕 Sản phẩm chúng tôi bảo hành theo tiêu chuẩn của nhà sản xuất. Một số
        sản phẩm khác chúng tôi bảo hành từ 03 - 12 tháng tùy vào từng loại sau:
        <br />
        👉 Sản phẩm hao mòn theo thời gian bảo hành không quá 03 tháng (má
        phanh, các loại lọc, dầu nhờn,...) <br />
        👉 Sản phẩm, phụ tùng thiết bị điện, thiết bị liên kết từ nhiều loại chi
        tiết (cụm) bảo hành tối đa 06 tháng (hộp điều khiển, cụm phanh ABS, vĩ
        điều khiển,...)
        <br /> 👉 Các loại sản phẩm, phụ tùng thay thế theo chỉ định và được
        thực hiện theo đúng thời gian khuyến nghị của Chuyên gia đã đề ra có
        thời gian bảo hành 12 tháng.
        <br /> 👤 Về dịch vụ chúng tôi bảo hành từ 06 đến 12 tháng tùy vào dịch
        vụ. Vui lòng liên hệ để chúng tôi tư vấn và có chính sách phù hợp!
      </Tabs.Panel>

      <Tabs.Panel value="guarantee">
        👉 Những hạng mục cần bảo dưỡng và thay thế định kỳ theo số Kilomet cho
        xe ô tô là một việc làm cực kỳ quan trọng để đảm bảo xe có độ bền cao và
        luôn hoạt động ổn định theo thời gian, nhằm đảm bảo sự an toàn cho con
        người, giảm thiểu tối đa sự hỏng hóc của các chi tiết máy và gia tăng
        tuổi thọ của động cơ. <br />
        👉 Mỗi sản phẩm/dịch vụ của Chuyên gia cung cấp tại website này sẽ được
        từng chuyên gia quy định riêng. Khi quý khách hàng truy cập vào trang
        website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản
        này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ
        phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các
        thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần
        thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi
        các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp
        nhận với những thay đổi đó.
        <br /> 👉 Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật
        những thay đổi của chúng tôi.
      </Tabs.Panel>

      <Tabs.Panel value="evaluate">
        <Reviews />
      </Tabs.Panel>
    </Tabs>
  );
};
export default ProductTabsDes;
