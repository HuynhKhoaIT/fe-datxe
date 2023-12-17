import React, { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  Grid,
  Textarea,
  Select,
  Radio,
  Modal,
} from "@mantine/core";
import { useForm, hasLength } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { ActionIcon, rem } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ModalOrderGuest } from "./ModalOrderGuest";
import { notifications } from "@mantine/notifications";
import { addCustomerCare } from "@/utils/customerCare";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { GenOTP } from "@/utils/user";
import styles from "./index.module.scss";
export const ModalEventCalendar = ({
  user,
  brandOptions,
  modelOptions,
  token,
  categoryOptions,
  setBrand,
  eventInfos,
  garage,
  advisorOptions,
  carOptions,
  cars,
  garageOptions,
  dataCarDefault,
  onClose,
  fetchDataOrders,
}: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [openedLogin, { open: openLogin, close: closeLogin }] = useDisclosure(
    false
  );
  const [newCustomerCare, setNewCustomerCare] = useState({
    full_name: "",
    phone_number: "",
    customer_request: "",
    description: "",
    priority_level: "",
    arrival_time: "",
    car_id: "",
    garageId: "",
    number_plates: "",
    brand_id: "",
    car_name_id: "",
    car_year_id: "",
  });
  const form = useForm({
    initialValues: {
      customer_request: "",
      full_name: user?.name || "",
      phone_number: user?.phone || "",
      category: "",
      garaName: garage?.data?.name,
      garaAddress: "",
      description: "",
      garageId: garage?.data?.id || "",
      priority_level: "2",
      arrival_time: eventInfos?.start,
      car_id: dataCarDefault?.carId || "",
      service_advisor: "",
      brand_name: dataCarDefault?.brandName || "",
      model_name: dataCarDefault?.modelName || null,
      number_plates: "",
      car_year_id: "",
      brand_id: "",
      car_name_id: null,
    },

    validate: {
      full_name: (value) => (value.length < 1 ? "Vui lòng nhập tên" : null),
      phone_number: (value) =>
        value.length < 1 ? "Vui lòng nhập số điện thoại" : null,
      number_plates: (value) =>
        !token && value.length < 1 ? "Vui lòng nhập biển số xe" : null,
      customer_request: (value) =>
        value.length < 1 ? "Vui lòng nhập yêu cầu" : null,
    },
  });
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const {
      full_name,
      phone_number,
      customer_request,
      description,
      priority_level,
      arrival_time,
      car_id,
      garageId,
      number_plates,
      car_year_id,
      brand_id,
      car_name_id,
      service_advisor,
    } = values;
    const customerCare: any = {
      full_name: full_name,
      phone_number: phone_number,
      customer_request: customer_request,
      description: description,
      priority_level: priority_level,
      arrival_time: dayjs.utc(arrival_time).add(7, "hour"),
      car_id: car_id,
      garageId: garageId,
      number_plates: number_plates,
      brand_id: brand_id,
      car_name_id: car_name_id,
      car_year_id: car_year_id,
      service_advisor: service_advisor,
    };
    setNewCustomerCare(customerCare);
    if (!token) {
      const genRs = await GenOTP(phone_number);
      setLoading(false);
      openLogin();
    } else {
      try {
        const createdCar = await addCustomerCare(customerCare, token ?? "");
        setLoading(false);
        notifications.show({
          title: "Thành công",
          message: "Đặt lịch thành công",
        });
        onClose();
        fetchDataOrders();
        // router.push('/dashboard');
      } catch (error) {
        console.error("Error creating customer care:", error);
        notifications.show({
          title: "Thất bại",
          message: "Đặt lịch thất bại",
        });
        setLoading(false);
        onClose();
        fetchDataOrders();
      }
    }
  };
  const ref = useRef<HTMLInputElement>(null);
  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const handlePlace = (value: any) => {
    form.setFieldValue("car_id", value);
    carOptions?.map((item: any) => {
      if (item?.otherData?.carId === value) {
        form.setFieldValue("brand_name", item.otherData?.brandName);
        form.setFieldValue("model_name", item.otherData?.modelName);
      }
    });
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          placeholder="Yêu cầu khách hàng"
          withAsterisk
          {...form.getInputProps("customer_request")}
        />
        <Radio.Group withAsterisk {...form.getInputProps("priority_level")}>
          <Group mt="xs">
            <Radio value="1" label="Cao" />
            <Radio value="2" label="Trung bình" />
            <Radio value="3" label="Thấp" />
          </Group>
        </Radio.Group>

        <Grid gutter={10} mt="md">
          <Grid.Col span={6}>
            <TextInput
              placeholder="Họ và tên"
              withAsterisk
              {...form.getInputProps("full_name")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              placeholder="Số điện thoại"
              withAsterisk
              {...form.getInputProps("phone_number")}
            />
          </Grid.Col>
        </Grid>
        <Grid mt="md" justify="center">
          <Grid.Col span={6} className="input-plate">
            {token ? (
              <Select
                {...form.getInputProps("car_id")}
                checkIconPosition="right"
                placeholder="Biển số xe"
                classNames={{
                  root: styles.rootPlates,
                  input: styles.inputPlates,
                }}
                allowDeselect={false}
                size="lg"
                data={carOptions}
                onChange={handlePlace}
              ></Select>
            ) : (
              <TextInput
                classNames={{
                  root: styles.rootPlates,
                  input: styles.inputPlates,
                }}
                placeholder="Nhập biển số xe"
                size="lg"
                {...form.getInputProps("number_plates")}
              ></TextInput>
            )}
          </Grid.Col>
        </Grid>
        {token ? (
          <Grid gutter={10} mt="md">
            <Grid.Col span={4}>
              <TextInput
                placeholder="Hãng xe"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                {...form.getInputProps("brand_name")}
                // value={carSelect?.brandCarName?.name || carDefault?.brandCarName?.name}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                placeholder="Dòng xe"
                leftSection={<IconPlus size={22} color="blue" />}
                {...form.getInputProps("model_name")}
                // value={carSelect?.modelCarName?.name || carDefault?.modelCarName?.name}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                placeholder="Năm sản xuất"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                {...form.getInputProps("nsx")}
              />
            </Grid.Col>
          </Grid>
        ) : (
          <Grid gutter={10} mt="md">
            <Grid.Col span={4}>
              <Select
                {...form.getInputProps("brand_id")}
                name="brand_name"
                data={brandOptions}
                placeholder="Hãng xe"
                allowDeselect={false}
                leftSection={<IconPlus size={22} color="blue" />}
                onChange={(value) => {
                  form.setFieldValue("brand_id", value || "");
                  form.setFieldValue("car_name_id", null);
                  setBrand(value);
                }}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                name="car_name_id"
                data={modelOptions}
                placeholder="Dòng xe"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                allowDeselect={false}
                {...form.getInputProps("car_name_id")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                placeholder="Năm sản xuất"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                {...form.getInputProps("car_year_id")}
              />
            </Grid.Col>
          </Grid>
        )}
        <Grid gutter={10} mt="md">
          <Grid.Col span={6}>
            <Select
              data={categoryOptions}
              placeholder="Danh mục đặt lịch"
              withAsterisk
              allowDeselect={false}
              leftSection={<IconPlus size={22} color="blue" />}
              {...form.getInputProps("category")}
            />
          </Grid.Col>
          <Grid.Col span={6} className="input-date">
            <DateTimePicker
              valueFormat="DD/MM/YYYY hh:mm A"
              placeholder="Thời gian đặt lịch"
              leftSection={<IconPlus size={22} color="blue" />}
              rightSection={pickerControl}
              {...form.getInputProps("arrival_time")}
            />
          </Grid.Col>
        </Grid>
        {garage && token && (
          <Grid gutter={10} mt="md">
            <Grid.Col span={6}>
              <Select
                allowDeselect={false}
                data={advisorOptions}
                placeholder="Chọn CVDV"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                {...form.getInputProps("service_advisor")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                allowDeselect={false}
                data={garageOptions}
                placeholder="Chọn chuyên gia"
                withAsterisk
                {...form.getInputProps("garageId")}
              />
            </Grid.Col>
          </Grid>
        )}
        {garage && !token && (
          <Grid mt="md">
            <Grid.Col span={12}>
              <TextInput
                placeholder="Chuyên gia"
                {...form.getInputProps("garaName")}
              />
            </Grid.Col>
          </Grid>
        )}

        <Grid mt="md">
          <Grid.Col span={12}>
            <Textarea
              placeholder="Ghi chú cho CVDV"
              withAsterisk
              {...form.getInputProps("description")}
            />
          </Grid.Col>
        </Grid>
        <Group
          grow
          preventGrowOverflow={false}
          wrap="nowrap"
          mt="md"
          className="footer-modal-schedule"
        >
          <div>
            Đăng ký <a href="/">DatXe</a> để quản lý lịch sử xe, hoặc{" "}
            <a href="/">đăng nhập</a>
          </div>
          <Button
            loading={loading}
            w={100}
            bg={"var(--theme-color)"}
            type="submit"
            key="submit"
          >
            Đặt lịch
          </Button>
        </Group>
      </form>

      <ModalOrderGuest
        close={closeLogin}
        opened={openedLogin}
        phone={form.values.phone_number}
        name={form.values.full_name}
        dataDetail={newCustomerCare}
        onClose={onClose}
        router={router}
      />
    </Box>
  );
};
