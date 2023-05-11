
import { Model, Field, Primary, View } from '@agape/model'



@Model export class User {

    @Primary id?: string

    @Field name: string

    @Field username: string

    @Field password: string

    constructor( params: Partial<Pick<Event, keyof Event>>) {
        Object.assign( this, params )
    }

}


export interface UserDetailView extends Pick<User,'id'|'name'|'username'> { }

@View(User, { 
    pick: ['id', 'name', 'username'] 
})
 export class UserDetailView {


}