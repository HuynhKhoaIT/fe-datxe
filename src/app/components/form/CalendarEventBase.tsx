import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useRef, useState } from "react";
import "dayjs/locale/vi";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dayjs from "dayjs";
import { Box, Flex } from "@mantine/core";
import styles from "./CalendarEventBase.module.scss";
export default function CalendarEventBase({
  plugins = [timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin],
  initialView = "timeGridWeek",
  headerToolbar = {
    left: "prev,next,today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  },
  select,
  eventClick,
  events, // danh sách sự kiện hiển thị
  height, // chiều dài
  weekends = true, // bao gồm thứ 7 và chủ nhật
  slotMinTime = "06:00:00",
  slotMaxTime = "22:00:00",
  views,
  selectAllow, //Kiểm tra event người dùng chọn
  windowResize,
  buttonText = {
    today: "Hôm nay",
    month: "Tháng",
    week: "Tuần",
    day: "Ngày",
    list: "Danh sách",
  },
  locale = "vi",
  slotLabelFormat = {
    hour: "numeric",
    minute: "2-digit",
    omitZeroMinute: false,
    meridiem: "short",
  },
  longPressDelay = 80,
  firstDay,
  editable = false, //Xác định xem các sự kiện trên lịch có thể được sửa đổi hay không.
  allDaySlot = false, //Xác định xem thời điểm “cả ngày” có được hiển thị ở đầu lịch hay không.
  selectable = false, // cho phép đánh dấu nhiều ngày hay không
  dayMaxEvents = true,
  isListEvent = false,
  isResponsive = true,
  heightMobile = "500px",
  heightDesktop = "700px",
}: any) {
  const fullCalendarRef = useRef<FullCalendar | null>(null);
  const [viewDefault, setViewDefault] = useState("Tuần");
  const [eventData, setEventData] = useState<any>([]);
  const [layoutMobile, setLayoutMobile] = useState(false);

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

  useEffect(() => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
    } else {
      setLayoutMobile(false);
    }
    handleGetVisibleEvents();
  }, []);
  return (
    <>
      <FullCalendar
        ref={fullCalendarRef}
        plugins={plugins}
        initialView={initialView}
        headerToolbar={headerToolbar}
        customButtons={customButtons}
        slotLabelFormat={slotLabelFormat}
        slotLabelContent={(arg) => {
          const hour = arg.date.getHours();
          return `${hour}H`;
        }}
        locale={locale}
        weekends={weekends}
        select={select}
        eventClick={eventClick}
        events={events}
        longPressDelay={longPressDelay}
        selectable={selectable}
        dayMaxEvents={dayMaxEvents}
        allDaySlot={allDaySlot}
        editable={editable}
        height={isResponsive && layoutMobile ? heightMobile : heightDesktop}
        buttonText={buttonText}
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        views={views}
        selectAllow={selectAllow}
        firstDay={firstDay}
        windowResize={windowResize}
      />
      {viewDefault !== "danh sách" && isListEvent && (
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
    </>
  );
}
