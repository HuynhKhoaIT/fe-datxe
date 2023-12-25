import React from "react";
import { getMyAccount } from "@/utils/user";
import { getDistricts, getProvinces, getWards } from "@/utils/notion";
import UserProfile from "@/app/components/elements/profile/User";
import { Box } from "@mantine/core";
export default async function ProfilePageAdmin() {
  const myAccount: any = await getMyAccount();
  const province: any = await getProvinces();
  const provinceData = province.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  const district: any = await getDistricts(myAccount?.provinceId);
  const districtData = district.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  const ward: any = await getWards(myAccount?.districtId);
  const wardData = ward.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  return (
    <Box w={800}>
      <UserProfile
        myAccount={myAccount}
        provinceData={provinceData}
        districtData={districtData}
        wardData={wardData}
      />
    </Box>
  );
}
