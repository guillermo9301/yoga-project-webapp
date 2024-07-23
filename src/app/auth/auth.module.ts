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
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { UserHorarioComponent } from './horario/user-horario/user-horario.component';
import { EditarHorarioComponent } from './horario/user-horario/editar-horario/editar-horario.component';
import { AlumnoProfileComponent } from './alumno-profile/alumno-profile.component';
import { SuscripcionComponent } from './alumno-profile/suscripcion/suscripcion.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegistroAlumnoComponent,
        HorarioComponent,
        ReservaHorarioComponent,
        PasswordRecoveryComponent,
        UserHorarioComponent,
        EditarHorarioComponent,
        AlumnoProfileComponent,
        SuscripcionComponent

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
