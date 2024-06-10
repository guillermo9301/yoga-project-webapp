import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest';
import { User } from '../interfaces/user';
import { RegisterRequest } from '../interfaces/registerRequest';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private collection = 'auth';

    currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
        token: '',
        nombre: '',
        apellido_paterno: '',
        correo: '',
        rol: ''
    })

    constructor(private http: HttpClient) {
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
            catchError(this.handlerError)
        )
    }

    register(data: RegisterRequest): Observable<any> {
        return this.http.post(environment.url + this.collection + '/register', data);
    }

    private handlerError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('Se ha producido un error ' + error.error)
        } else {
            console.error('Backend retorno el codigo de estado ' + error.status, error.error)
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
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userData');
        this.currentUserLoginOn.next(false);
        this.currentUserData.next({
            token: '',
            nombre: '',
            apellido_paterno: '',
            correo: '',
            rol: ''
        });
    }
}
