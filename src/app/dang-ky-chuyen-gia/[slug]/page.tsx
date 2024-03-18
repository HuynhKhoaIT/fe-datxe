"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import styles from "../index.module.scss";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { Avatar } from "@mantine/core";
import { FormAccuracy } from "../_component/FormAccuracy";
export default function RegisterAccuracy() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const [countdown, setCountdown] = useState<number>(59);

  const { data: session } = useSession();
  if (session && session.user) {
    redirect("/admin");
  }
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link href={"/dang-ky"}>
          <IconChevronLeft size={32} color="var(--theme-color)" />
        </Link>
        <div className="d-flex justify-content-center flex-column align-items-center ">
          <Avatar
            src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
            alt="it's me"
            radius={"50%"}
            size={"100px"}
          />
          <p className="login-title-1">DatXe - Ứng dụng đặt lịch ô tô</p>
        </div>
        <div className="login-title-2">
          <h3>Nhập mã xác minh</h3>
          <p>
            Bạn vui lòng nhập mã gồm 6 chữ số vừa được gửi đến{" "}
            <span style={{ color: "var(--theme-color" }}> {phone}</span>
          </p>
        </div>
        <FormAccuracy />
        <div className="other-accuracy">
          <p className="other-accuracy__time">
            Gửi lại mã sau {countdown}s{" "}
            {countdown == 0 && (
              <div onClick={() => setCountdown(59)}>Gửi lại</div>
            )}
          </p>
          <p className="other-accuracy__title">
            Mã xác minh có hiệu lực trong vòng 15 phút
          </p>
        </div>
      </div>
    </div>
  );
}
