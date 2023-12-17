"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { getHourAndMinute, getDayOfWeek } from "@/utils/util";
import React, { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ModalCalendar from "../components/ModalInfosEventCalendar";
import ModalPreviewDetailCalendar from "../components/ModalPreviewCalendar";
import dayjs from "dayjs";
import BasicModal from "../components/basicModal/BasicModal";
import { useSearchParams } from "next/navigation";
import { getSchedule, getScheduleCsr } from "@/utils/order";
import { mapArrayEventCalendar } from "../domain/EventCalendar";
import { useSession } from "next-auth/react";
import { Box, Card, Flex, Grid, List, Select, Space } from "@mantine/core";
import styles from "./index.module.scss";
import { IconDots } from "@tabler/icons-react";
import "dayjs/locale/vi";
dayjs.locale("vi");

export default function CalendarScheduler({
  ordersData: dataDetail,
  brandOptions,
  categoryOptions,
  carsData,
  carOptions,
  carDefault,
}: any) {
  const fullCalendarRef = useRef<FullCalendar | null>(null);

  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const search = searchParams.get("garage");
  const [ordersData, setOrdersData] = useState(dataDetail);
  const [eventInfos, setEventInfos] = useState();
  const [eventData, setEventData] = useState<any>();
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
  const weekends = {
    weekendsVisible: true,
    currentEvents: [],
  };

  const fetchDataOrders = async () => {
    try {
      const orders = await getScheduleCsr(token || "");
      const mappedOrdersData = mapArrayEventCalendar(orders);
      setOrdersData(mappedOrdersData);
      handleGetVisibleEvents();
      console.log("refetch envent");
      // fullCalendarRef.current?.getApi().addEventSource(mappedOrdersData);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  console.log(fullCalendarRef.current?.getApi().getEventSources());
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
    console.log("thay đổi event");
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

  const handleWindowResize = () => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
      handleGetVisibleEvents();
    } else {
      setLayoutMobile(false);
      handleGetVisibleEvents();
    }
  };

  const [viewDefault, setViewDefault] = useState("Tuần");

  const handleGetVisibleEvents = () => {
    const calendarApi = fullCalendarRef.current?.getApi();
    if (!calendarApi) {
      return;
    }
    const { currentStart, currentEnd } = calendarApi.view;

    const visibleEvents = calendarApi
      .getEvents()
      .filter((event) => event?.start)
      .map(({ start, title, extendedProps }: any) => ({
        start: new Date(start),
        title,
        extendedProps,
      }))
      .filter(({ start }) => start >= currentStart && start <= currentEnd)
      .sort((a, b) => (a.start?.getTime() ?? 0) - (b.start?.getTime() ?? 0));

    setEventData(groupEventsByDateWithDay(visibleEvents));
  };

  const groupEventsByDateWithDay = (events: any[]) => {
    const groupedEvents: any = {};
    events?.forEach((event) => {
      const eventDate = dayjs(event.start);
      const formattedDate = eventDate.format("DD/MM/YYYY");
      const dayOfWeek = eventDate.format("dddd"); // Lấy thông tin về thứ
      if (!groupedEvents[formattedDate]) {
        groupedEvents[formattedDate] = {
          date: formattedDate,
          dayOfWeek,
          events: [],
        };
      }
      groupedEvents[formattedDate].events.push(event);
    });
    const result = Object.values(groupedEvents);
    return result;
  };

  const customButtons = {
    prev: {
      click: () => {
        fullCalendarRef.current?.getApi().prev();
        handleGetVisibleEvents();
      },
    },
    next: {
      click: () => {
        fullCalendarRef.current?.getApi().next();
        handleGetVisibleEvents();
      },
    },
    today: { text: "Hôm nay", click: () => handleTodayButtonClick() },
    dayGridMonth: {
      text: "Tháng",
      click: () => handleChangeView("dayGridMonth"),
    },
    timeGridWeek: {
      text: "Tuần",
      click: () => handleChangeView("timeGridWeek"),
    },
    timeGridDay: { text: "Ngày", click: () => handleChangeView("timeGridDay") },
    listWeek: { text: "Danh sách", click: () => handleChangeView("listWeek") },
  };

  const handleTodayButtonClick = () => {
    fullCalendarRef.current?.getApi().today();
    handleGetVisibleEvents();
  };
  console.log(eventData);
  const handleChangeView = (view: string) => {
    switch (view) {
      case "dayGridMonth":
        setViewDefault("tháng");
        break;
      case "timeGridWeek":
        setViewDefault("tuần");
        break;
      case "timeGridDay":
        setViewDefault("ngày");
        break;
      case "listWeek":
        setViewDefault("danh sách");
        break;
      default:
    }

    fullCalendarRef.current?.getApi().changeView(view);
    handleGetVisibleEvents();
  };

  return (
    <div className={styles.calendar}>
      <FullCalendar
        ref={fullCalendarRef}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        customButtons={customButtons}
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
        initialEvents={ordersData}
        events={ordersData}
        longPressDelay={80}
        // eventLongPressDelay={1000}
        // selectLongPressDelay={1000}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={false}
        height={layoutMobile ? "500px" : "700px"}
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
            eventLimit: 1,
            eventLimitText: 1,
          },
        }}
        selectAllow={handleSelectAllow}
        firstDay={new Date().getDay() - 3}
        // longPressDelay={1}
        windowResize={handleWindowResize}
      />
      {viewDefault !== "danh sách" && (
        <Box w={"100%"} className={styles.eventGroup}>
          <div className={styles.title}>Sự kiện trong {viewDefault}</div>
          <Flex direction="column" className={styles.listEvent}>
            {eventData?.length > 0 ? (
              eventData?.map((events: any, index: number) => (
                <div key={index}>
                  <Flex
                    className={styles.titleEvent}
                    align="center"
                    justify="space-between"
                  >
                    <div>{events?.dayOfWeek}</div>
                    <div>{events?.date}</div>
                  </Flex>

                  {events?.events.map((event: any, innerIndex: number) => (
                    <Flex
                      className={styles.itemEvent}
                      align="center"
                      key={innerIndex}
                    >
                      <div className={styles.hours}>
                        {dayjs(event.start).format("HH:mm")}
                      </div>
                      <div className={styles.licensePlates}>
                        {event?.extendedProps?.orderDetail?.car?.licensePlates}
                      </div>
                      <div className={styles.customerRequest}>
                        {event?.extendedProps?.orderDetail?.customerRequest}
                      </div>
                    </Flex>
                  ))}
                </div>
              ))
            ) : (
              <Flex justify={"center"} align={"center"} h={50}>
                Không có sự kiện nào
              </Flex>
            )}
          </Flex>
        </Box>
      )}

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
