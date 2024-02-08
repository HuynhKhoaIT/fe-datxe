import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import ImageField from "@/app/components/form/ImageField";
import ImageStory from "@/assets/images/story.png";
import Container from "@/app/components/common/Container";
const Story = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Typo style={{ color: "#23262F", fontSize: "48px" }} type="bold">
            Câu chuyện khởi nghiệp
          </Typo>
          <Typo style={{ color: "#777E90", fontSize: "24px" }}>
            Các danh mục sản phẩm tiêu biểu
          </Typo>
        </div>
        <div className={styles.content}>
          <div className={styles.image}>
            <ImageField width={448} src={ImageStory.src} radius={10} />
          </div>
          <Typo size="priamry" style={{ color: "#777E90" }}>
            Năm 2018 trong một chuyến du lịch cùng gia đình Ms.Trang gặp khó
            khăn trong vấn đề sửa chữa cho chiếc xe ô tô của mình. Cuối năm
            2020, Bà Trương Thị Huyền Trang quyết định thành lập công ty phần
            mềm Đặt Lịch Bảo Dưỡng, một trong những phần mềm tiên phong trong
            vận hành và quản lý dịch vụ ô tô. Hiện tại phần mềm DLBD có gần 1000
            trung tâm dịch vụ ô tô trên toàn quốc tin tưởng và sử dụng. Năm
            2023, để thuận tiện cho “chủ xe” đặt các dịch vụ tại các Chuyên gia
            đã liên kết, ứng dụng DatXE đã ra đời.
          </Typo>
        </div>
      </div>
    </Container>
  );
};
export default Story;
