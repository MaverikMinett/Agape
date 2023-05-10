import { Route } from '@angular/router'
import { EventsListComponent } from './events-list/events-list.component'
import { EventsEditComponent } from './events-edit/events-edit.component'
import { EventsItemComponent } from './events-item/events-item.component'


export const eventsRoutes: Route[] = [
    { path: 'events-template-forms', component: EventsListComponent },
    { path: 'events-template-forms/create', component: EventsEditComponent },
    { path: 'events-template-forms/:id', component: EventsItemComponent },
    { path: 'events-template-forms/:id/edit', component: EventsEditComponent }
]