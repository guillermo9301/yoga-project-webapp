import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { Router } from '@angular/router';
import { INITIAL_EVENTS } from 'src/app/event-utils';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
    today: string = new Date().toISOString().replace(/T.*$/, '')

    constructor(private router: Router) {
        console.log('fecha de hoy: ' + this.today)
    }

    calendarOptions: CalendarOptions = {
        initialView: 'timeGridWeek',
        slotMinTime: '06:00:00',
        slotMaxTime: '22:00:00',
        allDaySlot: false,
        plugins: [
            timeGridPlugin,
            interactionPlugin,
        ],
        events: INITIAL_EVENTS,
        editable: true,
        eventClick: this.handleEventClick.bind(this)
    };

    handleEventClick(info: any) {
        if (info.event.url) {
            const eventDate = info.event.start.toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD
            const urlWithDate = `${info.event.url}&date=${eventDate}`;
            this.router.navigateByUrl(urlWithDate); // Usa navigateByUrl para pasar la URL con parámetros
            info.jsEvent.preventDefault(); // Evita el comportamiento predeterminado
        }
    }

}
