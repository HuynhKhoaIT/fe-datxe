"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { getScheduleCsr } from "@/utils/order";
import { mapArrayEventCalendar } from "../../../domain/EventCalendar";
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
const DynamicModalPreviewDetailCalendar = dynamic(
  () => import("../ModalPreviewCalendar"),
  {
    ssr: false,
  }
);
const DynamicBasicModal = dynamic(() => import("../../common/BasicModal"), {
  ssr: false,
});
export default function CalendarScheduler({
  ordersData: dataDetail,
  brandOptions,
  categoryOptions,
  carsData,
  carOptions,
  carDefault,
  selectable = true,
  orderInfo,
  advisorOptions,
}: any) {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const [ordersData, setOrdersData] = useState(dataDetail);
  const [eventInfos, setEventInfos] = useState();
  const [layoutMobile, setLayoutMobile] = useState(false);
  const [previewInfos, setPreviewInfos] = useState();
  const [
    openedCalendar,
    { open: openCalendar, close: closeCalendar },
  ] = useDisclosure(false);
  const [
    openedPreviewCalendar,
    { open: openPreviewCalendar, close: closePreviewCalendar },
  ] = useDisclosure(false);
  const [
    openedNotification,
    { open: openNotification, close: closeNotification },
  ] = useDisclosure(false);

  const fetchDataOrders = async () => {
    try {
      const orders = await getScheduleCsr(token || "");
      const mappedOrdersData = mapArrayEventCalendar(orders);
      setOrdersData(mappedOrdersData);
    } catch (error) {}
  };

  useEffect(() => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
    } else {
      setLayoutMobile(false);
    }
  }, []);
  // Hàm kiểm tra xem ngày đã qua hay chưa
  const isDateInThePast = (value: any) => {
    return dayjs().isBefore(value);
  };

  // click mở modal đặt lịch
  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
    setEventInfos(selectInfo);
    openCalendar();
    isDateInThePast(selectInfo?.start);
  };

  // click mở modal xem chi tiết
  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    setPreviewInfos(clickInfo);
    openPreviewCalendar();
  };

  const handleUpdateEventSelect = async (changeInfo: any) => {};
  const handleDateClick = (arg: { date: any }) => {
    // setIsModalOpen(true);
  };

  // Kiểm tra xem khung giờ đang được chọn có nằm trong quá khứ hay không
  const handleSelectAllow = (selectInfo: any) => {
    if (!dayjs().isBefore(selectInfo.start)) {
      openNotification();
    }
    return dayjs().isBefore(selectInfo.start);
  };

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
          select={handleAddEventSelectAndOpenModal}
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
          selectAllow={handleSelectAllow}
          firstDay={new Date().getDay() - 3}
          windowResize={handleWindowResize}
          isListEvent={false}
        />
      </Box>

      <DynamicModalCalendar
        opened={openedCalendar}
        onClose={closeCalendar}
        eventInfos={eventInfos}
        brandOptions={brandOptions}
        categoryOptions={categoryOptions}
        carsData={carsData}
        carOptions={carOptions}
        carDefault={carDefault}
        fetchDataOrders={fetchDataOrders}
        advisorOptions={advisorOptions}
      />
      <DynamicModalPreviewDetailCalendar
        opened={openedPreviewCalendar}
        onClose={closePreviewCalendar}
        previewInfos={previewInfos}
      />
      <DynamicBasicModal
        size={300}
        isOpen={openedNotification}
        onCloseModal={closeNotification}
        footer={false}
        title="Thông báo"
        style={{ position: "relative" }}
        centered={true}
      >
        <div>Vui lòng chọn ngày giờ lớn hơn hiện tại.</div>
      </DynamicBasicModal>
    </div>
  );
}
