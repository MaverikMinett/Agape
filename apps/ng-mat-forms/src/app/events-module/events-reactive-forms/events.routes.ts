import { Route } from '@angular/router'
import { EventsListComponent } from './events-list/events-list.component'
import { EventsEditComponent } from './events-edit/events-edit.component'
import { EventsItemComponent } from './events-item/events-item.component'


export const eventsRoutes: Route[] = [
    { path: 'events-reactive-forms', component: EventsListComponent },
    { path: 'events-reactive-forms/create', component: EventsEditComponent },
    { path: 'events-reactive-forms/:id', component: EventsItemComponent },
    { path: 'events-reactive-forms/:id/edit', component: EventsEditComponent }
]