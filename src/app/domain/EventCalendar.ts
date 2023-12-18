import { ICustomerCare } from '@/interfaces/customerCare';
import { IOrder } from '@/interfaces/order';
import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
export interface IEventCalendar {
    _id: string;
    id?: string;
    title: string;
    start: string;
    user: string;
    orderDetail: any;
}
export const mapEventCalendar = (eventCalendar: IOrder, index: number): IEventCalendar => {
    const dayjs = require('dayjs');
    const utc = require('dayjs/plugin/utc');
    dayjs.extend(utc);
    return {
        _id: (index + 1).toString(),
        title: eventCalendar?.garage?.name || '',
        start: dayjs.utc(eventCalendar?.arrivalTime).format('YYYY-MM-DD HH:mm:ss'),
        user: '',
        orderDetail: eventCalendar,
    };
};

export const mapArrayEventCalendar = (listEventsCalendar: any) => {
    const listEventsCalendarFormated = listEventsCalendar?.map((eventCalendar: IOrder, index: number) =>
        mapEventCalendar(eventCalendar, index),
    );
    return listEventsCalendarFormated;
};
