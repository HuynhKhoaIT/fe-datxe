"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ModalCalendar from "../components/ModalInfosEventCalendar";
import ModalPreviewDetailCalendar from "../components/ModalPreviewCalendar";
import dayjs from "dayjs";
import BasicModal from "../components/basicModal/BasicModal";
import { useSearchParams } from "next/navigation";
import { getSchedule, getScheduleCsr } from "@/utils/order";
import { mapArrayEventCalendar } from "../domain/EventCalendar";
import { useSession } from "next-auth/react";

export default function CalendarScheduler({
  ordersData: dataDetail,
  brandOptions,
  categoryOptions,
  carsData,
  carOptions,
  carDefault,
}: any) {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const search = searchParams.get("garage");
  const [ordersData, setOrdersData] = useState(dataDetail);
  const [eventInfos, setEventInfos] = useState();
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
  const weekends = {
    weekendsVisible: true,
    currentEvents: [],
  };
  const fetchDataOrders = async () => {
    try {
      const orders = await getScheduleCsr(token || "");
      const mappedOrdersData = mapArrayEventCalendar(orders);
      console.log("mappedOrdersData", mappedOrdersData);
      setOrdersData(mappedOrdersData);
      console.log("fetch order");
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
    } else {
      setLayoutMobile(false);
    }
    fetchDataOrders();
  }, []);
  // Hàm kiểm tra xem ngày đã qua hay chưa
  const isDateInThePast = (value: any) => {
    return dayjs().isBefore(value);
  };

  // click mở modal đặt lịch
  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
    console.log("handleAddEventSelectAndOpenModal");

    setEventInfos(selectInfo);
    openCalendar();
    isDateInThePast(selectInfo?.start);
  };

  // click mở modal xem chi tiết
  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    setPreviewInfos(clickInfo);
    openPreviewCalendar();
  };

  const handleUpdateEventSelect = async (changeInfo: any) => {
    try {
      const eventCalendarUpdated = {
        eventCalendar: {
          _id: changeInfo.event.id,
          title: changeInfo.event.title,
          start: changeInfo.event.startStr,
          end: changeInfo.event.endStr,
          backgroundColor: changeInfo.event.backgroundColor,
          textColor: changeInfo.event.textColor,
        },
      };
      console.log(eventCalendarUpdated);
      // await updateEventCalendar(eventCalendarUpdated);
    } catch (err) {
      // toast.error('Houve um erro ao atualizar o evento');
    }
  };
  const handleDateClick = (arg: { date: any }) => {
    // setIsModalOpen(true);
    console.log("handleDateClick");
  };
  // Kiểm tra xem khung giờ đang được chọn có nằm trong quá khứ hay không
  const handleSelectAllow = (selectInfo: any) => {
    if (!dayjs().isBefore(selectInfo.start)) {
      openNotification();
    }
    return dayjs().isBefore(selectInfo.start);
  };

  const [layoutMobile, setLayoutMobile] = useState(false);
  const handleWindowResize = () => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
    } else {
      setLayoutMobile(false);
    }
  };
  console.log("ordersData", ordersData);
  return (
    <div className="modal-datlich">
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        slotLabelContent={(arg) => {
          const hour = arg.date.getHours();
          return `${hour}H`;
        }}
        locale="vi"
        weekends={weekends.weekendsVisible}
        select={handleAddEventSelectAndOpenModal}
        eventClick={handleEditEventSelectAndOpenModal}
        // dateClick={handleDateClick}
        eventChange={handleUpdateEventSelect}
        initialEvents={ordersData}
        // longPressDelay={1000}
        // eventLongPressDelay={1000}
        // selectLongPressDelay={1000}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={false}
        height="700px"
        buttonText={{
          today: "Hôm nay",
          month: "Tháng",
          week: "Tuần",
          day: "Ngày",
          list: "Danh sách",
        }}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        views={{
          timeGridWeek: {
            type: "timeGridWeek",
            duration: layoutMobile ? { days: 4 } : { days: 7 }, // Hiển thị một tuần tại một thời điểm
            buttonText: "Tuần",
          },
        }}
        selectAllow={handleSelectAllow}
        firstDay={new Date().getDay() - 3}
        longPressDelay={1}
        windowResize={handleWindowResize}
      />
      <ModalCalendar
        opened={openedCalendar}
        onClose={closeCalendar}
        eventInfos={eventInfos}
        brandOptions={brandOptions}
        categoryOptions={categoryOptions}
        carsData={carsData}
        carOptions={carOptions}
        carDefault={carDefault}
        fetchDataOrders={fetchDataOrders}
      />
      <ModalPreviewDetailCalendar
        opened={openedPreviewCalendar}
        onClose={closePreviewCalendar}
        previewInfos={previewInfos}
      />
      <BasicModal
        size={300}
        isOpen={openedNotification}
        onCloseModal={closeNotification}
        footer={false}
        title="Thông báo"
        style={{ position: "relative" }}
        centered={true}
      >
        <div>Vui lòng chọn ngày giờ lớn hơn hiện tại.</div>
      </BasicModal>
    </div>
  );
}
