import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EventService } from 'src/app/core/services/event.service';
import { Evento } from 'src/app/core/interfaces/eventDTO';

@Component({
    selector: 'app-horario',
    templateUrl: './horario.component.html',
    styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

    listOfEvents: EventInput[] = []
    calendarOptions: CalendarOptions;

    constructor(private router: Router, private eventService: EventService) {
        this.calendarOptions = {
            initialView: 'timeGridWeek',
            slotMinTime: '06:00:00',
            slotMaxTime: '22:00:00',
            allDaySlot: false,
            plugins: [
                timeGridPlugin,
                interactionPlugin,
            ],
            events: [],
            editable: true,
            eventClick: this.handleEventClick.bind(this)
        };
    }

    ngOnInit(): void {
        this.getEvents();
    }

    getEvents() {
        this.eventService.getAllEvents().subscribe({
            next: (events: Evento[]) => {
                this.listOfEvents = events.map(event => {
                    return {
                        id: event.id.toString(),
                        title: `Cupos: ${event.cuposDisponibles} de ${event.capacidad}`,
                        start: `${event.fecha}T${event.horaInicio}`,
                        end: `${event.fecha}T${event.horaFin}`,
                        url: this.eventService.generateEventUrl(event.id)
                    }
                })
                this.calendarOptions.events = this.listOfEvents

            },
            error: (err) => {
                console.error('Error al obtener eventos' + err)
            }
        })
    }

    handleEventClick(info: any) {
        if (info.event.url) {
            this.router.navigateByUrl(info.event.url);
            info.jsEvent.preventDefault();
        }
    }
}
