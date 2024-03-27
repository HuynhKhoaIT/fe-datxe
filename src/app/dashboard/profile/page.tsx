import React from "react";
import { getMyAccount } from "@/utils/user";
import { Space } from "@mantine/core";
import InfoProfile from "./_component/Info";
import UserProfile from "./_component/User";
export default async function ProfilePage() {
  const myAccount: any = await getMyAccount();

  return (
    <div className="user-profile-wrapper">
      <InfoProfile />
      <Space h="md" />
      <UserProfile myAccount={myAccount} />
    </div>
  );
}
