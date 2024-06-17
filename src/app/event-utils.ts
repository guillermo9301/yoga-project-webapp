import { EventInput } from '@fullcalendar/core';


const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

function createEvents(days: string[], times: { start: string, end: string, color?: string }[]): EventInput[] {
    const events: EventInput[] = [];

    days.forEach(day => {
        times.forEach(time => {
            const event: EventInput = {
                daysOfWeek: [day],
                startTime: time.start,
                endTime: time.end,
                url: generateEventUrl(day, time.start, time.end)
            };

            if (time.color) {
                event.color = time.color;
            }

            events.push(event);
        });
    });

    return events;
}

function generateEventUrl(day: string, start: string, end: string): string {
    return `/reserva?day=${day}&start=${start}&end=${end}`;
}

const days = ['1', '2', '3', '4', '5']; // Lunes a Viernes
const times = [
    { start: '06:00:00', end: '07:00:00' },
    { start: '07:00:00', end: '08:00:00' },
    { start: '08:00:00', end: '09:00:00' },
    { start: '09:00:00', end: '10:00:00' },
    { start: '10:00:00', end: '11:00:00', color: '#F279BC' },
    { start: '11:00:00', end: '12:00:00', color: '#F279BC' },
    { start: '18:00:00', end: '19:00:00' },
    { start: '19:00:00', end: '20:00:00' },
    { start: '20:00:00', end: '20:30:00' },
];

export const INITIAL_EVENTS: EventInput[] = createEvents(days, times);


/*
export const INITIAL_EVENTS: EventInput[] = [
    {

        daysOfWeek: ['1'],
        startTime: '06:00:00',
        endTime: '07:00:00',
        url: '/reserva?day=Lunes&start=06:00am&end=07:00am'

    },
    {

        daysOfWeek: ['1'],
        startTime: '07:00:00',
        endTime: '08:00:00',
        url: '/reserva?day=Lunes&start=07:00am&end=08:00am'
    },
    {

        daysOfWeek: ['1'],
        startTime: '08:00:00',
        endTime: '09:00:00',
        url: '/reserva?day=Lunes&start=08:00am&end=09:00am'
    },
    {

        daysOfWeek: ['1'],
        startTime: '09:00:00',
        endTime: '10:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['1'],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['1'],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['1'],
        startTime: '18:00:00',
        endTime: '19:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['1'],
        startTime: '19:00:00',
        endTime: '20:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['1'],
        startTime: '20:00:00',
        endTime: '20:30:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '06:00:00',
        endTime: '07:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '07:00:00',
        endTime: '08:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '08:00:00',
        endTime: '09:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '09:00:00',
        endTime: '09:30:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '09:30:00',
        endTime: '10:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '18:00:00',
        endTime: '19:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '19:00:00',
        endTime: '20:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['2'],
        startTime: '20:00:00',
        endTime: '20:30:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['3'],
        startTime: '06:00:00',
        endTime: '07:00:00',
        url: '/reserva'

    },
    {

        daysOfWeek: ['3'],
        startTime: '07:00:00',
        endTime: '08:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['3'],
        startTime: '08:00:00',
        endTime: '09:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['3'],
        startTime: '09:00:00',
        endTime: '10:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['3'],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['3'],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['3'],
        startTime: '18:00:00',
        endTime: '19:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['3'],
        startTime: '19:00:00',
        endTime: '20:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['3'],
        startTime: '20:00:00',
        endTime: '20:30:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '06:00:00',
        endTime: '07:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '07:00:00',
        endTime: '08:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '08:00:00',
        endTime: '09:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '09:00:00',
        endTime: '09:30:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '09:30:00',
        endTime: '10:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '18:00:00',
        endTime: '19:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '19:00:00',
        endTime: '20:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['4'],
        startTime: '20:00:00',
        endTime: '20:30:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['5'],
        startTime: '06:00:00',
        endTime: '07:00:00',
        url: '/reserva'

    },
    {

        daysOfWeek: ['5'],
        startTime: '07:00:00',
        endTime: '08:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['5'],
        startTime: '08:00:00',
        endTime: '09:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['5'],
        startTime: '09:00:00',
        endTime: '10:00:00',
        url: '/reserva'
    },
    {

        daysOfWeek: ['5'],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['5'],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC',
        url: '/reserva'
    },
    {

        daysOfWeek: ['5'],
        startTime: '19:00:00',
        url: '/reserva'
    },

]
*/
