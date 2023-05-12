import { Route } from "@angular/router";
import { OrganizationsIndexPageComponent } from "./organizations-index-page/organizations-index-page.component";


export const organizationsRoutes: Route[] = [
    { 
        path: 'organizations', 
        component: OrganizationsIndexPageComponent,
    }
]