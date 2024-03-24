"use client";
import React, { useState } from "react";
import {
  Button,
  Grid,
  TextInput,
  Select,
  Group,
  Box,
  Card,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { getDistricts, getWards } from "@/utils/notion";
import { updateAccount } from "@/utils/user";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import DateField from "../../form/DateField";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import Typo from "../Typo";
export default function UserProfile({
  myAccount,
  provinceData,
  districtData: dtData,
  wardData: wData,
}: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [districtData, setDistrictData] = useState<any>(dtData);
  const [wardData, setWardData] = useState<any>(wData);
  const form = useForm({
    initialValues: {
      name: myAccount.name,
      phone: myAccount.phone,
      province_id: myAccount.provinceId,
      district_id: myAccount.districtId,
      ward_id: myAccount.wardId,
      dob: myAccount?.dob && dayjs(myAccount?.dob).toDate(),
      address: myAccount.address,
    },

    validate: {
      name: (value) => (value.length > 1 ? null : "Vui lòng nhập tên"),
    },
  });
  const handleProvince = async (value: any) => {
    try {
      const district: any = await getDistricts(value);
      const newDistrictData = district?.map((item: any) => ({
        value: item.id?.toString() || "",
        label: item.name || "",
      }));
      setDistrictData(newDistrictData);
    } catch (error) {}
  };
  const handleDistrict = async (value: any) => {
    try {
      const ward: any = await getWards(value);
      const newWardData = ward?.map((item: any) => ({
        value: item.id?.toString() || "",
        label: item.name || "",
      }));
      setWardData(newWardData);
    } catch (error) {}
  };

  const handleUpdateProfile = async (values: any) => {
    try {
      await updateAccount(values, token ?? "");
      notifications.show({
        title: "Thành công",
        message: "Cập nhật thành công",
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: "Thất bại",
        message: "Cập nhật thất bại",
      });
    }
  };
  return (
    <div className={styles.wrapper}>
      <div>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            Cập nhật thông tin
          </Typo>
        </div>

        <Card w={"100%"} px={20}>
          <form
            name="userProfileForm"
            onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}
          >
            <Grid gutter={16} w={"100%"}>
              <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                <TextInput
                  size="lg"
                  radius={0}
                  w={"100%"}
                  withAsterisk
                  {...form.getInputProps("name")}
                  label="Họ tên"
                  placeholder="Nguyễn Văn A"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <DateField
                  {...form.getInputProps("dob")}
                  label="Ngày sinh"
                  placeholder="Ngày sinh"
                  clearable={true}
                  maxDate={new Date()}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <TextInput
                  size="lg"
                  radius={0}
                  type="tel"
                  disabled={true}
                  {...form.getInputProps("phone")}
                  label="Điện thoại"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <TextInput
                  size="lg"
                  radius={0}
                  {...form.getInputProps("address")}
                  label="Địa chỉ"
                  placeholder="1234 Main St"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="lg"
                  radius={0}
                  {...form.getInputProps("province_id")}
                  label="Tỉnh/Thành phố"
                  placeholder="Chọn tỉnh"
                  data={provinceData}
                  onChange={(value) => {
                    form.setFieldValue("province_id", value);
                    form.setFieldValue("ward_id", null);
                    form.setFieldValue("district_id", null);
                    handleProvince(Number(value));
                  }}
                ></Select>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="lg"
                  radius={0}
                  {...form.getInputProps("district_id")}
                  label="Huyện/Quận"
                  placeholder="Chọn huyện/quận"
                  data={districtData}
                  onChange={(value) => {
                    form.setFieldValue("district_id", value);
                    form.setFieldValue("ward_id", null);
                    handleDistrict(Number(value));
                  }}
                ></Select>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="lg"
                  radius={0}
                  {...form.getInputProps("ward_id")}
                  label="Xã/Phường"
                  placeholder="Chọn xã/phường"
                  data={wardData}
                  onChange={(value) => {
                    form.setFieldValue("ward_id", value);
                  }}
                ></Select>
              </Grid.Col>
            </Grid>
            <Group pt={20} justify="end" className="col-12 text-right ">
              <Button size="lg" radius={0} type="submit">
                Cập nhật
              </Button>
            </Group>
          </form>
        </Card>
      </div>
    </div>
  );
}
