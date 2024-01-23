"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
import { SidebarClient } from "./SidebarClient";
import { SidebarAdmin } from "./SidebarAdmin";
const ProfileSidebar = ({ myAccount }: any) => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  let page = parts[parts.length - 1];
  const { data: session } = useSession();
  const token = session?.user?.token;
  return (
    <div
      className="user-profile-sidebar"
      style={{ height: "calc(100vh  - 110px)", overflowY: "auto" }}
    >
      <div className="user-profile-sidebar-top">
        <div className="user-profile-img">
          <img src="/assets/img/account/user.jpg" alt="" />
          <button type="button" className="profile-img-btn">
            <i className="far fa-camera"></i>
          </button>
          <input type="file" className="profile-img-file" />
        </div>
        <h5>{myAccount?.name}</h5>
        <p>{myAccount?.phone}</p>
      </div>
      {parts[1] === "admin" ? <SidebarAdmin /> : <SidebarClient />}
    </div>
  );
};
export { ProfileSidebar };
