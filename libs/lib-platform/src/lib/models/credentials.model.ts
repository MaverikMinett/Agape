import { Field, Model } from "@agape/model";


@Model export class Credentials {

    @Field username: string;

    @Field password: string;

}