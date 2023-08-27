import { Controller, Get, Middlwares } from "@agape/api";
import { AuthGuard } from "../auth/auth.guard";


@Controller('foo')
export class FooController {

    @Get()
    @Middlwares(AuthGuard)
    foo() {
        return { message: "BAARRRGGHHHHH" }
    }

}