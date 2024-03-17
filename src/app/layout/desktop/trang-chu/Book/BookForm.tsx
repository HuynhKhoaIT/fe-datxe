"use client";
import { Button, Flex, Grid, Select, Tabs, TextInput } from "@mantine/core";
import Truck from "@/assets/icons/truck.svg";
import Call from "@/assets/icons/call.svg";
import Container from "@/app/components/common/Container";
import styles from "./index.module.scss";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { getOptionsModels, getOptionsYearCar } from "@/utils/util";
export default function BookForm({ carsOption, provinceData }: any) {
  const router = useRouter();
  const icon = <img src={ArrowDown.src} />;
  const form = useForm({
    initialValues: {},
    validate: {},
  });
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  const handleSubmit = async (values: any) => {
    let queryString = "";
    if (values?.carBrandId) {
      queryString = "brand" + "=" + values?.carBrandId;
    }
    if (values?.carNameId) queryString = "brand" + "=" + values?.carNameId;
    if (values?.carYearId) queryString = "brand" + "=" + values?.carYearId;
    try {
      router.push(`/tim-kiem?${queryString}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <Tabs defaultValue="search" classNames={{ list: styles.list }}>
          <Tabs.List>
            <Tabs.Tab value="search" leftSection={<img src={Truck.src} />}>
              Tìm kiếm
            </Tabs.Tab>
            <Tabs.Tab value="appointment" leftSection={<img src={Call.src} />}>
              Hẹn lịch
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="search">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Grid gutter={16}>
                <Grid.Col span={10}>
                  <Flex mt={16}>
                    <Select
                      classNames={{ input: styles.input1 }}
                      variant="unstyled"
                      leftSection={icon}
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Vị trí"
                      data={provinceData}
                    />
                    <Select
                      {...form.getInputProps("carBrandId")}
                      classNames={{ input: styles.input2 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Hãng xe"
                      data={carsOption}
                      onChange={async (value) => {
                        const optionsData = await getOptionsModels(
                          Number(value)
                        );
                        setModelOptions(optionsData);
                        form.setFieldValue("carBrandId", value);
                        form.setFieldValue("carNameId", null);
                        form.setFieldValue("carYearId", null);
                      }}
                    />
                    <Select
                      {...form.getInputProps("carNameId")}
                      classNames={{ input: styles.input3 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Dòng xe"
                      data={modelOptions}
                      onChange={async (value) => {
                        const optionsData = await getOptionsYearCar(
                          Number(value)
                        );
                        setYearCarOptions(optionsData);
                        form.setFieldValue("carNameId", value);
                        form.setFieldValue("carYearId", null);
                      }}
                    />
                    <Select
                      {...form.getInputProps("carYearId")}
                      classNames={{ input: styles.input4 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Năm sản xuất"
                      data={yearCarOptions}
                      onChange={(value) => {
                        form.setFieldValue("carYearId", value);
                      }}
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={2} mt={16}>
                  <Button
                    h={54}
                    style={{ width: "100%" }}
                    color={"var(--yellow-btn)"}
                    type="submit"
                  >
                    Tìm kiếm
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="appointment">
            <form>
              <Grid gutter={16}>
                <Grid.Col span={10}>
                  <Flex mt={16}>
                    <Select
                      classNames={{ input: styles.input1 }}
                      variant="unstyled"
                      leftSection={icon}
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Vị trí"
                      data={["React", "Angular", "Vue", "Svelte"]}
                    />
                    <Select
                      classNames={{ input: styles.input2 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Hãng xe"
                      data={["React", "Angular", "Vue", "Svelte"]}
                    />
                    <Select
                      classNames={{ input: styles.input3 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Dòng xe"
                      data={modelOptions}
                      onChange={async (value) => {
                        const optionsData = await getOptionsYearCar(
                          Number(value)
                        );
                        form.setFieldValue("carNameId", value);
                      }}
                    />
                    <Select
                      classNames={{ input: styles.input4 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Năm sản xuất"
                      data={yearCarOptions}
                      onChange={(value) => {
                        form.setFieldValue("carYearId", value);
                      }}
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={2} mt={16}>
                  <Button
                    h={54}
                    style={{ width: "100%" }}
                    color={"var(--yellow-btn)"}
                  >
                    Tìm kiếm
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}
