import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { Evento } from 'src/app/core/interfaces/eventDTO';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    today: string = new Date().toISOString().replace(/T.*$/, '')
    userLogin?: boolean
    listOfEvents: EventInput[] = []
    calendarOptions: CalendarOptions;
    userData?: any

    constructor(
        private router: Router,
        private authService: AuthService,
        private eventService: EventService) {
        console.log('fecha de hoy: ' + this.today)
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

        this.authService.currentUserLoginOn.subscribe({
            next: (login) => {
                this.userLogin = login
            }
        })
        this.authService.currentUserData.subscribe({
            next: (data) => {
                this.userData = data
                console.log(this.userData.rol)
            }
        })

        this.getEvents()
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
        console.log(info.event.url)
        if (info.event.url) {
            this.router.navigateByUrl(info.event.url);
            info.jsEvent.preventDefault();
        }
    }

}
