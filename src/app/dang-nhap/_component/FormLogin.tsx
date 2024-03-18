"use client";
import { Button, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { CheckPhone, GenOTP } from "@/utils/user";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
export default function FormLogin() {
  const [opened, handlers] = useDisclosure(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const form = useForm({
    initialValues: {
      phone: "",
    },

    validate: {
      phone: hasLength(
        { min: 10, max: 11 },
        "Vui lòng nhập đúng số điện thoại"
      ),
    },
  });
  const onSubmit = async () => {
    handlers.open();
    try {
      const { phone } = form.values;
      const res = await CheckPhone(phone);

      if (res) {
        const genRs = await GenOTP(phone);

        if (genRs.CodeResult == "100") {
          if (callbackUrl) {
            router.push(
              `./dang-nhap/xac-thuc?phone=${phone}&callbackUrl=${callbackUrl}`
            );
          } else {
            router.push(`./dang-nhap/xac-thuc?phone=${phone}`);
          }
          handlers.close();
        } else {
          notifications.show({
            title: "Error",
            message: "Lỗi tạo OTP, Vui lòng thử lại sau!",
          });
          handlers.close();
        }
      } else {
        notifications.show({
          title: "Error",
          message: "Số điện thoại chưa được đăng ký vui lòng đăng ký!",
        });
        handlers.close();

        form.setErrors({ phone: "Số điện thoại chưa được đăng ký!" });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau!",
      });
      handlers.close();
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        size="md"
        withAsterisk
        style={{ borderBottom: "1px solid #ddd" }}
        variant="unstyled"
        placeholder="Số điện thoại"
        {...form.getInputProps("phone")}
        mb={20}
      />
      <Button
        size="md"
        variant="filled"
        color="var(--theme-color)"
        fullWidth
        type="submit"
        loading={opened}
      >
        Tiếp tục
      </Button>
    </form>
  );
}
