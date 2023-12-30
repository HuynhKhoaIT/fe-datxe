"use client";
import Link from "next/link";
import { IProduct } from "@/interfaces/product";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import {
  Card,
  Image,
  Badge,
  Button,
  Group,
  Modal,
  Flex,
  Box,
} from "@mantine/core";
import styles from "./ProductItem.module.scss";
import Typo from "../Typo";
export default function ProductItem({
  key,
  product,
}: {
  key: number;
  product: IProduct;
}) {
  const [
    openedNotification,
    { open: openNotification, close: closeNotification },
  ] = useDisclosure(false);

  const handleOk = () => {
    closeNotification();
    const existingCartItems = JSON.parse("[]");
    existingCartItems.push({
      garageId: product.garageId,
      product: product,
      quantity: 1,
    });
    localStorage.setItem("cartData", JSON.stringify(existingCartItems));
    notifications.show({
      title: "Thành công",
      message: "Sản phẩm đã được thêm vào giỏ hàng",
    });
  };
  return (
    <Box key={key} w={"100%"}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Link href={`/san-pham/${product.id}`} style={{ width: "100%" }}>
            <Image
              classNames={{ root: styles.productImg }}
              src={product.thumbnail}
              height={"160px"}
              alt="Norway"
            />
          </Link>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Link href={`/san-pham/${product.id}`}>
            <Typo size="sub" type="bold" className={styles.productName}>
              {product.name}
            </Typo>
          </Link>
          <Badge classNames={{ root: styles.productOnSale }}>On Sale</Badge>
        </Group>

        <Flex justify={"center"} gap={10}>
          <Typo
            size="sub"
            type="bold"
            style={{ color: "var(--color-text-del)" }}
          >
            <del>{product.price?.toLocaleString()}đ</del>
          </Typo>
          <Typo size="sub" type="bold" style={{ color: "var(--theme-color)" }}>
            {product.price?.toLocaleString()}đ{" "}
          </Typo>
        </Flex>
      </Card>
      <Modal
        title="Thông báo"
        opened={openedNotification}
        onClose={closeNotification}
        style={{ zIndex: "99999" }}
      >
        <p>
          Bạn đang đặt hàng với 2 chuyên gia khác nhau? Bạn có muốn xóa giỏ hàng
          để thêm sản phẩm mới?
        </p>
        <Group mt="xl" justify="flex-end">
          <Button onClick={closeNotification}>Huỷ</Button>
          <Button onClick={handleOk}>Thêm</Button>
        </Group>
      </Modal>
    </Box>
  );
}
