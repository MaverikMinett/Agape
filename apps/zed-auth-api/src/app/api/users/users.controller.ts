import { Controller, Get, Post, Put, Delete } from '@agape/api';
import { Deflated } from '@agape/types'

import { UserService } from './user.service';
import { User } from 'lib-platform'


@Controller('users')
export class UsersController {
    constructor(private readonly service: UserService) {}


    @Get()
    async list() {
        const items = await this.service.list()
        return items
    }

    @Post()
    create( body: Deflated<User> ) {
        const item = body
        return this.service.create( body )
    }

    @Get(':id')
    async retrieve( params: { id: string } ) {

        const item = await this.service.retrieve(params.id)
        
        return item
    }

    @Put(':id')
    update( params: { id: string }, body: Deflated<User>) {
        const item = body
        this.service.update(params.id, item)
    }

    @Delete(':id')
    delete( params: {id: string} ) {
        this.service.delete(params.id)
    }


}
