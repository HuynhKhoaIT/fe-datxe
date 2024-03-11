"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan, IconTrash } from "@tabler/icons-react";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { stepOrderOptions } from "@/constants/masterData";
import dynamic from "next/dynamic";
import ListPage from "@/app/components/layout/ListPage";
import { notifications } from "@mantine/notifications";
import Typo from "@/app/components/elements/Typo";
const DynamicModalChooseProducts = dynamic(
  () => import("../../marketing-campaign/choose-products/ModalChooseProducts"),
  {
    ssr: false,
  }
);
export default function OrderForm({ isEditing = false, dataDetail }: any) {
  const [loading, handlers] = useDisclosure();
  const [loadingButton, handlersButton] = useDisclosure();
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<any>(
    dataDetail
      ? dataDetail?.orderDetails.map((item: any) => ({
          ...item,
          id: item.productId,
        }))
      : []
  );

  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      detail: selectedProducts,
    },
    validate: {},
  });

  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [customerOptions, setCustomerOptions] = useState();

  async function getDataBrands() {
    const res = await fetch(`/api/car-model`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setBrandOptions(dataOption);
  }
  async function getDataModels(brandId: number) {
    if (brandId) {
      const res = await fetch(`/api/car-model/${brandId}`, { method: "GET" });
      const data = await res.json();
      if (!data) {
        throw new Error("Failed to fetch data");
      }
      const dataOption = data?.map((item: any) => ({
        value: item.id.toString(),
        label: item.title,
      }));
      setModelOptions(dataOption);
    }
  }
  async function getDataYearCar(modelId: number) {
    if (modelId) {
      const res = await fetch(`/api/car-model/${modelId}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!data) {
        throw new Error("Failed to fetch data");
      }
      const dataOption = data?.map((item: any) => ({
        value: item.id.toString(),
        label: item.title,
      }));
      setYearCarOptions(dataOption);
    }
  }

  async function getCustomers() {
    const res = await fetch(`/api/customer`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.fullName,
    }));
    setCustomerOptions(dataOption);
  }
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      await Promise.all([getCustomers(), getDataBrands()]);
      handlers.close();
    };

    if (!isEditing) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    if (!isEditing) {
      let updatedProducts = selectedProducts.map((detail: any) => ({
        name: detail.name,
        price: detail.price,
        productId: detail.id,
        quantity: 1,
        priceSale: detail.salePrice,
        subTotal: detail?.salePrice,
        status: "PUBLIC",
        saleType: "FIXED",
        saleValue: 0,
      }));
      form.setFieldValue("detail", updatedProducts);
    } else {
      let updatedProducts = selectedProducts.map((detail: any) => ({
        name: detail?.product?.name || detail?.name,
        price: detail.price,
        productId: detail.productId !== 0 ? detail.productId : detail.id,
        quantity: 1,
        priceSale: detail?.priceSale || detail?.salePrice,
        subTotal: detail?.priceSale || detail?.salePrice,
        status: detail?.status,
        saleType: detail?.saleType || "FIXED",
        saleValue: detail?.saleValue || 0,
      }));
      form.setFieldValue("detail", updatedProducts);
    }
  }, [selectedProducts]);

  useEffect(() => {
    const fetchData = async () => {
      handlers.open();

      if (isEditing && dataDetail) {
        try {
          await Promise.all([
            getDataBrands(),
            getDataModels(dataDetail?.car?.carBrandId),
            getDataYearCar(dataDetail?.car?.carNameId),
          ]);

          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue("customerId", dataDetail?.customerId.toString());
          form.setFieldValue(
            "carBrandId",
            dataDetail?.car?.carBrandId.toString()
          );
          form.setFieldValue(
            "carNameId",
            dataDetail?.car?.carNameId.toString()
          );
          form.setFieldValue(
            "carYearId",
            dataDetail?.car?.carYearId.toString()
          );
          form.setFieldValue("step", dataDetail?.step.toString());
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          handlers.close();
        }
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);

  // Tính tổng tiền
  const calculateSubTotal = () => {
    let subTotal = 0;
    console.log(form.values?.detail);
    form.values?.detail?.forEach((item: any) => {
      subTotal += item.priceSale * item.quantity;
    });
    return subTotal;
    // form.setFieldValue("total", subTotal);
  };
  const handleSubmit = async (values: any) => {
    values.total = calculateSubTotal();
    values.garageId = 1;
    values.dateTime = new Date();
    handlersButton.open();
    try {
      const url = isEditing ? `/api/orders/${dataDetail?.id}` : `/api/orders`;
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data?.order) {
        notifications.show({
          title: "Thất bại",
          message: "Đặt hàng thất bại: ",
        });
      } else {
        notifications.show({
          title: "Thành công",
          message: "Đặt hàng thành công",
        });
        if (isEditing) {
          const body = {
            dataBefore: dataDetail,
            dataAfter: data?.order,
          };
          const sms = await fetch(`/api/orders/sendSMS`, {
            method: "POST",
            body: JSON.stringify(body),
          });
        }
        router.back();
        router.refresh();
      }
    } catch (error) {
      console.error("Error during API call:", error);
      notifications.show({
        title: "Lỗi",
        message: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.",
      });
    } finally {
      handlersButton.close();
    }
  };

  const rows = form.values.detail.map((selectedRow: any, index: number) => {
    // const images = JSON.parse(selectedRow.images);
    return (
      <Table.Tr key={selectedRow.id}>
        <Table.Td miw={200}>
          {selectedRow.name || selectedRow?.product?.name || ""}
        </Table.Td>
        <Table.Td w={200}>
          <NumberInput
            size="lg"
            radius={0}
            w={200}
            {...form.getInputProps(`detail.${index}.priceSale`)}
            min={0}
            placeholder="Giá sale"
            suffix="đ"
            thousandSeparator=","
            onChange={(value: any) => {
              console.log("value", value);
              form.setFieldValue(
                `detail.${index}.subTotal`,
                form.values.detail[index].quantity * Number(value)
              );
              form.setFieldValue(`detail.${index}.priceSale`, value);
            }}
          />
        </Table.Td>
        <Table.Td w={150}>
          <NumberInput
            size="lg"
            radius={0}
            w={150}
            {...form.getInputProps(`detail.${index}.quantity`)}
            min={0}
            placeholder="Số lượng"
            thousandSeparator=","
            onChange={(value: any) => {
              console.log(form.values.detail[index].priceSale * Number(value));
              form.setFieldValue(`detail.${index}.quantity`, value);
              form.setFieldValue(
                `detail.${index}.subTotal`,
                form.values.detail[index].priceSale * Number(value)
              );
            }}
          />
        </Table.Td>
        <Table.Td w={150}>
          <NumberInput
            size="lg"
            radius={0}
            w={150}
            {...form.getInputProps(`detail.${index}.subTotal`)}
            min={0}
            readOnly
            placeholder="Số lượng"
            thousandSeparator=","
            suffix="đ"
          />
        </Table.Td>
        <Table.Td style={{ width: "120px", textAlign: "center" }}>
          <>
            <Tooltip label="Xoá" withArrow position="bottom">
              <Button
                size="lg"
                radius={0}
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  setSelectedProducts(
                    selectedProducts.filter(
                      (selectedItem: any) =>
                        selectedItem.id !== selectedRow.id &&
                        selectedItem.id !== selectedRow.productId
                    )
                  );
                }}
              >
                <IconTrash size={16} color="red" />
              </Button>
            </Tooltip>
          </>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <div
              className={styles.marketingInfo}
              style={{ background: "#fff" }}
            >
              <Typo className={styles.title}>Thông tin khách hàng</Typo>
              <Grid gutter={12}>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("customer.fullName")}
                    label="Tên khách hàng"
                    type="text"
                    placeholder="Tên khách hàng"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("customer.phoneNumber")}
                    label="Số điện thoại"
                    type="text"
                    placeholder="Số điện thoại"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("customer.address")}
                    label="Địa chỉ"
                    type="text"
                    placeholder="Địa chỉ"
                  />
                </Grid.Col>
              </Grid>
            </div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <div
              className={styles.marketingInfo}
              style={{ background: "#fff" }}
            >
              <Typo className={styles.title}>Thông tin xe</Typo>

              <Grid gutter={12}>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("numberPlates")}
                    label="Biển số xe"
                    type="text"
                    placeholder="Biển số xe"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carBrandId")}
                    label="Hãng xe"
                    type="text"
                    data={brandOptions}
                    placeholder="Hãng xe"
                    onChange={(value) => {
                      getDataModels(Number(value));
                      form.setFieldValue("carBrandId", value);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carNameId")}
                    label="Dòng xe"
                    type="text"
                    data={modelOptions}
                    placeholder="Dòng xe"
                    onChange={(value) => {
                      getDataYearCar(Number(value));
                      form.setFieldValue("carNameId", value);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carYearId")}
                    label="Năm sản xuất"
                    data={yearCarOptions}
                    type="text"
                    placeholder="Năm sản xuất"
                    onChange={(value) => {
                      form.setFieldValue("carYearId", value);
                    }}
                  />
                </Grid.Col>
              </Grid>
            </div>
          </Grid.Col>
        </Grid>

        <Grid mt={24}>
          <Grid.Col span={12}>
            <ListPage
              title="Chi tiết đơn hàng"
              style={{ height: "100%" }}
              actionBar={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="lg"
                    radius={0}
                    onClick={(e) => {
                      openModal();
                    }}
                    leftSection={<IconPlus size={18} />}
                  >
                    Thêm sản phẩm
                  </Button>
                </div>
              }
              baseTable={
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Tên sản phẩm</Table.Th>
                      <Table.Th>Giá</Table.Th>
                      <Table.Th>Số lượng</Table.Th>
                      <Table.Th>Tổng tiền</Table.Th>
                      <Table.Th>Hành động</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              }
            />
          </Grid.Col>
        </Grid>
        <div style={{ marginTop: 20 }} className={styles.marketingInfo}>
          <Typo className={styles.title}>Thông tin đơn hàng</Typo>

          <Grid gutter={12} mt={24}>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
              <NumberInput
                size="lg"
                radius={0}
                label="Tổng đơn hàng"
                placeholder="Tổng đơn hàng"
                suffix="đ"
                readOnly
                thousandSeparator=","
                value={calculateSubTotal()}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
              <Select
                size="lg"
                radius={0}
                label="Tình trạng đơn hàng"
                placeholder="Tình trạng đơn hàng"
                {...form.getInputProps("step")}
                data={stepOrderOptions}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
              <Textarea
                {...form.getInputProps("note")}
                label="Ghi chú của khách hàng"
                minRows={3}
                autosize={true}
                placeholder="Ghi chú của khách hàng"
              />
            </Grid.Col>
          </Grid>
        </div>
        <Group justify="end" mt={20}>
          <Button
            size="lg"
            radius={0}
            variant="outline"
            key="cancel"
            color="red"
            leftSection={<IconBan size={16} />}
            onClick={() => router.back()}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            radius={0}
            loading={loadingButton}
            style={{ marginLeft: "12px" }}
            key="submit"
            type="submit"
            variant="filled"
            leftSection={<IconPlus size={16} />}
          >
            {isEditing ? "Cập nhật" : "Thêm"}
          </Button>
        </Group>
      </form>
      <DynamicModalChooseProducts
        openModal={openModalChoose}
        close={closeModal}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
      />
    </Box>
  );
}
