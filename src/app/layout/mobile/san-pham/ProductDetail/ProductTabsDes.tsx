"use client";
import { IProduct } from "@/interfaces/product";
import { Tabs } from "@mantine/core";
import styles from "./ProductTabsDes.module.scss";
import Reviews from "./Review";
const ProductTabsDes = ({ ProductDetail }: { ProductDetail: IProduct }) => {
  return (
    <Tabs
      defaultValue="description"
      classNames={{ list: styles.list, tabLabel: styles.tabLabel }}
    >
      <Tabs.List>
        <Tabs.Tab value="description">Mô tả</Tabs.Tab>
        <Tabs.Tab value="guarantee">Bảo hành</Tabs.Tab>
        <Tabs.Tab value="evaluate">Đánh giá</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="description">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Tabs.Panel>

      <Tabs.Panel value="guarantee">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Tabs.Panel>

      <Tabs.Panel value="evaluate">
        <Reviews />
      </Tabs.Panel>
    </Tabs>
  );
};
export default ProductTabsDes;
