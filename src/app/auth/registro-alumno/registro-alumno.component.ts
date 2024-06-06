import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-registro-alumno',
    templateUrl: './registro-alumno.component.html',
    styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent {
    alumno = {
        correo: '',
        password: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fec_nacimiento: '',
        id_tipo_documento: 1, // Asumiendo que es DNI
        nro_documento: '',
        celular: '',
        fecha_registro: ''
    };

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.authService.register(this.alumno).subscribe(
            response => {
                console.log('Registro exitoso', response);
                // Redirigir a otra página o mostrar un mensaje de éxito
                this.router.navigate(['/']);
            },
            error => {
                console.error('Error en el registro', error);
                // Mostrar un mensaje de error al usuario
            }
        );
    }
}
