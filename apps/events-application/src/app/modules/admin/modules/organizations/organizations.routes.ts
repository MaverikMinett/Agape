import { Route } from "@angular/router";
import { OrganizationsIndexPageComponent } from "./organizations-index-page/organizations-index-page.component";
import { EditOrganizationPageComponent } from "./edit-organization-page/edit-organization-page.component";


export const organizationsRoutes: Route[] = [
    { 
        path: 'organizations', 
        component: OrganizationsIndexPageComponent,
    },
    { 
        path: 'organizations/:id', 
        component: EditOrganizationPageComponent,
    }
]