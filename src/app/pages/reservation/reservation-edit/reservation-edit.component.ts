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
  reservationId?: number;

    trialClass: any;

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
          hora_inicio: ['', Validators.required],
          hora_fin: ['', Validators.required],
          fecha: ['', Validators.required],
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

    this.setValues()
    

    
        
}

  private setValues(): void {
      if (this.userData) {
          this.reservationForm.controls['nombre'].setValue(this.userData.nombre);
          this.reservationForm.controls['correo'].setValue(this.userData.correo);
          this.reservationForm.controls['apellido_paterno'].setValue(this.userData.apellido_paterno);
          this.reservationForm.controls['apellido_materno'].setValue(this.userData.apellido_materno);
          this.trialClassService.listar().subscribe({
            next: (data) => {
              this.trialClass = data
              console.log(data)
              this.reservationId = this.trialClass[0].id
              this.reservationForm.patchValue(
                
                {
                    hora_inicio: this.trialClass[0].hora_inicio,
                    hora_fin:this.trialClass[0].hora_fin,
                    fecha: this.trialClass[0].fecha,

                }
            )
            },
            error: (error) => {
              console.error('Error fetching users', error);
            }
          })
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
          fecha: this.reservationForm.value.fecha,
          hora_inicio: this.reservationForm.value.hora_inicio,
          hora_fin: this.reservationForm.value.hora_fin,
          id_alumno: usuario?.id,
          nombre_alumno: usuario?.nombre,
          correo: usuario?.correo,
          apellido_paterno_alumno: usuario?.apellido_paterno,
          apellido_materno_alumno: usuario?.apellido_materno,
      }

        this.trialClassService.listar().subscribe({


            next: (value) => {


                this.trialClassService.updateTrialClass( value[0].id, payload as BookRequest).subscribe({

                
                    next: (response) => {
                       
                        Swal.fire({
                            icon: "success",
                            title: "Éxito",
                            text: `Se actualizó la reserva exitosamente para el día ${response.fecha} a las ${response.hora_inicio}`
                        })
                    },
                    error: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ocurrió un error durante la actualización"
                        })
                        console.error(err)
                    },
                    complete: () => {
                        this.router.navigate(['calendario'])
                        console.log(payload)
                    }
                });
            }



        })
        
    
  }

  cancel() {
      this.router.navigate(['/calendario'])
  }

 
}
 

