import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroAlumnoComponent } from './auth/registro-alumno/registro-alumno.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { ReservationListComponent } from './pages/reservation/reservation-list/reservation-list.component';
import { ReservationEditComponent } from './pages/reservation/reservation-edit/reservation-edit.component';
import { PaymentsComponent } from './pages/payments/payments.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'signup', component: RegistroAlumnoComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'clases', component: ClasesComponent },
  { path: 'calendario', component: CalendarComponent },
  { path: 'reserva', component: ReservationComponent },
  { path: 'recovery', component: PasswordRecoveryComponent },
  { path: 'reservationList', component: ReservationListComponent},
  { path: 'reservationEdit', component: ReservationEditComponent},
  { path: 'pago', component: PaymentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
