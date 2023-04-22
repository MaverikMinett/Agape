import { Controller, Get, Module } from "apps/eserver/src/lib/decorators";

@Controller({})
export class FooController {


    @Get('foo')
    bar( request: Request, response: Response ) {

    }

}

@Module({
    'controllers': [ FooController ]
})
export class FooModule {

}
