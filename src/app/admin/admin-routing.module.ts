// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { EventsAdminComponent } from './events-admin/events-admin.component';
import { NuevoEventoComponent } from './events-admin/nuevo-evento/nuevo-evento.component';
import { EditEventoComponent } from './events-admin/edit-evento/edit-evento.component';
import { PaqueteAdminComponent } from './paquete-admin/paquete-admin.component';
import { EditPaqueteComponent } from './paquete-admin/edit-paquete/edit-paquete.component';
import { NuevoPaqueteComponent } from './paquete-admin/nuevo-paquete/nuevo-paquete.component';

const routes: Routes = [
    { path: 'home-admin', component: HomeAdminComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/user-details/:id', component: UserDetailsComponent },
    { path: 'events', component: EventsAdminComponent },
    { path: 'events/nuevo-evento', component: NuevoEventoComponent },
    { path: 'events/edit-evento', component: EditEventoComponent },
    { path: 'paquetes', component: PaqueteAdminComponent },
    { path: 'paquetes/edit-paquete', component: EditPaqueteComponent },
    { path: 'paquetes/nuevo-paquete', component: NuevoPaqueteComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
