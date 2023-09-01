import { Document, Model, Field, Primary, View } from '@agape/model'


export enum UserStatus {
    Enabled = 'enabled',
    Disabled = 'disabled'
}

export const UserStatusChoices = [
    { value: 'enabled', label: 'Enabled' },
    { value: 'disabled', label: 'Disabled' }
]

@Model export class User extends Document {

    @Primary id?: string

    @Field({ example: 'Foo' })
    name: string

    @Field({ example: 'foo' }) 
    username: string

    @Field({ readable: false, example: 'password' })
    password: string

    @Field({ example: UserStatus.Enabled })
    status: UserStatus = UserStatus.Enabled
}

export interface UserUpdateView extends Omit<User, 'id'|'password'> { };

@View(User, { omit: [ 'id','password' ] } ) 
export class UserUpdateView extends Document {

}

export interface UserUpdatePasswordView extends Pick<User, 'password'> { };

@View(User, { pick: [ 'password' ] } ) 
export class UserUpdatePasswordView extends Document {

}

export interface UserDetailView extends Pick<User,'id'|'name'|'username'> { }

@View(User, { 
    pick: ['id', 'name', 'username', 'status'] 
})
 export class UserDetailView extends Document {


}