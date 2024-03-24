import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const [isCameraAccessAllowed, setIsCameraAccessAllowed] = useState<boolean>(
    false
  );

  const checkCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraAccessAllowed(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      setIsCameraAccessAllowed(false);
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    checkCameraAccess();
  }, []);

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot() || null;
    setCapturedImage(imageSrc);
    if (imageSrc) {
      detectLicensePlate(imageSrc);
    }
  };

  const detectLicensePlate = async (imageSrc: string) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const scaleFactor = 0.5;
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const processedImage = canvas.toDataURL("image/jpeg");

        Tesseract.recognize(processedImage, "eng", {
          logger: (m) => console.log(m),
        }).then(({ data: { text } }) => {
          setResult(text.trim());
        });
      }
    };
  };

  console.log(result);
  return (
    <div>
      {isCameraAccessAllowed ? (
        <>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <div>
            <button onClick={captureImage}>Capture Image</button>
          </div>
          {capturedImage && (
            <div>
              <h2>Captured Image</h2>
              <img src={capturedImage} alt="Captured" />
            </div>
          )}
          {result && (
            <div>
              <h2>License Plate Number</h2>
              <p>{result}</p>
            </div>
          )}
        </>
      ) : (
        <p>Camera access is required. Please grant access to your camera.</p>
      )}
    </div>
  );
}

export default Camera;
