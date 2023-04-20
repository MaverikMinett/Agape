import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { eventsRoutes } from "./events.routes";
import { EventsMenuComponent } from "./events-menu/events-menu.component";
import { EventsIndexPageComponent } from "./events-index-page/events-index-page.component";
import { EventsListViewPageComponent } from "./events-list-view-page/events-list-view-page.component";
import { EventsItemViewPageComponent } from "./events-item-view-page/events-item-view-page.component";





@NgModule({
    providers: [],
    declarations: [ 
        EventsIndexPageComponent,
        EventsMenuComponent,
        EventsListViewPageComponent,
        EventsItemViewPageComponent,
     ],
    imports: [
        CommonModule,
        RouterModule.forChild(eventsRoutes),
    ],
    exports: []
})
export class EventsModule {

}