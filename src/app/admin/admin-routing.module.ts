// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { AlumnosListComponent } from './alumnos-list/alumnos-list.component';

const routes: Routes = [
    { path: 'home-admin', component: HomeAdminComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/user-details/:id', component: UserDetailsComponent },
    { path: 'alumnos-list', component: AlumnosListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
