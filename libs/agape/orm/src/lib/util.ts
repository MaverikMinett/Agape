import { Document, Model, ModelDescriptor } from "@agape/model";
import { Class } from '@agape/types';
import { FilterCriteria } from "./types";
import { ObjectId } from "mongodb";

import { classExtends } from '@agape/object'

export function selectCriteriaFromFilterCriteria<T>( descriptor: ModelDescriptor, filterCriteria: FilterCriteria<T> ) {
    let select = {}
    const criterias = []


    // create select criteria from filter
    if ( filterCriteria ) {
        for ( let filterField of Object.keys(filterCriteria) ) {
            if ( filterField.match(/__/) ) {
                const [ filterFieldName, operator ] = filterField.split('__')
                let selectFieldName: string
                let selectFieldValue: any
                if ( descriptor.fields.get(filterFieldName).primary ) {
                    selectFieldName = '_id'
                }
                else {
                    selectFieldName = filterFieldName
                }

                const criteria = {
                    [selectFieldName]: { }
                }


                if ( operator === 'in' ) {
                    if ( descriptor.fields.get(filterFieldName).primary ) {
                        selectFieldValue = filterCriteria[filterField].map( value => new ObjectId(value) )
                    }
                    else if ( classExtends(descriptor.fields.get(filterFieldName).designType as Class, Document) ) {
                        if ( typeof filterCriteria[filterField][0] === 'string' ) {
                            selectFieldValue = filterCriteria[filterField].map( value => new ObjectId(value) )
                        }
                        else {
                            const foreignModelDescriptor = Model.descriptor(descriptor.fields.get(filterFieldName).designType as Class)
                            const primaryField = foreignModelDescriptor.primaryField
                            selectFieldValue = filterCriteria[filterField].map( value => new ObjectId( primaryField.getValue(value) ) )
                        }
                    }
                    else {
                        selectFieldValue = filterCriteria[filterField]
                    }
                    criteria[selectFieldName]['$in'] = selectFieldValue
                }
                else if ( operator === 'search' ) {
                    if ( descriptor.fields.get(filterFieldName).primary ) {
                        throw new Error('Cannot search on primary key')
                    }
                    selectFieldValue = new RegExp(filterCriteria[filterField]) 
                    criteria[selectFieldName]['$regex'] = selectFieldValue
                }
                else if ( operator === 'searchi' ) {
                    if ( descriptor.fields.get(filterFieldName).primary ) {
                        throw new Error('Cannot search on primary key')
                    }
                    selectFieldValue = new RegExp(filterCriteria[filterField], 'i') 
                    criteria[selectFieldName]['$regex'] = selectFieldValue
                }
                else if ( operator === 'gt' || operator === 'gte' || operator === 'lt' || operator === 'lte' ) {
                    selectFieldValue = filterCriteria[filterField]
                    const selectOperator = `$${operator}`
                    criteria[selectFieldName][selectOperator] = selectFieldValue
                }
                else {
                    throw new Error(`Invalid operator "${operator}" in filter field "${filterField}"`)
                }
                criterias.push( criteria )
            }
            else {
                let selectFieldName: string
                let selectFieldValue: any
                if ( descriptor.fields.get(filterField).primary ) {
                    selectFieldName = '_id'
                    selectFieldValue = new ObjectId(filterCriteria[filterField])
                }
                else if ( classExtends(descriptor.fields.get(filterField).designType as Class, Document) ) {
                    selectFieldName = filterField
                    if ( typeof filterCriteria[filterField][0] === 'string' ) {
                        selectFieldValue = new ObjectId(filterCriteria[filterField])
                    }
                    else {
                        const foreignModelDescriptor = Model.descriptor(descriptor.fields.get(filterField).designType as Class)
                        const primaryField = foreignModelDescriptor.primaryField
                        selectFieldValue = new ObjectId( primaryField.getValue(filterCriteria[filterField]) )
                    }
                }
                else if ( descriptor.fields.get(filterField).foreignKey ) {
                    selectFieldName = filterField
                    if ( filterCriteria[filterField] !== undefined && filterCriteria[filterField] !== null ) {
                        selectFieldValue = new ObjectId(filterCriteria[filterField])
                    }
                    else {
                        selectFieldValue = filterCriteria[filterField]
                    }
                }
                else {
                    selectFieldName = filterField
                    selectFieldValue = filterCriteria[filterField]
                }
                const criteria = {
                    [selectFieldName]: { }
                }
                criteria[selectFieldName] = selectFieldValue

                criterias.push( criteria )
            }

        }

        if ( criterias.length === 1 ) {
            select = criterias[0]
        }
        else if ( criterias.length > 1 ) {
            select['$and'] = criterias
        }
    }

    return select
}

