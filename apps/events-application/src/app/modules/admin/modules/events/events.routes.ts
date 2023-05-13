import { Route } from "@angular/router";
import { EventsIndexPageComponent } from "./events-index-page/events-index-page.component";
import { EditEventPageComponent } from "./edit-event-page/edit-event-page.component";


export const eventsRoutes: Route[] = [
    { 
        path: 'events', 
        component: EventsIndexPageComponent,
    },
    { 
        path: 'events/:id', 
        component: EditEventPageComponent,
    }
]