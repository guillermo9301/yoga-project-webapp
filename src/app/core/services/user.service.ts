import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { User } from "../interfaces/user";
import { environment } from "src/environments/environment";
import { addUsuarioRequest, Usuario } from "../interfaces/users-list";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private collection = 'user'

    constructor(private http: HttpClient) {

    }

    getUser(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(environment.url + this.collection + "/" + id).pipe(
            catchError(this.handlerError)
        )
    }

    getAllUsers(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(environment.url + this.collection).pipe(
            catchError(this.handlerError)
        )
    }

    updateUser(id: number, data: Usuario): Observable<Usuario> {
        console.log('ID que recibe el servicio: ' + id)
        console.log('Data que recibe el servicio: ' + JSON.stringify(data))
        return this.http.put<Usuario>(environment.url + this.collection + "/" + id, data).pipe(
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

    addUser(data: addUsuarioRequest): Observable<Usuario> {
        return this.http.post<Usuario>(environment.url + this.collection + "/addUser", data)
    }

    getRoles(){
        return this.http.get(environment.url + this.collection + "/allRoles")
    }
}