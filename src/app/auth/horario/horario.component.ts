import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from 'src/app/horario-utils';

@Component({
    selector: 'app-horario',
    templateUrl: './horario.component.html',
    styleUrls: ['./horario.component.css']
})
export class HorarioComponent {

    constructor(private router: Router) { }

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
