// auth-routing.module.ts
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';
import { HorarioComponent } from './horario/horario.component';
import { ReservaHorarioComponent } from './horario/reserva-horario/reserva-horario.component';
import { UserHorarioComponent } from './horario/user-horario/user-horario.component';
import { EditarHorarioComponent } from './horario/user-horario/editar-horario/editar-horario.component';
import { AlumnoProfileComponent } from './alumno-profile/alumno-profile.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegistroAlumnoComponent },
    { path: 'alumno-profile', component: AlumnoProfileComponent },
    { path: 'horario', component: HorarioComponent },
    { path: 'horario/reserva-horario', component: ReservaHorarioComponent },
    { path: 'horario/mis-clases', component: UserHorarioComponent },
    { path: 'horario/mis-clases/editar-clase/:id', component: EditarHorarioComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
