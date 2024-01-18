import { Module } from "@agape/api";
import { FooModule } from "./foo/foo.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";


@Module({
    'modules': [ 
        FooModule, 
        AuthModule, 
        UsersModule 
    ]
})
export class ApiModule {

}