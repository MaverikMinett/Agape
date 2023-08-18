import { orm } from '@agape/orm';
import { Deflated } from '@agape/types';
import { Service } from '@agape/api';
import bcrypt from 'bcryptjs';

import { User, UserDetailView , UserUpdatePasswordView, UserUpdateView } from 'lib-platform';


@Service()
export class UserService {
    list() {
        return orm.list(UserDetailView).exec()
    }

    lookup( username: string ) {
        return orm.lookup(UserDetailView, { username } ).exec()
    }

    create( user: Deflated<User> ) {
        user.password = this.encryptPassword(user.password)
        return orm.insert(User, user).exec()
    }

    retrieve( id: string ) {
        return orm.retrieve(UserDetailView, id).exec()
    }

    update( id: string, user: Deflated<User> ) {
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