import { Module, SwaggerModule } from "@agape/api";
import { FooModule } from "./modules/foo/foo.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminApiModule } from "../admin/api/admin-api.module";
import { AuthenticateRequestMiddleware } from "../shared/middlewares/authenticate-request.middleware";

@Module({
    'modules': [ 
        SwaggerModule.configure({
            info: {
                title: 'Validated API',
                summary: 'API',
                description: 'username: admin, password: password, organization: NONE',
                contact: {
                    name: "Maverik Minett",
                    email: "maverik@maverik.io"
                },
                license: {
                    name: "Apache 2.0",
                    url: "https://www.apache.org/licenses/LICENSE-2.0.html"
                },
                version: "1.0.1",
            },
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
        AdminApiModule, 
        AuthModule,
        FooModule,
        UsersModule
    ],
    'middlewares': [ AuthenticateRequestMiddleware ]
})
export class ApiModule {

}