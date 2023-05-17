import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { EventsModule } from './api/events/events.module'
import { PingModule } from './api/ping/ping.module';
import { SwaggerModule } from './api/swagger/swagger.module';
import { UsersModule } from './api/users/users.module';
import { OrganizationsModule } from './api/organizations/organizations.module';
import { AuthModule } from './api/auth/auth.module';

import dotenv from 'dotenv'
import { JwtModule } from '@nestjs/jwt';
dotenv.config({ path: 'apps/_env/events-application/.env' })
const JWT_SECRET = process.env['JWT_SECRET']
const JWT_EXPIRATION_LENGTH = process.env['JWT_EXPIRATION_LENGTH']

@Module({
  imports: [
    PingModule, 
    
    EventsModule, 
    UsersModule,
    OrganizationsModule,

    AuthModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION_LENGTH + 's' },
    }),

    SwaggerModule,  // must be last
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
