import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paquete } from 'src/app/core/interfaces/paquete';

import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaqueteService } from 'src/app/core/services/paquete.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-paquete',
  templateUrl: './nuevo-paquete.component.html',
  styleUrls: ['./nuevo-paquete.component.css']
})
export class NuevoPaqueteComponent implements OnInit {

  newPaqueteForm: FormGroup;
  userLoginOn?: boolean;
  userData?: User;

  constructor(
    private paqueteService: PaqueteService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.newPaqueteForm = this.fb.group({
        nombre: ['', Validators.required],
        precio: ['', Validators.required],
        cantidadDias: ['', Validators.required],
        cantidadClases: ['', Validators.required]
    })

    this.authService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
            this.userLoginOn = userLoginOn;
        }
    });

    this.authService.currentUserData.subscribe({
        next: (userData) => {
            this.userData = userData;
        }
    });
}

ngOnInit(): void {

}

onSubmit() {
    if (this.newPaqueteForm.invalid) {
        this.newPaqueteForm.markAllAsTouched()
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al crear el evento"
        })
        return
    }

    const payload = this.newPaqueteForm.value

    this.paqueteService.createPaquete(payload as Paquete).subscribe({
        next: (response) => {
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: `Se creó el paquete exitosamente`
            })
        },
        error: (err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al crear el paquete"
            })
            console.error(err)
        },
        complete: () => {
            this.router.navigate(['admin/paquetes'])
            this.newPaqueteForm.reset()
        },
    })
}

cancel() {
    this.router.navigate(['admin/paquetes'])
    this.newPaqueteForm.reset()
}

 

}
