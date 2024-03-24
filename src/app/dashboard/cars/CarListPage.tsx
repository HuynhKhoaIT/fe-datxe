"use client";
import React, { useState } from "react";
import { getCars, deleteCar, setCarDefault } from "@/utils/car";
import { useSession } from "next-auth/react";
import {
  IconChevronRight,
  IconEye,
  IconPencil,
  IconTrash,
  IconBan,
  IconPlus,
} from "@tabler/icons-react";
import PreviewModal from "./PreviewModal";
import { Radio, Button, Modal, Group, Pagination, Flex } from "@mantine/core";
import { getModels, getYears } from "@/utils/branch";
import { useDisclosure } from "@mantine/hooks";
import TableBasic from "@/app/components/table/Tablebasic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
export default function CarListPage({ carsData, myAccount }: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [
    openedPreviewCar,
    { open: openPreviewCar, close: closePreviewCar },
  ] = useDisclosure(false);
  const [
    openedDeleteCar,
    { open: openDeleteCar, close: closeDeleteCar },
  ] = useDisclosure(false);
  const [detail, setDetail] = useState<any>({});
  const [deleteRow, setDeleteRow] = useState("");
  const [openModalCarDefault, setOpenModalCarDefault] = useState(false);

  const handleDeleteCar = async (carId: string) => {
    try {
      await deleteCar(carId, token ?? "");
      notifications.show({
        title: "Thành công",
        message: "Xoá thành công",
      });
    } catch (error) {
      console.error("Error deleting car:", error);
      notifications.show({
        title: "Thất bại",
        message: "Xoá thất bại",
      });
    }
    router.refresh();
  };
  const handleSetCarDefault = async (CarId: string) => {
    try {
      await setCarDefault(CarId, token ?? "");
    } catch (error) {
      console.error("Error set car:", error);
    }
  };

  // select xe mặc định
  const [selectedRow, setSelectedRow] = useState<any>(myAccount?.carIdDefault);
  const [dataCarDefault, setdataCartDefault] = useState<any>();

  const handleRadioChange = (selectedRecord: any) => {
    setOpenModalCarDefault(true);
    setdataCartDefault(selectedRecord);
  };
  const handleCarDefault = () => {
    setSelectedRow(dataCarDefault?.id);
    handleSetCarDefault(dataCarDefault?.id);
    setOpenModalCarDefault(false);
  };

  console.log(carsData);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Mặc định</span>
      ),
      name: "carDefault",
      dataIndex: [],
      width: "90px",
      textAlign: "center",
      render: (dataRow: any) => {
        return (
          <>
            <Radio
              style={{ display: "flex", justifyContent: "center" }}
              checked={selectedRow === dataRow.id}
              onChange={() => handleRadioChange(dataRow)}
            />
          </>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Biển số</span>
      ),
      name: "numberPlates",
      dataIndex: ["numberPlates"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Màu xe</span>
      ),
      name: "color",
      dataIndex: ["color"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hãng xe</span>
      ),
      name: "bandName",
      dataIndex: ["brandName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Dòng xe</span>
      ),
      name: "modelName",
      dataIndex: ["modelName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Năm sản xuất
        </span>
      ),
      name: "yearName",
      dataIndex: ["yearName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "120px",
      render: (record: any) => {
        return (
          <>
            <Button
              size="lg"
              radius={0}
              p={5}
              variant="transparent"
              onClick={() => {
                setDetail(record);
                openPreviewCar();
              }}
            >
              <IconEye size={16} />
            </Button>
            <Link href={`/dashboard/cars/${record.id}`}>
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                color="gray"
                p={5}
              >
                <IconPencil size={16} />
              </Button>
            </Link>

            <Button
              size="lg"
              radius={0}
              p={5}
              variant="transparent"
              color="red"
              onClick={(e) => {
                openDeleteCar();
                setDeleteRow(record.id);
              }}
            >
              <IconTrash size={16} color="red" />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div style={{ marginBottom: 20 }}>
        <Flex justify={"end"} align={"center"}>
          <Link
            href={{
              pathname: `/dashboard/cars/create`,
            }}
          >
            <Button
              size="lg"
              h={{ base: 42, md: 50, lg: 50 }}
              radius={0}
              leftSection={<IconPlus size={18} />}
            >
              Thêm mới
            </Button>
          </Link>
        </Flex>
      </div>

      <div className={styles.content}>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            Xe của tôi
          </Typo>
        </div>
        <TableBasic
          className={styles.table}
          data={carsData}
          columns={columns}
          loading={false}
        />
      </div>
      <Modal title="Delete" opened={openedDeleteCar} onClose={closeDeleteCar}>
        <div>Bạn có muốn xoá không?</div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            variant="filled"
            key="cancel"
            onClick={closeDeleteCar}
            color="red"
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            style={{ marginLeft: "12px" }}
            onClick={() => {
              closeDeleteCar();
              handleDeleteCar(deleteRow);
            }}
            variant="filled"
            leftSection={<IconChevronRight />}
          >
            Tiếp tục
          </Button>
        </Group>
      </Modal>

      <Modal
        size={400}
        opened={openModalCarDefault}
        onClose={() => setOpenModalCarDefault(false)}
        title="Xe mặc định"
        lockScroll={false}
      >
        <div>Biển số: {dataCarDefault?.licensePlates}</div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            variant="outline"
            color="red"
            onClick={() => setOpenModalCarDefault(false)}
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            h={{ base: 42, md: 50, lg: 50 }}
            radius={0}
            variant="filled"
            onClick={() => handleCarDefault()}
          >
            Cập nhật
          </Button>
        </Group>
      </Modal>
      <PreviewModal
        opened={openedPreviewCar}
        onOk={closePreviewCar}
        onCancel={closePreviewCar}
        width={800}
        data={detail}
      />
    </div>
  );
}
