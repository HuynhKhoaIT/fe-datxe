"use client";
import { Button, PinInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { CheckOtp } from "@/utils/user";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
export function FormAccuracy() {
  const [opened, handlers] = useDisclosure(false);
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
    <form className="login-accuracy-input" onSubmit={form.onSubmit(onLogin)}>
      <PinInput
        placeholder="○"
        variant="unstyled"
        type="number"
        size="lg"
        length={6}
        {...form.getInputProps("pin")}
        mb={20}
      />
      <Button
        size="md"
        loading={opened}
        className="login-btn"
        type="submit"
        variant="filled"
        color="var(--theme-color)"
        fullWidth
      >
        Đăng nhập
      </Button>
    </form>
  );
}
