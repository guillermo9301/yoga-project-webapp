import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookRequest } from "../interfaces/bookRequest";
import { Observable, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TrialClassService {

    private collection = 'trial_class'

    constructor(private http: HttpClient) { }

    bookTrialClass(bookData: BookRequest): Observable<any> {
        return this.http.post(environment.url + this.collection + '/book', bookData)
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