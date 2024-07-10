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
    paquete: Paquete;
  }
  
  