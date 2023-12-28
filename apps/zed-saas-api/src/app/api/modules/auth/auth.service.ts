import { Exceptions, Injectable, JwtService } from '@agape/api';
import bcrypt from 'bcryptjs';

import { orm } from '@agape/orm';
import { Exception } from '@agape/exception';

import { User } from '../../../shared/documents/user.document';
import { Credentials } from 'lib-platform';
import { Authentication } from '../../../shared/models/auth/authentication.model';


@Injectable()
export class AuthService {

    constructor( private jwtService: JwtService ) {

    }
    
    @Exceptions( new Exception(401, 'Invalid credentials') )
    async login( credentials: Credentials ) {
        
        const user = await orm.retrieve( User, { username: credentials.username } ).exec()

        const authenticated = bcrypt.compareSync(credentials.password, user.password)

        if ( ! authenticated ) {
            throw new Exception(401, "Invalid credentials")
        }

        const payload: Authentication = { username: user.username, sub: user.id, isAdmin: user.isAdmin };
        const secret = process.env['JWT_SECRET']

        const response =  {
          token: await this.jwtService.sign(payload,secret),
        };

        return response
    }


}