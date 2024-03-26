import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Tesseract, { createWorker } from "tesseract.js";
import { Modal, Box, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import cv from "@techstark/opencv-js";

const ModalCamera = ({ openModal, close }: any) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [licensePlate, setLicensePlate] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [processedImage, setProcessedImage] = useState("");
  const webcamRef = useRef<Webcam>(null);

  const doOCR = async (image: Tesseract.ImageLike, characters: string) => {
    const worker = await createWorker("eng");
    await worker.setParameters({
      tessedit_char_whitelist: characters,
      certainty_scale: 80,
    });
    const {
      data: { text },
    } = await worker.recognize(image);
    console.log(text);
    await worker.terminate();

    return text || "";
  };

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

      const licensePlate = await doOCR(
        image,
        "-ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      );
      const chassisNumber = await doOCR(
        image,
        "()ABCDEFGHJKLMNPRSTUVWXYZ0123456789"
      );

      setLicensePlate(licensePlate);
      setChassisNumber(chassisNumber);
      setProcessedImage(canvas.toDataURL("image/jpeg"));
    }
  };

  useEffect(() => {
    if (openModal) {
      setLicensePlate("");
      setChassisNumber("");
      setProcessedImage("");
    }
  }, [openModal]);

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
        />
        {processedImage && (
          <img
            src={processedImage}
            alt="Processed Image"
            style={{ display: "block", maxWidth: "100%", marginBottom: 20 }}
          />
        )}
        <input
          id="licenseplate"
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
        <br />
        <input
          id="chassisnumber"
          type="text"
          placeholder="Chassis Number"
          value={chassisNumber}
          onChange={(e) => setChassisNumber(e.target.value)}
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
