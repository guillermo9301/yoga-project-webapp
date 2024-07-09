import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-clases',
    templateUrl: './clases.component.html',
    styleUrls: ['./clases.component.css']
})
export class ClasesComponent {
    userLoginOn?: boolean

    constructor(private router: Router, private authService: AuthService) {
        this.authService.currentUserLoginOn.subscribe({
            next: (loginOn) => {
                this.userLoginOn = loginOn
            },
        })
    }

    openHorarios() {
        if (this.userLoginOn == true) {
            this.router.navigate(['auth/horario'])
        } else {
            this.router.navigate(['auth/login'])
        }
    }

    setPrice(price: number) {
        localStorage.setItem('selectedPrice', price.toString());
        this.router.navigate(['/pago']);
    }

}
