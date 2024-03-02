import Link from "next/link";
import { IProduct } from "@/interfaces/product";
import { Card, Image, Badge, Group, Flex, Box } from "@mantine/core";
import styles from "./ProductItem.module.scss";
import Typo from "../Typo";
import ImageField from "../../form/ImageField";
import Star from "@/assets/icons/star.svg";
import Heart from "@/assets/icons/heart.svg";
import Cart from "@/assets/icons/cart.svg";
import Point from "@/assets/icons/point.svg";

export default function ProductItem2({
  product,
}: {
  key: number;
  product: IProduct;
}) {
  console.log(product);
  const images = JSON.parse(product.images);
  return (
    <Box w={"100%"}>
      <Card shadow="sm" radius="md" mb={5}>
        <Card.Section>
          <Link href={`/san-pham/${product.id}`} style={{ width: "100%" }}>
            <ImageField src={images ? images[0] : null} height={"160"} />
          </Link>
        </Card.Section>

        <div className={styles.infoCard2}>
          <Link href={`/san-pham/${product.id}`}>
            <Typo size="sub" type="semi-bold" className={styles.productName}>
              {product.name}
            </Typo>
          </Link>
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
              4.6
            </Typo>
          </div>
          <Badge classNames={{ root: styles.productOnSale }}>On Sale</Badge>
        </div>

        <Flex gap={10} mt={6} align={"center"}>
          <Typo size="sub" type="big" style={{ color: "var(--blue-color)" }}>
            {product?.salePrice?.toLocaleString()}đ{" "}
          </Typo>
          <div className={styles.iconBox}>
            <div className={styles.heart}>
              <img src={Heart.src} className={styles.icon} />
            </div>
            <div className={styles.cart}>
              <img src={Cart.src} className={styles.icon} />
            </div>
          </div>
        </Flex>
        {/* <div className={styles.point}>
          <img src={Point.src} className={styles.bgPoint} />
          <div className={styles.pointValue}>
            <span className={styles.value}>+50</span>
            <span className={styles.pointText}>Điểm</span>
          </div>
        </div> */}
      </Card>
    </Box>
  );
}
