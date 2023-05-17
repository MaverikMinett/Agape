import { Controller, Get, NotFoundException, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import fs from 'fs';

@Controller()
export class SwaggerController {
  constructor() {}


    @Get(['api/swagger.json'])
    swaggerJson( @Req() request: Request, @Res() response: Response ) {
        let content = fs.readFileSync(`./apps/nest-server-orm/src/assets/swagger.json`)
        console.log("Hot loading swagger.json")
        response.write( content )
        response.end()
        return;
    }

    @Get(['api', 'api/*'])
    swagger( @Req() request: Request, @Res() response: Response ) {
        /* display swagger documentation */
        let match = request.url.match(/^\/api\/?$/) || request.url.match(/^\/api\/(?<path>.*)$/)
        if ( match ) {
            const path = match.groups?.path ?? 'index.html'

            if ( ! fs.existsSync(`./apps/_swagger/${path}`) ) {
                throw new NotFoundException()
            }

            let content = fs.readFileSync(`./apps/_swagger/${path}`)
            response.write( content )
            response.end()
            return;
        }
    }
}
