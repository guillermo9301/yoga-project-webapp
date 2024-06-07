import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';


    constructor(private router: Router, private authService: AuthService) {

    }

    login() {
        this.authService.login(
            {
                email: this.email,
                password: this.password
            }
        ).subscribe(response => {
            this.authService.setToken(response.token)
            this.router.navigate(['/']);
        },
            error => {
                console.error('Error de autenticacion', error)
            }
        ),




            this.router.navigate(['/'])
    }
}
