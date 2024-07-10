import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquete } from '../interfaces/paquete';


@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  private apiUrl = 'http://localhost:8080/api/paquete';

  constructor(private http: HttpClient) { }

  getPaquetes(): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(this.apiUrl);
  }

  getPaquete(id: number): Observable<Paquete> {
    return this.http.get<Paquete>(`${this.apiUrl}/${id}`);
  }

  createPaquete(paquete: Paquete): Observable<Paquete> {
    return this.http.post<Paquete>(`${this.apiUrl}/nuevoPaquete`, paquete);
  }

  updatePaquete(id: number, paquete: Paquete): Observable<Paquete> {
    return this.http.put<Paquete>(`${this.apiUrl}/${id}`, paquete);
  }

  deletePaquete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
