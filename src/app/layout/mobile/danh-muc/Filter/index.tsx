"use client";
import Container from "@/app/components/common/Container";
import styles from "./index.module.scss";
import { Button, Flex, Group, Switch } from "@mantine/core";
import IconFilter from "@/assets/icons/filter.svg";
import IconSwitch from "@/assets/icons/switch.svg";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import FilterBox from "./FilterBox";
import SliderRange from "./SliderRange";
const DynamicNavFilter = dynamic(
  () => import("@/app/layout/common/mobile/NavDrawer"),
  {
    ssr: false,
  }
);
const Filter = ({ kindProduct }: any) => {
  const [openedNav, { open: openNav, close: closeNav }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      isProduct: null,
      fieldId: null,
    },

    validate: {},
  });

  const handleSubmit = (values: any) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== null)
    ); // lọc các giá trị null từ đối tượng values
    console.log(filteredValues);
    // setQueryParams({ ...currentParams, ...filteredValues });
    // setOpenNavDraw(false);
  };
  const handleReset = () => {
    // setQueryParams({ query: currentParams.query });
    closeNav();
  };
  return (
    <Container>
      <Group py={20} justify="space-between">
        <Button
          size="lg"
          radius={0}
          color="#2D3C52"
          h={34}
          leftSection={<img src={IconFilter.src} />}
          onClick={openNav}
        >
          Lọc
        </Button>
        <Switch
          classNames={{ trackLabel: styles.trackLabel, track: styles.track }}
          thumbIcon={<img src={IconSwitch.src} />}
          color="#292A2E"
          size="xl"
          offLabel={"Mới nhất"}
          onLabel={"Mặc định"}
        />
        <Switch
          classNames={{ trackLabel: styles.trackLabel, track: styles.track }}
          thumbIcon={<img src={IconSwitch.src} />}
          color="#292A2E"
          size="xl"
          offLabel={"Dịch vụ"}
          onLabel={"Sản phẩm"}
        />
      </Group>
      <DynamicNavFilter
        open={openedNav}
        onClose={() => closeNav()}
        direction="right"
        headerTitle="Bộ lọc"
      >
        <ul className={styles.nav}>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <SliderRange step={10} min={0} max={100000000} label="Giá" />
            <FilterBox
              options={kindProduct}
              queryKey="isProduct"
              queryName="Loại"
              form={form}
            />
            <Flex gap={10} mt={32}>
              <Button
                size="lg"
                radius={0}
                w={"50%"}
                type="submit"
                color={"var(--primary-color)"}
              >
                Lọc
              </Button>
              <Button
                size="lg"
                radius={0}
                w={"50%"}
                variant="outline"
                color="gray"
                onClick={() => {
                  form.reset();
                  handleReset();
                }}
              >
                Xoá bộ lọc
              </Button>
            </Flex>
          </form>
        </ul>
      </DynamicNavFilter>
    </Container>
  );
};

export default Filter;
