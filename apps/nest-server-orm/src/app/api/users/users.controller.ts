import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDetailView } from './user.model'
import { Interface } from '@agape/types';


import { alchemy } from '@project-zed/lib-alchemy'

@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UserService) {}


    @Get()
    async list() {
        const items = await this.service.list()

        const deflated = alchemy.deflate(UserDetailView, items)

        return deflated
    }

    @Post()
    create( @Body() payload: Interface<User> ) {

        const item = alchemy.inflate(User, payload)

        return this.service.create( item )
    }

    @Get(':id')
    async retrieve( @Param('id') id: string ) {

        const item = await this.service.retrieve(id)

        const dto = alchemy.deflate(User, item)

        return dto
    }

    @Put(':id')
    update( @Param('id') id: string, @Body() payload: Interface<User>) {

        const item = alchemy.inflate(User, payload)

        this.service.update(id, item)
    }

    @Delete(':id')
    delete( @Param('id') id: string ) {
        this.service.delete(id)
    }


}
