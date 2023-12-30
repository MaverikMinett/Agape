import { Field, Model } from "@agape/model";


@Model export class Credentials {

    @Field({ example: 'foo' })
    username: string;

    @Field({ example: 'password' })
    password: string;

    @Field({ example: 'ACME' })
    organizationCode: string;

}