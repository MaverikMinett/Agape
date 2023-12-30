import { orm } from '@agape/orm';
import { Injectable } from '@agape/api';
import bcrypt from 'bcryptjs';
import { User, AdminUserDetailView, AdminUserUpdateView, AdminUserUpdateFieldsView, AdminUserUpdatePasswordView, AdminUserCreateView } from '../../models/user.models';
import { Exception } from '@agape/exception';



@Injectable()
export class AdminUserService {
    list() {
        return orm.list(AdminUserDetailView).exec()
    }

    async create( user: AdminUserCreateView ) {
        const duplicate = await orm.retrieve( User, { 
            username: new RegExp(`^${user.username}$`, 'i'),
            organization: user.organization
        }).exec()

        if ( duplicate ) {
            throw new Exception(409, "A user with that username already exists")
        }

        user.password = this.encryptPassword(user.password)

        return orm.insert(AdminUserCreateView, user).exec()
    }

    retrieve( id: string ) {
        return orm.retrieve(AdminUserDetailView, id).exec()
    }

    async update( id: string, user: AdminUserUpdateView ) {

        const duplicate = await orm.retrieve( User, { 
            id__ne: id, 
            username: new RegExp(`^${user.username}$`, 'i'),
            organization: user.organization
        }).exec()

        if ( duplicate ) {
            throw new Exception(409, `A user with the username "${user.username}" already exists`)
        }

        const password = user.password;
        delete user.password;

        await orm.update(AdminUserUpdateFieldsView, id, user).exec()

        if ( password !== undefined && password !== '' ) {
          user.password = this.encryptPassword(password)
          await orm.update(AdminUserUpdatePasswordView, id, user).exec()
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