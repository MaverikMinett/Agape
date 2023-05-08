import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { EventsModule } from './api/events/events.module'
import { PingModule } from './api/ping/ping.module';
import { SwaggerModule } from './api/swagger/swagger.module';

@Module({
  imports: [PingModule, EventsModule, SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
