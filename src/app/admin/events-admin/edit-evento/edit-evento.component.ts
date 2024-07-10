import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoDTO } from 'src/app/core/interfaces/eventDTO';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-evento',
  templateUrl: './edit-evento.component.html',
  styleUrls: ['./edit-evento.component.css']
})
export class EditEventoComponent implements OnInit {
  editEventForm: FormGroup
  userLoginOn?: boolean
  userData?: User;
  eventId!: number;
  eventData?: EventoDTO;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.editEventForm = this.fb.group({
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      capacidad: ['', Validators.required]
    })

    this.authService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.authService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = +params['id']
      this.eventService.getEventById(this.eventId).subscribe({
        next: (data: EventoDTO) => {
          this.editEventForm.patchValue(data)
        }
      })
    })
  }

  save() {
    if (this.editEventForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente'
      })
      return
    }

    if (this.editEventForm.valid) {
      this.eventService.updateEvent(this.eventId, this.editEventForm.value as EventoDTO).subscribe({
        next: (updatedEvent) => {
          console.log(updatedEvent)
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `Se actualizó el evenbto con id: ${updatedEvent.id} correctamente`
          })
        },
        error: (error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar los datos'
          })
        },
        complete: () => {
          this.router.navigate(['admin/events'])
          this.editEventForm.reset()
        }
      })
    }
  }

  cancel() {
    this.router.navigate(['admin/events'])
    this.editEventForm.reset()
  }


}
