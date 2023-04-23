import { Controller, Get, ApiRequest, ApiResponse } from "@lib/api";



@Controller({})
export class FooController {


    @Get('foo')
    async bar( request: ApiRequest, response: ApiResponse ) {
       return { message: "BARRRRRRGHHHH" }
    }

}
