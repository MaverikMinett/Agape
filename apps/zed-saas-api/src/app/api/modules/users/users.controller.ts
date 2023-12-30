import { Controller, Get, Post, Put, Delete, Body, Params, Respond, Auth } from '@agape/api';

import { UserService } from './user.service';
import { ItemId } from 'lib-platform'
import { User, UserCreateView, UserDetailView } from '../../../shared/documents/user.document';
import { Exception } from '@agape/exception';
import { Authentication } from '../../../shared/models/auth/authentication.model';
import { AuthGuard } from '../auth/auth.guard';


@Controller(
    'users', 
    { middlewares: [AuthGuard] }
)
export class UsersController {
    constructor(private readonly service: UserService) {}


    @Get()
    @Respond([UserDetailView])
    async list( @Auth auth: Authentication) {
        const items = await this.service.list(auth)
        return items
    }

    @Post()
    create( @Auth auth: Authentication, @Body user: UserCreateView ) {
        return this.service.create( auth, user )
    }

    @Get(':id')
    @Respond([UserDetailView])
    async retrieve( @Auth auth: Authentication, @Params params: ItemId ) {

        const item = await this.service.retrieve(auth, params.id)
        
        return item
    }

    @Put(':id')
    async update( @Params params: ItemId, @Body body: User) {
        const item = body
        await this.service.update(params.id, item)
    }

    @Delete(':id')
    async delete( @Params params: ItemId ) {
        await this.service.delete(params.id)
    }


}
