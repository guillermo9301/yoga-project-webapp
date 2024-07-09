import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddAlumnoRequest, Evento, EventoDTO, RemoveAlumnoRequest } from '../interfaces/eventDTO';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user';
import { Usuario } from '../interfaces/users-list';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private collection = 'event'
  userRole: string = "";

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.userData.subscribe({
      next: (user: any) => {
        this.userRole = user.rol
      }
    })
  }

  generateEventUrl(id: number): string {
    let url: string = ''
    switch (this.userRole) {
      case 'ADMIN':
        url = `admin/events/edit-evento?id=${id}`
        break;
      case 'INSTRUCTOR':
        url = ``
        break;
      case 'ALUMNO':
        url = `auth/horario/reserva-horario?eventId=${id}`
        break;
    }
    return url
  }

  createEvent(eventData: EventoDTO): Observable<EventoDTO> {
    return this.http.post<EventoDTO>(environment.url + this.collection + '/create', eventData)
  }

  getEventById(eventId: number): Observable<Evento> {
    return this.http.get<Evento>(environment.url + this.collection + "/" + eventId)
  }

  getAllEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(environment.url + this.collection)
  }

  updateEvent(eventId: number, eventData: EventoDTO): Observable<Evento> {
    return this.http.put<Evento>(environment.url + this.collection + '/update/' + eventId, eventData)
  }

  addAlumno(addRequest: AddAlumnoRequest): Observable<Evento> {
    return this.http.post<Evento>(environment.url + this.collection + '/addAlumno', addRequest)
  }

  listAlumnoEvents(alumnoId: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(environment.url + this.collection + '/alumno/' + alumnoId)
  }

  removeAlumno(removeRequest: RemoveAlumnoRequest): Observable<Evento> {
    return this.http.post<Evento>(`${environment.url}${this.collection}/removeAlumno`, removeRequest);
  }

  deleteEventById(eventId: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}${this.collection}/delete/${eventId}`);
  }
}
