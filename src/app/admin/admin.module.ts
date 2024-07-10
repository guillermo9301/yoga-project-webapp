// admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsAdminComponent } from './events-admin/events-admin.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NuevoEventoComponent } from './events-admin/nuevo-evento/nuevo-evento.component';
import { EditEventoComponent } from './events-admin/edit-evento/edit-evento.component';
import { PaqueteAdminComponent } from './paquete-admin/paquete-admin.component';
import { EditPaqueteComponent } from './paquete-admin/edit-paquete/edit-paquete.component';
import { NuevoPaqueteComponent } from './paquete-admin/nuevo-paquete/nuevo-paquete.component';


@NgModule({
    declarations: [
        HomeAdminComponent,
        UsersComponent,
        UserDetailsComponent,
        EventsAdminComponent,
        NuevoEventoComponent,
        EditEventoComponent,
        PaqueteAdminComponent,
        EditPaqueteComponent,
        NuevoPaqueteComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FontAwesomeModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FullCalendarModule
    ]
})
export class AdminModule { }
