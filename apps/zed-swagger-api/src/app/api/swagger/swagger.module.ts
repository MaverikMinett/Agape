import { Module } from "@agape/api";
import { SwaggerController } from "./swagger.controller";


@Module({
    controllers: [SwaggerController]
})
export class SwaggerModule {

}