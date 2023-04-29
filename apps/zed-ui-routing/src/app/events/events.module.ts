import { Module } from "../../lib/decorators/module";
import { RouteDefinition } from "../../lib/modules/router/route-definition.interface";
import { RouterModule } from "../../lib/modules/router/router.module";
import { EventsIndexComponent } from "./events-index.component";
import { EventsListComponent } from "./events-list.component";
import { EventsViewComponent } from "./events-view.component";
import { EventsEditComponent } from "./events.edit.component";


const routes: RouteDefinition[] = [
    { path: '', component: EventsIndexComponent },
    { path: 'events', component: EventsListComponent },
    { path: 'events/create', component: EventsEditComponent },
    { path: 'events/record-1', component: EventsViewComponent },
    { path: 'events/record-1/edit', component: EventsEditComponent },
]

@Module({
    declares: [ 
        EventsIndexComponent,
        EventsListComponent,
     ],
    imports: [ 
        RouterModule.forRoot(routes)
    ]
})
export class EventsModule { }