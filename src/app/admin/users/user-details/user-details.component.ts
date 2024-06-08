import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/interfaces/users-list';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup
  user: Usuario | undefined


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
      celular: ['', Validators.required],
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

  get celular() {
    return this.userForm.controls['celular']
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
    }

    if (this.userForm.dirty && this.userForm.valid) {
      this.dialogRef.close(this.userForm?.value)
      console.log(this.userForm.value)
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se actualizaron los datos correctamente'
      })
    }
  }
}
