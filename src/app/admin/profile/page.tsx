import React from "react";
import { getMyAccount } from "@/utils/user";
import { getDistricts, getProvinces, getWards } from "@/utils/notion";
import UserProfile from "@/app/components/elements/profile/User";
import axios from "axios";
export default async function ProfilePageAdmin() {
  const accountData: any = await getMyAccount();
  const province: any = await getProvinces();
  const provinceData = province.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  const district: any = await getDistricts(accountData?.provinceId);
  const districtData = district.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  const ward: any = await getWards(accountData?.districtId);
  const wardData = ward.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  return (
    <div style={{ width: "800px" }}>
      <UserProfile
        myAccount={accountData}
        provinceData={provinceData}
        districtData={districtData}
        wardData={wardData}
      />
    </div>
  );
}
