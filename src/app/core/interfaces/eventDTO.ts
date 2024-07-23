import { Usuario } from "./users-list"


export interface CrearEventoRequest {
    mensaje: string,
    fechaInicio: string,
    horaInicio: string,
    horaFin: string,
    capacidad: number,
    cuposDisponibles: number,
    recurrente: boolean
}

export interface CrearEventoResponse {
    mensaje: string,
    fechaInicio: string,
    fechaFinRecurrencia: string,
    horaInicio: string,
    horaFin: string,
    recurrente: boolean
}
export interface EventoDTO {
    mensaje: string,
    fecha: string,
    horaInicio: string,
    horaFin: string,
    capacidad: number,
    cuposDisponibles: number,
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