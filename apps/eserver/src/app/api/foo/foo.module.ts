import { Controller, Get, Module } from "apps/eserver/src/lib/decorators";

@Controller({})
export class FooController {


    @Get('foo')
    async bar( request: Request, response: Response ) {
       return { message: "BARRRRRRGHHHH" }
    }

}

@Module({
    'controllers': [ FooController ]
})
export class FooModule {

}
