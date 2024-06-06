// admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        HomeAdminComponent,
        UsersComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FontAwesomeModule
    ]
})
export class AdminModule { }
