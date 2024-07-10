import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paquete } from 'src/app/core/interfaces/paquete';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaqueteService } from 'src/app/core/services/paquete.service';

@Component({
    selector: 'app-clases',
    templateUrl: './clases.component.html',
    styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {
    userLoginOn?: boolean;
    paquetes: Paquete[] = [];

    constructor(private router: Router, private authService: AuthService,
        private paqueteService: PaqueteService) {
        this.authService.currentUserLoginOn.subscribe({
            next: (loginOn) => {
                this.userLoginOn = loginOn
            },
        })
    }

    ngOnInit(): void {
        this.loadPaquetes();
      }

      loadPaquetes() {
        this.paqueteService.getPaquetes().subscribe({
          next: (paquetes) => {
            this.paquetes = paquetes;
          },
          error: (err) => {
            console.error('Error fetching paquetes', err);
          }
        });
      }

    openHorarios() {
        if (this.userLoginOn == true) {
            this.router.navigate(['auth/horario'])
        } else {
            this.router.navigate(['auth/login'])
        }
    }

    
    setPagoporID(paqueteId: number): void {
        this.router.navigate(['/pago', paqueteId]);
      }

}
