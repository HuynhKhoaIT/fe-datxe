"use client";
import React, { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { checkOutCart } from "@/utils/order";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import {
  Grid,
  Modal,
  TextInput,
  Box,
  Select,
  Button,
  Group,
  Table,
  LoadingOverlay,
  Card,
  Avatar,
} from "@mantine/core";
import { ActionIcon, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconClock12,
  IconTrash,
  IconBan,
  IconChevronRight,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import InfoCustomer from "./InfoCustomer";
import InfoCar from "./InfoCar";
import InfoCart from "./InfoCart";
import InfoDate from "./InfoDate";
import { useDisclosure } from "@mantine/hooks";
import { getCar } from "@/utils/car";

export default function CartComponent({
  carDefault,
  carOptions,
  carId: carIdDefault,
}: any) {
  // const [form] = Form.useForm();
  const ref = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<any>();
  const [cartData, setCartData] = useState<
    {
      product: { id: number; name: string; price: number; thumbnail: string };
      quantity: number;
    }[]
  >([]);
  const [carId, setCarId] = useState<any>(carIdDefault);
  const handleDeleteOk = () => {
    setIsModalDeleteOpen(false);
    deleteItem(deleteRow?.product?.id);
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  const handleOpenModalDelete = (record: any) => {
    setIsModalDeleteOpen(true);
    setDeleteRow(record);
  };
  const transformedProducts = cartData?.map((item) => {
    return {
      id: item?.product?.id,
      quantity: item?.quantity,
      price: item?.product?.price,
    };
  });

  const incrementQuantity = (productId: number) => {
    const updateCartData = cartData.map((item) => {
      if (item.product.id === productId) {
        item.quantity += 1;
      }
      return item;
    });
    localStorage.setItem("cartData", JSON.stringify(updateCartData));
    setCartData(updateCartData);
  };
  // giảm số lượng sản phẩm
  const decrementQuantity = (productId: number) => {
    const updateCartData = cartData.map((item) => {
      if (item.quantity === 1) {
        deleteItem(productId);
      } else if (item.product.id === productId && item.quantity > 1) {
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
    cartData?.forEach((item) => {
      subTotal += item.product.price * item.quantity;
    });
    return subTotal;
  };
  // Xóa sản phẩm ra khỏi giỏ hàng
  const deleteItem = (productId: number) => {
    const updatedCartData = cartData.filter(
      (item) => item?.product?.id !== productId
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (cartData.length == 0) {
        notifications.show({
          title: "Error",
          message: "Vui lòng thêm sản phẩm vào giỏ hàng",
        });
        setLoading(false);
        return;
      }
      const arrivalTime = date + " " + time;
      await checkOutCart(carId, arrivalTime, transformedProducts, token ?? "");
      localStorage.setItem("cartData", JSON.stringify([]));
      const existingCartData = localStorage.getItem("cartData");
      if (existingCartData) {
        const parsedCartData = JSON.parse(existingCartData);
        setCartData(parsedCartData);
      }
      notifications.show({
        title: "Thành công",
        message: "Đặt hàng thành công",
      });
      setLoading(false);
      // router.push('/dashboard/order/' + checkOut.id);
    } catch (error) {
      notifications.show({
        title: "Thất bại",
        message: "Đặt hàng thất bại! Vui lòng thử lại.",
      });
      setLoading(false);
    }
  };
  const [visible, handlers] = useDisclosure(false);
  const selectCar = async (value: any) => {
    handlers.open();
    try {
      const selectedCar = await getCar(token ?? "", value);
      setCarSelect(selectedCar);
      handlers.close();
    } catch (error) {
      console.error("Error selecting car:", error);
    }
  };
  const [carSelect, setCarSelect] = useState<any>();
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="shop-cart pt-60 pb-60">
          <div className="container">
            <Grid gutter={16}>
              <InfoCustomer dataDetail={session?.user} />
              <Suspense fallback={<p>loading...</p>}>
                <InfoCar
                  setCarId={setCarId}
                  carDefault={carDefault}
                  carOptions={carOptions}
                  session={session}
                  visible={visible}
                  carSelect={carSelect}
                  selectCar={selectCar}
                />
              </Suspense>
            </Grid>
            <InfoDate setDate={setDate} setTime={setTime} />
          </div>
          <Suspense fallback={<p>loading...</p>}>
            <InfoCart
              loading={loading}
              calculateSubTotal={calculateSubTotal}
              cartData={cartData}
              decrementQuantity={decrementQuantity}
              handleOpenModalDelete={handleOpenModalDelete}
              incrementQuantity={incrementQuantity}
            />
          </Suspense>
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
            variant="outline"
            key="cancel"
            onClick={handleDeleteCancel}
            color="red"
            leftSection={<IconBan size={16} />}
          >
            Huỷ bỏ
          </Button>
          <Button
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
