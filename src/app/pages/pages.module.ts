// pages.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SomosComponent } from './somos/somos.component';
import { EstamosComponent } from './estamos/estamos.component';
import { ClasesComponent } from './clases/clases.component';
import { VenpruebaComponent } from './venprueba/venprueba.component';

@NgModule({
    declarations: [
        HomeComponent,
        SomosComponent,
        EstamosComponent,
        ClasesComponent,
        VenpruebaComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }
