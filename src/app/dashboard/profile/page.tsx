import React from "react";
import InfoProfile from "../../components/elements/profile/Info";
import UserProfile from "../../components/elements/profile/User";
import { getMyAccount } from "@/utils/user";
import { getDistricts, getProvinces, getWards } from "@/utils/notion";
import { Space } from "@mantine/core";
export default async function ProfilePage() {
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
    <div className="user-profile-wrapper">
      <InfoProfile />
      <Space h="md" />
      <UserProfile
        myAccount={myAccount}
        provinceData={provinceData}
        districtData={districtData}
        wardData={wardData}
      />
    </div>
  );
}
