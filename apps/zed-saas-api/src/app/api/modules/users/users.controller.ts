import { Controller, Get, Post, Put, Delete, Body, Params, Respond } from '@agape/api';

import { UserService } from './user.service';
import { ItemId } from 'lib-platform'
import { User, UserDetailView } from '../../../shared/documents/user.document';


@Controller('users')
export class UsersController {
    constructor(private readonly service: UserService) {}


    @Get()
    @Respond([UserDetailView])
    async list() {
        // const items = await this.service.list()
        // return items
    }

    @Post()
    create( @Body body: User ) {
        // const item = body

        // const duplicate = this.service.lookup(item.username)

        // if ( duplicate ) {
        //     throw new Exception(409, "A user with that username already exists")
        // }

        // return this.service.create( body )
    }

    @Get(':id')
    @Respond([UserDetailView])
    async retrieve( @Params params: ItemId ) {

        // const item = await this.service.retrieve(params.id)
        
        // return item
    }

    @Put(':id')
    async update( @Params params: ItemId, @Body body: User) {
        // const item = body
        // await this.service.update(params.id, item)
    }

    @Delete(':id')
    async delete( @Params params: ItemId ) {
        // await this.service.delete(params.id)
    }


}
