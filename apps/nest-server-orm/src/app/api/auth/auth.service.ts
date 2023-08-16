import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import { orm } from '@agape/orm';
import { Deflated } from '@agape/types';
import { Exception } from '@agape/exception';

import { Credentials, User } from 'lib-platform';


@Injectable()
export class AuthService {

    constructor( private jwtService: JwtService ) {

    }
    
    async login( credentials: Deflated<Credentials> ) {
        
        const user = await orm.lookup( User, { username: credentials.username } ).exec()

        const authenticated = bcrypt.compareSync(credentials.password, user.password)

        if ( ! authenticated ) {
            throw new Exception(401)
        }

        const payload = { username: user.username, sub: user.id };

        const response =  {
          token: await this.jwtService.signAsync(payload),
        };

        return response
    }


}