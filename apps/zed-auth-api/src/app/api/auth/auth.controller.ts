import { Controller,  Post, Body, Respond, Status } from '@agape/api';
import { AuthService } from './auth.service';
import { Deflated } from '@agape/types';
import { Credentials } from 'lib-platform';


@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

    @Status(200)
    @Post('login')
    create( params: any, body: Deflated<Credentials> ) {
      const credentials = body
      return this.service.login( credentials )
    }


}