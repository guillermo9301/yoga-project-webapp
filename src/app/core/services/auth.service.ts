import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest';
import { User } from '../interfaces/user';
import { RegisterRequest } from '../interfaces/registerRequest';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private collection = 'auth';

    currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
        token: '',
        id: 0,
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        correo: '',
        rol: '',
        fecha_registro: ''
    })

    constructor(private http: HttpClient, private router: Router) {
        const userData = sessionStorage.getItem("userData")
        this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null)
        if (userData) {
            this.currentUserData = new BehaviorSubject<User>(JSON.parse(userData))
        }
    }

    login(credentials: LoginRequest): Observable<User> {
        return this.http.post<User>(environment.url + this.collection + '/login', credentials).pipe(
            tap((userData: User) => {
                sessionStorage.setItem("token", userData.token)
                sessionStorage.setItem("userData", JSON.stringify(userData))
                this.currentUserData.next(userData)
                this.currentUserLoginOn.next(true)
            }),
            catchError(this.loginHandlerError)
        )
    }

    register(data: RegisterRequest): Observable<any> {
        return this.http.post(environment.url + this.collection + '/register', data);
    }

    private loginHandlerError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('Se ha producido un error ' + error.error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error, por favor intente de nuevo"
            })
        } else {
            console.error('Backend retorno el codigo de estado ' + error.status, error.error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Credenciales erróneas"
            })
        }
        return throwError(() => {
            new Error('Algo falló, porfavor intente nuevamente')
        })
    }

    get userData(): Observable<User> {
        return this.currentUserData.asObservable()
    }

    get userLoginOn(): Observable<boolean> {
        return this.currentUserLoginOn.asObservable()
    }

    get userToken(): string {
        return this.currentUserData.value.token
    }


    logout(): void {
        Swal.fire({
            icon: 'question',
            title: "Cerrar sesión",
            text: "¿Seguro que quiere cerrar sesión?",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userData');
                this.currentUserLoginOn.next(false);
                this.currentUserData.next({
                    token: '',
                    id: 0,
                    nombre: '',
                    apellido_paterno: '',
                    apellido_materno: '',
                    correo: '',
                    rol: '',
                    fecha_registro: ''
                });
                this.router.navigateByUrl("/")
            }
        })
    }
}
