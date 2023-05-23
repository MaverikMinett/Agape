


import { ModelDescriptor } from '../../descriptors'
import { Model } from '../class/model'
import { Choices } from './choices'
import { Field } from './field'
import { Primary } from './primary'


describe('Choices', () => {
  
    it('should add choices to the field descriptor', () => {

        const FOO_FOO_CHOICES = [
            { value: 'bar', label: 'Bar' },
            { value: 'baz', label: 'Baz' }
        ]

        @Model class Foo {
            @Primary id: string;

            @Choices( FOO_FOO_CHOICES )
            @Field foo: string;
        }

        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect( d.field('foo').choices ).toEqual( FOO_FOO_CHOICES )

    })

})