import { Controller,  Post, Body, Respond, Status } from '@agape/api';
import { AuthService } from './auth.service';
import { Deflated } from '@agape/types';
import { Credentials } from 'lib-platform';


@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

    @Status(200)
    @Post('login')
    create( @Body credentials: Credentials ) {
      return this.service.login( credentials )
    }


}