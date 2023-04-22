import { Controller, Get } from "apps/eserver/src/lib/decorators";

import { ApiRequest } from "apps/eserver/src/lib/api-request";
import { ApiResponse } from "apps/eserver/src/lib/api-response";


@Controller({})
export class FooController {


    @Get('foo')
    async bar( request: ApiRequest, response: ApiResponse ) {
       return { message: "BARRRRRRGHHHH" }
    }

}
