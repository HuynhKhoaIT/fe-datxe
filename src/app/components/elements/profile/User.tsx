"use client";
import React, { useState } from "react";
import { Button, Grid, TextInput, Select, Group } from "@mantine/core";
import { useSession } from "next-auth/react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { getDistricts, getWards } from "@/utils/notion";
import { updateAccount } from "@/utils/user";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import DateField from "../../form/DateField";
import { useRouter } from "next/navigation";
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
    <div className="user-profile-card profile-ad">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Cập nhật thông tin</h4>
      </div>
      <div className="card-body">
        <form
          name="userProfileForm"
          onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}
        >
          <Grid gutter={16}>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                withAsterisk
                {...form.getInputProps("name")}
                label="Họ tên"
                placeholder="Nguyễn Văn A"
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={16}>
            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
              <DateField
                {...form.getInputProps("dob")}
                label="Ngày sinh"
                placeholder="Ngày sinh"
                clearable={true}
                maxDate={new Date()}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
              <TextInput
                type="tel"
                disabled={true}
                {...form.getInputProps("phone")}
                label="Điện thoại"
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={16}>
            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
              <TextInput
                {...form.getInputProps("address")}
                label="Địa chỉ"
                placeholder="1234 Main St"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
              <Select
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
            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
              <Select
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
            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
              <Select
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
            <Button type="submit">Cập nhật</Button>
          </Group>
        </form>
      </div>
    </div>
  );
}
