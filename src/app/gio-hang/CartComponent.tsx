"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import {
  Grid,
  Modal,
  Button,
  Group,
  TextInput,
  Card,
  Box,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
import InfoCar from "./_component/InfoCar";
import InfoCart from "./_component/InfoCart";
import InfoDate from "./_component/InfoDate";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Container from "../components/common/Container";
import styles from "./index.module.scss";
import { modals } from "@mantine/modals";
import Typo from "../components/elements/Typo";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
export default function CartComponent({ myAccount, carsData }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<any>();
  const [cartData, setCartData] = useState<any>([]);
  const handleDeleteOk = () => {
    setIsModalDeleteOpen(false);
    deleteItem(deleteRow?.productId);
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  const handleOpenModalDelete = (record: any) => {
    setIsModalDeleteOpen(true);
    setDeleteRow(record);
  };

  const incrementQuantity = (idProduct: number) => {
    const updateCartData = cartData.map((item: any) => {
      if (item.productId === idProduct) {
        item.quantity += 1;
      }
      return item;
    });
    localStorage.setItem("cartData", JSON.stringify(updateCartData));
    setCartData(updateCartData);
  };
  // giảm số lượng sản phẩm
  const decrementQuantity = (idProduct: number) => {
    const updateCartData = cartData.map((item: any) => {
      if (item.quantity === 1) {
        deleteItem(idProduct);
      } else if (item.productId === idProduct && item.quantity > 1) {
        item.quantity -= 1;
      }

      return item;
    });
    localStorage.setItem("cartData", JSON.stringify(updateCartData));
    setCartData(updateCartData);
  };

  // Tính tổng tiền
  const calculateSubTotal = () => {
    let subTotal = 0;
    cartData?.forEach((item: any) => {
      subTotal += item.priceSale * item.quantity;
    });
    return subTotal;
  };
  // Xóa sản phẩm ra khỏi giỏ hàng
  const deleteItem = (idProduct: any) => {
    const updatedCartData = cartData.filter(
      (item: any) => item?.productId !== idProduct
    );
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
    setCartData(updatedCartData);
  };
  useEffect(() => {
    const existingCartData = localStorage.getItem("cartData");
    if (existingCartData) {
      const parsedCartData = JSON.parse(existingCartData);
      setCartData(parsedCartData);
    }
  }, []);

  const form = useForm({
    initialValues: {
      fullName: myAccount?.name || "",
      phoneNumber: myAccount?.phone || "",
      address: myAccount?.address || "",
      carId: 3,
      carYearId: "",
      carNameId: "",
      carBrandId: "",
      numberPlates: "",
      detail: cartData,
      subTotal: 0,
    },
    validate: {},
  });

  useEffect(() => {
    form.setFieldValue("detail", cartData);
  }, [cartData]);

  console.log(cartData);

  const ModalAcceptOrder = () => {
    var dateTime = new Date();
    modals.openConfirmModal({
      title: (
        <Typo
          size="small"
          type="semi-bold"
          style={{ color: "var(--primary-color)" }}
        >
          Xác nhận thời gian
        </Typo>
      ),
      children: (
        <DateTimePicker
          label="Thời gian"
          defaultValue={dateTime}
          placeholder="Chọn thời gian "
          locale="vi"
          onChange={(value) => {
            if (value) {
              dateTime = value;
            }
          }}
        />
      ),
      size: "500px",
      centered: true,
      withCloseButton: false,
      labels: { confirm: "Tiếp tục", cancel: "Hủy" },
      onConfirm: () => {
        form.setFieldValue("dateTime", dateTime);
        handleSubmit(form.values, dateTime);
      },
    });
  };
  const handleSubmit = async (values: any, dateTime: Date) => {
    if (cartData?.length == 0) {
      notifications.show({
        title: "Thất bại",
        message: "Vui lòng thêm sản phẩm vào giỏ hàng",
      });
      return;
    }
    setLoading(true);
    values.dateTime = dateTime;
    values.subTotal = calculateSubTotal();

    values.total = calculateSubTotal();

    try {
      const res = await fetch(`/api/orders`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data?.order) {
        notifications.show({
          title: "Thất bại",
          message: "Đặt hàng thất bại: " + (data?.error || "Unknown error"),
        });
      } else {
        notifications.show({
          title: "Thành công",
          message: "Đặt hàng thành công",
        });
        // const sms = await fetch(`/api/orders/sendSMS`, {
        //   method: "POST",
        //   body: JSON.stringify(data?.order),
        // });
        localStorage.setItem("cartData", JSON.stringify([]));
        router.push(`/order/${data?.order?.slug}`);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      notifications.show({
        title: "Lỗi",
        message: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className="shop-cart pt-60 pb-60">
          <Container>
            <Grid gutter={16}>
              <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                <div className="checkout-widget">
                  <div className={styles.titleCard}>
                    <h4 className={styles.title}>Thông tin khách hàng</h4>
                  </div>
                  <Card>
                    <Grid gutter={16}>
                      <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("fullName")}
                          label="Họ Tên"
                          placeholder="Họ Tên"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("phoneNumber")}
                          label="Điện thoại"
                          placeholder="Điện thoại"
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("address")}
                          label="Địa chỉ"
                          type="text"
                          placeholder="Địa chỉ"
                        />
                      </Grid.Col>
                    </Grid>
                  </Card>
                </div>
              </Grid.Col>
              <InfoCar
                myAccount={myAccount}
                form={form}
                carsData={carsData}
                // carDetail={carDetail}
                // setCarDetail={setCarDetail}
              />
            </Grid>
            {/* <InfoDate setDate={setDate} setTime={setTime} /> */}
            <Suspense fallback={<p>loading...</p>}>
              <InfoCart
                loading={loading}
                calculateSubTotal={calculateSubTotal}
                cartData={cartData}
                decrementQuantity={decrementQuantity}
                handleOpenModalDelete={handleOpenModalDelete}
                incrementQuantity={incrementQuantity}
                form={form}
                ModalAcceptOrder={ModalAcceptOrder}
              />
            </Suspense>
          </Container>
        </div>
      </form>

      <Modal
        title="Delete"
        opened={isModalDeleteOpen}
        onClose={handleDeleteCancel}
        lockScroll={false}
      >
        <div>Bạn có muốn xoá không?</div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            variant="outline"
            key="cancel"
            onClick={handleDeleteCancel}
            color="red"
            leftSection={<IconBan size={16} />}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            h={{ base: 42, md: 50, lg: 50 }}
            radius={0}
            style={{ marginLeft: "12px" }}
            onClick={handleDeleteOk}
            variant="filled"
            leftSection={<IconChevronRight size={16} />}
          >
            Tiếp tục
          </Button>
        </Group>
      </Modal>
    </>
  );
}
