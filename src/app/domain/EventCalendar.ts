import { ICustomerCare } from '@/interfaces/customerCare';
import { IOrder } from '@/interfaces/order';
import dayjs from 'dayjs';

export interface IEventCalendar {
    _id: string;
    id?: string;
    title: string;
    // end: string;
    start: string;
    user: string;
}
export const mapEventCalendar = (eventCalendar: IOrder, index: number) => ({
    _id: index + 1,
    title: eventCalendar?.garage?.name,
    start: dayjs(eventCalendar?.arrivalTime).format('YYYY-MM-DD HH:mm:ss'),
});

export const mapArrayEventCalendar = (listEventsCalendar: any) => {
    const listEventsCalendarFormated = listEventsCalendar?.map((eventCalendar: IOrder, index: number) =>
        mapEventCalendar(eventCalendar, index),
    );
    const firstFiveEvents = listEventsCalendarFormated?.slice(0, 5);

    return firstFiveEvents;
};
