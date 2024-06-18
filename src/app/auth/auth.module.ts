// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HorarioComponent } from './horario/horario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservaHorarioComponent } from './horario/reserva-horario/reserva-horario.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegistroAlumnoComponent,
        HorarioComponent,
        ReservaHorarioComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FullCalendarModule
    ]
})
export class AuthModule { }
