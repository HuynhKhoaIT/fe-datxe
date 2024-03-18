import React from "react";
import styles from "./index.module.scss";
import { Avatar, Checkbox } from "@mantine/core";
import { FormRegisterGara } from "./_component/FormRegisterGara";
export default function Register() {
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
        <FormRegisterGara />
        <div className="other-login">
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
