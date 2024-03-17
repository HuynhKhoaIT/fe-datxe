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
  Tabs,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconPlus,
  IconBan,
  IconTrash,
  IconChevronRight,
} from "@tabler/icons-react";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { stepOrderOptions } from "@/constants/masterData";
import dynamic from "next/dynamic";
import ListPage from "@/app/components/layout/ListPage";
import { notifications } from "@mantine/notifications";
import Typo from "@/app/components/elements/Typo";
import ItemProduct from "../_component/ItemProduct";
import {
  getOptionsBrands,
  getOptionsCustomers,
  getOptionsModels,
  getOptionsYearCar,
} from "@/utils/util";

const DynamicModalChooseProducts = dynamic(
  () => import("../../marketing-campaign/choose-products/ModalChooseProducts"),
  {
    ssr: false,
  }
);

export default function OrderForm({ isEditing = false, dataDetail }: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [activeTab, setActiveTab] = useState<string | null>("car");
  const [errorPlate, handlersPlate] = useDisclosure();
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

  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [customerOptions, setCustomerOptions] = useState();

  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      detail: selectedProducts,
      numberPlates: "",
      customer: {},
    },
    validate: {
      numberPlates: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      const [customer, brands] = await Promise.all([
        getOptionsCustomers(),
        getOptionsBrands(),
      ]);
      setCustomerOptions(customer);
      setBrandOptions(brands);
      handlers.close();
    };

    if (!isEditing) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    if (!isEditing) {
      let updatedProducts = selectedProducts.map((detail: any) => ({
        images: detail.images,
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
        images: detail.images,
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
          const [brands, models, yearCars] = await Promise.all([
            getOptionsBrands(),
            getOptionsModels(dataDetail?.car?.carBrandId),
            getOptionsYearCar(dataDetail?.car?.carNameId),
          ]);
          setBrandOptions(brands);
          setModelOptions(models);
          setYearCarOptions(yearCars);

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
    form.values?.detail?.forEach((item: any) => {
      subTotal += item.priceSale * item.quantity;
    });
    return subTotal;
    // form.setFieldValue("total", subTotal);
  };
  const handleSubmit = async (values: any) => {
    values.total = calculateSubTotal();
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
        {isMobile ? (
          <Tabs
            value={activeTab}
            onChange={(value) => {
              if (form.values.numberPlates.length === 0) {
                handlersPlate.open();
              } else {
                setActiveTab(value);
              }
            }}
          >
            <Tabs.List classNames={{ list: styles.list }}>
              <Tabs.Tab classNames={{ tab: styles.tab }} value="car">
                Xe
              </Tabs.Tab>
              <Tabs.Tab classNames={{ tab: styles.tab }} value="customer">
                Khách hàng
              </Tabs.Tab>
              <Tabs.Tab classNames={{ tab: styles.tab }} value="detailOrder">
                Chi tiết đơn hàng
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="car">
              <Grid gutter={12} className={styles.marketingInfo}>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("numberPlates")}
                    label="Biển số xe"
                    type="text"
                    onChange={(e) => {
                      if (e.target.value.length > 0) {
                        handlersPlate.close();
                      }
                      form.setFieldValue("numberPlates", e.target.value);
                    }}
                    error={errorPlate ? "Vui lòng nhập..." : false}
                    placeholder="Biển số xe"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carBrandId")}
                    label="Hãng xe"
                    type="text"
                    data={brandOptions}
                    placeholder="Hãng xe"
                    onChange={async (value) => {
                      const optionsData = await getOptionsModels(Number(value));
                      setModelOptions(optionsData);
                      form.setFieldValue("carBrandId", value);
                      form.setFieldValue("carNameId", null);
                      form.setFieldValue("carYearId", null);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carNameId")}
                    label="Dòng xe"
                    type="text"
                    data={modelOptions}
                    placeholder="Dòng xe"
                    onChange={async (value) => {
                      const optionsData = await getOptionsYearCar(
                        Number(value)
                      );
                      setYearCarOptions(optionsData);
                      form.setFieldValue("carNameId", value);
                      form.setFieldValue("carYearId", null);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carYearId")}
                    label="Năm SX"
                    data={yearCarOptions}
                    type="text"
                    placeholder="Năm sản xuất"
                    onChange={(value) => {
                      form.setFieldValue("carYearId", value);
                    }}
                  />
                </Grid.Col>
              </Grid>
              <Group justify="end" mt={20}>
                <Button
                  size="lg"
                  radius={0}
                  h={{ base: 42, md: 50, lg: 50 }}
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
                  h={{ base: 42, md: 50, lg: 50 }}
                  loading={loadingButton}
                  style={{ marginLeft: "12px" }}
                  variant="filled"
                  onClick={() => {
                    if (form.values.numberPlates.length === 0) {
                      handlersPlate.open();
                    } else {
                      setActiveTab("customer");
                    }
                  }}
                  leftSection={<IconChevronRight size={16} />}
                >
                  Tiếp tục
                </Button>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="customer">
              <Grid gutter={12} className={styles.marketingInfo}>
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
              <Group justify="end" mt={20}>
                <Button
                  size="lg"
                  radius={0}
                  h={{ base: 42, md: 50, lg: 50 }}
                  variant="outline"
                  key="cancel"
                  color="red"
                  onClick={() => {
                    setActiveTab("car");
                  }}
                  leftSection={<IconBan size={16} />}
                >
                  Quay lại
                </Button>
                <Button
                  size="lg"
                  radius={0}
                  h={{ base: 42, md: 50, lg: 50 }}
                  loading={loadingButton}
                  style={{ marginLeft: "12px" }}
                  variant="filled"
                  onClick={() => {
                    setActiveTab("detailOrder");
                  }}
                  leftSection={<IconChevronRight size={16} />}
                >
                  Tiếp tục
                </Button>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="detailOrder">
              <>
                <div
                  style={{ marginTop: 20 }}
                  className={styles.cardListProduct}
                >
                  <div className={styles.top}>
                    <Typo
                      className={styles.title}
                      size="primary"
                      type="bold"
                      style={{ color: "var(--primary-orange)" }}
                    >
                      Chi tiết đơn hàng
                    </Typo>
                    <Button
                      size="lg"
                      radius={0}
                      h={{ base: 42, md: 50, lg: 50 }}
                      onClick={(e) => {
                        openModal();
                      }}
                      leftSection={<IconPlus size={18} />}
                    >
                      Thêm
                    </Button>
                  </div>
                  <Grid className={styles.marketingInfo}>
                    <Grid.Col span={12}>
                      {!isMobile ? (
                        <ListPage
                          style={{ height: "100%" }}
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
                      ) : (
                        form.values.detail?.map(
                          (product: any, index: number) => {
                            return (
                              <ItemProduct
                                data={product}
                                key={index}
                                index={index}
                                form={form}
                                setSelectedProducts={setSelectedProducts}
                                selectedProducts={selectedProducts}
                              />
                            );
                          }
                        )
                      )}
                    </Grid.Col>
                  </Grid>
                </div>
                <div style={{ marginTop: 20 }} className={styles.card}>
                  <Typo
                    className={styles.title}
                    size="primary"
                    type="bold"
                    style={{ color: "var(--primary-orange)" }}
                  >
                    Thông tin đơn hàng
                  </Typo>

                  <Grid gutter={12} mt={24} className={styles.marketingInfo}>
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
                    {isEditing && (
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
                    )}
                    <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                      <Textarea
                        size="lg"
                        radius={0}
                        {...form.getInputProps("note")}
                        label="Ghi chú của khách hàng"
                        minRows={3}
                        autosize={true}
                        placeholder="Ghi chú của khách hàng"
                      />
                    </Grid.Col>
                  </Grid>
                  <Group justify="end" mt={20}>
                    <Button
                      size="lg"
                      radius={0}
                      h={{ base: 42, md: 50, lg: 50 }}
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
                      h={{ base: 42, md: 50, lg: 50 }}
                      loading={loadingButton}
                      style={{ marginLeft: "12px" }}
                      key="submit"
                      type="submit"
                      variant="filled"
                      leftSection={<IconPlus size={16} />}
                    >
                      {isEditing ? "Cập nhật" : "Hoàn thành"}
                    </Button>
                  </Group>
                </div>
              </>
            </Tabs.Panel>
          </Tabs>
        ) : (
          <>
            <Grid gutter={12}>
              <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <div className={styles.card}>
                  <Typo
                    size="primary"
                    type="bold"
                    style={{ color: "var(--primary-orange)" }}
                    className={styles.title}
                  >
                    Thông tin xe
                  </Typo>
                  <Grid gutter={12} className={styles.marketingInfo}>
                    <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                      <TextInput
                        withAsterisk
                        size="lg"
                        radius={0}
                        error="vui lòng nhập"
                        {...form.getInputProps("numberPlates")}
                        label="Biển số xe"
                        type="text"
                        placeholder="Biển số xe"
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                      <Select
                        size="lg"
                        radius={0}
                        {...form.getInputProps("carBrandId")}
                        label="Hãng xe"
                        type="text"
                        data={brandOptions}
                        placeholder="Hãng xe"
                        onChange={async (value) => {
                          const optionsData = await getOptionsModels(
                            Number(value)
                          );
                          setModelOptions(optionsData);
                          form.setFieldValue("carBrandId", value);
                          form.setFieldValue("carNameId", null);
                          form.setFieldValue("carYearId", null);
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                      <Select
                        size="lg"
                        radius={0}
                        {...form.getInputProps("carNameId")}
                        label="Dòng xe"
                        type="text"
                        data={modelOptions}
                        placeholder="Dòng xe"
                        onChange={async (value) => {
                          const optionsData = await getOptionsYearCar(
                            Number(value)
                          );
                          setYearCarOptions(optionsData);
                          form.setFieldValue("carNameId", value);
                          form.setFieldValue("carYearId", null);
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                      <Select
                        size="lg"
                        radius={0}
                        {...form.getInputProps("carYearId")}
                        label="Năm SX"
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
              <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <div className={styles.card}>
                  <Typo
                    size="primary"
                    type="bold"
                    style={{ color: "var(--primary-orange)" }}
                    className={styles.title}
                  >
                    Thông tin khách hàng
                  </Typo>
                  <Grid gutter={12} className={styles.marketingInfo}>
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
            </Grid>
            <div style={{ marginTop: 20 }} className={styles.cardListProduct}>
              <div className={styles.top}>
                <Typo
                  className={styles.title}
                  size="primary"
                  type="bold"
                  style={{ color: "var(--primary-orange)" }}
                >
                  Chi tiết đơn hàng
                </Typo>
                <Button
                  size="lg"
                  radius={0}
                  h={{ base: 42, md: 50, lg: 50 }}
                  onClick={(e) => {
                    openModal();
                  }}
                  leftSection={<IconPlus size={18} />}
                >
                  Thêm
                </Button>
              </div>
              <Grid className={styles.marketingInfo}>
                <Grid.Col span={12}>
                  {!isMobile ? (
                    <ListPage
                      style={{ height: "100%" }}
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
                  ) : (
                    form.values.detail?.map((product: any, index: number) => {
                      return (
                        <ItemProduct
                          data={product}
                          key={index}
                          index={index}
                          form={form}
                          setSelectedProducts={setSelectedProducts}
                          selectedProducts={selectedProducts}
                        />
                      );
                    })
                  )}
                </Grid.Col>
              </Grid>
            </div>
            <div style={{ marginTop: 20 }} className={styles.card}>
              <Typo
                className={styles.title}
                size="primary"
                type="bold"
                style={{ color: "var(--primary-orange)" }}
              >
                Thông tin đơn hàng
              </Typo>

              <Grid gutter={12} mt={24} className={styles.marketingInfo}>
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
                {isEditing && (
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
                )}
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <Textarea
                    size="lg"
                    radius={0}
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
                h={{ base: 42, md: 50, lg: 50 }}
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
                h={{ base: 42, md: 50, lg: 50 }}
                loading={loadingButton}
                style={{ marginLeft: "12px" }}
                key="submit"
                type="submit"
                variant="filled"
                leftSection={<IconPlus size={16} />}
              >
                {isEditing ? "Cập nhật" : "Hoàn thành"}
              </Button>
            </Group>
          </>
        )}
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
