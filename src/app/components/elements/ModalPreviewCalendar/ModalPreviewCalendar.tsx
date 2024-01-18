import React, { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  Grid,
  Textarea,
  Select,
  Radio,
  Modal,
  Flex,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import {
  IconMessageDots,
  IconCalendarTime,
  IconCarGarage,
  IconMapPin,
} from "@tabler/icons-react";
import styles from "./index.module.scss";
require("dayjs/locale/vi");
export const ModalPreviewCalendar = ({ previewInfos }: any) => {
  console.log(previewInfos);
  const data = previewInfos?.event?._def?.extendedProps;
  const originalTimeString = previewInfos?.event?._instance?.range?.start;
  const date = dayjs(originalTimeString).subtract(7, "hour");
  let formattedTime = date.locale("vi").format("DD/MM/YYYY HH:mm");
  return (
    <div className={styles.contentDetail}>
      <div className={styles.requireCustomer}>
        <IconMessageDots size={18} color="#21A4DD" />
        <p className={styles.requireContent}>
          {data?.orderDetail?.customerRequest
            ? data?.orderDetail?.customerRequest
            : "Không có yêu cầu"}
        </p>
      </div>
      <div className={styles.durationOrder}>
        <IconCalendarTime size={18} color="#21A4DD" />
        <p className={styles.date}>{formattedTime}</p>
      </div>
      <div className={styles.garage}>
        <IconCarGarage size={18} color="#21A4DD" />
        <p className={styles.name}>{data?.orderDetail?.garage?.name}</p>
      </div>
      <div className={styles.addressGarage}>
        <IconMapPin size={18} color="#21A4DD" />
        <p className={styles.address}>{data?.orderDetail?.garage?.address}</p>
      </div>
      <Flex justify={"end"}>
        <Button>Xác nhận đơn hàng</Button>
      </Flex>
    </div>
  );
};
