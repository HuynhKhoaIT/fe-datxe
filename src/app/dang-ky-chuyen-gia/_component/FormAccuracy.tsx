"use client";
import { Button, PinInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { CheckOtp, registerGarage } from "@/utils/user";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export function FormAccuracy() {
  const [opened, handlers] = useDisclosure(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const garageName = searchParams.get("garageName");
  const address = searchParams.get("address");

  const form = useForm({
    initialValues: {
      name: name || "",
      phone: phone || "",
      address: address || "",
      garageName: garageName || "",
      pin: "",
    },

    validate: {
      pin: hasLength({ min: 6, max: 6 }, "Mã xác thực phải đủ 6 ký tự"),
    },
  });
  const onSubmit = async () => {
    handlers.open();
    const { name, phone, garageName, address, pin } = form.values;
    let password = phone + "@@Datxe.com@@";
    let passwordConfirmation = password;
    try {
      const checkRs = await CheckOtp(phone, pin, "register");
      if (checkRs.CodeResult == 100) {
        notifications.show({
          title: "Thành công",
          message: "Xác thực thành công",
        });
        try {
          await registerGarage(
            name,
            phone,
            password,
            passwordConfirmation,
            address,
            garageName
          );

          notifications.show({
            title: "Thành công",
            message: "Đăng ký thành công",
          });
          handlers.close();
        } catch (error) {
          notifications.show({
            title: "Thất bại",
            message: "Đăng ký thất bại",
          });
          handlers.close();
        }
      } else {
        notifications.show({
          title: "Error",
          message: "Xác thực thất bại",
        });
        handlers.close();
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Xác thực thất bại",
      });
      handlers.close();
      form.setErrors({ pin: "Mã Otp không hợp lệ!" });
    }

    // router.push(`./dang-ky/xac-thuc?phone=${phone}`);
  };
  return (
    <form className="login-accuracy-input" onSubmit={form.onSubmit(onSubmit)}>
      <PinInput
        variant="unstyled"
        type="number"
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
        variant="filled"
        color="var(--theme-color)"
        type="submit"
        fullWidth
      >
        Đăng ký
      </Button>
    </form>
  );
}
