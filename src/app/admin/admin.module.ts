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
import { AlumnosListComponent } from './alumnos-list/alumnos-list.component';


@NgModule({
    declarations: [
        HomeAdminComponent,
        UsersComponent,
        UserDetailsComponent,
        AlumnosListComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FontAwesomeModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AdminModule { }
