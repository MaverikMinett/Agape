import { Controller, Description, Get, Middlwares, Respond } from "@agape/api";
import { AuthGuard } from "../auth/auth.guard";
import { FooResponse } from "./foo.model";


@Controller('foo', {
    description: 'Foo operations'
})
export class FooController {

    @Get()
    @Middlwares(AuthGuard)
    @Description('Get foo message')
    @Respond(FooResponse)
    foo() {
        return { message: "BAARRRGGHHHHH" }
    }

}