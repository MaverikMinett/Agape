import { Route } from "@angular/router";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AdminIndexPageComponent } from "./components/admin-index-page/admin-index-page.component";
import { eventsRoutes } from "./modules/events/events.routes";

export const adminRoutes: Route[] = [
    { 
        path: 'admin', 
        component: AdminDashboardComponent,
        children: [
            { 
                path: '',
                component: AdminIndexPageComponent,
            },
            ...eventsRoutes
        ]
    }
]