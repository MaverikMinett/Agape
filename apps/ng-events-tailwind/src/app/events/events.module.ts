import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router";
import { EventsEditComponent } from "./events-edit/events-edit.component";
import { EventsItemComponent } from "./events-item/events-item.component";
import { EventsListComponent } from "./events-list/events-list.component";
import { eventsRoutes } from "./events.routes";
import { EventService } from "./event.service";
import { HttpClientModule } from "@angular/common/http";




@NgModule({
    declarations: [
        EventsEditComponent, 
        EventsItemComponent, 
        EventsListComponent 
    ],
    providers: [
        EventService,
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(eventsRoutes),
        HttpClientModule,
    ]
})
export class EventsModule {

}