import { deflate } from './serializer'
import { meta } from './meta'

import { lazy } from './decorators/lazy'
import { delegate } from './decorators/delegate'
import { inherit } from './decorators/inherit'
import { nonenumerable } from './decorators/nonenumerable'
import { ephemeral } from './decorators/ephemeral'
import { shadow } from './decorators/shadow'

let o:any, d:any
describe('deflate', () => {
    

    beforeEach( () => {
        o = undefined
        d = undefined
    })

    it('should deflate an object', () => {
        class SimpleObject{ foo: number }
        o = new SimpleObject()
        o.foo = 432000
        d = deflate( o )
        expect( d.foo ).toEqual(432000)
    })
    it('should deflate an object with a default value', () => {
        class SimpleObject{ foo: number = 432000 }
        o = new SimpleObject()
        d = deflate( o )
        expect( d.foo ).toEqual(432000)
    })
    it('should deflate an object with a default value set in the constructor', () => {
        class SimpleObject{ 
            constructor ( public foo: number = 432000 ) {

            }
        }
        o = new SimpleObject()
        d = deflate( o )
        expect( d.foo ).toEqual(432000)
    })
    it('should deflate an object with a constructor attribute', () => {
        class SimpleObject{ 
            constructor ( public foo: number ) {

            }
        }
        o = new SimpleObject( 432000 )
        d = deflate( o )
        expect( d.foo ).toEqual(432000)
    })
    it('should deflate an object with a constructor attribute set explictily', () => {
        class SimpleObject{ 
            constructor ( foo?: number ) {

            }
        }
        o = new SimpleObject( )
        o.foo = 432000
        d = deflate( o )
        expect( d.foo ).toEqual(432000)
    })
    it('should deflate an array of objects', () => {
        class SimpleObject { 
            constructor ( public foo: number ) { 
                
            }
        }
        const o1 = new SimpleObject(43200)
        const o2 = new SimpleObject(33333)
        
        d = deflate([o1,o2])
        expect(d).toEqual([{foo: 43200}, {foo: 33333}])
    })
    it('should deflate nested objects', () => {

        class AObject {
            foo: number = 43200
        }

        class BObject {
            bar: AObject
            constructor() {
                this.bar = new AObject()
            }
        }

        o = new BObject()
        d = deflate( o )
        expect( d.bar.foo).toEqual(43200)
    })

    it('should deflate agape managed properties without the special character', () => {
        class SimpleObject{  }
        meta(SimpleObject).property('bar').default('baz')

        o = new SimpleObject()
        expect( o.bar ).toEqual('baz')
        
        d = deflate( o )
        expect(d).toEqual({'bar':'baz'})
    })

    it('should deflate properties inheritied from base classes', () => {
        class AObject{ foo = 32 }

        class BObject extends AObject{ bar = 42 }

        o = new BObject()

        d = deflate( o )
        expect(d).toEqual({'foo': 32, 'bar': 42})
    })

    it('should not deflate nonenumerable properties', () => {
        class AClass {
            @nonenumerable
            foo:string = "bar"
        }

        o = new AClass()
        let d = deflate(o)
        expect( d.foo ).toBeUndefined()
    })
    it('should not deflate explicityly set nonenumerable properties', () => {
        class AClass {
            @nonenumerable
            foo:string = "bar"
        }

        o = new AClass()
        o.foo = "biz"
        let d = deflate(o)
        expect( d.foo ).toBeUndefined()
    })
    it('should not deflate unpopulated lazy properties', () => {
        class AClass {
            @lazy("bar")
            foo:string
        }

        o = new AClass()
        let d = deflate(o)
        expect( d.foo ).toBeUndefined()
    })
    it('should deflate populated lazy properties', () => {
        class AClass {
            @lazy("bar")
            foo:string
        }

        o = new AClass()
        o.foo

        d = deflate(o)
        expect( d.foo ).toEqual("bar")
    })

    it('should deflate unpopulated lazy properties with lazy option', () => {
        class AClass {
            @lazy("bar")
            foo:string
        }

        o = new AClass()

        d = deflate(o, { lazy: true })
        expect( d.foo ).toEqual("bar")
    })
    it('should deflate unpopulated lazy properties with lazy option set', () => {
        class AClass {
            @lazy("bar")
            foo:string
        }

        o = new AClass()
        let d = deflate(o, { lazy: true })
        expect( d.foo ).toBe('bar')
    })

    it('should not deflate inheritied properties', () => {

        class AClass {
            foo:string = "bar"
        }

        class BClass {

            a: AClass = new AClass()

            @inherit( o => o.a )
            foo:string
        }

        o = new BClass()
        expect( o.foo ).toBe( o.a.foo )

        let d = deflate(o)
        expect( d.foo ).toBeUndefined()

    })

    it('should deflate populated inheritied values', () => {

        class AClass {
            foo:string = "bar"
        }

        class BClass {

            a: AClass = new AClass()

            @inherit( o => o.a )
            foo:string
        }

        o = new BClass()
        o.foo = "biz"

        let d = deflate(o)
        expect( d.foo ).toBe("biz")

    })


    it('should not deflate delegated properties', () => {

        class AObject { foo:number = 32 }

        class BObject { 
            @lazy( o => new AObject() )
            bar: AObject

            @delegate( o => o.bar ) foo:number
        }

        o = new BObject()
        o.foo
        d = deflate(o)

        expect(d).toEqual({'bar':{'foo':32}})

    })

    it('should deflate an object with no properties managed by agape', () => {
        class AObject { 
            @ephemeral( o => o.bar ) foo:number
        }
    })

    it('should not deflate unset ephemeral properties', () => {
        class AObject { 
            @ephemeral( o => 42 ) foo:number
        }

        o = new AObject()
        d = deflate(o)

        expect(d).toEqual({})
    })

    it('should deflate ephemeral properties which have been explicitly set a value', () => {
        class AObject { 
            @ephemeral( o => 42 ) foo:number
        }

        o = new AObject()
        o.foo = 32
        d = deflate(o)

        expect(d).toEqual({'foo': 32})
    })

    it('should deflate ephemeral properties if the ephemeral option is set', () => {
        class AObject { 
            @ephemeral( o => 42 ) foo:number
        }

        o = new AObject()
        d = deflate(o, { ephemeral: true })

        expect(d).toEqual({foo: 42})
    })

    it('should deflate an array of objects where the ephemeral option is set', () => {
        class AObject { 
            @ephemeral( o => 42 ) foo:number
        }

        const [o1, o2] = [new AObject(), new AObject()]
        d = deflate([o1,o2], { ephemeral: true })

        expect(d).toEqual([{foo: 42}, {foo:42}])
    })

    it('should not deflate unset shadow properties', () => {
        class AObject { 
            @shadow( o => 42 ) foo:number
        }

        o = new AObject()
        d = deflate(o)

        expect(d).toEqual({})
    })
    it('should deflate shadow properties which have been explicitly set a value', () => {
        class AObject { 
            @shadow( o => 42 ) foo:number
        }

        o = new AObject()
        o.foo = 32
        d = deflate(o)

        expect(d).toEqual({'foo': 32})
    })

    it('should deflate shadow properties if the shadow option is set', () => {
        class AObject { 
            @shadow( o => 42 ) foo:number
        }

        o = new AObject()
        d = deflate(o, { shadow: true })

        expect(d).toEqual({foo: 42})
    })

    it('should deflate an array of objects where the shadow option is set', () => {
        class AObject { 
            @shadow( o => 42 ) foo:number
        }

        const [o1, o2] = [new AObject(), new AObject()]
        d = deflate([o1,o2], { shadow: true })

        expect(d).toEqual([{foo: 42}, {foo:42}])
    })

    it('should not include methods', () => {
        class SimpleObject {
            foo: string = "bar"

            baz():string {
                return "biz"
            }
        }

        o = new SimpleObject()

        d = deflate( o )

        expect(d).toEqual({'foo': 'bar'})
    })

})