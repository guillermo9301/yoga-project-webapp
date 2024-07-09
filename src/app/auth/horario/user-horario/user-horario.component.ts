import { Component, OnInit } from '@angular/core';
import { RemoveAlumnoRequest } from 'src/app/core/interfaces/eventDTO';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-horario',
  templateUrl: './user-horario.component.html',
  styleUrls: ['./user-horario.component.css']
})
export class UserHorarioComponent {

  userLoginOn?: boolean
  userData?: User
  userHorarios?: any[] = []
  reservaData!: RemoveAlumnoRequest;

  constructor(private authService: AuthService, private eventService: EventService) {
    this.authService.currentUserLoginOn.subscribe({
      next: (loginOn) => {
        this.userLoginOn = loginOn
        console.log("Logueado?? " + this.userLoginOn)
      }
    })

    this.authService.currentUserData.subscribe({
      next: (data) => {
        this.userData = data
        console.log("User Data" + this.userData)
        this.reservaData = { alumnoId: this.userData?.id!, eventId: 0 };
        this.listarHorario(this.userData.id)
      }
    })
  }


  listarHorario(id: number) {
    this.eventService.listAlumnoEvents(id).subscribe({
      next: (horarios) => {
        this.userHorarios = horarios
        console.log(this.userHorarios)
      }
    })
  }

  eliminarReserva(eventId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaData.eventId = eventId
        this.eventService.removeAlumno(this.reservaData).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminada!',
              'Se eliminó la reserva',
              'success'
            )
            this.listarHorario(this.userData?.id!)
          },
          error: (err) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar la reserva',
              'error'
            )
            console.error("Ocurrio un error: " + err)
          }
        })
      }
    })
  }
}
