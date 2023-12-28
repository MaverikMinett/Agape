import { Field, Model } from "@agape/model";


@Model export class Authentication {
    @Field username: string
    @Field sub: string
    @Field isAdmin: boolean
}