
import { Field, FieldDescriptor, Model } from '@agape/model'
import { Attest } from './validate'

describe('validate', () => {

    let a: Attest
    beforeEach( () => {
        a = new Attest()
    })

    describe('string validation', () => {
        describe('minLength', () => {
            it('should not have errors', () => {

            })
            it('should have the minLength error', () => {

            })
        })
        describe('maxLength', () => {
            it('should not have errors', () => {

            })
            it('should have the maxLength error', () => {

            })
        })
    })

    describe('number validation', () => {
        describe('min', () => {
            it('should not have errors', () => {

            })
            it('should have the min error', () => {

            })
        })
        describe('max', () => {
            it('should not have errors', () => {

            })
            it('should have the min error', () => {

            })
        })
        describe('decimals', () => {
            it('should not have errors', () => {

            })
            it('should have the decimals error', () => {

            })
        })
    })

    describe('custom validation', () => {
        describe('dates', () => {
            it('should have an end date after the start date', () => {

                function afterStartDateValidator( startDate: Date|((o: any) => Date) ) {
                    return function ( value: Date, instance: any, field: FieldDescriptor,  ) {
                        let constraint: Date
                        if ( startDate instanceof Date ) constraint = startDate
                        else constraint = startDate(instance)

                        if ( value <= constraint ) {

                        }
                    }
                }

                @Model class Foo {
                    @Field startDate: Date
                    // @Field({ validators: [ afterStartDateValidator( o => o.startDate ) ] })
                    endDate: Date
                }

            })
        })

    })

})