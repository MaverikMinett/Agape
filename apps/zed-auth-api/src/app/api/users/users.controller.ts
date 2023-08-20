import { Controller, Get, Post, Put, Delete, LoggingMiddleware, Middlwares } from '@agape/api';
import { Exception } from '@agape/exception';
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
    create( params: any, body: Deflated<User> ) {
        const item = body

        const duplicate = this.service.lookup(item.username)

        if ( duplicate ) {
            throw new Exception(409, "A user with that username already exists")
        }

        return this.service.create( body )
    }

    @Get(':id')
    async retrieve( params: { id: string } ) {

        const item = await this.service.retrieve(params.id)
        
        return item
    }

    @Put(':id')
    async update( params: { id: string }, body: Deflated<User>) {
        const item = body
        await this.service.update(params.id, item)
    }

    @Delete(':id')
    async delete( params: {id: string} ) {
        await this.service.delete(params.id)
    }


}
