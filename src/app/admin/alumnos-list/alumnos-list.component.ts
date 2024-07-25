import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/core/interfaces/eventDTO';
import { UsuarioDTO } from 'src/app/core/interfaces/users-list';
import { EventService } from 'src/app/core/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent {
  evento!: Evento
  alumnos: UsuarioDTO[] = []

  eventId!: number;
  selectedAlumnos: Set<number> = new Set<number>();

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = +params['id']
      this.getEvento(this.eventId)

    })

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

  toggleAttendance(alumnoId: number, event: any): void {
    if (event.target.checked) {
      this.selectedAlumnos.add(alumnoId);
    } else {
      this.selectedAlumnos.delete(alumnoId);
    }
  }

  saveAttendance(): void {
    const selectedIds = Array.from(this.selectedAlumnos);
    console.log(selectedIds)
    this.eventService.registrarAsistencia(this.eventId, selectedIds).subscribe({
      next: () => {
        this.router.navigate(['/calendario'])
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Se guardó la asistencia exitosamente',

        })
        console.log('Asistencia guardada exitosamente');
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error
        })
        console.error('Error al guardar la asistencia', err);
      }
    });
  }
}
