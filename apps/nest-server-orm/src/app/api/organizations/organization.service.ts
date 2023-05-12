import { Injectable } from '@nestjs/common';
import { orm } from '@agape/orm';

import { Organization } from 'lib-platform'

@Injectable()
export class OrganizationService {
    list() {
        return orm.list(Organization).exec()
    }

    create( item: Organization ) {
        return orm.insert(Organization, item).exec()
    }

    retrieve( id: string ) {
        return orm.retrieve(Organization, id).exec()
    }

    update( id: string, item: Organization ) {
        return orm.update(Organization, id, item).exec()
    }

    delete( id: string ) {
        return orm.delete(Organization, id).exec()
    }
}
