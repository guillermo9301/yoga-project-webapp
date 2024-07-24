import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquete } from '../interfaces/paquete';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  private collection = 'paquete';

  constructor(private http: HttpClient) { }

  getPaquetes(): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(environment.url + this.collection);
  }

  getPaquete(id: number): Observable<Paquete> {
    return this.http.get<Paquete>(environment.url + this.collection + '/' + id);
  }

  createPaquete(paquete: Paquete): Observable<Paquete> {
    return this.http.post<Paquete>(environment.url + this.collection + '/nuevoPaquete', paquete);
  }

  updatePaquete(id: number, paquete: Paquete): Observable<Paquete> {
    return this.http.put<Paquete>(environment.url + this.collection + '/' + id, paquete);
  }

  /*
  deletePaquete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }*/
}

