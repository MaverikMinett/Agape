import { Controller, Get, ApiRequest, ApiResponse } from "@agape/api";



@Controller({})
export class FooController {


    @Get('foo')
    async bar( request: ApiRequest, response: ApiResponse ) {
       return { message: "BARRRRRRGHHHH" }
    }

}
