import { Controller, Get } from "@agape/api";


@Controller('foo')
export class FooController{

    @Get()
    foo() {
        return { message: "BAARRRGGHHHHH" }
    }

}