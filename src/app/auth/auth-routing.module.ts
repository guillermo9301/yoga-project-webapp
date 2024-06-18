// auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';
import { HorarioComponent } from './horario/horario.component';
import { ReservaHorarioComponent } from './horario/reserva-horario/reserva-horario.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegistroAlumnoComponent },
    { path: 'horario', component: HorarioComponent },
    { path: 'horario/reserva-horario', component: ReservaHorarioComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
