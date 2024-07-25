import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioDTO } from 'src/app/core/interfaces/users-list';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    userForm: FormGroup
    user: UsuarioDTO | undefined


    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<UserDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService
    ) {
        this.userForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            apellido_paterno: ['', Validators.required],
            apellido_materno: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            id_tipo_documento: ['', [Validators.required]],
            nro_documento: ['', Validators.required],
            celular: ['', Validators.required],
            fec_nacimiento: ['', Validators.required],
            rol: ['', Validators.required]
        })
    }

    get nombre() {
        return this.userForm.controls['nombre']
    }

    get apellido_paterno() {
        return this.userForm.controls['apellido_paterno']
    }

    get apellido_materno() {
        return this.userForm.controls['apellido_materno']
    }

    get correo() {
        return this.userForm.controls['correo']
    }

    get id_tipo_documento() {
        return this.userForm.controls['id_tipo_documento']
    }

    get nro_documento() {
        return this.userForm.controls['nro_documento']
    }

    get celular() {
        return this.userForm.controls['celular']
    }

    get fec_nacimiento() {
        return this.userForm.controls['fec_nacimiento']
    }

    get rol() {
        return this.userForm.controls['rol']
    }

    ngOnInit(): void {
        this.userService.getUser(this.data.id).subscribe({
            next: (user) => {
                this.userForm?.patchValue(user)
            }
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    save(): void {
        if (this.userForm.invalid) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos correctamente'
            })
            return
        }

        if (this.userForm.valid) {
            this.userService.updateUser(this.data.id, this.userForm.value).subscribe({
                next: (updatedUser) => {
                    console.log(updatedUser)
                    this.dialogRef.close(updatedUser)
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Se actualizaron los datos correctamente'
                    })

                },
                error: (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al actualizar los datos'
                    })
                },
            })
        }
    }
}
