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
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import DateTimeField from "@/app/components/form/DateTimeField";
import ListPage from "@/app/components/layout/ListPage";
import { useRouter } from "next/navigation";
import { IconBan, IconPlus, IconTrash } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
const DynamicModalChooseProducts = dynamic(
  () => import("./ModalChooseProducts"),
  {
    ssr: false,
  }
);

export default function MarketingCampaignForm({ dataDetail, isEditing }: any) {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<any>(
    dataDetail ? dataDetail?.detail : []
  );
  console.log(selectedRows);

  const [loading, handlers] = useDisclosure();
  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);
  useEffect(() => {
    if (!isEditing) {
      let updatedProducts = selectedRows.map((detail: any) => ({
        name: detail.name,
        price: detail.price,
        productId: detail.id,
        quantity: null,
        priceSale: null,
        subTotal: 1,
        status: "PUBLIC",
        saleType: "FIXED",
        salevalue: 0,
      }));
      form.setFieldValue("detail", updatedProducts);
    } else {
      let updatedProducts = selectedRows.map((detail: any) => ({
        name: detail.product.name,
        price: detail.price,
        productId: detail.productId,
        quantity: detail.quantity,
        priceSale: detail.priceSale,
        subTotal: detail.subTotal,
        status: detail?.status,
        saleType: detail?.saleType,
        salevalue: detail?.salevalue,
      }));
      form.setFieldValue("detail", updatedProducts);
    }
  }, [selectedRows]);

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
      detail: selectedRows,
      title: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });

  const rows = form.values.detail.map((selectedRow: any, index: number) => {
    // const images = JSON.parse(selectedRow.images);
    console.log(selectedRow);
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
        <Table.Td>
          {selectedRow.name || selectedRow?.product?.name || ""}
        </Table.Td>
        <Table.Td>{selectedRow.price.toLocaleString()}đ</Table.Td>
        <Table.Td style={{ width: "350px" }}>
          <Grid>
            <Grid.Col span={4}>
              <Select
                {...form.getInputProps(`detail.${index}.saleType`)}
                data={[
                  { value: "FIXED", label: "Tiền" },
                  { value: "PERCENT", label: "Phần trăm" },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              {selectedRow.saleType === "FIXED" ? (
                <NumberInput
                  {...form.getInputProps(`detail.${index}.priceSale`)}
                  // label="Giá sale"
                  min={0}
                  placeholder="Giá sale"
                  thousandSeparator=","
                />
              ) : (
                <NumberInput
                  {...form.getInputProps(`detail.${index}.salevalue`)}
                  placeholder="Phầm trăm sale"
                  suffix="%"
                  min={0}
                  max={100}
                />
              )}
            </Grid.Col>
          </Grid>
        </Table.Td>
        <Table.Td style={{ width: "200px" }}>
          <NumberInput
            {...form.getInputProps(`detail.${index}.quantity`)}
            min={0}
            placeholder="Số lượng"
            thousandSeparator=","
          />
        </Table.Td>
        <Table.Td>
          <>
            <Tooltip label="Xoá" withArrow position="bottom">
              <Button
                size="xs"
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  setSelectedRows(
                    selectedRows.filter(
                      (selectedItem: any) =>
                        selectedItem?.productId !== selectedRow.productId ||
                        selectedItem?.id !== selectedRow.productId
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
        <div>
          {/* <Typo>Chuơng trình</Typo> */}
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                label="Tên chương trình"
                type="text"
                placeholder="Tên chương trình"
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <DateTimeField
                label="Ngày bắt đầu"
                required
                {...form.getInputProps("dateTimeStart")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <DateTimeField
                label="Ngày kết thúc"
                required
                {...form.getInputProps("dateTimeEnd")}
              />
            </Grid.Col>
          </Grid>
        </div>
        <Grid mt={24}>
          <Grid.Col span={12}>
            <ListPage
              title="Danh sách sản phẩm khuyến mãi"
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
                    onClick={(e) => {
                      openModal();
                    }}
                    leftSection={<IconPlus size={14} />}
                  >
                    Thêm sản phẩm
                  </Button>
                </div>
              }
              baseTable={
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      {/* <Table.Th>Hình ảnh</Table.Th> */}
                      <Table.Th>Tên sản phẩm</Table.Th>
                      <Table.Th>Giá gốc</Table.Th>
                      <Table.Th>Giá sale</Table.Th>
                      <Table.Th>Số lượng khuyến mãi</Table.Th>
                      {/* <Table.Th>Loại</Table.Th> */}
                      <Table.Th>hành động</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              }
            />
          </Grid.Col>
        </Grid>
        <Group justify="end" style={{ marginTop: 60 }}>
          <Button
            variant="outline"
            key="cancel"
            color="red"
            leftSection={<IconBan size={16} />}
            onClick={() => router.back()}
          >
            Huỷ bỏ
          </Button>
          <Button
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
      </form>
      <DynamicModalChooseProducts
        openModal={openModalChoose}
        close={closeModal}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
      />
    </Box>
  );
}