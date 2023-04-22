import { Controller } from "../../../lib/decorators/class/controller"
import { Get } from "../../../lib/decorators"

import { Request, Response } from 'express';

@Controller({})
export class PingController {


    @Get('ping')
    ping( request: Request, response: Response ) {

    }

}