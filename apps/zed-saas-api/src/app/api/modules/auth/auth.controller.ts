import { Controller,  Post, Body, Status, Uses } from '@agape/api';
import { AuthService } from './auth.service';
import { Credentials } from 'lib-platform';


@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

    @Status(200)
    @Post('login')
    @Uses([AuthService, 'login'])
    create( @Body credentials: Credentials ) {
      return this.service.login( credentials )
    }


}