import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { eventsRoutes } from "./events.routes";
import { EventsMenuComponent } from "./events-menu/events-menu.component";
import { EventsIndexPageComponent } from "./events-index-page/events-index-page.component";




@NgModule({
    providers: [],
    declarations: [ 
        EventsIndexPageComponent,
        EventsMenuComponent,
     ],
    imports: [
        CommonModule,
        RouterModule.forChild(eventsRoutes),
    ],
    exports: []
})
export class EventsModule {

}