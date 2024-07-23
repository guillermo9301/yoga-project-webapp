import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { SuscriptionService } from 'src/app/core/services/suscription.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-alumno-profile',
  templateUrl: './alumno-profile.component.html',
  styleUrls: ['./alumno-profile.component.css']
})
export class AlumnoProfileComponent implements OnInit {

  activeTab: string = 'suscription';
  suscriptionStatus?: string
  userData?: User
  userId?: number
  userRegisterDate?: string
  suscriptionStatusIcon?: string
  isLoggedIn?: boolean;

  constructor(private authService: AuthService, private suscriptionService: SuscriptionService) { }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe({
      next: (value: boolean) => {
        this.isLoggedIn = value
        if (this.isLoggedIn) {
          this.authService.userData.subscribe({
            next: (data: User) => {
              this.userData = data
              this.userId = data.id
              this.userRegisterDate = this.formatDate(data.fecha_registro)
              this.suscriptionService.getAlumnoSuscription(this.userId).subscribe({
                next: (value: any) => {
                  this.suscriptionStatus = value.estado
                },
                error: (err) => {
                  this.suscriptionStatus = "No tiene"
                }
              })
            }
          })
        }
      }
    })
  }

  private formatDate(date: string): string {
    return format(new Date(date), 'dd/MM/yyyy');
  }
}
