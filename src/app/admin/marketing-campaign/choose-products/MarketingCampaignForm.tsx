"use client";
import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  Table,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./index.module.scss";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import DateTimeField from "@/app/components/form/DateTimeField";
import ListPage from "@/app/components/layout/ListPage";
import { useRouter } from "next/navigation";
import { IconBan, IconPlus, IconTrash } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import Typo from "@/app/components/elements/Typo";
const DynamicModalChooseProducts = dynamic(
  () => import("./ModalChooseProducts"),
  {
    ssr: false,
  }
);

export default function MarketingCampaignForm({ dataDetail, isEditing }: any) {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<any>(
    dataDetail
      ? dataDetail?.detail.map((item: any) => ({ ...item, id: item.productId }))
      : []
  );
  const [loading, handlers] = useDisclosure();
  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);
  useEffect(() => {
    if (!isEditing) {
      let updatedProducts = selectedProducts.map((detail: any) => ({
        name: detail.name,
        price: detail.price,
        productId: detail.id,
        quantity: 1,
        priceSale: detail.price,
        subTotal: 1,
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
        quantity: detail?.quantity || 1,
        priceSale: detail?.priceSale,
        subTotal: detail.subTotal,
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
          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue(
            "dateTimeStart",
            dayjs(dataDetail?.dateTimeStart).toDate()
          );
          form.setFieldValue(
            "dateTimeEnd",
            dayjs(dataDetail?.dateTimeEnd).toDate()
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          handlers.close();
        }
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);
  const form = useForm({
    initialValues: {
      detail: selectedProducts,
      title: "",
    },
    validate: {
      title: isNotEmpty("Vui lòng nhập..."),
      detail: {
        saleValue: isNotEmpty("Vui lòng nhập..."),
        salePrice: (value) => (value < 0 ? "Không được để giá trị âm" : null),
      },
    },
  });

  const rows = form.values.detail.map((selectedRow: any, index: number) => {
    // const images = JSON.parse(selectedRow.images);
    return (
      <Table.Tr key={selectedRow.id}>
        {/* <Table.Td>
          {images ? (
            <Image radius="md" src={images[0]} h={40} w="auto" fit="contain" />
          ) : (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w="auto"
              fit="contain"
            />
          )}
        </Table.Td> */}
        <Table.Td miw={200}>
          {selectedRow.name || selectedRow?.product?.name || ""}
        </Table.Td>
        <Table.Td>{selectedRow.price.toLocaleString()}đ</Table.Td>
        <Table.Td>
          <NumberInput
            size="lg"
            radius={0}
            withAsterisk
            readOnly
            // label="Tên chương trình"
            miw={100}
            thousandSeparator=","
            type="text"
            placeholder="Giá sau giảm"
            suffix="đ"
            {...form.getInputProps(`detail.${index}.salePrice`)}
          />
          {/* {form.values.detail[index].salePrice
            ? Number(form.values.detail[index].salePrice).toLocaleString()
            : form.values.detail[index].salePrice == 0
            ? 0
            : selectedRow.price.toLocaleString()}
          đ */}
        </Table.Td>
        <Table.Td>
          <Grid miw={150}>
            <Grid.Col span={{ base: 12, sm: 5, md: 5, lg: 5 }}>
              <Select
                size="lg"
                radius={0}
                miw={100}
                {...form.getInputProps(`detail.${index}.saleType`)}
                data={[
                  { value: "FIXED", label: "Tiền" },
                  { value: "PERCENT", label: "Phần trăm" },
                ]}
                onChange={(value) => {
                  form.setFieldValue(`detail.${index}.saleType`, value);
                  form.setFieldValue(
                    `detail.${index}.salePrice`,
                    form.values.detail[index].price
                  );
                  form.setFieldValue(`detail.${index}.saleValue`, 0);
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 7, md: 7, lg: 7 }}>
              {selectedRow.saleType === "FIXED" ? (
                <NumberInput
                  size="lg"
                  radius={0}
                  {...form.getInputProps(`detail.${index}.saleValue`)}
                  min={0}
                  placeholder="Giá sale"
                  thousandSeparator=","
                  suffix="đ"
                  onChange={(value) => {
                    form.setFieldValue(
                      `detail.${index}.salePrice`,
                      form.values.detail[index].price - Number(value)
                    );

                    form.setFieldValue(`detail.${index}.saleValue`, value);
                  }}
                />
              ) : (
                <NumberInput
                  size="lg"
                  radius={0}
                  {...form.getInputProps(`detail.${index}.saleValue`)}
                  placeholder="Phầm trăm sale"
                  suffix="%"
                  min={0}
                  max={100}
                  onChange={(value) => {
                    form.setFieldValue(
                      `detail.${index}.salePrice`,
                      form.values.detail[index].price -
                        (form.values.detail[index].price * Number(value)) / 100
                    );
                    form.setFieldValue(`detail.${index}.saleValue`, value);
                  }}
                />
              )}
            </Grid.Col>
          </Grid>
        </Table.Td>
        <Table.Td style={{ width: "200px" }}>
          <NumberInput
            size="lg"
            radius={0}
            miw={100}
            {...form.getInputProps(`detail.${index}.quantity`)}
            min={0}
            placeholder="Số lượng"
            thousandSeparator=","
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

  const handleSubmit = async (values: any) => {
    handlers.open();
    values.garageId = 1;
    values.createdBy = 1;

    try {
      const url = isEditing
        ? `/api/marketing-campaign/${dataDetail?.id}`
        : `/api/marketing-campaign`;
      await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify(values),
      });
    } catch (error) {
    } finally {
      handlers.close();
      router.push("/admin/marketing-campaign");
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form className={styles.form} onSubmit={form.onSubmit(handleSubmit)}>
        <div className={styles.marketingInfo}>
          <Typo className={styles.title}>Thông tin chương trình</Typo>
          <Grid gutter={16}>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
              <TextInput
                size="lg"
                radius={0}
                withAsterisk
                label="Tên chương trình"
                type="text"
                placeholder="Tên chương trình"
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3, md: 3, lg: 3 }}>
              <DateTimeField
                label="Ngày bắt đầu"
                required
                {...form.getInputProps("dateTimeStart")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3, md: 3, lg: 3 }}>
              <DateTimeField
                label="Ngày kết thúc"
                required
                {...form.getInputProps("dateTimeEnd")}
              />
            </Grid.Col>
          </Grid>
        </div>

        <div style={{ borderRadius: 8 }}>
          <div style={{ marginTop: 20 }} className={styles.card}>
            <Typo
              className={styles.title}
              size="primary"
              type="bold"
              style={{ color: "var(--primary-orange)" }}
            >
              Danh sách sản phẩm khuyến mãi
            </Typo>
            <Grid className={styles.marketingInfo}>
              <Grid.Col span={12}>
                <ListPage
                  style={{ height: "100%" }}
                  isBoxShadow={false}
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
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Tên sản phẩm
                          </Table.Th>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Giá gốc
                          </Table.Th>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Giá sau giảm
                          </Table.Th>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Giá sale
                          </Table.Th>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Số lượng khuyến mãi
                          </Table.Th>
                          <Table.Th
                            style={{ width: "120px", textAlign: "center" }}
                          >
                            hành động
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                  }
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
              loading={loading}
              style={{ marginLeft: "12px" }}
              key="submit"
              type="submit"
              variant="filled"
              leftSection={<IconPlus size={16} />}
            >
              Xác nhận
            </Button>
          </Group>
        </div>
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
