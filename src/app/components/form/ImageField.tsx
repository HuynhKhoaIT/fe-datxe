import { Image } from "@mantine/core";
import React from "react";
import styles from "./ImageField.module.scss";
import imageDefault from "../../../../public/assets/images/no_image.png";
export default function ImageField({
  src,
  classNames,
  fallbackSrc = imageDefault.src,
  radius,
  width,
  height,
  fit,
  alt,
}: any) {
  return (
    <Image
      src={src}
      classNames={classNames}
      fallbackSrc={fallbackSrc}
      radius={radius}
      w={width}
      h={height}
      fit={fit}
      alt={alt}
    />
  );
}
