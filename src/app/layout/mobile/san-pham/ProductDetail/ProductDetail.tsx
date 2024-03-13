"use client";
import { IProduct } from "@/interfaces/product";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Grid, Modal, Button, Group } from "@mantine/core";
import styles from "./Product.module.scss";
import { notifications } from "@mantine/notifications";
import Typo from "@/app/components/elements/Typo";
import Star from "@/assets/icons/star.svg";
import Book from "@/assets/icons/book.svg";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
import ProductSlider from "@/app/layout/desktop/san-pham/ProductDetail/ProductSlider";
function ProductDetail({ ProductDetail }: { ProductDetail: IProduct }) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const existingCartItems = JSON.parse("[]");
    existingCartItems.push({
      productId: ProductDetail?.id,
      quantity: 1,
      price: ProductDetail?.price,
      priceSale: ProductDetail?.salePrice,
      saleValue: 0,
      images: ProductDetail?.images,
      name: ProductDetail?.name,
      garageId: ProductDetail.garageId,
    });
    localStorage.setItem("cartData", JSON.stringify(existingCartItems));
    notifications.show({
      title: "Thành công",
      message: "Sản phẩm được thêm vào giỏ hàng.",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addProductToLocalStorage = () => {
    if (ProductDetail && session?.user) {
      const productId = ProductDetail.id;
      const garageId = ProductDetail.garageId;
      const existingCartItems = JSON.parse(
        localStorage.getItem("cartData") || "[]"
      );
      const index = existingCartItems.findIndex(
        (item: any) => item.productId === productId
      );
      const idCar = existingCartItems.findIndex(
        (item: any) => item.garageId === garageId
      );

      if (existingCartItems.length > 0 && idCar === -1) {
        showModal();
      } else {
        if (index !== -1) {
          existingCartItems[index].quantity += 1;
        } else {
          existingCartItems.push({
            productId: ProductDetail?.id,
            price: ProductDetail?.price,
            priceSale: ProductDetail?.salePrice,
            saleValue: 0,
            images: ProductDetail?.images,
            name: ProductDetail?.name,
            garageId: ProductDetail.garageId,
            quantity: 1,
          });
        }
        console.log("existingCartItems", existingCartItems);

        localStorage.setItem("cartData", JSON.stringify(existingCartItems));
        notifications.show({
          title: "Thành công",
          message: "Sản phẩm được thêm vào giỏ hàng.",
        });
      }
    } else {
      signIn();
    }
  };
  return (
    <Grid>
      <Grid.Col span={12}>
        <Grid
          className={styles.productDetail}
          gutter={22}
          style={{
            marginLeft: "0px",
            marginRight: "0px",
          }}
        >
          <Grid.Col span={12}>
            <ProductSlider images={JSON.parse(ProductDetail?.images)} />
          </Grid.Col>
          <Grid.Col span={12}>
            <div className={styles.info}>
              <Typo type="bold" style={{ marginBottom: 15 }}>
                {ProductDetail?.name}
              </Typo>
              <Typo style={{ fontSize: "14px", color: "var(--text-color)" }}>
                {ProductDetail?.code}
              </Typo>
              <div className={styles.category}>
                <Typo style={{ fontSize: "14px", color: "var(--nav-color)" }}>
                  Mâm lốp
                </Typo>
                <div className={styles.starBox}>
                  <img src={Star.src} />
                  <Typo style={{ fontSize: "14px", color: "var(--nav-color)" }}>
                    4.9 (2130 reviews)
                  </Typo>
                </div>
              </div>
              <div className={styles.salePrice}>
                <Typo
                  style={{
                    fontSize: "22px",
                    color: "var(--text-color-sale-price)",
                  }}
                  type="bold"
                >
                  <del>{ProductDetail?.price?.toLocaleString()} đ</del>
                </Typo>
                <Typo
                  style={{
                    fontSize: "14px",
                    color: "var(--text-color-sale-price)",
                  }}
                >
                  30% OFF
                </Typo>
              </div>
              <Typo
                type="bold"
                style={{ fontSize: "22px", color: "var(--primary-color)" }}
              >
                {ProductDetail?.salePrice?.toLocaleString()} đ
              </Typo>
              <Button
                size="lg"
                radius={0}
                mt={22}
                color={"var(--primary-color)"}
                leftSection={<img src={Book.src} />}
                onClick={addProductToLocalStorage}
              >
                Đặt lịch
              </Button>
              <div className={styles.boxText}>
                Đặt lịch trước không chờ đợi, an toàn, cộng điểm
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Modal title="Thông báo" opened={isModalOpen} onClose={handleCancel}>
        <div>
          Bạn đang đặt hàng với 2 chuyên gia khác nhau? Bạn có muốn xóa giỏ hàng
          để thêm sản phẩm mới?
        </div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            variant="outline"
            key="cancel"
            onClick={handleCancel}
            color="red"
            leftSection={<IconBan size={12} />}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            style={{ marginLeft: "12px" }}
            onClick={handleOk}
            variant="filled"
            leftSection={<IconChevronRight size={12} />}
          >
            Tiếp tục
          </Button>
        </Group>
      </Modal>
    </Grid>
  );
}

export default ProductDetail;
