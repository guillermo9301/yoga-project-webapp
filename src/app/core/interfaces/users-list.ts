export interface Authority {
    authority: string;
}

export interface UsuarioDTO {
    id: number;
    correo: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    fec_nacimiento: string;
    id_tipo_documento: number;
    nro_documento: string;
    celular: string;
    fecha_registro: string | null;
    rol: string;
    clasesAsistidas: number;
    inscripciones: number;
    enabled: boolean;
    accountNonLocked: boolean;
    username: string;
    authorities: Authority[];
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
}

export interface addUsuarioRequest {
    correo: string;
    password: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    fec_nacimiento: string;
    id_tipo_documento: string;
    nro_documento: string;
    celular: string;
    rol: string;
}
