import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express'
import fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get(['api', 'api/*'])
  swagger( @Req() request: Request, @Res() response: Response ) {
        /* display swagger documentation */
        let match = request.url.match(/^\/api\/?$/) || request.url.match(/^\/api\/(?<path>.*)$/)
        if ( match ) {
            const path = match.groups?.path ?? 'index.html'

            let content = fs.readFileSync(`./apps/_swagger/${path}`)
            console.log(response.getHeaders())
            response.write( content )
            response.end()
            return;
        }
  }


}
