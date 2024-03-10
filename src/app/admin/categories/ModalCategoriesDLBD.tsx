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
import { IconArrowBarUp } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import convertToSlug from "@/utils/util";
import { syncCategoryFromDlbd } from "@/app/libs/prisma/category";
import { getGarageByDlbdId } from "@/app/libs/prisma/garage";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function ModalCategoriesDLBD({
  openedModalCategories,
  closeModalCategories,
  profile,
}: any) {
  const router = useRouter();

  const [opened, handlers] = useDisclosure(false);
  const [data, setData] = useState();
  const getCategories = async () => {
    try {
      const data: any = await getCategoriesFromDLBD(
        profile?.session?.user?.garageId
      );
      setData(data);
    } catch (error) {
      console.error("error get categories");
    } finally {
      handlers.close();
    }
  };
  useEffect(() => {
    handlers.open();
    if (openedModalCategories) getCategories();
  }, [openedModalCategories]);
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

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "100px",
      textAlign: "center",
      render: (record: any) => {
        return (
          <Button
            size="md"
            p={5}
            variant="transparent"
            color="red"
            onClick={(e) => {
              handleSynchronized(record);
            }}
          >
            <IconArrowBarUp size={16} color="blue" />
          </Button>
        );
      },
    },
  ];

  const handleSynchronized = async (data: any) => {
    const values = {
      image: data?.thumbnail,
      title: data?.name,
      slug: convertToSlug(data?.name),
      description: data?.description,
    };
    try {
      const sync = await fetch(`/api/product-category/sync`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (sync) {
        notifications.show({
          title: "Thành công",
          message: "Điều hướng danh mục thành công",
        });
      } else {
        notifications.show({
          title: "Thất bại",
          message: "Thất bại",
        });
      }
      closeModalCategories();
      router.refresh();
    } catch (error) {
      closeModalCategories();
      notifications.show({
        title: "Thất bại",
        message: "Thất bại",
      });
    }
  };
  return (
    <Modal
      title="Đồng bộ danh mục"
      opened={openedModalCategories}
      onClose={closeModalCategories}
      lockScroll={false}
    >
      <Box>
        <LoadingOverlay
          visible={opened}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <TableBasic data={data} columns={columns} />
      </Box>
    </Modal>
  );
}
