"use client";
import React, { useEffect } from "react";
import {
  Grid,
  TextInput,
  Card,
  Table,
  Group,
  Button,
  Image,
} from "@mantine/core";
import TableBasic from "../components/table/Tablebasic";
import ImageDefult from "../../../public/assets/images/logoDatxe.png";
import { IconPlus, IconMinus, IconTrash } from "@tabler/icons-react";
import styles from "./InfoCart.module.scss";
export default function InfoCart({
  loading,
  calculateSubTotal,
  cartData,
  decrementQuantity,
  handleOpenModalDelete,
  incrementQuantity,
  form,
}: any) {
  useEffect(() => {
    const fetchData = async () => {
      form.setFieldValue("subTotal", calculateSubTotal());
    };

    if (calculateSubTotal) fetchData();
  }, []);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: ["images"],
      width: "90px",
      render: (data: any) => {
        const images = JSON.parse(data);
        if (!images) {
          return (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w="auto"
              fit="contain"
            />
          );
        }
        return (
          <Image radius="md " h={40} w={80} fit="contain" src={images[0]} />
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên sản phẩm
        </span>
      ),
      name: "title",
      dataIndex: ["name"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá</span>
      ),
      name: "price",
      dataIndex: ["priceSale"],
      width: "120px",
      textAlign: "right",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Số lượng</span>
      ),
      name: "quantity",
      dataIndex: [],
      width: "160px",
      textAlign: "center",
      render: (dataRow: any) => {
        return (
          <>
            <Button
              radius={0}
              variant="transparent"
              onClick={() => decrementQuantity(dataRow?.productId)}
            >
              <IconMinus size={16} />
            </Button>
            <span style={{ padding: "10px" }}>{dataRow?.quantity}</span>
            <Button
              radius={0}
              variant="transparent"
              onClick={() => incrementQuantity(dataRow?.productId)}
            >
              <IconPlus size={16} />
            </Button>
          </>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Thành tiền
        </span>
      ),
      name: "totalPrice",
      dataIndex: [],
      width: "120px",
      textAlign: "right",
      render: (dataRow: any) => {
        return (
          <span>
            {(dataRow?.priceSale * dataRow?.quantity).toLocaleString()}đ
          </span>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "120px",
      textAlign: "center",
      render: (record: any) => {
        return (
          <Button
            size="lg"
            radius={0}
            variant="transparent"
            color="red"
            onClick={() => handleOpenModalDelete(record)}
            style={{ padding: 0 }}
          >
            <IconTrash />
          </Button>
        );
      },
    },
  ];
  return (
    <Card className="shop-cart-wrapper">
      <TableBasic data={cartData} columns={columns} />
      <Card className="cart-footer">
        <Grid justify="space-between">
          <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
            <Group className="cart-coupon " pos="relative">
              <TextInput
                radius={0}
                type="text"
                className="form-control"
                placeholder="Your Coupon Code"
              />
              <Button
                radius={0}
                className="coupon-btn"
                variant="filled"
                pos="absolute"
              >
                Apply
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
            <ul className={styles.calculateSubTotal}>
              <li>
                <strong>Tổng tiền hàng:</strong>
                <span>{calculateSubTotal().toLocaleString()}đ</span>
              </li>
              <li className="cart-total">
                <strong>Tổng cộng:</strong>
                <span>{calculateSubTotal().toLocaleString()}đ</span>
              </li>
            </ul>
            <Group justify="end">
              <Button
                size="lg"
                radius={0}
                className="theme-btn"
                variant="filled"
                type="submit"
                loading={loading}
                style={{ background: "var(--theme-color)" }}
              >
                Đặt lịch
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Card>
    </Card>
  );
}
