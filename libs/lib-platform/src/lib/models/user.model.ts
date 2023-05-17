import { Model, Field, Primary, View } from '@agape/model'


export enum UserStatus {
    Enabled = 'enabled',
    Disabled = 'disabled'
}

export const UserStatusChoices = [
    { value: 'enabled', label: 'Enabled' },
    { value: 'disabled', label: 'Disabled' }
]

@Model export class User {

    @Primary id?: string

    @Field name: string

    @Field username: string

    @Field({ readable: false })
    password: string

    @Field({ })
    status: UserStatus = UserStatus.Enabled
}

export interface UserUpdateView extends Omit<User, 'id'|'password'> { };

@View(User, { omit: [ 'id','password' ] } ) 
export class UserUpdateView {

}

export interface UserUpdatePasswordView extends Pick<User, 'password'> { };

@View(User, { pick: [ 'password' ] } ) 
export class UserUpdatePasswordView {

}

export interface UserDetailView extends Pick<User,'id'|'name'|'username'> { }

@View(User, { 
    pick: ['id', 'name', 'username'] 
})
 export class UserDetailView {


}