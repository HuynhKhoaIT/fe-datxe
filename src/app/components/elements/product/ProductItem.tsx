import Link from "next/link";
import { IProduct } from "@/interfaces/product";
import { Card, Image, Badge, Group, Flex, Box } from "@mantine/core";
import styles from "./ProductItem.module.scss";
import Typo from "../Typo";
export default function ProductItem({
  product,
}: {
  key: number;
  product: IProduct;
}) {
  return (
    <Box w={"100%"}>
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
    </Box>
  );
}
