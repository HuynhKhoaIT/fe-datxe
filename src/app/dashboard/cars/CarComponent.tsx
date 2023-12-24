"use client";
import React, { Suspense, useEffect, useState } from "react";
import { getCars, deleteCar, setCarDefault } from "@/utils/car";
import { useSession } from "next-auth/react";
import {
  IconChevronRight,
  IconEye,
  IconPencil,
  IconTrash,
  IconBan,
} from "@tabler/icons-react";
import PreviewModal from "./PreviewModal";
import UpdateModal from "./UpdateModal";
import AddCarModal from "./AddCarModal";
import {
  Table,
  Checkbox,
  Radio,
  Loader,
  Center,
  Button,
  Modal,
  Group,
  Pagination,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { getMyAccount } from "@/utils/user";
import { getModels } from "@/utils/branch";
import { useDisclosure } from "@mantine/hooks";
export default function CarComponent({ carsData: cars, myAccount }: any) {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [visible, handlers] = useDisclosure(true);
  const [
    openedAddCar,
    { open: openAddCar, close: closeAddCar },
  ] = useDisclosure(false);
  const [
    openedUpdateCar,
    { open: openUpdateCar, close: closeUpdateCar },
  ] = useDisclosure(false);
  const [
    openedPreviewCar,
    { open: openPreviewCar, close: closePreviewCar },
  ] = useDisclosure(false);
  const [
    openedDeleteCar,
    { open: openDeleteCar, close: closeDeleteCar },
  ] = useDisclosure(false);
  const [models, setModels] = useState<any>();
  const [detail, setDetail] = useState<any>({});
  const [deleteRow, setDeleteRow] = useState("");
  const [carsData, setCarsData] = useState<any>(cars);
  const [openModalCarDefault, setOpenModalCarDefault] = useState(false);
  const fetchCars = async () => {
    handlers.open();
    try {
      if (token) {
        const fetchedCars = await getCars(token);
        setCarsData(fetchedCars);
        handlers.close();
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      handlers.close();
    }
  };
  useEffect(() => {
    fetchCars();
  }, [token]);

  const handleDeleteCar = async (carId: string) => {
    try {
      await deleteCar(carId, token ?? "");
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  const handleSetCarDefault = async (CarId: string) => {
    try {
      const carDefault = await setCarDefault(CarId, token ?? "");
    } catch (error) {
      console.error("Error set car:", error);
    }
  };

  const selectBrand = async (value: number) => {
    try {
      const dong_xe: any = await getModels(value);
      const newModels = dong_xe?.map((item: any) => ({
        value: item.id?.toString() || "",
        label: item.name || "",
      }));
      setModels(newModels);
      openUpdateCar();
    } catch (error) {}
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

  // pagination
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedData = carsData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const renderRows = () => {
    if (visible) {
      return (
        <Box w={"100%"} h={100}>
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        </Box>
      );
    } else {
      return paginatedData?.map((record: any) => (
        <Table.Tr key={record.id}>
          <Table.Td>
            <Radio
              style={{ display: "flex", justifyContent: "center" }}
              checked={selectedRow === record.id}
              onChange={() => handleRadioChange(record)}
            />
          </Table.Td>
          <Table.Td>{record.licensePlates}</Table.Td>
          <Table.Td>{record.color}</Table.Td>
          <Table.Td>{record.brandCarName?.name}</Table.Td>
          <Table.Td>{record.modelCarName?.name}</Table.Td>
          <Table.Td>{record.registrationDate}</Table.Td>
          <Table.Td>
            <Button
              size="xs"
              p={5}
              variant="transparent"
              onClick={() => {
                setDetail(record);
                openPreviewCar();
              }}
            >
              <IconEye size={16} />
            </Button>
            <Button
              size="xs"
              style={{ margin: "0 5px" }}
              variant="transparent"
              color="gray"
              p={5}
              onClick={() => {
                setDetail(record);
                selectBrand(record?.automakerId || 0);
              }}
            >
              <IconPencil size={16} />
            </Button>
            <Button
              size="xs"
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
          </Table.Td>
        </Table.Tr>
      ));
    }
  };

  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-card profile-ad">
        <div className="user-profile-card-header">
          <h4 className="user-profile-card-title">Xe của tôi</h4>
          <div className="user-profile-card-header-right">
            <div className="user-profile-search">
              <div className="form-group"></div>
            </div>
            <Button className="theme-btn btn-add-car" onClick={openAddCar}>
              Thêm xe
            </Button>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="table-responsive" style={{ overflowY: "hidden" }}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th align="center">Mặc định</Table.Th>
                  <Table.Th>Biển số</Table.Th>
                  <Table.Th>Màu xe</Table.Th>
                  <Table.Th>Hãng xe</Table.Th>
                  <Table.Th>Dòng xe</Table.Th>
                  <Table.Th>Ngày đăng ký</Table.Th>
                  <Table.Th>Hành động</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody style={{ position: "relative" }}>
                {renderRows()}
              </Table.Tbody>
            </Table>
            <Pagination
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "end",
              }}
              total={Math.ceil(carsData?.length / itemsPerPage)}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Modal title="Delete" opened={openedDeleteCar} onClose={closeDeleteCar}>
        <div>Bạn có muốn xoá không?</div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            variant="filled"
            key="cancel"
            onClick={closeDeleteCar}
            color="red"
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button
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
            variant="outline"
            color="red"
            size="xs"
            onClick={() => setOpenModalCarDefault(false)}
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button variant="filled" size="xs" onClick={() => handleCarDefault()}>
            Cập nhật
          </Button>
        </Group>
      </Modal>
      <AddCarModal
        width={800}
        opened={openedAddCar}
        close={closeAddCar}
        fetchCars={() => fetchCars()}
      />
      <PreviewModal
        opened={openedPreviewCar}
        onOk={closePreviewCar}
        onCancel={closePreviewCar}
        width={800}
        data={detail}
      />
      <UpdateModal
        opened={openedUpdateCar}
        fetchCars={() => fetchCars()}
        onCancel={closeUpdateCar}
        data={detail ? detail : {}}
        models={models}
        selectBrand={selectBrand}
      />
    </div>
  );
}
