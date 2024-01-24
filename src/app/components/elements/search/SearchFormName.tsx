"use client";
import { ActionIcon, Button, CloseButton, Grid, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import styles from "./SearchFormName.module.scss";
import search from "@/assets/icons/search.svg";
export default function SearchFormName() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      searchValue: "",
    },
    validate: {},
  });
  const handleSubmit = (values: any) => {
    try {
      router.push(`/tim-kiem?s=${values?.searchValue}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <form
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
      className={styles.searchForm}
    >
      <Grid style={{ position: "relative" }}>
        <Grid.Col span={12}>
          <Input
            {...form.getInputProps("searchValue")}
            placeholder="Tìm tên sản phẩm, dịch vụ, mã phụ tùng,..."
            rightSectionPointerEvents="all"
            rightSection={
              <ActionIcon variant="transparent" color="gray" type="submit">
                <img
                  src={search.src}
                  style={{ cursor: "pointer" }}
                  onClick={handleSubmit}
                />
              </ActionIcon>
            }
            size="xl"
          />
        </Grid.Col>
      </Grid>
    </form>
  );
}
