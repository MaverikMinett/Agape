import { Injectable } from '@nestjs/common';
import { orm } from '@agape/orm';

import { Interface } from '@agape/types';


import bcrypt from 'bcryptjs';
import { User, UserDetailView , UserUpdatePasswordView, UserUpdateView } from 'lib-platform';

@Injectable()
export class UserService {
    list() {
        return orm.list(UserDetailView).exec()
    }

    create( user: Interface<User> ) {
        user.password = this.encryptPassword(user.password)
        return orm.insert(User, user).exec()
    }

    retrieve( id: string ) {
        return orm.retrieve(User, id).exec()
    }

    update( id: string, user: Interface<User> ) {
        const password = user.password;
        delete user.password;
       
        const userUpdateView: UserUpdateView = user

        orm.update(UserUpdateView, id, user).exec()

        if ( password !== undefined) {
          user.password = this.encryptPassword(password)
          orm.update(UserUpdatePasswordView, id, user).exec()
        }
    }

    delete( id: string ) {
        return orm.delete(User, id).exec()
    }


    private encryptPassword( password: string ) {
        const salt = bcrypt.genSaltSync(10)
        const salted = bcrypt.hashSync(password, salt);
        console.log(salted)
        return salted
    }
}