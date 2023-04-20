import { Route } from '@angular/router';
import { EventsIndexPageComponent } from './events-index-page/events-index-page.component';

export const eventsRoutes: Route[] = [
    { path: 'events', component: EventsIndexPageComponent }
];
