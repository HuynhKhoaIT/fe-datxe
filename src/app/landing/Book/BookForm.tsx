"use client";
import { Button, Flex, Grid, Select, Tabs, TextInput } from "@mantine/core";
import Truck from "@/assets/icons/truck.svg";
import Call from "@/assets/icons/call.svg";
import Container from "@/app/components/common/Container";
import styles from "./index.module.scss";
import ArrowDown from "@/assets/icons/arrow-down.svg";
export default function BookForm() {
  const icon = <img src={ArrowDown.src} />;

  return (
    <Container className={styles.wrapper}>
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
                    data={["React", "Angular", "Vue", "Svelte"]}
                  />
                  <Select
                    classNames={{ input: styles.input4 }}
                    leftSection={icon}
                    variant="unstyled"
                    leftSectionPointerEvents="none"
                    rightSection={<></>}
                    placeholder="Năm sản xuất"
                    data={["React", "Angular", "Vue", "Svelte"]}
                  />
                </Flex>
              </Grid.Col>
              <Grid.Col span={2} mt={16}>
                <Button
                  h={54}
                  style={{ width: "100%" }}
                  radius={8}
                  color={"var(--yellow-btn)"}
                >
                  Tìm kiếm
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="appointment">Messages tab content</Tabs.Panel>
      </Tabs>
    </Container>
  );
}
