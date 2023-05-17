import { Injectable } from '@nestjs/common';
import { orm } from '@agape/orm';

import { Interface } from '@agape/types';
import { User, UserDetailView } from 'lib-platform'

@Injectable()
export class UserService {
    list() {
        return orm.list(UserDetailView).exec()
    }

    create( user: Interface<User> ) {
        return orm.insert(User, user).exec()
    }

    retrieve( id: string ) {
        return orm.retrieve(User, id).exec()
    }

    update( id: string, user: Interface<User> ) {
        return orm.update(User, id, user).exec()
    }

    delete( id: string ) {
        return orm.delete(User, id).exec()
    }
}
