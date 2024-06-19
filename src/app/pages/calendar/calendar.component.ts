import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { Router } from '@angular/router';
import { INITIAL_EVENTS } from 'src/app/event-utils';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    today: string = new Date().toISOString().replace(/T.*$/, '')
    userLogin?: boolean

    constructor(private router: Router, private authService: AuthService) {
        console.log('fecha de hoy: ' + this.today)
    }

    ngOnInit(): void {
        this.authService.currentUserLoginOn.subscribe({
            next: (login) => {
                this.userLogin = login
            }
        })
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
        if (this.userLogin) {
            if (info.event.url) {
                const eventDate = info.event.start.toISOString().split('T')[0];
                const urlWithDate = `${info.event.url}&date=${eventDate}`;
                this.router.navigateByUrl(urlWithDate);
                info.jsEvent.preventDefault();
            }
        } else {
            this.router.navigateByUrl("auth/login")
            info.jsEvent.preventDefault();
        }
    }

}
