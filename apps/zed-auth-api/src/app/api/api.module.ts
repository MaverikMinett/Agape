import { Module } from "@agape/api";
import { FooModule } from "./foo/foo.module";
import { UsersModule } from "./users/users.module";

@Module({
    'modules': [ FooModule, UsersModule ]
})
export class ApiModule {

}