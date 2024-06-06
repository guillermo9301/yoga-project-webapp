import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-registro-alumno',
    templateUrl: './registro-alumno.component.html',
    styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent implements OnInit {
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

    registerForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        apellido_paterno: ['', Validators.required],
        apellido_materno: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        fec_nacimiento: [''],
        tipo_documento: ['', Validators.required],
        nro_documento: ['', Validators.required],
        celular: ['']
    })

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }


    ngOnInit(): void {

    }

    get nombre() {
        return this.registerForm.controls.nombre
    }

    get apellido_paterno() {
        return this.registerForm.controls.apellido_paterno
    }

    get apellido_materno() {
        return this.registerForm.controls.apellido_materno
    }

    get correo() {
        return this.registerForm.controls.correo
    }

    get password() {
        return this.registerForm.controls.password
    }

    get fec_nacimiento() {
        return this.registerForm.controls.fec_nacimiento
    }

    get tipo_documento() {
        return this.registerForm.controls.tipo_documento
    }

    get nro_documento() {
        return this.registerForm.controls.nro_documento
    }

    get celular() {
        return this.registerForm.controls.celular
    }


    onSubmit() {
        if (this.registerForm.valid) {
            console.log("llamar al servicio de registrar alumno")
            // Muestra swettalert de exito
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Se realizó el registro exitosamente'
            })
            this.router.navigateByUrl('/')
            this.registerForm.reset()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: 'Ocurrió un error al registrar al usuario'
            })
            this.registerForm.markAllAsTouched()
        }

    }

    cancel() {
        this.router.navigate(['/']);
    }
}
