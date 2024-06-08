// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegistroAlumnoComponent,
        PasswordRecoveryComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ]
})
export class AuthModule { }
