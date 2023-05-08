import { Route } from '@angular/router'
import { EventsListComponent } from './events-list/events-list.component'
import { EventsEditComponent } from './events-edit/events-edit.component'
import { EventsItemComponent } from './events-item/events-item.component'


export const eventsRoutes: Route[] = [
    { path: 'events', component: EventsListComponent },
    { path: 'events/create', component: EventsEditComponent },
    { path: 'events/:id', component: EventsItemComponent },
    { path: 'events/:id/edit', component: EventsEditComponent }
]