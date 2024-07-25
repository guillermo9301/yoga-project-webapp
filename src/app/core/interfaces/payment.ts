import { UsuarioDTO } from "./users-list";

export interface Paquete {
  id: number;
  nombre: string;
  precio: number;
  cantidadClases: number;
  cantidadDias: number;
}

export interface Payment {
  id: number;
  celular: string;
  correo: string;
  cvc: string;
  expiracion: string;
  numTarjeta: string;
  titular: string;
  usuario: UsuarioDTO
}

export interface PaymentRequest {
  correo: string;
  celular: string;
  numTarjeta: string;
  expiracion: string;
  cvc: string;
  titular: string;
  alumnoId: number;
  paqueteId: number
}

