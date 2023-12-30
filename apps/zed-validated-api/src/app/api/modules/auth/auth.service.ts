import { Exceptions, Injectable, JwtService } from '@agape/api';
import bcrypt from 'bcryptjs';

import { orm } from '@agape/orm';
import { Exception } from '@agape/exception';

import { User } from '../../../shared/documents/user.document';
import { Credentials } from '../../../shared/models/auth/credentials.model';
import { Authentication } from '../../../shared/models/auth/authentication.model';
import { Organization } from '../../../shared/documents/organization.document';


@Injectable()
export class AuthService {

    constructor( private jwtService: JwtService ) {

    }
    
    @Exceptions( new Exception(401, 'Invalid credentials') )
    async login( credentials: Credentials ) {

        let organization: Organization
        if ( credentials.organizationCode !== 'NONE' ) {
            organization = await orm.retrieve( Organization, { code: new RegExp(`^${credentials.organizationCode}$`, 'i') }).exec()
            if ( ! organization ) {
                throw new Exception(401, "Invalid credentials")
            }
        }

        const user = await orm.retrieve( User, { username: credentials.username, organization } ).exec()
        if ( ! user ) {
            throw new Exception(401, "Invalid credentials")
        }

        const authenticated = bcrypt.compareSync(credentials.password, user.password)

        if ( ! authenticated ) {
            throw new Exception(401, "Invalid credentials")
        }

        const payload: Authentication = { 
            username: user.username, 
            sub: user.id, 
            isAdmin: user.isAdmin, 
            organization: user.organization?.id 
        };
        
        const secret = process.env['JWT_SECRET']

        const response =  {
          token: await this.jwtService.sign(payload,secret),
        };

        return response
    }


}