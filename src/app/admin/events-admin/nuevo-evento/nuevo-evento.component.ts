import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearEventoRequest } from 'src/app/core/interfaces/eventDTO';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-nuevo-evento',
    templateUrl: './nuevo-evento.component.html',
    styleUrls: ['./nuevo-evento.component.css']
})
export class NuevoEventoComponent implements OnInit {

    newEventForm: FormGroup;
    userLoginOn?: boolean;
    userData?: User;

    constructor(
        private eventService: EventService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router) {

        this.newEventForm = this.fb.group({
            fecha: ['', Validators.required],
            horaInicio: ['', Validators.required],
            horaFin: ['', Validators.required],
            capacidad: ['', Validators.required],
            recurrente: [false, Validators.required],
            fechaFinRecurrencia: ['']
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
        if (this.newEventForm.invalid) {
            this.newEventForm.markAllAsTouched()
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al crear el evento"
            })
            return
        }

        const payload = this.newEventForm.value

        this.eventService.createEvent(payload as CrearEventoRequest).subscribe({
            next: (response) => {
                if (response.recurrente === true) {
                    Swal.fire({
                        icon: "success",
                        title: "Éxito",
                        text: `${response.mensaje} con horario de ${response.horaInicio} a ${response.horaFin} desde el ${response.fechaInicio} hasta el ${response.fechaFinRecurrencia}`
                    })
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Éxito",
                        text: `${response.mensaje} con horario de ${response.horaInicio} a ${response.horaFin} para el dia ${response.fechaInicio}`
                    })
                }

            },
            error: (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un error al crear el evento"
                })
                console.error(err)
            },
            complete: () => {
                this.router.navigate(['admin/events'])
                this.newEventForm.reset()
            },
        })
    }

    cancel() {
        this.router.navigate(['admin/events'])
        this.newEventForm.reset()
    }

}
