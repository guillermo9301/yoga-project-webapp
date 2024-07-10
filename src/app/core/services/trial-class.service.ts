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
        .pipe(
            catchError(this.handleError)
        );
    }

    listar(): Observable<any>{
        return this.http.get(environment.url + this.collection)
        .pipe(
            catchError(this.handleError)
        );
    }

    updateTrialClass(id: number, bookData: BookRequest): Observable<any> {
        return this.http.put(environment.url + this.collection + '/' + id, bookData)
        .pipe(
            catchError(this.handleError)
        );    
    }

 

    deleteTrialClass(id: number): Observable<any> {
        return this.http.delete(environment.url + this.collection + '/' + id)
        .pipe(
            catchError(this.handleError)
        );   
    }

    private handleError(error: HttpErrorResponse) {
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