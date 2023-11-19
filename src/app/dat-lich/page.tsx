'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { mapArrayEventCalendar } from '../domain/EventCalendar';

import { ModalInfosEventCalendar } from '../components/ModalInfosEventCalendar/index';
import { useDisclosure } from '../hooks/useDisclosure';
import { useEffect, useState } from 'react';
// import { updateEventCalendar } from '../services/eventCalendarApi';
// import { toast } from 'react-toastify';
import { IEventCalendar } from '../domain/EventCalendar';
import { useSession } from 'next-auth/react';
import { getCustomerCare } from '@/utils/customerCare';
import { ICustomerCare } from '@/interfaces/customerCare';

const sampleEvents: any = [
    {
        _id: '1',
        title: 'Event 1',
        start: '2023-11-13T10:00:00',
        end: '2023-11-13T12:00:00',
        user: 'user1',
    },
    {
        _id: '2',
        title: 'Event 2',
        start: '2023-11-15T14:00:00',
        // end: '2023-11-15T16:00:00',
        user: 'user2',
    },
    // Add more events as needed
];

export default function CalendarScheduler() {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [eventInfos, setEventInfos] = useState();
    const [isEditCard, setIsEditCard] = useState<boolean>(false);
    // const [opened, { open, close }] = useDisclosure(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carDefault, setCarDefault] = useState<any>({});
    useEffect(() => {
        const existingCarData = localStorage.getItem('carDefault');
        if (existingCarData) {
            const parsedCarData = JSON.parse(existingCarData);
            console.log(parsedCarData);
            setCarDefault(parsedCarData);
        }
    }, []);

    const [data, setData] = useState<ICustomerCare[]>([]);
    console.log(data);
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const result: any = await getCustomerCare(token, '12');
                    if (result) {
                        const listAllEventsCalendar: ICustomerCare[] = mapArrayEventCalendar(result);
                        setData(listAllEventsCalendar ?? []);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [token]);
    console.log(data);
    const weekends = {
        weekendsVisible: true,
        currentEvents: [],
    };

    const modalInfosEvent = useDisclosure(false);

    const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
        setIsEditCard(false);
        setEventInfos(selectInfo);
        console.log(selectInfo);
        modalInfosEvent.handleOpen();
        setIsModalOpen(true);
    };

    const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
        console.log('123');
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
    // const handleDateClick = (arg: { date: any }) => {
    //     // arg.date will contain the clicked date information
    //     alert(`Clicked on: ${arg.date}`);
    //     console.log('123');
    // };

    return (
        <div className="modal-datlich">
            <ModalInfosEventCalendar
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                eventInfos={eventInfos}
                isEditCard={isEditCard}
                dataUser={session?.user}
                carDefault={carDefault}
            />

            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    // right: 'timeGridWeek',
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
                initialEvents={sampleEvents}
                longPressDelay={1000}
                eventLongPressDelay={1000}
                selectLongPressDelay={1000}
                selectable={true}
                dayMaxEvents={true}
                allDaySlot={false}
                editable={true}
                height="700px"
                buttonText={{
                    today: 'Hôm nay',
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày',
                    list: 'Danh sách',
                }}
            />
        </div>
    );
}
