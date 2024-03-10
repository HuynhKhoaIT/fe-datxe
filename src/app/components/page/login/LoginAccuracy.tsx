"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, PinInput } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { CheckOtp } from "@/utils/user";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import styles from "./index.module.scss";
import { useDisclosure } from "@mantine/hooks";
export function LoginFormAccuracy() {
  const [opened, handlers] = useDisclosure(false);

  const [countdown, setCountdown] = useState<number>(59);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const phone = searchParams.get("phone");
  const form = useForm({
    initialValues: {
      phone: phone || "",
      pin: "",
    },

    validate: {
      pin: hasLength({ min: 6, max: 6 }, "Mã xác thực phải đủ 6 ký tự"),
    },
  });
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);
  const onLogin = async () => {
    const { phone, pin } = form.values;
    let password = phone + "@@Datxe.com@@";
    try {
      handlers.open();
      const checkRs = await CheckOtp(phone, pin, "login");
      if (checkRs.CodeResult == "100") {
        signIn("credentials", {
          phone: phone,
          password: password,
          callbackUrl: callbackUrl || "/dashboard",
        });
        notifications.show({
          title: "Thành công",
          message: "Đăng nhập thành công",
        });
      } else {
        notifications.show({
          title: "Thất bại",
          message: "Đăng nhập thất bại",
        });
      }
      handlers.close();
    } catch (error) {
      notifications.show({
        title: "Thất bại",
        message: "Đăng nhập thất bại",
      });
      handlers.close();
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link href={"/dang-nhap"}>
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

        <form
          className="login-accuracy-input"
          onSubmit={form.onSubmit(onLogin)}
        >
          <PinInput
            variant="unstyled"
            placeholder="○"
            length={6}
            size="lg"
            radius={0}
            {...form.getInputProps("pin")}
          />
          <Button
            size="lg"
            radius={0}
            loading={opened}
            className="login-btn"
            type="submit"
            variant="filled"
            color="var(--theme-color)"
            radius="md"
            fullWidth
          >
            Đăng nhập
          </Button>
        </form>
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
