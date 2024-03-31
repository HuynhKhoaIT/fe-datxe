import Link from "next/link";
import { IProduct } from "@/interfaces/product";
import { Card, Image, Badge, Group, Flex, Box } from "@mantine/core";
import styles from "./ProductItem.module.scss";
import Typo from "../Typo";
import ImageField from "../../form/ImageField";
import Star from "@/assets/icons/star.svg";
export default function ProductItem({ product }: { product: IProduct }) {
  const images = JSON.parse(product.images);
  return (
    <Box w={"100%"}>
      <Card shadow="sm" radius="md">
        <Card.Section>
          <Link href={`/san-pham/${product.id}`} style={{ width: "100%" }}>
            <ImageField
              src={images ? images[0] : null}
              height={160}

              // fill={true}
            />
          </Link>
        </Card.Section>

        <div className={styles.infoCard}>
          <div className={styles.star}>
            <img src={Star.src} alt="start" />
            <Typo
              style={{
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "1rem",
                color: "var(--title-color-sub)",
              }}
            >
              4.6(280)
            </Typo>
          </div>
          <Link href={`/san-pham/${product.id}`}>
            <Typo size="primary" className={styles.productName}>
              {product.name}
            </Typo>
          </Link>
          <Typo size="tiny" className={styles.address}>
            Hồ Chí Minh
          </Typo>
          <Badge
            radius={0}
            size="lg"
            variant="light"
            classNames={{ root: styles.productOnSale }}
          >
            On Sale
          </Badge>
        </div>

        <Flex gap={10}>
          <Typo size="sub" type="big" style={{ color: "var(--blue-color)" }}>
            {product?.salePrice?.toLocaleString()}đ{" "}
          </Typo>
        </Flex>
      </Card>
    </Box>
  );
}
