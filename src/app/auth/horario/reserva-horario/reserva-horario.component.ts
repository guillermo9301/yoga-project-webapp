import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRequest } from 'src/app/core/interfaces/bookRequest';
import { AddAlumnoRequest, Evento, EventoDTO } from 'src/app/core/interfaces/eventDTO';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva-horario',
  templateUrl: './reserva-horario.component.html',
  styleUrls: ['./reserva-horario.component.css']
})
export class ReservaHorarioComponent {
  userLoginOn?: boolean;
  userData?: User;
  reservationForm: any;
  idEvento!: number
  eventData?: Evento

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private eventService: EventService,
    private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      fecha: [''],
      horaInicio: [''],
      horaFin: [''],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
    });

    this.authService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.authService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
        this.setUserValues();
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idEvento = params['eventId']

      this.eventService.getEventById(this.idEvento).subscribe({
        next: (data: Evento) => {
          this.eventData = data
          this.setEventValues()
        }
      })
    });
  }

  private setUserValues(): void {
    if (this.userData) {
      this.reservationForm.controls['nombre'].setValue(this.userData.nombre);
      this.reservationForm.controls['correo'].setValue(this.userData.correo);
      this.reservationForm.controls['apellido_paterno'].setValue(this.userData.apellido_paterno);
      this.reservationForm.controls['apellido_materno'].setValue(this.userData.apellido_materno);
    }
  }

  private setEventValues(): void {
    if (this.eventData) {
      this.reservationForm.controls['fecha'].setValue(this.eventData.fecha);
      this.reservationForm.controls['horaInicio'].setValue(this.eventData.horaInicio)
      this.reservationForm.controls['horaFin'].setValue(this.eventData.horaFin)
      //TODO: mostrar cupos libres
    }
  }
  onSubmit() {
    if (this.reservationForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error durante la reserva"
      })
      return
    }

    const payload = {
      eventId: this.eventData?.id,
      alumnoId: this.userData?.id
    }

    console.log("payload" + payload)


    this.eventService.addAlumno(payload as AddAlumnoRequest).subscribe({
      next: (response) => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: `Se realizó la reserva exitosamente para el dia ${response.fecha}`
        })
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error durante la reserva"
        })
        console.error(err)
      },
      complete: () => {
        this.router.navigate(['auth/horario'])
      }
    })
  }

  cancel() {
    this.router.navigate(['auth/horario'])
  }
}
