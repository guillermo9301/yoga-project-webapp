import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest';
import { User } from '../interfaces/user';
import { RegisterRequest } from '../interfaces/registerRequest';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';
    currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
        token: '',
        nombre: '',
        apellido_paterno: '',
        correo: '',
        rol: ''
    })

    constructor(private http: HttpClient) {
        /*
        let storedUser = localStorage.getItem('currentUser');
        try {
            storedUser = storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Error parsing currentUser from localStorage:', error);
            storedUser = null;
            localStorage.removeItem('currentUser'); // Limpia el localStorage si hay un error
        }
        this.currentUserSubject = new BehaviorSubject<any>(storedUser);*/
    }

    login(credentials: LoginRequest): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
            tap((userData: User) => {
                this.currentUserData.next(userData)
                this.currentUserLoginOn.next(true)
            }),
            catchError(this.handlerError)
        )
    }

    register(data: RegisterRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
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
    /*setCurrentUser(user: any): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        console.log(localStorage.getItem('currentUser'))
    }*/

    // Método para almacenar el token en el almacenamiento local
    setToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    // Método para obtener el token desde el almacenamiento local
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    // Método para eliminar el token (logout)
    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
    }

    // Método para verificar si el usuario está autenticado
    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }
}
