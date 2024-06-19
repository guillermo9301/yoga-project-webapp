import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleUpdateRequest } from 'src/app/core/interfaces/scheduleUpdateRequest';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.css']
})
export class EditarHorarioComponent implements OnInit {
  scheduleForm: any;
  userLoginOn?: boolean;
  userData?: User;
  idSchedule: number = 0
  scheduleData?: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private fb: FormBuilder
  ) {
    this.scheduleForm = this.fb.group({
      id_alumno: [''],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      fecha: ['', Validators.required],
    })

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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idSchedule = +id;
      if (this.idSchedule > 0) {
        this.loadScheduleData();
      } else {
        console.error('ID de horario inválido.');
      }
    } else {
      console.error('ID de horario no proporcionado en la ruta.');
    }
  }



  private setValues(): void {
    if (this.userData) {
      this.scheduleForm.controls['nombre'].setValue(this.userData.nombre);
      this.scheduleForm.controls['correo'].setValue(this.userData.correo);
      this.scheduleForm.controls['apellido_paterno'].setValue(this.userData.apellido_paterno);
      this.scheduleForm.controls['apellido_materno'].setValue(this.userData.apellido_materno);
      this.scheduleService.getSchedule(this.idSchedule).subscribe({
        next: (scheduleData) => {
          this.scheduleData = scheduleData
          console.log(scheduleData)
          this.scheduleForm.patchValue({
            hora_inicio: this.scheduleData.horaInicio,
            hora_fin: this.scheduleData.horaFin,
            fecha: this.scheduleData.fecha
          })
        }
      })
    }
  }

  private loadScheduleData(): void {
    this.scheduleService.getSchedule(this.idSchedule).subscribe({
      next: (scheduleData) => {
        this.scheduleData = scheduleData;
        this.scheduleForm.patchValue({
          hora_inicio: this.scheduleData.horaInicio,
          hora_fin: this.scheduleData.horaFin,
          fecha: this.scheduleData.fecha
        });
      },
      error: (err) => {
        console.error('Error loading schedule data:', err);
      }
    });
  }

  onSubmit(): void {

    if (this.scheduleForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error durante la actualizacion"
      })
      return
    }

    if (this.scheduleForm.valid) {
      const updateRequest: ScheduleUpdateRequest = {
        id: this.idSchedule,
        fecha: this.scheduleForm.value.fecha,
        horaInicio: this.scheduleForm.value.hora_inicio,
        horaFin: this.scheduleForm.value.hora_fin
      };

      this.scheduleService.updateSchedule(updateRequest).subscribe({
        next: () => {
          console.log('Schedule updated successfully');
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: `Se actualizó la reserva para el dia ${updateRequest.fecha} a las ${updateRequest.horaInicio}`
          })
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error durante la actualización"
          })
          console.error('Error updating schedule:', err);
        },
        complete: () => {
          this.router.navigate(['auth/horario/mis-clases']);
        }
      });
    }
  }
}
