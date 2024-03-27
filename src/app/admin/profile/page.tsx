import React from "react";
import { getMyAccount } from "@/utils/user";
import { getDistricts, getProvinces, getWards } from "@/utils/notion";
import styles from "./index.module.scss";
import UserProfile from "@/app/dashboard/profile/_component/User";
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
    <div className={styles.userProfile}>
      <UserProfile
        myAccount={accountData}
        provinceData={provinceData}
        districtData={districtData}
        wardData={wardData}
      />
    </div>
  );
}
