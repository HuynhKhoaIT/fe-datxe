import React from "react";
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

export default function InfoCart({
  loading,
  calculateSubTotal,
  cartData,
  decrementQuantity,
  handleOpenModalDelete,
  incrementQuantity,
}: any) {
  const columns = [
    {
      label: <span>Hình ảnh</span>,
      name: "image",
      dataIndex: ["product", "thumbnail"],
      width: "90px",
      render: (data: any) => {
        if (!data) {
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
        return <Image radius="md " h={40} w={80} fit="contain" src={data} />;
      },
    },
    {
      label: <span>Tên sản phẩm</span>,
      name: "name",
      dataIndex: ["product", "name"],
    },
    {
      label: <span>Giá</span>,
      name: "price",
      dataIndex: ["product", "price"],
      width: "120px",
      textAlign: "right",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Số lượng</span>,
      name: "quantity",
      dataIndex: [],
      width: "160px",
      textAlign: "center",
      render: (dataRow: any) => {
        return (
          <>
            <Button
              variant="transparent"
              onClick={() => decrementQuantity(dataRow?.product?.id)}
            >
              <IconMinus size={16} />
            </Button>
            <span style={{ padding: "10px" }}>{dataRow?.quantity}</span>
            <Button
              variant="transparent"
              onClick={() => incrementQuantity(dataRow?.product?.id)}
            >
              <IconPlus size={16} />
            </Button>
          </>
        );
      },
    },
    {
      label: <span>Thành tiền</span>,
      name: "totalPrice",
      dataIndex: [],
      width: "120px",
      textAlign: "right",
      render: (dataRow: any) => {
        return (
          <span>
            {(dataRow?.product?.price * dataRow?.quantity).toLocaleString()}đ
          </span>
        );
      },
    },
    {
      label: <span>Hành động</span>,
      dataIndex: [],
      width: "120px",
      textAlign: "center",
      render: (record: any) => {
        return (
          <Button
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
    <div className="container">
      <Card className="shop-cart-wrapper">
        <TableBasic data={cartData} columns={columns} />
        <Card className="cart-footer">
          <Grid justify="space-between">
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <Group className="cart-coupon " pos="relative">
                <TextInput
                  type="text"
                  className="form-control"
                  placeholder="Your Coupon Code"
                />
                <Button className="coupon-btn" variant="filled" pos="absolute">
                  Apply
                </Button>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <ul>
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
    </div>
  );
}
