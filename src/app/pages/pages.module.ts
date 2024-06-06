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

@NgModule({
    declarations: [
        HomeComponent,
      
        AboutComponent,
               ContactComponent,
               ClasesComponent,
               CalendarComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FullCalendarModule
    ]
})
export class PagesModule { }
