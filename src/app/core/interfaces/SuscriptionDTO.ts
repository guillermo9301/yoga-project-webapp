import { Paquete } from "./paquete"
import { User } from "./user"

export interface SuscriptionDTO {
    id: number,
    fechaInicio: string,
    fechaFin: string,
    paquete: Paquete,
    estado: string
}

export interface Suscription {
    alumno: User,
    paquete: Paquete
}