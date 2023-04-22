import { Controller, Get } from "apps/eserver/src/lib/decorators";




@Controller({})
export class FooController {


    @Get('foo')
    async bar( request: Request, response: Response ) {
       return { message: "BARRRRRRGHHHH" }
    }

}
