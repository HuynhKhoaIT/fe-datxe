import { addCar } from "@/utils/car";
import {
  getOptionsBrands,
  getOptionsModels,
  getOptionsYearCar,
} from "@/utils/util";
import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModalAddCar({ openModal, close, myAccount }: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  const [loading, handlers] = useDisclosure();

  const form = useForm({
    initialValues: {
      numberPlates: "",
      customerId: myAccount.id || "",
      // carBrandId: "",
      // carNameId: "",
      // carYearId: "",
    },
    validate: {
      numberPlates: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      const brands = await getOptionsBrands();
      setBrandOptions(brands);
      handlers.close();
    };

    if (openModal) {
      fetchData();
    }
  }, [openModal]);

  const handleSubmit = async () => {
    const values: any = form.values;
    const newCar = {
      number_plates: values.numberPlates,
      brand_id: values.carBrandId,
      year_car_name: values.carNameId,
      car_name_id: values.carYearId,
    };
    try {
      handlers.open();
      const res = await addCar(newCar, token ?? "");
      console.log(res);
    } catch (error) {
    } finally {
      handlers.close();
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Ngăn chặn hành động mặc định của phím Enter
    }
  };
  return (
    <Modal
      title="Thêm xe"
      opened={openModal}
      onClose={close}
      lockScroll
      centered
      radius={0}
      size={500}
    >
      <Box pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          onKeyPress={handleKeyPress}
        >
          <Grid gutter={16}>
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                {...form.getInputProps("numberPlates")}
                size="md"
                label="Biển số xe"
                type="text"
                placeholder="Biển số xe"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
              <Select
                size="md"
                {...form.getInputProps("carBrandId")}
                label="Hãng xe"
                placeholder="Hãng xe"
                data={brandOptions}
                onChange={async (value) => {
                  const optionsData = await getOptionsModels(Number(value));
                  setModelOptions(optionsData);
                  form.setFieldValue("carBrandId", value);
                  form.setFieldValue("carNameId", null);
                  form.setFieldValue("carYearId", null);
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
              <Select
                size="md"
                {...form.getInputProps("carNameId")}
                label="Dòng xe"
                placeholder="Dòng xe"
                data={modelOptions}
                onChange={async (value) => {
                  const optionsData = await getOptionsYearCar(Number(value));
                  setYearCarOptions(optionsData);
                  form.setFieldValue("carNameId", value);
                  form.setFieldValue("carYearId", null);
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
              <Select
                size="md"
                {...form.getInputProps("carYearId")}
                label="Năm sản xuất"
                placeholder="Năm sản xuất"
                data={yearCarOptions}
                onChange={(value) => {
                  console.log(value);
                  form.setFieldValue("carYearId", value);
                }}
              />
            </Grid.Col>
          </Grid>
          <Group justify="end" mt={60}>
            <Button
              size="lg"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              loading={loading}
              style={{ marginLeft: "12px" }}
              onClick={handleSubmit}
              variant="filled"
              leftSection={<IconPlus size={16} />}
            >
              Thêm
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
