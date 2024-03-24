"use client";
import Typo from "@/app/components/elements/Typo";
import { Box, Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

export default function ModalNumberPlates({
  openModal,
  close,
  formOrder,
  handleGetInfo,
}: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
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
        <TextInput
          w={"100%"}
          size="lg"
          radius={0}
          withAsterisk
          {...formOrder.getInputProps("numberPlates")}
          type="text"
          placeholder="Biển số xe"
        />
        <div
          style={{
            width: "100%",
            position: "fixed",
            gap: "20px",
            bottom: 0,
            left: 0,
            display: "flex",
            justifyContent: "end",
            padding: 10,
            borderTop: "1px solid #ddd",
          }}
        >
          <Button
            onClick={() => {
              close();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleGetInfo();
              close();
            }}
          >
            Ok
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
