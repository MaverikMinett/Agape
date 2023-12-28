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

    @Field({ example: false })
    isAdmin: boolean


    constructor( params?: Partial<Pick<User, keyof User>>) {
        super()
        Object.assign(this, params)
    }

}

/* User Create View */
export interface UserCreateView extends Pick<User,'username'|'password'|'firstName'|'lastName'|'email'> { }

@View(User, { pick: [ 'username','password','firstName','lastName','email' ] } ) 
export class UserCreateView extends Document {

}

/* User Create View with SAAS Contstraint */
export interface UserCreateViewSaas extends Pick<User,'username'|'password'|'firstName'|'lastName'|'email'> { }

@View(User, { pick: [ 'username','password','firstName','lastName','email','organization' ] } ) 
export class UserCreateViewSaas extends Document { }

/* User Login View */
export interface UserLoginView extends Pick<User, 'id'|'password'|'username'|'firstName'|'lastName'|'organization'> { };

@View(User, { pick: [ 'id','password','username','firstName','lastName','organization' ] } ) 
export class UserLoginView extends Document {}


/* User Update View */
export interface UserUpdateView extends Omit<User, 'id'|'password'|'orgCode'|'organization'> { };

@View(User, { omit: [ 'id','password','organization' ] } ) 
export class UserUpdateView extends Document {

}

/* User Update Password View */
export interface UserUpdatePasswordView extends Pick<User, 'password'> { };

@View(User, { pick: [ 'password' ] } ) 
export class UserUpdatePasswordView extends Document {

}

/* User Detail View */
export interface UserDetailView extends Omit<User, 'password'> { };

@View(User, { omit: [ 'password' ] } ) 
export class UserDetailView extends Document {

}