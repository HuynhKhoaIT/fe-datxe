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
      fullName: user?.name || "",
      phoneNumber: user?.phone || "",
      numberPlates: "",
      dateTime: typeView === "dayGridMonth" ? newDate : eventInfos?.start,
    },

    validate: {
      fullName: (value) => (value.length < 1 ? "Vui lòng nhập tên" : null),
      phoneNumber: (value) =>
        value.length < 1 ? "Vui lòng nhập số điện thoại" : null,
      numberPlates: (value) =>
        !token && value.length < 1 ? "Vui lòng nhập biển số xe" : null,
      customerRequest: (value) =>
        value.length < 1 ? "Vui lòng nhập yêu cầu" : null,
    },
  });
  const handleSubmit = async (values: any) => {
    console.log(values);
    values.token = token;
    values.garageId = 1;
    // setLoading(true);
    if (!token) {
      // const genRs = await GenOTP(phoneNumber);
      // setLoading(false);
      // openLogin();
      alert("vui long dang nhap");
    } else {
      try {
        const createdCar = await fetch(`/api/orders`, {
          method: "POST",
          body: JSON.stringify(values),
        });
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
    form.setFieldValue("carId", value);
    form.setFieldValue("numberPlates", value);

    carOptions?.map((item: any) => {
      if (item?.otherData?.carId === value) {
        form.setFieldValue("carBrandId", item.otherData?.brandId);
        form.setFieldValue("carNameId", item.otherData?.modelId);
        form.setFieldValue("carYearId", item.otherData?.carYearId);
      }
    });
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          size="lg"
          radius={0}
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
              size="lg"
              radius={0}
              placeholder="Họ và tên"
              withAsterisk
              {...form.getInputProps("fullName")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size="lg"
              radius={0}
              placeholder="Số điện thoại"
              withAsterisk
              {...form.getInputProps("phoneNumber")}
            />
          </Grid.Col>
        </Grid>
        <Grid mt="md" justify="center">
          <Grid.Col span={6} className="input-plate">
            {token ? (
              <Select
                withAsterisk
                {...form.getInputProps("carId")}
                checkIconPosition="right"
                placeholder="Biển số xe"
                classNames={{
                  root: styles.rootPlates,
                  input: styles.inputPlates,
                }}
                allowDeselect={false}
                size="lg"
                radius={0}
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
                radius={0}
                {...form.getInputProps("numberPlates")}
              ></TextInput>
            )}
          </Grid.Col>
        </Grid>

        {token ? (
          <Grid gutter={10} mt="md">
            <Grid.Col span={4}>
              <TextInput
                size="lg"
                radius={0}
                placeholder="Hãng xe"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                {...form.getInputProps("carBrandId")}
                // value={carSelect?.brandCarName?.name || carDefault?.brandCarName?.name}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                size="lg"
                radius={0}
                placeholder="Dòng xe"
                leftSection={<IconPlus size={22} color="blue" />}
                {...form.getInputProps("carNameId")}
                // value={carSelect?.modelCarName?.name || carDefault?.modelCarName?.name}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                size="lg"
                radius={0}
                placeholder="Năm sản xuất"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                {...form.getInputProps("carYearId")}
              />
            </Grid.Col>
          </Grid>
        ) : (
          <Grid gutter={10} mt="md">
            <Grid.Col span={4}>
              <Select
                size="lg"
                radius={0}
                {...form.getInputProps("carBrandId")}
                name="carBrandId"
                data={brandOptions}
                placeholder="Hãng xe"
                allowDeselect={false}
                leftSection={<IconPlus size={22} color="blue" />}
                onChange={(value) => {
                  form.setFieldValue("carBrandId", value);
                  form.setFieldValue("carNameId", null);
                  setBrand(value);
                }}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                size="lg"
                radius={0}
                data={modelOptions}
                placeholder="Dòng xe"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                allowDeselect={false}
                {...form.getInputProps("carNameId")}
                onChange={(value: any) => {
                  form.setFieldValue("carNameId", value);
                  form.setFieldValue("carYearId", null);
                  setModel(value);
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                size="lg"
                radius={0}
                data={yearCarOptions}
                placeholder="Năm sản xuất"
                leftSection={<IconPlus size={22} color="blue" />}
                withAsterisk
                allowDeselect={false}
                {...form.getInputProps("carYearId")}
              />
            </Grid.Col>
          </Grid>
        )}
        <Grid gutter={10} mt="md">
          <Grid.Col span={6}>
            <Select
              size="lg"
              radius={0}
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
                size="lg"
                radius={0}
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
                  size="lg"
                  radius={0}
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
                  size="lg"
                  radius={0}
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
              size="lg"
              radius={0}
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
            size="lg"
            radius={0}
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
        phone={form.values.phoneNumber}
        name={form.values.fullName}
        dataDetail={newCustomerCare}
        onClose={onClose}
        router={router}
      /> */}
    </Box>
  );
};
