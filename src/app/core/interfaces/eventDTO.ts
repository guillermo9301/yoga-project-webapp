import { Usuario } from "./users-list"

export interface EventoDTO {
    fecha: string,
    horaInicio: string,
    horaFin: string,
    capacidad: number,
    cuposDisponibles: number
}

export interface Evento {
    id: number,
    fecha: string,
    horaInicio: string,
    horaFin: string,
    capacidad: number,
    cuposDisponibles: number,
    alumnos: Usuario[]
}

export interface AddAlumnoRequest {
    eventId: number,
    alumnoId: number
}

export interface RemoveAlumnoRequest {
    eventId: number,
    alumnoId: number
}