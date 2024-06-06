import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridWeek from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    events: [
      {
       
        daysOfWeek: [ '1' ],
        startTime: '06:00:00',
        endTime: '07:00:00',
        color: '#F279BC'
      },
      {
       
        daysOfWeek: [ '1' ],
        startTime: '07:00:00',
        endTime: '08:00:00'
      },
      {
        daysOfWeek: [ '2' ], // these recurrent events move separately
        startTime: '11:00:00',
        endTime: '11:30:00',
        color: 'red'
      }
    ],
    editable: true
  };

}
