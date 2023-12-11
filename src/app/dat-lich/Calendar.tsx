'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import ModalCalendar from '../components/ModalInfosEventCalendar';
import ModalPreviewDetailCalendar from '../components/ModalPreviewCalendar';
import dayjs from 'dayjs';
import BasicModal from '../components/basicModal/BasicModal';

const sampleEvents: any = [
    {
        id: '1',
        title: 'Event 1',
        start: '2023-11-13 10:00:00',
        // end: '2023-11-13T12:00:00',
        // user: 'user1',
    },
    {
        id: '2',
        title: 'Event 2',
        start: '2023-11-15T14:00:00',
        // end: '2023-11-15T16:00:00',
        // user: 'user2',
    },
    // Add more events as needed
];

export default function CalendarScheduler({ ordersData }: any) {
    const [eventInfos, setEventInfos] = useState();
    const [previewInfos, setPreviewInfos] = useState();

    const [isEditCard, setIsEditCard] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carDefault, setCarDefault] = useState<any>({});
    const [openedCalendar, { open: openCalendar, close: closeCalendar }] = useDisclosure(false);
    const [openedPreviewCalendar, { open: openPreviewCalendar, close: closePreviewCalendar }] = useDisclosure(false);
    const [openedNotification, { open: openNotification, close: closeNotification }] = useDisclosure(false);

    useEffect(() => {
        const existingCarData = localStorage.getItem('carDefault');
        if (existingCarData) {
            const parsedCarData = JSON.parse(existingCarData);
            setCarDefault(parsedCarData);
        }
    }, []);

    const weekends = {
        weekendsVisible: true,
        currentEvents: [],
    };

    // Hàm kiểm tra xem ngày đã qua hay chưa
    const isDateInThePast = (value: any) => {
        return dayjs().isBefore(value);
    };

    // click mở modal đặt lịch
    const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
        console.log('selectInfo', selectInfo);
        setIsEditCard(false);
        setEventInfos(selectInfo);
        openCalendar();
        isDateInThePast(selectInfo?.start);
    };

    // click mở modal xem chi tiết
    const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
        setIsModalOpen(true);
        setPreviewInfos(clickInfo);
        console.log('clickInfo', clickInfo);
        openPreviewCalendar();
        // setIsModalOpen(true);
        // setIsEditCard(true);
        // setEventInfos(clickInfo);
        // modalInfosEvent.handleOpen();
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
        setIsModalOpen(true);
    };
    console.log(ordersData);
    // Kiểm tra xem khung giờ đang được chọn có nằm trong quá khứ hay không
    const handleSelectAllow = (selectInfo: any) => {
        if (!dayjs().isBefore(selectInfo.start)) {
            openNotification();
        }
        return dayjs().isBefore(selectInfo.start);
    };

    return (
        <div className="modal-datlich">
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                slotLabelFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                    meridiem: 'short',
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
                initialEvents={ordersData ?? sampleEvents}
                longPressDelay={1000}
                eventLongPressDelay={1000}
                selectLongPressDelay={1000}
                selectable={true}
                dayMaxEvents={true}
                allDaySlot={false}
                editable={false}
                height="700px"
                buttonText={{
                    today: 'Hôm nay',
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày',
                    list: 'Danh sách',
                }}
                slotMinTime="06:00:00"
                slotMaxTime="22:00:00"
                views={{
                    timeGridWeek: {
                        type: 'timeGridWeek',
                        duration: { weeks: 1 }, // Hiển thị một tuần tại một thời điểm
                        buttonText: 'Tuần',
                    },
                }}
                selectAllow={handleSelectAllow}
                firstDay={new Date().getDay() - 3}
            />
            <ModalCalendar opened={openedCalendar} onClose={closeCalendar} eventInfos={eventInfos} />
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
                style={{ position: 'relative' }}
                centered={true}
            >
                <div>Vui lòng chọn ngày giờ lớn hơn hiện tại.</div>
            </BasicModal>
        </div>
    );
}
