// pages.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ClasesComponent } from './clases/clases.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservationComponent } from './reservation/reservation.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        ContactComponent,
        ClasesComponent,
        CalendarComponent,
        ReservationComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FullCalendarModule,
        ReactiveFormsModule
    ]
})
export class PagesModule { }
