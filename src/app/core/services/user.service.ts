import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { User } from "../interfaces/user";
import { environment } from "src/environments/environment";
import { Usuario } from "../interfaces/users-list";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

    }

    getUser(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(environment.url + "user/" + id).pipe(
            catchError(this.handlerError)
        )
    }

    getAllUsers(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(environment.url + "user").pipe(
            catchError(this.handlerError)
        )
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
}