
import { Field, Model } from '@agape/model';
import { Alchemy } from './alchemy'
import { Serializer } from './serializer'


class Foo {
    bar: string;
}

class FooSerializer implements Serializer {
    inflate( value: string ) {
        const foo = new Foo()
        foo.bar = value
        return foo
    }
    deflate ( instance: Foo ) {
        return instance.bar
    }
}

@Model class MyModel {

    @Field foo: Foo

    @Field bar: string
}

describe('Alchemy', () => {

    let a: Alchemy


    beforeEach( () => {
        a = undefined
    })

    it('should instantiate', () => {
        a = new Alchemy()
    })

    it('should instantiate with no serializers registered', () => {
        a = new Alchemy()
        expect(a.serializers.values.length).toBe(0)
    })

    it('should register a serializer', () => {
        a = new Alchemy()
        a.register( Foo, new FooSerializer() )
        expect(a.serializers.values.length).toBe(0)
    })

    it('should register a serializer', () => {
        a = new Alchemy()
        a.register( Foo, new FooSerializer() )
        expect(a.serializers.values.length).toBe(0)
    })

    it('should deflate a model', () => {
        a = new Alchemy()
        a.register( Foo, new FooSerializer() )

        const my = new MyModel()
        my.foo = new Foo()
        my.foo.bar = 'baz'
        my.bar = 'biz'
        expect( a.deflate(MyModel,my) ).toEqual({ foo: 'baz', bar: 'biz' })
    })

    it('should throw an error if called on a non-model', () => {
        const foo = new Foo()
        foo.bar = 'biz'
        expect( () => a.deflate(Foo, foo) ).toThrowError()
    })

    it('should inflate a model', () => {
        a = new Alchemy()
        a.register( Foo, new FooSerializer() )
        
        const my = a.inflate( MyModel, { foo: 'baz', bar: 'biz' } )
        expect(my).toBeInstanceOf(MyModel)
        expect(my.foo).toBeInstanceOf(Foo)
        expect(my.foo.bar).toBe('baz')
        expect(my.bar).toBe('biz')
    })

})