import { Document, Model, Field, Primary, View, ForeignKey } from '@agape/model'
import { Organization } from './organization.document';

/* User Document */
@Model export class User extends Document {

    @Primary id?: string

    // @Field({ example: 'ACME' })
    // orgCode: string;

    @Field
    organization: Organization

    @Field({ example: 'foo' }) 
    username: string

    @Field({ readable: false, example: 'password' })
    password: string

    @Field({ example: 'George' }) 
    firstName: string

    @Field({ example: 'Harrison' })
    lastName: string

    @Field({ example: 'george.harrison@example.com' }) 
    email: string

    @Field({ default: false })
    isAdmin: boolean


    constructor( params?: Partial<Pick<User, keyof User>>) {
        super()
        Object.assign(this, params)
    }

}

/* User Create View */
export interface UserCreateView extends Omit<User,'id'|'organization'|'isAdmin'> { }

@View(User, { omit: [ 'id', 'organization', 'isAdmin' ] } ) 
export class UserCreateView extends Document {

}

/* User Update View */
export interface UserUpdateView extends Omit<User, 'id'|'organization'|'isAdmin'> { };

@View(User, { omit: [ 'id','organization', 'isAdmin' ] } ) 
export class UserUpdateView extends Document {

}

/* User Login View */
export interface UserLoginView extends Pick<User, 'id'|'password'|'username'|'firstName'|'lastName'|'organization'> { };

@View(User, { pick: [ 'id','password','username','firstName','lastName','organization' ] } ) 
export class UserLoginView extends Document {}




/* User Update Password View */
export interface UserUpdatePasswordView extends Pick<User, 'password'> { };

@View(User, { pick: [ 'password' ] } ) 
export class UserUpdatePasswordView extends Document {

}

/* User Detail View */
export interface UserDetailView extends Omit<User, 'password'|'organization'|'isAdmin'> { };

@View(User, { omit: [ 'password','organization','isAdmin' ] } ) 
export class UserDetailView extends Document {
   
}
