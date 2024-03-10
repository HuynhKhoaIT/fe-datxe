"use client";
import TableBasic from "@/app/components/table/Tablebasic";
import { getCategoriesFromDLBD } from "@/utils/category";
import {
  Box,
  Button,
  Group,
  Image,
  LoadingOverlay,
  Modal,
} from "@mantine/core";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
export default function ModalCustomersDLBD({
  openedModalCustomers,
  closeModalCustomers,
}: any) {
  const [opened, handlers] = useDisclosure(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [data, setData] = useState();
  const getCategories = async () => {
    try {
      const data: any = await getCategoriesFromDLBD(9);
      setData(data);
    } catch (error) {
      console.error("error get categories");
    } finally {
      handlers.close();
    }
  };
  useEffect(() => {
    handlers.open();
    if (openedModalCustomers) getCategories();
  }, [openedModalCustomers]);
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "thumbnail",
      dataIndex: ["thumbnail"],
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
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Tên</span>
      ),
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
  ];
  return (
    <Modal
      title="Đồng bộ danh mục"
      opened={openedModalCustomers}
      onClose={closeModalCustomers}
      lockScroll={false}
    >
      <Box>
        <LoadingOverlay
          visible={opened}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <TableBasic
          selectRow={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          data={data}
          columns={columns}
        />
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            variant="filled"
            key="cancel"
            onClick={closeModalCustomers}
            color="red"
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            radius={0}
            style={{ marginLeft: "12px" }}
            onClick={() => {
              closeModalCustomers();
            }}
            variant="filled"
            leftSection={<IconChevronRight />}
          >
            Đồng bộ
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}
