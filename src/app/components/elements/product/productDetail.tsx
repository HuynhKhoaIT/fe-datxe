"use client";
import { IProduct } from "@/interfaces/product";
import {
  IconHeart,
  IconShoppingCart,
  IconChevronRight,
  IconMinus,
  IconPlus,
  IconBan,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Grid, Modal, Button, Group } from "@mantine/core";
import ProductGarage from "./ProductGarage";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import ProductSlider from "./ProductSlider";
import { notifications } from "@mantine/notifications";

const cx = classNames.bind(styles);
function ProductDetail({ ProductDetail }: { ProductDetail: IProduct }) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputValue, setInputValue] = useState(1);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const existingCartItems = JSON.parse("[]");
    existingCartItems.push({
      garageId: ProductDetail.garageId,
      product: ProductDetail,
      quantity: inputValue,
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

  // tăng số lượng
  const incrementValue = () => {
    setInputValue(inputValue + 1);
  };
  // giảm số lượng
  const decrementValue = () => {
    if (inputValue === 1) {
      return;
    }
    setInputValue(inputValue - 1);
  };

  const addProductToLocalStorage = () => {
    if (ProductDetail && session?.user) {
      const productId = ProductDetail.id;
      const garageId = ProductDetail.garageId;
      const existingCartItems = JSON.parse(
        localStorage.getItem("cartData") || "[]"
      );
      const index = existingCartItems.findIndex(
        (item: any) => item.product.id === productId
      );
      const idCar = existingCartItems.findIndex(
        (item: any) => item.product.garageId === garageId
      );

      if (existingCartItems.length > 0 && idCar === -1) {
        showModal();
      } else {
        if (index !== -1) {
          existingCartItems[index].quantity += inputValue;
        } else {
          existingCartItems.push({
            garageId: garageId,
            product: ProductDetail,
            quantity: inputValue,
          });
        }

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
          className={cx("product-detail")}
          gutter={22}
          style={{
            marginLeft: "0px",
            marginRight: "0px",
          }}
        >
          <Grid.Col span={5}>
            <div className="item-gallery">
              <div className="flexslider-thumbnails">
                <ProductSlider images={JSON.parse(ProductDetail?.images)} />
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={7}>
            <div className="single-item-info">
              <h4 className="single-item-title">{ProductDetail.name}</h4>
              <div className="single-item-price">
                <h4>
                  <del>{ProductDetail.price?.toLocaleString()}đ</del>
                  <span>{ProductDetail.salePrice?.toLocaleString()}đ</span>
                </h4>
              </div>

              <div className="mb-4">
                <p>
                  Áp dụng: <Link href={""}>Audi-A4</Link>,{" "}
                  <Link href={""}>Audi-A5</Link>, <Link href={""}>Audi-A6</Link>
                </p>
                <p>
                  Danh mục: <Link href={""}>Sửa chữa chung</Link>
                </p>
              </div>

              <div className="single-item-content">
                <h5>
                  Mã Sản Phẩm: <span>{ProductDetail.productCode}</span>
                </h5>
              </div>

              <div className="single-item-action">
                <h5 className="title">Số lượng:</h5>
                <div className="cart-qty">
                  <button className="minus-btn" onClick={decrementValue}>
                    <IconMinus />
                  </button>
                  <input
                    className="quantity bg-white"
                    type="text"
                    value={inputValue}
                    onChange={(e) =>
                      setInputValue(parseInt(e.target.value) || 1)
                    }
                  />
                  <button className="plus-btn" onClick={incrementValue}>
                    <IconPlus />
                  </button>
                </div>
                <div className="item-single-btn-area">
                  <button
                    className="theme-btn"
                    onClick={addProductToLocalStorage}
                  >
                    <IconShoppingCart />
                    Thêm vào giỏ
                  </button>
                  <Link href="#" className="single-item-btn">
                    <IconHeart />
                  </Link>
                </div>
              </div>

              <hr />

              <div className="single-item-share">
                <span>Chia sẻ:</span>
                <Link href="#">
                  <IconBrandFacebook />
                </Link>
                <Link href="#">
                  <IconBrandTwitter />
                </Link>
                <Link href="#">
                  <IconBrandInstagram />
                </Link>
                <Link href="#">
                  <IconBrandLinkedin />
                </Link>
                <Link href="#">
                  <IconBrandPinterest />
                </Link>
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={12}>
        {ProductDetail && ProductDetail.garageId && (
          <ProductGarage garage={ProductDetail.garageId} />
        )}
      </Grid.Col>
      <Grid.Col span={12}>
        <div className={cx("single-item-details", "product-description")}>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-tab1"
                data-bs-toggle="tab"
                data-bs-target="#tab1"
                type="button"
                role="tab"
                aria-controls="tab1"
                aria-selected="true"
              >
                Mô Tả
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="tab1"
              role="tabpanel"
              aria-labelledby="nav-tab1"
            >
              <div className="single-item-desc">
                {ProductDetail?.description}
              </div>
            </div>
          </div>
        </div>
      </Grid.Col>
      <Modal title="Thông báo" opened={isModalOpen} onClose={handleCancel}>
        <div>
          Bạn đang đặt hàng với 2 chuyên gia khác nhau? Bạn có muốn xóa giỏ hàng
          để thêm sản phẩm mới?
        </div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            variant="outline"
            key="cancel"
            onClick={handleCancel}
            color="red"
            leftSection={<IconBan size={12} />}
          >
            Huỷ bỏ
          </Button>
          <Button
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
