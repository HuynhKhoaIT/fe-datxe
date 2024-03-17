"use client";
import Typo from "@/app/components/elements/Typo";
import { Box, Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

export default function ModalNumberPlates({
  openModal,
  close,
  formOrder,
}: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  const form = useForm({
    initialValues: {
      numberPlates: "",
    },
    validate: {
      numberPlates: (value) =>
        value.length < 1 ? "Không được để trống" : null,
    },
  });
  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      const res = await fetch(`/api/car/number-plates/${values.numberPlates}`, {
        method: "GET",
      });
      console.log(res);
    } catch (error) {}
    close();
  };
  return (
    <Modal
      opened={openModal}
      onClose={close}
      withCloseButton={false}
      lockScroll
      centered
      radius={0}
      zIndex={99999}
      closeOnEscape={false}
      closeOnClickOutside={false}
      size={isMobile ? "100%" : "400px"}
    >
      <Box h={200} w={"100%"}>
        <Typo style={{ fontSize: 24, fontWeight: 500 }}>Nhập biển số xe</Typo>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            w={"100%"}
            size="lg"
            radius={0}
            withAsterisk
            {...form.getInputProps("numberPlates")}
            type="text"
            placeholder="Biển số xe"
          />
          <div
            style={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              left: 0,
              display: "flex",
              justifyContent: "end",
              padding: 10,
              borderTop: "1px solid #ddd",
            }}
          >
            <Button key={"submit"} type="submit">
              Ok
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
