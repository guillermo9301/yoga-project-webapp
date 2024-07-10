import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Suscription, SuscriptionDTO } from '../interfaces/SuscriptionDTO'
import { updateSuscriptionReq } from '../interfaces/updateSuscriptionReq';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {

  private collection = 'suscripcion'

  constructor(private http: HttpClient) { }

  createSuscription(suscripcion: Suscription): Observable<SuscriptionDTO> {
    return this.http.post<SuscriptionDTO>(environment.url + this.collection + '/nueva', suscripcion)
  }

  getAlumnoSuscription(alumnoId: number): Observable<SuscriptionDTO> {
    return this.http.get<SuscriptionDTO>(environment.url + this.collection + '/' + alumnoId)
  }

}
