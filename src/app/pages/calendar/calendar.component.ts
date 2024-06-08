import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridWeek from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(private router: Router) {}
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    events: [
      {
       
        daysOfWeek: [ '1' ],
        startTime: '06:00:00',
        endTime: '07:00:00',
        url: '/reserva'
      
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '07:00:00',
        endTime: '08:00:00'
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '08:00:00',
        endTime: '09:00:00'
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '09:00:00',
        endTime: '10:00:00'
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '18:00:00',
        endTime: '19:00:00'
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '19:00:00',
        endTime: '20:00:00'
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '20:00:00',
        endTime: '20:30:00'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '06:00:00',
        endTime: '07:00:00'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '07:00:00',
        endTime: '08:00:00'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '08:00:00',
        endTime: '09:00:00'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '09:00:00',
        endTime: '09:30:00'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '09:30:00',
        endTime: '10:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '18:00:00',
        endTime: '19:00:00'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '19:00:00',
        endTime: '20:00:00'
      },
      {
       
        daysOfWeek: [ '2' ],
        startTime: '20:00:00',
        endTime: '20:30:00'
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '06:00:00',
        endTime: '07:00:00',
      
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '07:00:00',
        endTime: '08:00:00'
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '08:00:00',
        endTime: '09:00:00'
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '09:00:00',
        endTime: '10:00:00'
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '18:00:00',
        endTime: '19:00:00'
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '19:00:00',
        endTime: '20:00:00'
      },
      {
       
        daysOfWeek: [ '3' ],
        startTime: '20:00:00',
        endTime: '20:30:00'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '06:00:00',
        endTime: '07:00:00'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '07:00:00',
        endTime: '08:00:00'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '08:00:00',
        endTime: '09:00:00'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '09:00:00',
        endTime: '09:30:00'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '09:30:00',
        endTime: '10:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '18:00:00',
        endTime: '19:00:00'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '19:00:00',
        endTime: '20:00:00'
      },
      {
       
        daysOfWeek: [ '4' ],
        startTime: '20:00:00',
        endTime: '20:30:00'
      },
      {
       
        daysOfWeek: [ '5' ],
        startTime: '06:00:00',
        endTime: '07:00:00',
      
      },
      {
       
        daysOfWeek: [ '5' ],
        startTime: '07:00:00',
        endTime: '08:00:00'
      },
      {
       
        daysOfWeek: [ '5' ],
        startTime: '08:00:00',
        endTime: '09:00:00'
      },
      {
       
        daysOfWeek: [ '5' ],
        startTime: '09:00:00',
        endTime: '10:00:00'
      },
      {
       
        daysOfWeek: [ '5' ],
        startTime: '10:00:00',
        endTime: '11:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '5' ],
        startTime: '11:00:00',
        endTime: '12:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '5' ],
        startTime: '19:00:00'
      },
     
    ],
    editable: true,
    eventClick: this.handleEventClick.bind(this)
  };

  handleEventClick(info: any) {
    if (info.event.url) {
      this.router.navigate([info.event.url]); // Usa el enrutador de Angular para la redirección
      info.jsEvent.preventDefault(); // Evita el comportamiento predeterminado
    }
  }

}
