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
  yearCarOptions,
  token,
  categoryOptions,
  setBrand,
  setModel,
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
  const typeView = eventInfos?.view?.type;
  const newDate = new Date(eventInfos?.start);
  newDate.setHours(newDate.getHours() + 9);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [openedLogin, { open: openLogin, close: closeLogin }] = useDisclosure(
    false
  );

  const form = useForm({
    initialValues: {
      customerRequest: "",
      full_name: user?.name || "",
      phone_number: user?.phone || "",
      category: "",
      garaName: garage?.data?.name,
      garaAddress: "",
      description: "",
      garageId: garage?.data?.id || "",
      priorityLevel: "2",
      dateTime: typeView === "dayGridMonth" ? newDate : eventInfos?.start,
      carId: dataCarDefault?.carId || "",
      serviceAdvisorId: "",
      brandId: dataCarDefault?.brandName || "",
      modelId: dataCarDefault?.modelName || null,
      number_plates: "",
      yearId: null,
      customerNote: "",
    },

    validate: {
      full_name: (value) => (value.length < 1 ? "Vui lòng nhập tên" : null),
      phone_number: (value) =>
        value.length < 1 ? "Vui lòng nhập số điện thoại" : null,
      number_plates: (value) =>
        !token && value.length < 1 ? "Vui lòng nhập biển số xe" : null,
      customerRequest: (value) =>
        value.length < 1 ? "Vui lòng nhập yêu cầu" : null,
    },
  });
  const handleSubmit = async (values: any) => {
    console.log(values);
    // setLoading(true);
    // if (!token) {
    //   // const genRs = await GenOTP(phone_number);
    //   // setLoading(false);
    //   // openLogin();
    // } else {
    //   try {
    //     const createdCar = await addCustomerCare(values, token ?? "");
    //     setLoading(false);
    //     notifications.show({
    //       title: "Thành công",
    //       message: "Đặt lịch thành công",
    //     });
    //     onClose();
    //     fetchDataOrders();
    //     // router.push('/dashboard');
    //   } catch (error) {
    //     console.error("Error creating customer care:", error);
    //     notifications.show({
    //       title: "Thất bại",
    //       message: "Đặt lịch thất bại",
    //     });
    //     setLoading(false);
    //     onClose();
    //     fetchDataOrders();
    //   }
    // }
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
        form.setFieldValue("brandId", item.otherData?.brandName);
        form.setFieldValue("modelId", item.otherData?.modelName);
      }
    });
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          placeholder="Yêu cầu khách hàng"
          withAsterisk={true}
          {...form.getInputProps("customerRequest")}
        />
        <Radio.Group withAsterisk {...form.getInputProps("priorityLevel")}>
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
                withAsterisk
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
                withAsterisk
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
                {...form.getInputProps("brandId")}
                // value={carSelect?.brandCarName?.name || carDefault?.brandCarName?.name}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                placeholder="Dòng xe"
                leftSection={<IconPlus size={22} color="blue" />}
                {...form.getInputProps("modelId")}
                // value={carSelect?.modelCarName?.name || carDefault?.modelCarName?.name}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                placeholder="Năm sản xuất"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                {...form.getInputProps("yearId")}
              />
            </Grid.Col>
          </Grid>
        ) : (
          <Grid gutter={10} mt="md">
            <Grid.Col span={4}>
              <Select
                {...form.getInputProps("brandId")}
                name="brandId"
                data={brandOptions}
                placeholder="Hãng xe"
                allowDeselect={false}
                leftSection={<IconPlus size={22} color="blue" />}
                onChange={(value) => {
                  form.setFieldValue("brandId", value || "");
                  form.setFieldValue("modelId", null);
                  setBrand(value);
                }}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                data={modelOptions}
                placeholder="Dòng xe"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                allowDeselect={false}
                {...form.getInputProps("modelId")}
                onChange={(value: any) => {
                  form.setFieldValue("modelId", value);
                  form.setFieldValue("yearId", null);
                  setModel(value);
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                data={yearCarOptions}
                placeholder="Năm sản xuất"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                allowDeselect={false}
                {...form.getInputProps("yearId")}
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
              {...form.getInputProps("orderCategoryId")}
            />
          </Grid.Col>
          <Grid.Col span={6} className="input-date">
            <DateTimePicker
              valueFormat="DD/MM/YYYY hh:mm A"
              placeholder="Thời gian đặt lịch"
              leftSection={<IconPlus size={22} color="blue" />}
              rightSection={pickerControl}
              {...form.getInputProps("dateTime")}
            />
          </Grid.Col>
        </Grid>
        {garage && (
          <Grid gutter={10} mt="md">
            <Grid.Col span={6}>
              <Select
                allowDeselect={false}
                data={advisorOptions}
                placeholder="Chọn CVDV"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                {...form.getInputProps("serviceAdvisorId")}
              />
            </Grid.Col>
            {token ? (
              <Grid.Col span={6}>
                <Select
                  allowDeselect={false}
                  data={garageOptions}
                  placeholder="Chọn chuyên gia"
                  withAsterisk
                  {...form.getInputProps("garageId")}
                />
              </Grid.Col>
            ) : (
              <Grid.Col span={6}>
                <TextInput
                  readOnly
                  placeholder="Chuyên gia"
                  {...form.getInputProps("garageId")}
                />
              </Grid.Col>
            )}
          </Grid>
        )}
        <Grid mt="md">
          <Grid.Col span={12}>
            <Textarea
              placeholder="Ghi chú cho CVDV"
              withAsterisk
              {...form.getInputProps("customerNote")}
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

      {/* <ModalOrderGuest
        close={closeLogin}
        opened={openedLogin}
        phone={form.values.phone_number}
        name={form.values.full_name}
        dataDetail={newCustomerCare}
        onClose={onClose}
        router={router}
      /> */}
    </Box>
  );
};
