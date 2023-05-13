import { Model, Field, Primary } from '@agape/model'


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