import { Controller, Get } from '@nestjs/common';

@Controller('api/ping')
export class PingController {
  constructor() {}


    @Get()
    ping() {
        return { message: 'pong' }
    }

}
