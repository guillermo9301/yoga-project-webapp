import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/core/interfaces/eventDTO';
import { User } from 'src/app/core/interfaces/user';
import { Usuario } from 'src/app/core/interfaces/users-list';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent {
  evento!: Evento
  alumnos: Usuario[] = []

  selectedAlumno: any = null;
  eventId!: number;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = +params['id']
      this.getEvento(this.eventId)

    })

  }

  selectAlumno(alumno: any): void {
    this.selectedAlumno = alumno;
  }

  getEvento(eventId: number) {
    this.eventService.getEventById(eventId).subscribe({
      next: (data: Evento) => {
        this.evento = data
        console.log("evento: ", this.evento)
        this.alumnos = this.evento.alumnos
      }
    })
  }
}
