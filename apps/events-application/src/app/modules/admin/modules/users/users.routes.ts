import { Route } from "@angular/router";
import { UsersIndexPageComponent } from "./users-index-page/users-index-page.component";


export const usersRoutes: Route[] = [
    { 
        path: 'users', 
        component: UsersIndexPageComponent,
    }
]