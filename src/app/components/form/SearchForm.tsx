"use client";
import { Box, Button, Flex, Input, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function SearchForm({ searchData }: any) {
  const router = useRouter();
  const form = useForm({
    initialValues: {},
    validate: {},
  });
  const handleSubmit = (values: any) => {
    console.log(values);
    const queryString = Object.keys(values)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`
      )
      .join("&");

    router.push(`/admin/products?${queryString}`);
  };
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        onReset={form.onReset}
      >
        <Flex gap={20}>
          {searchData?.map((item: any, index: number) => {
            if (item?.type === "input") {
              return (
                <Input
                  key={index}
                  {...form.getInputProps(item.name)}
                  placeholder={item?.placeholder}
                />
              );
            } else if (item?.type === "select") {
              return (
                <Select
                  key={index}
                  {...form.getInputProps(item.name)}
                  data={item?.data}
                  placeholder={item?.placeholder}
                />
              );
            }
          })}
          <Button leftSection={<IconSearch size={14} />} type="submit">
            Tìm kiếm
          </Button>
          <Button
            leftSection={<IconTrash size={14} />}
            variant="outline"
            color="gray"
            onClick={() => {
              form.reset();
            }}
            type="submit"
          >
            Xoá
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
