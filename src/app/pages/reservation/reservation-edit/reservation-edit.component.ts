import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRequest } from 'src/app/core/interfaces/bookRequest';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { TrialClassService } from 'src/app/core/services/trial-class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  day: string = '';
  startTime: string = '';
  endTime: string = '';
  userLoginOn?: boolean;
  userData?: User;
  reservationForm: any;
  date: string = '';

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private trialClassService: TrialClassService,
      private fb: FormBuilder) {
      this.reservationForm = this.fb.group({
          id_alumno: [''],
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
              this.setValues();
          }
      });
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
          this.day = params['day'] || '';
          this.startTime = params['start'] || '';
          this.endTime = params['end'] || '';
          this.date = params['date'] || ''
      });
  }

  private setValues(): void {
      if (this.userData) {
          this.reservationForm.controls['nombre'].setValue(this.userData.nombre);
          this.reservationForm.controls['correo'].setValue(this.userData.correo);
          this.reservationForm.controls['apellido_paterno'].setValue(this.userData.apellido_paterno);
          this.reservationForm.controls['apellido_materno'].setValue(this.userData.apellido_materno);
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

      const usuario = this.userData
      const payload = {
          fecha: this.date,
          hora_inicio: this.startTime,
          hora_fin: this.endTime,
          id_alumno: usuario?.id,
          nombre_alumno: usuario?.nombre,
          correo: usuario?.correo,
          apellido_paterno_alumno: usuario?.apellido_paterno,
          apellido_materno_alumno: usuario?.apellido_materno,
      }

      this.trialClassService.bookTrialClass(payload as BookRequest).subscribe({
          next: (response) => {
              //manejar estado de freetrial
              Swal.fire({
                  icon: "success",
                  title: "Éxito",
                  text: `Se realizó la reserva exitosamente para el dia ${response.fecha} a las ${response.hora_inicio}`
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
              this.router.navigate(['calendario'])
          }
      })
  }

  cancel() {
      this.router.navigate(['/calendario'])
  }
}
