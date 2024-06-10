// auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegistroAlumnoComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
