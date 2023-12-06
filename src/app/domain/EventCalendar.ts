import { ICustomerCare } from '@/interfaces/customerCare';
import { IOrder } from '@/interfaces/order';
import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
export interface IEventCalendar {
    _id: string;
    id?: string;
    title: string;
    // end: string;
    start: string;
    user: string;
}
export const mapEventCalendar = (eventCalendar: IOrder, index: number): IEventCalendar => {
    return {
        _id: (index + 1).toString(), // Assuming _id should be a string
        title: eventCalendar?.garage?.name || '', // Providing a default value if garage.name is undefined
        start: dayjs
            .utc(eventCalendar?.arrivalTime)
            .local()
            .format('YYYY-MM-DD HH:mm:ss'),
        user: '', // You need to populate this property with the appropriate value
    };
};

export const mapArrayEventCalendar = (listEventsCalendar: any) => {
    console.log(listEventsCalendar);
    const listEventsCalendarFormated = listEventsCalendar?.map((eventCalendar: IOrder, index: number) =>
        mapEventCalendar(eventCalendar, index),
    );
    const firstFiveEvents = listEventsCalendarFormated;

    return firstFiveEvents;
};
