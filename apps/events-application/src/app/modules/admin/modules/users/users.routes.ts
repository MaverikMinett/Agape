import { Route } from "@angular/router";
import { UsersIndexPageComponent } from "./users-index-page/users-index-page.component";
import { EditUserPageComponent } from "./edit-user-page/edit-user-page.component";


export const usersRoutes: Route[] = [
    { 
        path: 'users', 
        component: UsersIndexPageComponent,
    },
    {
        path: 'users/:id',
        component: EditUserPageComponent,
    }
]