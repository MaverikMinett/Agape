import { Module } from "@agape/api";
import { AdminUsersModule } from "./users/users.module";
import { AdminOrganizationsModule } from "./organizations/organizations.module";
import { AdminAuthGuard } from "../middlewares/admin-auth.guard";


@Module({
    modules: [ 
        AdminUsersModule,
        AdminOrganizationsModule
    ],
    path: 'admin',
    middlewares: [ AdminAuthGuard ]
})
export class AdminApiModule {

}