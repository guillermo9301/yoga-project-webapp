// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegistroAlumnoComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
