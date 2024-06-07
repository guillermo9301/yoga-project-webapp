import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroAlumnoComponent } from './auth/registro-alumno/registro-alumno.component';
import { SomosComponent } from './pages/somos/somos.component';
import { EstamosComponent } from './pages/estamos/estamos.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { VenpruebaComponent } from './pages/venprueba/venprueba.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'signup', component: RegistroAlumnoComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'somos', component: SomosComponent },
  { path: 'estamos', component: EstamosComponent },
  { path: 'clases', component: ClasesComponent},
  { path: 'venprueba', component: VenpruebaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
