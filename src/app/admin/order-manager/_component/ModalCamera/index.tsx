"use client";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { Modal, Box, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
const ModalCamera = ({
  openModal,
  close,
  formOrder,
  setNumberPlate,
  openDropdown,
}: any) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [licensePlate, setLicensePlate] = useState("");
  const webcamRef = useRef<Webcam>(null);

  const handleCapture = async () => {
    const videoElement = webcamRef.current?.video as HTMLVideoElement;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (videoElement && ctx) {
      const { videoWidth: width, videoHeight: height } = videoElement;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(videoElement, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }

      ctx.putImageData(imageData, 0, 0);

      const image = canvas.toDataURL("image/jpeg");
      const processedBase64 = image.substring(image.indexOf(",") + 1);
      const plate: any = await TakePlatesNumber(processedBase64);
      setLicensePlate(plate?.data);
      formOrder?.setFieldValue("numberPlates", plate?.data);
      setNumberPlate(plate?.data);
      openDropdown();
      close();
    }
  };

  const TakePlatesNumber = async (processedBase64: any) => {
    try {
      const res = await axios.post(`/api/car/take-plates-number`, {
        img: processedBase64,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
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
      fullScreen={isMobile}
      size={isMobile ? "100%" : "600px"}
    >
      <Box w="100%">
        <Webcam
          style={{ width: !isMobile ? 570 : "100%", marginBottom: 50 }}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "environment", // Lựa chọn camera sau
          }}
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
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleCapture}>Capture</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCamera;
