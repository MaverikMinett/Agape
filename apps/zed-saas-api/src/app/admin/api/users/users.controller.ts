import { Controller, Get, Post, Put, Delete, Body, Params, Respond } from '@agape/api';

import { AdminUserService } from './user.service';
import { AdminUserDetailView, AdminUserCreateView, AdminUserUpdateView } from '../../models/user.models';
import { ItemId } from 'lib-platform';


@Controller('users')
export class AdminUsersController {
    constructor(private readonly service: AdminUserService) {}



    @Get()
    @Respond([AdminUserDetailView])
    async list() {
        const items = await this.service.list()
        return items
    }

    @Post()
    create( @Body body: AdminUserCreateView ) {
        return this.service.create( body )
    }

    @Get(':id')
    @Respond([AdminUserDetailView])
    async retrieve( @Params params: ItemId ) {

        const item = await this.service.retrieve(params.id)
        
        return item
    }

    @Put(':id')
    async update( @Params params: ItemId, @Body body: AdminUserUpdateView) {
        const item = body
        await this.service.update(params.id, item)
    }

    @Delete(':id')
    async delete( @Params params: ItemId ) {
        await this.service.delete(params.id)
    }


}
