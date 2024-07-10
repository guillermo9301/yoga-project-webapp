import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Paquete } from 'src/app/core/interfaces/paquete';
import { PaqueteService } from 'src/app/core/services/paquete.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-paquete',
  templateUrl: './edit-paquete.component.html',
  styleUrls: ['./edit-paquete.component.css']
})
export class EditPaqueteComponent implements OnInit {

  paqueteForm: FormGroup
  paquete: Paquete | undefined


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditPaqueteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paqueteService: PaqueteService
) {
    this.paqueteForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        precio: ['', Validators.required],
        cantidadDias: ['', Validators.required],
        cantidadClases: ['', Validators.required],
    })
}

get nombre() {
  return this.paqueteForm.controls['nombre']
}

get precio() {
  return this.paqueteForm.controls['precio']
}
get cantidadDias() {
  return this.paqueteForm.controls['cantidadDias']
}
get cantidadClases() {
  return this.paqueteForm.controls['cantidadClases']
}

ngOnInit(): void {
  this.paqueteService.getPaquete(this.data.id).subscribe({
      next: (paquete) => {
          this.paqueteForm?.patchValue(paquete)
      }
  })
}

onNoClick(): void {
  this.dialogRef.close();
}


save(): void {
  if (this.paqueteForm.invalid) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, completa todos los campos correctamente'
      })
      return
  }

  if (this.paqueteForm.valid) {
      this.paqueteService.updatePaquete(this.data.id, this.paqueteForm.value).subscribe({
          next: (updatedPaquete) => {
              console.log(updatedPaquete)
              this.dialogRef.close(updatedPaquete)
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
