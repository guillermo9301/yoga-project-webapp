import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/core/interfaces/registerRequest';
import { addUsuarioRequest } from 'src/app/core/interfaces/users-list';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-nuevo-usuario',
    templateUrl: './nuevo-usuario.component.html',
    styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  listaDeRoles: string[]=[];

    usuario = {
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
        id_tipo_documento: ['', Validators.required],
        nro_documento: ['', Validators.required],
        celular: [''],
        rol: ['', Validators.required]
    })

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
                private userService: UserService) { }
    

    ngOnInit(): void {
        this.userService.getRoles().subscribe({
          next: (data:any) =>{
            this.listaDeRoles = data
            console.log(this.listaDeRoles)
          }
        })
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

    get rol() {
      return this.registerForm.controls.rol
    }


    onSubmit() {
        console.log(this.registerForm)
        if (this.registerForm.valid) {
            this.userService.addUser(this.registerForm.value as addUsuarioRequest).subscribe({
                next: (registerData) => {
                    console.log(registerData)
                },
                error: (errorData) => {
                    console.error(errorData)
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
                    this.router.navigateByUrl('/admin/users')
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
        this.router.navigate(['/admin/users']);
    }
}
