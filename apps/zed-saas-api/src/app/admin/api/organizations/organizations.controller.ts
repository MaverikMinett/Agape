import { Controller, Get, Post, Put, Delete, Body, Params, Respond, Exceptions, Uses, Middlwares } from '@agape/api';

import { AdminOrganizationService } from './organization.service';
import { ItemId } from 'lib-platform'
import { Organization } from '../../../shared/documents/organization.document';
import { AdminOrganizationCreateView, AdminOrganizationUpdateView } from '../../models/organization.models';
import { AdminAuthGuard } from '../../middlewares/admin-auth.guard';

@Controller({
    path: 'organizations',
    description: '',
})
export class AdminOrganizationsController {
    constructor(private readonly service: AdminOrganizationService) {}

    @Get()
    @Respond([Organization])
    async list() {
        const items = await this.service.list()
        return items
    }

    @Post()
    @Uses([AdminOrganizationService, 'create'])
    create( @Body body: AdminOrganizationCreateView ) {
        const item = body
        return this.service.create( item )
    }

    @Get(':id')
    @Respond([Organization])
    async retrieve( @Params params: ItemId ) {

        const item = await this.service.retrieve(params.id)
        
        return item
    }

    @Put(':id')
    @Uses([AdminOrganizationService, 'update'])
    async update( @Params params: ItemId, @Body body: AdminOrganizationUpdateView) {
        const item = body
        await this.service.update(params.id, item)
    }

    @Delete(':id')
    async delete( @Params params: ItemId ) {
        console.log("DELETE ORGANIZATION", params)
        await this.service.delete(params.id)
    }


}
