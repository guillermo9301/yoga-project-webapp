// admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RegistrarAlumnoComponent } from './registrar-alumno/registrar-alumno.component';

@NgModule({
    declarations: [
        HomeAdminComponent,
        RegistrarAlumnoComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
