import { Injectable } from "@agape/api";
import { orm } from '@agape/orm';
import { Class } from "@agape/types";
import { Document, Model, View, ViewDescriptor } from '@agape/model'
import { Organization } from "../documents/organization.document";
import { Exception } from "@agape/exception";
import { Authentication } from "../models/auth/authentication.model";
import { FilterCriteria } from "libs/agape/orm/src/lib/types";

@Injectable()
export class DataService {

    supersets = new Map<Class<Document>, Class<Document>>()

    private validateAuth( auth: Authentication ) {
        if ( ! auth.organization ) {
            throw new Exception(400, 'Authorized organization cannot be null or undefined')
        }
    }

    getSuperset<T extends Class<Document>>(view: T) {

        interface superset extends T {
            
        }

        const superset = class extends Document<string> {
            id: string
            organization: string
        } 

        if ( this.supersets.has(view) ) {
            return this.supersets.get(view) as typeof superset
        }
        
        View(view)(superset)

        const supersetDescriptor = Model.descriptor(superset) as ViewDescriptor

        const field = supersetDescriptor.field('organization')
        field.foreignKey = true
        field.foreignModel = Organization
        field.designType = String

        this.supersets.set(view, superset)

        return superset as typeof superset
    }

    async list<T extends Class<Document>>( auth: Authentication, model: T ) {
        this.validateAuth( auth )
        const superset = this.getSuperset( model )
        const filter = { organization: auth.organization }
        const results = await orm.list({ document: superset, view: model }, filter).exec()
        return results
    }

    async create<T extends Class<Document>>( auth: Authentication, model: T, item: InstanceType<T> ) {
        this.validateAuth( auth )
        const superset = this.getSuperset( model )
        const result = await orm.insert(
                { document: superset, view: model }, 
                {organization: auth.organization, ...item}
            ).exec()
        return result
    }

    async retrieve<T extends Class<Document>>( auth: Authentication, model: T, filter: FilterCriteria<InstanceType<T>> ) {
        this.validateAuth( auth )
        
        const superset = this.getSuperset( model )

        const result = await orm.retrieve(
                { document: superset, view: model }, 
                { organization: auth.organization, ...filter }
            ).exec()
        return result
    }

    async update<T extends Class<Document>>( auth: Authentication, model: T, id: string, item: InstanceType<T> ) {
        this.validateAuth( auth )
        const superset = this.getSuperset( model )
        const results = await orm.update(
                {document: superset, view: model}, 
                {organization: auth.organization, id },
                item
            ).exec()
        return results
    }

    async delete<T extends Class<Document>>( auth: Authentication, model: T, id: string,) {
        this.validateAuth( auth )
        const superset = this.getSuperset( model )

        const result = await orm.delete(superset, { organization: auth.organization, id }).exec()
        return result
    }

}