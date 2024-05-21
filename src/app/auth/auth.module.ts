// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [
        LoginComponent

    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class AuthModule { }
