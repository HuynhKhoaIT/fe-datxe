"use client";
import React, { useState } from "react";
import { Box, Avatar, Grid, Input, Button, TextInput } from "@mantine/core";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import IconGoogle from "../../assets/images/google.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import styles from "./index.module.scss";
import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import { CheckPhone, GenOTP } from "@/utils/user";
import { useDisclosure } from "@mantine/hooks";
interface FormInputs {
  name: string;
  phone: string;
  address: string;
  garageName: string;
}
export function RegisterGarageFormInput() {
  const [opened, handlers] = useDisclosure(false);

  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      garageName: "",
    },

    validate: {
      name: hasLength({ min: 2, max: 30 }, "Name must be 2-30 characters long"),
      garageName: hasLength(
        { min: 2, max: 30 },
        "Name must be 2-30 characters long"
      ),
      address: hasLength(
        { min: 2, max: 30 },
        "Name must be 2-30 characters long"
      ),
      phone: hasLength(
        { min: 2, max: 11 },
        "phone must be 2-10 characters long"
      ),
    },
  });
  const onSubmit = async () => {
    handlers.open();
    const { name, phone, address, garageName } = form.values;
    const res = await CheckPhone(phone);
    if (!res) {
      const genRs = await GenOTP(phone);
      if (genRs.CodeResult == 100) {
        router.push(
          `./dang-ky-chuyen-gia/xac-thuc?name=${name}&phone=${phone}&address=${address}&garageName=${garageName}`
        );
      } else {
        notifications.show({
          title: "Error",
          message: "Hệ thống gửi OTP thất bại, vui lòng thử lại sau!",
        });
      }
      handlers.close();
    } else {
      notifications.show({
        title: "Error",
        message: "Số điện thoại đã được đăng ký!",
      });
      handlers.close();
      form.setErrors({ phone: "Số điện thoại đã được đăng ký!" });
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
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
          <h2>Xin chào,</h2>
          <p>Đăng ký chuyên gia</p>
        </div>

        <form className="login-form-input" onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            size="lg"
            radius={0}
            withAsterisk
            style={{ borderBottom: "1px solid #ddd" }}
            variant="unstyled"
            placeholder="Họ và tên"
            // onChange={(e) => setfullName(e.target.value)}
            {...form.getInputProps("name")}
          />
          <br></br>
          <TextInput
            size="lg"
            radius={0}
            withAsterisk
            style={{ borderBottom: "1px solid #ddd" }}
            variant="unstyled"
            placeholder="Số điện thoại"
            {...form.getInputProps("phone")}
          />
          <br></br>
          <TextInput
            size="lg"
            radius={0}
            withAsterisk
            style={{ borderBottom: "1px solid #ddd" }}
            variant="unstyled"
            placeholder="Tên chuyên gia"
            {...form.getInputProps("garageName")}
          />
          <br></br>
          <TextInput
            size="lg"
            radius={0}
            withAsterisk
            style={{ borderBottom: "1px solid #ddd" }}
            variant="unstyled"
            placeholder="Địa chỉ chuyên gia"
            {...form.getInputProps("address")}
          />
          <Button
            size="lg"
            radius={0}
            className="login-btn"
            variant="filled"
            color="var(--theme-color)"
            fullWidth
            type="submit"
            loading={opened}
          >
            Tiếp tục
          </Button>
        </form>
        <div className="other-login">
          {/* <div className="login-footer">
                    <p>
                        Bạn không có tài khoản? <Link href="dang-ky">Đăng Ký</Link>
                    </p>
                </div> */}
          <div className={styles.accept}>
            Bằng việc tiếp tục, bạn đã chấp nhận{" "}
            <div className={styles.acceptRules}>
              <Checkbox
                defaultChecked
                labelPosition="left"
                color="var(--theme-color)"
              />
              <a href="/"> Điều khoản sử dụng </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
