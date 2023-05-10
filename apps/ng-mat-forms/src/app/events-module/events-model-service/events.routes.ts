import { Route } from '@angular/router'
import { EventsListComponent } from './events-list/events-list.component'
import { EventsEditComponent } from './events-edit/events-edit.component'
import { EventsItemComponent } from './events-item/events-item.component'


export const eventsRoutes: Route[] = [
    { path: 'events-model-service', component: EventsListComponent },
    { path: 'events-model-service/create', component: EventsEditComponent },
    { path: 'events-model-service/:id', component: EventsItemComponent },
    { path: 'events-model-service/:id/edit', component: EventsEditComponent }
]