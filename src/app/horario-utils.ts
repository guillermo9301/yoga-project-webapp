import { EventInput } from '@fullcalendar/core';

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
    return `auth/horario/reserva-horario?day=${day}&start=${start}&end=${end}`;
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