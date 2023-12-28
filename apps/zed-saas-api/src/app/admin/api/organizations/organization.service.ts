import { orm } from '@agape/orm';
import { Exceptions, Injectable } from '@agape/api';
import { Organization } from '../../../shared/documents/organization.document';
import { Exception } from '@agape/exception';
import { AdminOrganizationCreateView, AdminOrganizationUpdateView } from '../../models/organization.models';



@Injectable()
export class AdminOrganizationService {

    async list() {
        return orm.list(Organization).exec()
    }

    async lookup( code: string ) {
        return orm.retrieve(Organization, { code }).exec()
    }

    @Exceptions( new Exception(409, 'An organization with the organization code ${organization.code} already exists') )
    async create( organization: AdminOrganizationCreateView ) {
        const duplicate = await this.lookup(organization.code)

        if ( duplicate ) {
            throw new Exception(409, `An organization with the organization code "${organization.code}" already exists`)
        }

        return orm.insert(AdminOrganizationCreateView, organization).exec()
    }

    async retrieve( id: string ) {
        return orm.retrieve(Organization, id).exec()
    }

    @Exceptions( new Exception(409, 'An organization with the organization code ${organization.code} already exists') )
    async update( id: string, organization: AdminOrganizationUpdateView ) {
        const duplicate = await orm.retrieve(Organization, { id__ne: id, code: organization.code }).exec()

        if ( duplicate ) {
            throw new Exception(409, `An organization with the organization code "${organization.code}" already exists`)
        }
        return orm.update(AdminOrganizationUpdateView, id, organization).exec()
    }

    async delete( id: string ) {
        return orm.delete(Organization, id).exec()
    }

}