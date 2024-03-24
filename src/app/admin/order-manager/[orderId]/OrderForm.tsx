"use client";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  Space,
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
import { modals } from "@mantine/modals";

import {
  getOptionsBrands,
  getOptionsCustomers,
  getOptionsModels,
  getOptionsYearCar,
} from "@/utils/until";
import FooterSavePage from "../../_component/FooterSavePage";
import useFetch from "@/app/hooks/useFetch";

const DynamicModalChooseProducts = dynamic(
  () => import("../../marketing-campaign/choose-products/ModalChooseProducts"),
  {
    ssr: false,
  }
);
const DynamicModalNumberPlates = dynamic(
  () => import("../_component/ModalNumberPlates"),
  {
    ssr: false,
  }
);

export default function OrderForm({ isEditing = false, dataDetail }: any) {
  console.log(dataDetail);
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [activeTab, setActiveTab] = useState<string | null>(
    !isEditing ? "numberPlates" : "customer"
  );

  const [isUser, handlersIsUser] = useDisclosure();

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

  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);
  const [
    openModalNubmberPlates,
    { open: openModalNumberPlates, close: closeModalNumberPlates },
  ] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      detail: selectedProducts,
      numberPlates: "",
      customerId: 0,
      carId: 0,
    },
    validate: {
      numberPlates: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
    },
  });

  const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
    queryKey: ["brandOptions"],
    queryFn: () => getOptionsBrands(),
  });

  useEffect(() => {
    if (!isEditing) {
      if (form.values.numberPlates.length == 0) {
        openModalNumberPlates();
      }
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
        images: detail.product.images,
        name: detail?.product?.name || detail?.name,
        price: detail.price,
        productId: detail.productId !== 0 ? detail.productId : detail.id,
        quantity: detail.quantity,
        priceSale: detail?.priceSale || detail?.salePrice,
        subTotal: detail?.subTotal,
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
          const [models, yearCars] = await Promise.all([
            getOptionsModels(dataDetail?.car?.carBrandId),
            getOptionsYearCar(dataDetail?.car?.carNameId),
          ]);

          setModelOptions(models);
          setYearCarOptions(yearCars);

          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue("customerId", dataDetail?.customerId.toString());
          form.setFieldValue(
            "numberPlates",
            dataDetail?.car?.numberPlates.toString()
          );

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
          form.setFieldValue("fullName", dataDetail?.customer?.fullName);
          form.setFieldValue("phoneNumber", dataDetail?.customer?.phoneNumber);
          form.setFieldValue("address", dataDetail?.customer?.address);

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
    values.subTotal = calculateSubTotal();
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

  // lấy thông tin theo biển số xe
  const handleGetInfo = async () => {
    handlers.open();
    try {
      const res = await fetch(
        `/api/car/number-plates/${form.values.numberPlates}`,
        { method: "GET" }
      );
      const data = await res.json();
      if (data?.data) {
        console.log(data.data);
        handlersIsUser.open();
        const [models, yearCars] = await Promise.all([
          getOptionsModels(data?.data?.carBrandId),
          getOptionsYearCar(data?.data?.carNameId),
        ]);
        setModelOptions(models);
        setYearCarOptions(yearCars);
        form.setFieldValue("customerId", data?.data?.customer.id);
        form.setFieldValue("carId", data?.data?.id);

        form.setFieldValue("carBrandId", data?.data?.carBrandId);
        form.setFieldValue("carNameId", data?.data?.carNameId);
        form.setFieldValue("carYearId", data?.data?.carYearId);
        form.setFieldValue("carBrand", data?.data?.brandName.title);
        form.setFieldValue("carName", data?.data?.modelName.title);
        form.setFieldValue("carYear", data?.data?.yearName.title);
        form.setFieldValue("fullName", data?.data?.customer.fullName);
        form.setFieldValue("phoneNumber", data?.data?.customer.phoneNumber);
        form.setFieldValue("address", data?.data?.customer.address);
      }
    } catch (error) {
    } finally {
      handlers.close();
      closeModalNumberPlates();
    }
  };
  const rows = form.values.detail.map((selectedRow: any, index: number) => {
    // const images = JSON.parse(selectedRow.images);
    return (
      <Table.Tr key={index}>
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
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Ngăn chặn hành động mặc định của phím Enter
    }
  };

  const UpdateConfirm = () => {
    modals.openConfirmModal({
      title: (
        <Typo size="small" type="semi-bold" style={{ color: "red" }}>
          Xác nhận
        </Typo>
      ),
      children: <Typo size="sub">Bạn có muốn huỷ đơn hàng này không?</Typo>,
      size: "350px",
      centered: true,
      zIndex: 999,
      withCloseButton: false,
      labels: { confirm: "Có", cancel: "Không" },
      onConfirm: () => console.log("123"),
    });
  };
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)} onKeyPress={handleKeyPress}>
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
              {!isEditing && (
                <Tabs.Tab classNames={{ tab: styles.tab }} value="numberPlates">
                  Xe
                </Tabs.Tab>
              )}
              <Tabs.Tab classNames={{ tab: styles.tab }} value="customer">
                Khách hàng
              </Tabs.Tab>
              <Tabs.Tab classNames={{ tab: styles.tab }} value="detailOrder">
                Chi tiết đơn hàng
              </Tabs.Tab>
            </Tabs.List>
            {!isEditing && (
              <Tabs.Panel value="numberPlates">
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
                <div className={styles.footer}>
                  <Button
                    size="lg"
                    w={"48%"}
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
                    w={"48%"}
                    h={{ base: 42, md: 50, lg: 50 }}
                    loading={loadingButton}
                    style={{ marginLeft: "12px" }}
                    variant="filled"
                    onClick={async () => {
                      if (form.values.numberPlates.length === 0) {
                        handlersPlate.open();
                      } else {
                        await handleGetInfo();
                        setActiveTab("customer");
                      }
                    }}
                    leftSection={<IconChevronRight size={16} />}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </Tabs.Panel>
            )}

            <Tabs.Panel value="customer">
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
                    readOnly={isUser}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                  {isUser ? (
                    <TextInput
                      size="lg"
                      radius={0}
                      {...form.getInputProps("carBrand")}
                      label="Hãng xe"
                      type="text"
                      placeholder="Hãng xe"
                      readOnly
                    />
                  ) : (
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
                  )}
                </Grid.Col>
                <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                  {isUser ? (
                    <TextInput
                      size="lg"
                      radius={0}
                      {...form.getInputProps("carName")}
                      label="Dòng xe"
                      type="text"
                      placeholder="Dòng xe"
                      readOnly
                    />
                  ) : (
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
                  )}
                </Grid.Col>
                <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                  {isUser ? (
                    <TextInput
                      size="lg"
                      radius={0}
                      {...form.getInputProps("carYear")}
                      label="Năm sản xuất"
                      type="text"
                      placeholder="Năm sản xuất"
                      readOnly
                    />
                  ) : (
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
                  )}
                </Grid.Col>
              </Grid>
              <Space h={30} />
              <Grid gutter={12} className={styles.marketingInfo}>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("fullName")}
                    label="Tên khách hàng"
                    type="text"
                    placeholder="Tên khách hàng"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("phoneNumber")}
                    label="Số điện thoại"
                    type="text"
                    placeholder="Số điện thoại"
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
              <div className={styles.footer}>
                <Button
                  size="lg"
                  w={"48%"}
                  radius={0}
                  h={{ base: 42, md: 50, lg: 50 }}
                  variant="outline"
                  key="cancel"
                  color="red"
                  leftSection={<IconBan size={16} />}
                  onClick={() => setActiveTab("numberPlates")}
                >
                  Quay lại
                </Button>
                <Button
                  size="lg"
                  radius={0}
                  w={"48%"}
                  h={{ base: 42, md: 50, lg: 50 }}
                  loading={loadingButton}
                  style={{ marginLeft: "12px" }}
                  variant="filled"
                  onClick={() => {
                    if (form.values.numberPlates.length === 0) {
                      handlersPlate.open();
                    } else {
                      setActiveTab("detailOrder");
                    }
                  }}
                  leftSection={<IconChevronRight size={16} />}
                >
                  Tiếp tục
                </Button>
              </div>
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
                    <Grid.Col span={12}>
                      <div className={styles.subTotal}>
                        <span className={styles.titleSubTotal}>Tiền hàng:</span>
                        <span className={styles.valueSubTotal}>
                          {calculateSubTotal().toLocaleString()}
                        </span>
                      </div>
                    </Grid.Col>
                    {/* {isEditing && (
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
                    )} */}
                    <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                      <Textarea
                        size="lg"
                        rows={2}
                        radius={0}
                        {...form.getInputProps("note")}
                        label="Ghi chú nội bộ"
                        autosize={true}
                        placeholder="Ghi chú nội bộ"
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                      <Textarea
                        size="lg"
                        rows={2}
                        radius={0}
                        {...form.getInputProps("note")}
                        label="Ghi chú của khách hàng"
                        autosize={true}
                        placeholder="Ghi chú của khách hàng"
                      />
                    </Grid.Col>
                  </Grid>
                  {isEditing ? (
                    <div className={styles.footer}>
                      {" "}
                      <Button
                        size="md"
                        w={"33%"}
                        radius={0}
                        h={{ base: 42, md: 50, lg: 50 }}
                        // variant="outline"
                        key="cancel"
                        color="red"
                        // leftSection={<IconBan size={16} />}
                        onClick={UpdateConfirm}
                      >
                        Huỷ đơn
                      </Button>
                      <Button
                        size="md"
                        radius={0}
                        w={"33%"}
                        h={{ base: 42, md: 50, lg: 50 }}
                        // loading={saveLoading}
                        color="green"
                        style={{ marginLeft: "12px" }}
                        variant="filled"
                        // leftSection={<IconPlus size={16} />}
                      >
                        {dataDetail?.step == "-1"
                          ? "Tiếp nhận"
                          : dataDetail?.step == 1 && "Hoàn thành"}
                      </Button>
                      <Button
                        size="md"
                        radius={0}
                        w={"33%"}
                        h={{ base: 42, md: 50, lg: 50 }}
                        // loading={saveLoading}
                        style={{ marginLeft: "12px" }}
                        key="submit"
                        type="submit"
                        variant="filled"
                        // leftSection={<IconPlus size={16} />}
                      >
                        Cập nhật
                      </Button>
                    </div>
                  ) : (
                    <div className={styles.footer}>
                      <Button
                        size="lg"
                        w={"48%"}
                        radius={0}
                        h={{ base: 42, md: 50, lg: 50 }}
                        variant="outline"
                        key="cancel"
                        color="red"
                        leftSection={<IconBan size={16} />}
                        onClick={() => setActiveTab("customer")}
                      >
                        Quay lại
                      </Button>
                      <Button
                        size="lg"
                        radius={0}
                        w={"48%"}
                        h={{ base: 42, md: 50, lg: 50 }}
                        loading={loadingButton}
                        style={{ marginLeft: "12px" }}
                        variant="filled"
                        type="submit"
                        leftSection={<IconChevronRight size={16} />}
                      >
                        {isEditing ? "Cập nhật" : "Hoàn thành"}
                      </Button>
                    </div>
                  )}

                  {/* <FooterSavePage
                    saveLoading={loading}
                    okText={isEditing ? "Cập nhật" : "Hoàn thành"}
                  /> */}
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
                      {isUser ? (
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("carBrand")}
                          label="Hãng xe"
                          type="text"
                          placeholder="Hãng xe"
                          readOnly
                        />
                      ) : (
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
                      )}
                    </Grid.Col>
                    <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                      {isUser ? (
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("carName")}
                          label="Dòng xe"
                          type="text"
                          placeholder="Dòng xe"
                          readOnly
                        />
                      ) : (
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
                      )}
                    </Grid.Col>
                    <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
                      {isUser ? (
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("carYear")}
                          label="Năm sản xuất"
                          type="text"
                          placeholder="Năm sản xuất"
                          readOnly
                        />
                      ) : (
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
                      )}
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
                        {...form.getInputProps("fullName")}
                        label="Tên khách hàng"
                        type="text"
                        placeholder="Tên khách hàng"
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                      <TextInput
                        size="lg"
                        radius={0}
                        {...form.getInputProps("phoneNumber")}
                        label="Số điện thoại"
                        type="text"
                        placeholder="Số điện thoại"
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
            {isEditing ? (
              <Group justify="end">
                <Button
                  size="lg"
                  radius={0}
                  h={{ base: 42, md: 50, lg: 50 }}
                  // variant="outline"
                  key="cancel"
                  color="red"
                  // leftSection={<IconBan size={16} />}
                  onClick={() => router.back()}
                >
                  Huỷ đơn
                </Button>
                <Button
                  size="lg"
                  radius={0}
                  h={{ base: 42, md: 50, lg: 50 }}
                  // loading={saveLoading}
                  color="green"
                  style={{ marginLeft: "12px" }}
                  variant="filled"
                  // leftSection={<IconPlus size={16} />}
                >
                  {dataDetail?.step == "-1"
                    ? "Tiếp nhận"
                    : dataDetail?.step == 1 && "Hoàn thành"}
                </Button>
                <Button
                  size="lg"
                  radius={0}
                  h={{ base: 42, md: 50, lg: 50 }}
                  // loading={saveLoading}
                  style={{ marginLeft: "12px" }}
                  key="submit"
                  type="submit"
                  variant="filled"
                  // leftSection={<IconPlus size={16} />}
                >
                  Cập nhật
                </Button>
              </Group>
            ) : (
              <FooterSavePage saveLoading={loading} okText="Hoàn thành" />
            )}
          </>
        )}
      </form>

      {openModalChoose && (
        <DynamicModalChooseProducts
          openModal={openModalChoose}
          close={closeModal}
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts}
        />
      )}

      {!isMobile && (
        <DynamicModalNumberPlates
          openModal={openModalNubmberPlates}
          close={closeModalNumberPlates}
          formOrder={form}
          handleGetInfo={handleGetInfo}
        />
      )}
    </Box>
  );
}
