"use client";
import Typo from "@/app/components/elements/Typo";
import useFetch from "@/app/hooks/useFetch";
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Grid,
  Group,
  Modal,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { getOptionsCar } from "../../until";

const DynamicModalCamera = dynamic(() => import("../ModalCamera"), {
  ssr: false,
});
export default function ModalNumberPlates({
  openModal,
  close,
  formOrder,
  handleGetInfo,
}: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [
    openedModalCamera,
    { open: openModalCamera, close: closeModalCamera },
  ] = useDisclosure(false);
  const { data: carOptions, isLoading } = useFetch({
    queryKey: ["carOptions"],
    queryFn: () => getOptionsCar(),
  });
  return (
    <Modal
      opened={openModal}
      onClose={close}
      withCloseButton={false}
      lockScroll
      centered
      radius={0}
      zIndex={99}
      closeOnEscape={false}
      closeOnClickOutside={false}
      size={isMobile ? "100%" : "400px"}
    >
      <Box h={200} w={"100%"}>
        <Typo style={{ fontSize: 24, fontWeight: 500 }}>Nhập biển số xe</Typo>
        <Grid gutter={12}>
          <Grid.Col span={10}>
            {/* <TextInput
              w={"100%"}
              size="lg"
              radius={0}
              withAsterisk
              {...formOrder.getInputProps("numberPlates")}
              type="text"
              placeholder="Biển số xe"
            /> */}
            <Autocomplete
              size="lg"
              radius={0}
              {...formOrder.getInputProps("numberPlates")}
              placeholder="Biển số xe"
              data={carOptions}
              // data={["React", "Angular", "Vue", "Svelte"]}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <ActionIcon
              onClick={openModalCamera}
              size="lg"
              h={50}
              w={50}
              variant="filled"
              aria-label="Settings"
            >
              <IconCamera
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Grid.Col>
        </Grid>
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
      <DynamicModalCamera
        openModal={openedModalCamera}
        close={closeModalCamera}
      />
    </Modal>
  );
}
