import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router";
import { EventsEditComponent } from "./events-edit/events-edit.component";
import { EventsItemComponent } from "./events-item/events-item.component";
import { EventsListComponent } from "./events-list/events-list.component";
import { eventsRoutes } from "./events.routes";
import { EventService } from "./event.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import {MatNativeDateModule} from '@angular/material/core';




@NgModule({
    declarations: [
        EventsEditComponent, 
        EventsItemComponent, 
        EventsListComponent
    ],
    providers: [
        EventService
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(eventsRoutes),
        HttpClientModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
    ]
})
export class EventsModelServiceModule {

}