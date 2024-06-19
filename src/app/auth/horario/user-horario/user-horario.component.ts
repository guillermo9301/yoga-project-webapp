import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';

@Component({
  selector: 'app-user-horario',
  templateUrl: './user-horario.component.html',
  styleUrls: ['./user-horario.component.css']
})
export class UserHorarioComponent {

  userLoginOn?: boolean
  userData?: User
  userHorarios?: any[] = []

  constructor(private authService: AuthService, private scheduleService: ScheduleService) {
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
        this.listarHorario(this.userData.id)
      }
    })
  }


  listarHorario(id: number) {
    this.scheduleService.listUserSchedule(id).subscribe({
      next: (horarios) => {
        this.userHorarios = horarios
        console.log(this.userHorarios)
      }
    })
  }
}
