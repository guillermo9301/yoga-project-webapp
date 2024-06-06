import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginRequest } from 'src/app/core/interfaces/loginRequest';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    //iconos fontawesome
    faEnvelope = faEnvelope
    faLock = faLock

    //validaciones con ReactiveForms
    loginForm = this.formBuilder.group({
        correo: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    })

    /*credentials = {
        correo: '',
        password: ''
    }*/

    constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }


    ngOnInit(): void {

    }

    get correo() {
        return this.loginForm.controls.correo
    }

    get password() {
        return this.loginForm.controls.password
    }

    login() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value as LoginRequest).subscribe({
                next: (userData) => {
                    console.log(userData)
                    if (userData.rol === 'ADMIN') {
                        this.router.navigate(['admin/home-admin'])
                    } else {
                        this.router.navigateByUrl('/')
                    }
                },
                error: (errorData) => {
                    console.log(errorData)
                },
                complete: () => {
                    console.info("Login completo")
                    this.loginForm.reset()
                }
            })



        } else {
            this.loginForm.markAllAsTouched()
            alert("Error al ingresar los datos")
        }

    }
}
