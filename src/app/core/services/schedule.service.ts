import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookRequest } from "../interfaces/bookRequest";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class ScheduleService {

    private collection = 'schedule'

    constructor(private http: HttpClient) {

    }

    createOrUpdateSchedule(data: BookRequest): Observable<any> {
        return this.http.post(environment.url + this.collection + '/book', data)
    }

    getSchedule(id: number): Observable<any> {
        return this.http.get(environment.url + this.collection + '/' + id)
    }

    listUserSchedule(id: number): Observable<any> {
        return this.http.get(environment.url + this.collection + '/alumno/' + id)
    }

    updateSchedule(data: any): Observable<any> {
        return this.http.put(environment.url + this.collection + '/update', data)
    }
}