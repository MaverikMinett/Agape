import { Module, LoggingMiddleware } from "@agape/api";
import { FooModule } from "./foo/foo.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { SwaggerModule } from "./swagger/swagger.module";


@Module({
    'modules': [ 
        SwaggerModule.configure({
            title: 'Zed Swagger API',
            summary: 'API with Auto-generated swagger docs',
            contact: {
                name: "Maverik Minett",
                email: "maverik@maverik.io"
            },
            license: {
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html"
            },
            version: "1.0.1",
            security: [
                {"BearerAuth": []}
            ],
            
            components: {
                "securitySchemes": {
                    "BearerAuth": {
                        "type": "http",
                        "scheme": "bearer"
                    }
                },
                
            },
            
        }),
        FooModule, 
        AuthModule, 
        UsersModule 
    ],
    'middlewares': [ LoggingMiddleware ]
})
export class ApiModule {

}