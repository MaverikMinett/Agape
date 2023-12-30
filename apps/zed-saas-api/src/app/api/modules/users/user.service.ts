import { orm } from '@agape/orm';
import { Deflated } from '@agape/types';
import { Injectable } from '@agape/api';
import bcrypt from 'bcryptjs';

import { User, UserCreateView, UserDetailView , UserUpdatePasswordView, UserUpdateView } from '../../../shared/documents/user.document';
import { Exception } from '@agape/exception';
import { DataService } from '../../../shared/services/data-service';
import { Authentication } from '../../../shared/models/auth/authentication.model';


@Injectable()
export class UserService {

    constructor( private data: DataService ) {

    }

    async list(auth: Authentication) {
        return this.data.list(auth, UserDetailView)
    }

    async lookup( auth: Authentication, username: string ) {
        return this.data.retrieve(auth, UserDetailView, { username: new RegExp(`^${username}$`, 'i') } )
    }

    async create( auth: Authentication, user: UserCreateView ) {
        const duplicate = await this.lookup(auth, user.username)

        if ( duplicate ) {
            throw new Exception(409, "A user with that username already exists")
        }

        user.password = this.encryptPassword(user.password)
        return this.data.create(auth, UserCreateView, user)
    }

    async retrieve( auth: Authentication, id: string ) {
        return this.data.retrieve(auth, UserDetailView, {id})
    }

    async update( id: string, user: UserUpdateView ) {
        const password = user.password;
        delete user.password;
       
        const userUpdateView: UserUpdateView = user

        await orm.update(UserUpdateView, id, user).exec()

        if ( password !== undefined) {
          user.password = this.encryptPassword(password)
          await orm.update(UserUpdatePasswordView, id, user).exec()
        }
    }

    delete( id: string ) {
        return orm.delete(User, id).exec()
    }


    private encryptPassword( password: string ) {
        const salt = bcrypt.genSaltSync(10)
        const salted = bcrypt.hashSync(password, salt);
        return salted
    }
}