import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { EventsModule } from './api/events/events.module'
import { PingModule } from './api/ping/ping.module';
import { SwaggerModule } from './api/swagger/swagger.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    PingModule, 
    
    EventsModule, 
    UsersModule,

    SwaggerModule,  // must be last
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
