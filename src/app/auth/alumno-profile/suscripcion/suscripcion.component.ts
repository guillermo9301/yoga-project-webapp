import { Component, OnInit } from '@angular/core';
import { Paquete } from 'src/app/core/interfaces/paquete';
import { SuscriptionDTO } from 'src/app/core/interfaces/SuscriptionDTO';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { SuscriptionService } from 'src/app/core/services/suscription.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {

  isLoggedIn?: boolean
  userPaquete?: Paquete
  suscriptionStatus?: string
  userData?: User
  userId?: number
  suscriptionStatusIcon?: string
  suscriptionFechaInicio?: string
  suscriptionFechaFin?: string
  hasSuscription?: boolean

  constructor(private suscriptionService: SuscriptionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe({
      next: (value: boolean) => {
        this.isLoggedIn = value
        if (this.isLoggedIn) {
          this.authService.userData.subscribe({
            next: (data: User) => {
              this.userData = data
              this.userId = data.id
              this.getSuscriptionPackage(this.userId)
            }
          })
        }
      }
    })

  }

  getSuscriptionPackage(userId: number) {
    this.suscriptionService.getAlumnoSuscription(userId).subscribe({
      next: (value: any) => {
        this.hasSuscription = true
        this.userPaquete = value.paquete
        this.suscriptionFechaInicio = this.formatDate(value.fechaInicio)
        this.suscriptionFechaFin = this.formatDate(value.fechaFin)

        if (value.estado == 'ACTIVA') {
          this.suscriptionStatusIcon = 'assets/images/check-green-small.png'
          this.suscriptionStatus = "Activa"
        } else {
          this.suscriptionStatusIcon = 'assets/images/sub-expired.png'
          this.suscriptionStatus = "Expirada"
        }

      },
      error: (err: any) => {
        console.error(err)
        this.hasSuscription = false
      }
    })
  }

  private formatDate(date: string): string {
    return format(new Date(date), 'dd/MM/yyyy');
  }


}
