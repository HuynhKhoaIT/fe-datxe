"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Flex, LoadingOverlay } from "@mantine/core";
import styles from "./index.module.scss";
import "dayjs/locale/vi";
import CalendarEventBase from "../../form/CalendarEventBase";
dayjs.locale("vi");
import dynamic from "next/dynamic";

const DynamicModalCalendar = dynamic(
  () => import("../ModalInfosEventCalendar"),
  {
    ssr: false,
  }
);
export default function CalendarSchedulerGarage({
  ordersData,
  selectable = true,
}: any) {
  const [layoutMobile, setLayoutMobile] = useState(false);
  const [previewInfos, setPreviewInfos] = useState();

  const [
    openedPreviewCalendar,
    { open: openPreviewCalendar, close: closePreviewCalendar },
  ] = useDisclosure(false);

  useEffect(() => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
    } else {
      setLayoutMobile(false);
    }
  }, []);

  // click mở modal xem chi tiết
  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    setPreviewInfos(clickInfo);
    openPreviewCalendar();
  };

  // Kiểm tra xem khung giờ đang được chọn có nằm trong quá khứ hay không
  const handleWindowResize = () => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
    } else {
      setLayoutMobile(false);
    }
  };

  return (
    <div className={styles.calendar}>
      <Box pos="relative">
        <CalendarEventBase
          eventClick={handleEditEventSelectAndOpenModal}
          events={ordersData}
          isResponsive={true}
          heightMobile="500px"
          heightDesktop="700px"
          selectable={selectable}
          views={{
            timeGridWeek: {
              type: "timeGridWeek",
              duration: layoutMobile ? { days: 4 } : { days: 7 }, // Hiển thị một tuần tại một thời điểm
              buttonText: "Tuần",
              eventLimit: 1,
              eventLimitText: 1,
            },
          }}
          firstDay={new Date().getDay() - 3}
          windowResize={handleWindowResize}
          isListEvent={true}
        />
      </Box>
    </div>
  );
}
