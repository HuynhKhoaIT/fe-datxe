"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { Grid, Modal, Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
import InfoCustomer from "./InfoCustomer";
import InfoCar from "./InfoCar";
import InfoCart from "./InfoCart";
import InfoDate from "./InfoDate";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Container from "../components/common/Container";
import { sendSMSOrder } from "@/utils/order";

export default function CartComponent({ myAccount }: any) {
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
      customerId: 1,
      fullName: "",
      phoneNumber: "",
      address: "",
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

  const handleSubmit = async (values: any) => {
    setLoading(true);
    values.garageId = 2;
    values.dateTime = new Date();
    values.total = calculateSubTotal();
    try {
      const res = await fetch(`/api/orders`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log("data", data);

      if (!data?.order) {
        notifications.show({
          title: "Thất bại",
          message: "Đặt hàng thất bại: " + (data?.error || "Unknown error"),
        });
      } else {
        console.log(data?.order);
        notifications.show({
          title: "Thành công",
          message: "Đặt hàng thành công",
        });
        const sms = await fetch(`/api/orders/sendSMS`, {
          method: "POST",
          body: JSON.stringify(data?.order),
        });
        localStorage.setItem("cartData", JSON.stringify([]));
        router.push(`/dashboard/order/${data?.order?.slug}`);
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

  const [visible, handlers] = useDisclosure(false);
  const [customer, setCustomer] = useState();
  const [carOptions, setCarOptions] = useState<any>([]);
  const [carDetail, setCarDetail] = useState<any>();

  async function getCustomer() {
    const res = await fetch(`/api/customer/1`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.cars?.map((item: any) => ({
      value: item.id.toString(),
      label: item.numberPlates,
      otherData: {
        carBrandId: item?.item,
        carNameId: item?.carNameId,
        carYearId: item?.carYearId,
        numberPlates: item?.numberPlates,
      },
    }));
    setCarOptions(dataOption);
    setCarDetail(data?.cars[0]);
    setCustomer(data);
  }
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getCustomer()]);
    };

    fetchData();
  }, []);
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="shop-cart pt-60 pb-60">
          <Container>
            <Grid gutter={16}>
              <InfoCustomer
                myAccount={myAccount}
                dataDetail={customer}
                form={form}
              />
              <Suspense fallback={<p>loading...</p>}>
                <InfoCar
                  myAccount={myAccount}
                  visible={visible}
                  form={form}
                  carOptions={carOptions}
                  carDetail={carDetail}
                  setCarDetail={setCarDetail}
                />
              </Suspense>
            </Grid>
            <InfoDate setDate={setDate} setTime={setTime} />
            <Suspense fallback={<p>loading...</p>}>
              <InfoCart
                loading={loading}
                calculateSubTotal={calculateSubTotal}
                cartData={cartData}
                decrementQuantity={decrementQuantity}
                handleOpenModalDelete={handleOpenModalDelete}
                incrementQuantity={incrementQuantity}
                form={form}
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
