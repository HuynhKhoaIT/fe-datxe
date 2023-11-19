import { ICustomerCare } from '@/interfaces/customerCare';

export interface IEventCalendar {
    _id: string;
    id?: string;
    title: string;
    // end: string;
    start: string;
    user: string;
}

export const mapEventCalendar = (eventCalendar: ICustomerCare) => ({
    ...eventCalendar,
    title: eventCalendar?.description,
    start: eventCalendar?.arrival_time,
    // id: eventCalendar?._id,
});

export const mapArrayEventCalendar = (listEventsCalendar: any) => {
    const listEventsCalendarFormated = listEventsCalendar?.map((eventCalendar: ICustomerCare) =>
        mapEventCalendar(eventCalendar),
    );

    return listEventsCalendarFormated;
};
