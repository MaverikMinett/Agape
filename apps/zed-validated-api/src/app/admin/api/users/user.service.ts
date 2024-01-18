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

        // retrieve the user to perform username change check
        const retrievedUser = await orm.retrieve( User, id ).exec()

        // if username is changing
        if ( user.username !== retrievedUser.username ) {

            // check for a user that has the new username to avoid duplicates
            const duplicate = await orm.retrieve( User, { 
                organization: retrievedUser.organization,
                username: new RegExp(`^${user.username}$`, 'i')
            }).exec()

            // if there is user with the new username, throw an error
            if ( duplicate ) {
                throw new Exception(409, `A user with the username "${user.username}" already exists`)
            }    
        }

        // don't update the password with the raw password when writing the user to the database
        const password = user.password;
        delete user.password;

        await orm.update(AdminUserUpdateFieldsView, id, user).exec()

        // update the password only if the password field is not empty
        if ( password !== undefined && password !== null && password !== '' ) {
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