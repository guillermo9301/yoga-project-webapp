import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { SuscriptionService } from 'src/app/core/services/suscription.service';
import { format } from 'date-fns';
import { UserService } from 'src/app/core/services/user.service';
import { UsuarioDTO } from 'src/app/core/interfaces/users-list';
import { SuscriptionDTO } from 'src/app/core/interfaces/SuscriptionDTO';
import { Paquete } from 'src/app/core/interfaces/paquete';

@Component({
  selector: 'app-alumno-profile',
  templateUrl: './alumno-profile.component.html',
  styleUrls: ['./alumno-profile.component.css']
})
export class AlumnoProfileComponent implements OnInit {

  activeTab: string = 'suscription';
  alumnoSuscription?: SuscriptionDTO;
  suscriptionPaquete?: Paquete;
  userData?: User
  alumnoData?: UsuarioDTO
  userId?: number
  userRegisterDate?: string
  suscriptionStatus?: string
  suscriptionStatusIcon?: string
  suscriptionClases?: number
  isLoggedIn?: boolean;

  constructor(private authService: AuthService, private suscriptionService: SuscriptionService, private userService: UserService) { }

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
              this.getAlumnoExtraData(this.userId)
              this.suscriptionService.getAlumnoSuscription(this.userId).subscribe({
                next: (value: SuscriptionDTO) => {
                  this.alumnoSuscription = value
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

  getAlumnoExtraData(id: number) {
    this.userService.getUser(id).subscribe({
      next: (data: UsuarioDTO) => {
        this.alumnoData = data
      }
    })
  }
}
