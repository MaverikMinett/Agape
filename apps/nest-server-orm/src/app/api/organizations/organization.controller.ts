import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';

import { Interface } from '@agape/types';
import { Organization } from 'lib-platform'

import { alchemy } from '@project-zed/lib-alchemy'
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/organizations')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}


    @Get()
    @UseGuards(AuthGuard)
    async list() {
        const items = await this.service.list()

        const deflated = alchemy.deflate(Organization, items)

        return deflated
    }

    @Post()
    @UseGuards(AuthGuard)
    create( @Body() payload: Interface<Organization> ) {

        const item = alchemy.inflate(Organization, payload)

        return this.service.create( item )
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async retrieve( @Param('id') id: string ) {

        const item = await this.service.retrieve(id)

        const dto = alchemy.deflate(Organization, item)

        return dto
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    update( @Param('id') id: string, @Body() payload: Interface<Organization>) {

        const item = alchemy.inflate(Organization, payload)

        this.service.update(id, item)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    delete( @Param('id') id: string ) {
        this.service.delete(id)
    }


}
