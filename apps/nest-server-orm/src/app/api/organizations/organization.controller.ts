import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';

import { Interface } from '@agape/types';
import { Organization } from 'lib-platform'

import { alchemy } from '@project-zed/lib-alchemy'

@Controller('api/organizations')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}


    @Get()
    async list() {
        const items = await this.service.list()

        const deflated = alchemy.deflate(Organization, items)

        return deflated
    }

    @Post()
    create( @Body() payload: Interface<Organization> ) {

        const item = alchemy.inflate(Organization, payload)

        return this.service.create( item )
    }

    @Get(':id')
    async retrieve( @Param('id') id: string ) {

        const item = await this.service.retrieve(id)

        const dto = alchemy.deflate(Organization, item)

        return dto
    }

    @Put(':id')
    update( @Param('id') id: string, @Body() payload: Interface<Organization>) {

        const item = alchemy.inflate(Organization, payload)

        this.service.update(id, item)
    }

    @Delete(':id')
    delete( @Param('id') id: string ) {
        this.service.delete(id)
    }


}
