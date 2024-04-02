"use client";
import Container from "@/app/components/common/Container";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ProductDetail from "./ProductDetail/ProductDetail";
import ProductTabsDes from "./ProductDetail/ProductTabsDes";
import ExpertBox from "./ExpertBox";
import ImagesShowRoom from "./ImagesShowRoom";
import ProductsRelate from "./ProductRelate";
import styles from "./ProductDetailPage.module.scss";
import { Flex } from "@mantine/core";
const Breadcrumbs = [
  { title: "Trang Chủ", href: "../" },
  { title: "Danh sách sản phẩm", href: "/san-pham" },
  { title: "Chi tiết sản phẩm" },
];
const ProductDetailPageDesktop = ({
  product,
  productRelate,
  productReview,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Breadcrumb breadcrumbs={Breadcrumbs} />
        <Flex direction={"column"} gap={40}>
          <ProductDetail ProductDetail={product?.data?.product} />
          <ProductTabsDes
            ProductDetail={product?.data?.product}
            productReview={productReview}
          />
          <ExpertBox ProductDetail={product?.data?.product} />
          <ImagesShowRoom />
          <ProductsRelate productRelate={productRelate?.data} />
          <div></div>
        </Flex>
      </Container>
    </div>
  );
};
export default ProductDetailPageDesktop;
