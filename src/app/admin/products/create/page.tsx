import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import ProductForm from "./ProductForm";

interface CategoryOption {
  value: string;
  label: string;
}

interface ProductSavePageProps {
  categoryOptions: CategoryOption[];
}

export default function ProductSavePage({
  categoryOptions,
}: ProductSavePageProps) {
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Thêm sản phẩm
      </Typo>
      <Space h="md" />
      <ProductForm isEditing={false} categoryOptions={categoryOptions} />
    </Box>
  );
}

export async function getServerSideProps() {
  // Fetch data on the server
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product-category`
  );
  const data = await res.json();

  const categoryOptions: CategoryOption[] =
    data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    })) || [];

  return {
    props: {
      categoryOptions,
    },
  };
}
