import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/core/interfaces/registerRequest';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { minAgeValidator } from 'src/app/core/validators/minAgeValidator';
import * as moment from 'moment';

@Component({
    selector: 'app-registro-alumno',
    templateUrl: './registro-alumno.component.html',
    styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent implements OnInit {

    minDate: string;
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
        fec_nacimiento: ['', [Validators.required, minAgeValidator(12)]],
        id_tipo_documento: ['', Validators.required],
        nro_documento: ['', Validators.required],
        celular: ['']
    })

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
        const today = moment();
        this.minDate = today.subtract(12, 'years').format('YYYY-MM-DD');
    }


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
        return this.registerForm.controls.id_tipo_documento
    }

    get nro_documento() {
        return this.registerForm.controls.nro_documento
    }

    get celular() {
        return this.registerForm.controls.celular
    }


    onSubmit() {
        console.log(this.registerForm)
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
                next: (registerData) => {
                    console.log(registerData)
                },
                error: (errorData) => {
                    console.error(errorData)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el registro',
                        text: errorData.error
                    })
                },
                complete: () => {
                    // Muestra swettalert de exito
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'Se realizó el registro exitosamente'
                    })
                    console.info("Registro completo")
                    this.registerForm.reset()
                    this.router.navigateByUrl('/')
                },
            })
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
