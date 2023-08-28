import { Module, LoggingMiddleware } from "@agape/api";
import { FooModule } from "./foo/foo.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { SwaggerModule } from "./swagger/swagger.module";


@Module({
    'modules': [ 
        SwaggerModule,
        FooModule, 
        AuthModule, 
        UsersModule 
    ],
    'middlewares': [ LoggingMiddleware ]
})
export class ApiModule {

}