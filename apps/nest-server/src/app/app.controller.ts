import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'
import fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello( @Res() response: Response ): string {
    /* display service index */
    let indexHtml = fs.readFileSync('./apps/_common/index.html')
    response.write( indexHtml )
    response.end()
    return;
  }





}
