import { } from 'jasmine'
import { include } from './decorators/include';

import { MethodDescriptor, MethodDescriptorSet, ObjectDescriptor, PropertyDescriptor, PropertyDescriptorSet  } from './descriptors'
import { meta } from './meta';


let d, o, m;

describe('MethodDescriptor', () => {
    beforeEach( () => {
        o = undefined
        d = undefined
    })

    it('should instantiate', () => {
        d = new MethodDescriptor()    
        expect(d).toBeTruthy()
    })

    it('should set a default implementation', () => {
        let o = {
            called: false
        }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        d.call(o)

        expect( o.called ).toBeTrue()
    })

    it('should override the implementation', () => {
        let o = { called: false, overwritten: false }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        d.override(function() { this.overwritten = true })
        d.call(o)

        expect( o.called ).toBeFalse()
        expect( o.overwritten ).toBeTrue()
    })


    it('should run multiple before modifiers', () => {
        let o = { called: false, before: 0 }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        d.before(function() { this.before += this.called ? 0 : 1 })
        d.before(function() { this.before += this.called ? 0 : 1 })
        d.before(function() { this.before += this.called ? 0 : 1 })
        d.call(o)

        expect( o.called ).toBeTrue()
        expect( o.before ).toBe(3)
    })

    it('should run the stacked modifiers', () => {
        let o = { called: false, stacked: 0 }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        d.stack(function() { this.stacked += this.called ? 1 : 0 })
        d.stack(function() { this.stacked += this.called ? 1 : 0 })
        d.stack(function() { this.stacked += this.called ? 1 : 0 })
        d.call(o)

        expect( o.called ).toBeTrue()
        expect( o.stacked ).toBe(3)
    })


    it('should run multiple after modifiers', () => {
        let o = { called: false, after: 0 }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        d.after(function() { this.after += this.called ? 1 : 0 })
        d.after(function() { this.after += this.called ? 1 : 0 })
        d.after(function() { this.after += this.called ? 1 : 0 })
        d.call(o)

        expect( o.called ).toBeTrue()
        expect( o.after ).toBe(3)
    })

    it('should run after modifiers after stacked', () => {
        let o = { called: false, after: 0 }

        d = new MethodDescriptor() 
        d.stack(function() { this.called = true })
        d.after(function() { this.after = this.called ? true : false })
        d.call(o)

        expect( o.called ).toBeTrue()
        expect( o.after ).toBeTrue()
    })


    it('should include another descriptor', () => {
        let o = { called: false, after: 0 }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        

        let e = new MethodDescriptor()
        e.after(function() { this.after = this.called ? true : false })

        e.include(d)

        e.call(o)

        expect( o.called ).toBeTrue()
        expect( o.after ).toBeTrue()
    })



    // it('should call the around modifiers', () => {
    //     let o = { called: false, after: 0 }

    //     d = new MethodDescriptor() 
    //     d.default(function() { console.log('Innest') })
    //     d.around(function(orig, ...args) { 
    //         console.log('Inner')
    //     })
    //     d.around(function(orig, ...args) { 
    //         console.log('Outer')
    //     })
    //     d.call(o)

    //     expect( o.called ).toBeTrue()
    //     expect( o.after ).toBeTrue()
    // })
    
})

describe('MethodDescriptor', () => {
    beforeEach( () => {
        o = undefined
        d = undefined
    })

    it('should instantiate', () => {
        d = new MethodDescriptorSet()    
        expect(d).toBeTruthy()
    })

    // it('should set a default implementation', () => {
    //     let o = {
    //         called: false
    //     }

    //     d = new MethodDescriptor() 
    //     d.default(function() { this.called = true })
    //     d.call(o)

    //     expect( o.called ).toBeTrue()
    // })


})




let b
describe('PropertyDescriptor', () => {
    beforeEach( () => {
        o = undefined
        d = undefined
    })

    it('should instantiate', () => {
        o = { }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')    
        expect(d).toBeTruthy()
    })


    it('should should call the setter', () => {
        o = {  }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo') 
        d.set(o, true)

        expect( o.ʘfoo ).toBeTrue()
    })

    it('should should call the getter', () => {
        o = { ʘfoo: true }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo') 

        expect( d.get(o) ).toBeTrue()
    })
    
    it('should provide a default value', () => {
        o = {  }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.default(32)
        d.performBuild(o)

        expect( d.get(o) ).toEqual(32) 
    })

    it('should provide a lazy default value', () => {
        o = {  }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.default( o => ['hello'] ).lazy()

        expect( d.get(o) ).toEqual(['hello']) 
    })

    it('should be read only', () => {
        o = {  }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.default( o => ['hello'] ).readonly(true)

        expect( function () { d.set( o, ['test'] ) }).toThrowError()
    })

    it('should include a property descriptor', () => {
        o = {  }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.default( o => 'bar' ).lazy().readonly(true)

        o = {  }
        b = new ObjectDescriptor( o )
        let c = new PropertyDescriptor(b, 'foo')
        c.include(d)

        
        expect( c.get(o) ).toBe('bar')
    })


    it('should inherit a value', () => {
        let p: any = { foo: 'bar' }
        let o: any = { boo: 'baz', parent: p }

        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.inherit( o => o.parent )
        d.install_dispatcher()

        expect(o.foo).toEqual('bar')

        p.foo = 'baz'
        expect(o.foo).toEqual('baz')
    })

    it('should return undefined if the object to inherit from does not exist', () => {
        let o: any = { boo: 'baz', parent: undefined }

        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.inherit( o => o.parent )
        d.install_dispatcher()

        expect(o.foo).toEqual(undefined)

    })

    it('should over-ride an inherited value', () => {
        let p: any = { foo: 'bar' }
        let o: any = { boo: 'baz', parent: p }

        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.inherit( o => o.parent )
        d.install_dispatcher()

        expect(o.foo).toEqual('bar')

        o.foo = 'baz'
        expect(o.foo).toEqual('baz')
        expect(p.foo).toEqual('bar')
    })

    it('should inherit from a property with a different name', () => {
        let p: any = { foo: 'bar' }
        let o: any = { parent: p }

        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'boo')
        d.inherit( o => o.parent, 'foo' )
        d.install_dispatcher()

        expect(o.foo).toEqual(undefined)
        expect(o.boo).toEqual('bar')

        p.foo = 'baz'
        expect(o.boo).toEqual('baz')
    })

    it('should delegate a property', () => {
        let c: any = { foo: 'bar' }
        let o: any = { child: c }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.delegate( o => o.child )
        d.install_dispatcher()

        expect(o.foo).toEqual('bar')

        c.foo = 'baz'
        expect(o.foo).toEqual('baz')
    })
    
    it('should delegate to a property with a different name', () => {
        let c: any = { bar: 'baz' }
        let o: any = { child: c }
        b = new ObjectDescriptor( o )

        d = new PropertyDescriptor(b, 'foo')
        d.delegate( o => o.child, 'bar' )
        d.install_dispatcher()

        expect(o.foo).toEqual('baz')

        c.bar = 'biz'
        expect(o.foo).toEqual('biz')
    })

    it('should create an enumerable property', () => {
        let o: any = { }
        b = new ObjectDescriptor( o )

        d = new PropertyDescriptor(b, 'foo')
        d.default(42).lazy()
        d.install_dispatcher()

        expect(o.foo).toEqual(42)
        expect(o.ʘfoo).toEqual(42)

        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }


        expect(inheritedEnumerables.includes('foo')).toBeTrue()
        expect(inheritedEnumerables.includes('ʘfoo')).toBeFalse()
    })


    it('should create non-enumerable property', () => {
        let o: any = { }
        b = new ObjectDescriptor( o )

        d = new PropertyDescriptor(b, 'foo')
        d.default(42).enumerable(false).lazy()
        d.install_dispatcher()

        expect(o.foo).toEqual(42)
        expect(JSON.parse(JSON.stringify(o))).toEqual({})
    })

    it('should create a property and then change it to non-enumerable', () => {
        let o: any = { }
        b = new ObjectDescriptor( o )

        d = new PropertyDescriptor(b, 'foo')
        d.install_dispatcher()
        d.default(42).enumerable(false).lazy()
        

        expect(o.foo).toEqual(42)
        expect(JSON.parse(JSON.stringify(o))).toEqual({})
    })

    describe('build & performBuild', () => {

        describe('build', () => {
            it('should set the ʘbuild property to true', () => {
                class AClass {
                    foo:string
                }

                const q = new ObjectDescriptor(AClass)
                q.property('foo').build()
                expect( q.property('foo').ʘbuild ).toBeTrue()
            })

            it('should set the default value', () => {
                class AClass {
                    foo:string
                }

                const q = new ObjectDescriptor(AClass)
                q.property('foo').build()
                expect( q.property('foo').ʘdefault ).toBeTruthy()
            })
        })

        describe('performBuild', () => {
            it('should set the value on an instance', () => {
                class AClass {
                    foo:string
                }

                const o = {
                    _build_foo: () => {
                        return "bar"
                    }
                }

                const q = new ObjectDescriptor(AClass)
                q.property('foo').build()

                q.property('foo').performBuild(o)

                expect( o['ʘfoo'] ).toBe("bar")
            })
        })


        it('should use a default method name if no arguments provided', () => {
            class AClass {
                foo:string
            }

            const o = {
                _build_foo: jasmine.createSpy()
            }

            const q = new ObjectDescriptor(AClass)
            q.property('foo').build()

            q.property('foo').performBuild(o)

            expect( o._build_foo ).toHaveBeenCalled()
        })


        it('should use the provided method name to build the value', () => {
            class AClass {
                foo:string
            }

            const o = {
                _build_foosie_doosie: jasmine.createSpy()
            }

            const q = new ObjectDescriptor(AClass)
            q.property('foo').build('_build_foosie_doosie')

            q.property('foo').performBuild(o)

            expect( o._build_foosie_doosie ).toHaveBeenCalled()
        })

        it('should use the provided function to build the value', () => {
            class AClass {
                foo:string
            }

            const o = { }

            const q = new ObjectDescriptor(AClass)
            q.property('foo').build( o => 42 )

            q.property('foo').performBuild(o)

            expect( o['ʘfoo'] ).toBe(42)
        })
    })


})



describe('ObjectDescriptor', () => {

    beforeEach( () => {
        o = undefined
        m = undefined
    })

    it('should instantiate a new object', () => {

        class SimpleObject {

        }

        o = new SimpleObject()
        expect( o ).toBeTruthy()

    })

    it('should define a property on an object', () => {

        class SimpleObject { }

        let p: any = SimpleObject.prototype

        if ( ! p.Δmeta ) p.Δmeta = new ObjectDescriptor(p)

        p.Δmeta.property('foo').default(32).lazy()

        let o:any = new SimpleObject()

        expect( o.foo ).toEqual(32)
    })

    it('should define a method on an object', () => {

        class SimpleObject { called:boolean }

        let p: any = SimpleObject.prototype
        p.Δmeta = new ObjectDescriptor(p)

        p.Δmeta.method('foo').default(function() {
            this.called = true
        })

        let o:any = new SimpleObject()
        expect( o.foo ).toBeTruthy()
        o.foo()
        expect( o.called ).toBeTrue()
    })

    it('should allow a spy to be installed on method defined via the descriptor', () => {

        class SimpleObject { called:boolean }

        let p: any = SimpleObject.prototype
        p.Δmeta = new ObjectDescriptor(p)

        p.Δmeta.method('foo').default(function() {
            this.called = true
        })

        let o:any = new SimpleObject()
        spyOn( o, 'foo' )
        o.foo()
        expect( o.foo ).toHaveBeenCalled()

    })


    it('should include the natively defined methods of another class', () => {

        class SimpleTrait { 
            foo() { return true }
        }
        let p: any = SimpleTrait.prototype
        p.Δmeta = new ObjectDescriptor(p)


        class SimpleObject  {
            bar() { return true }
        }
        let q: any = SimpleObject.prototype
        q.Δmeta = new ObjectDescriptor(q)
        q.Δmeta.include( p )

        let o:any = new SimpleObject()
        expect( o.foo() ).toBeTrue()
        expect( o.bar() ).toBeTrue()
    })

    it('should allow a spy to be installed on the natively defined methods of another class', () => {
        class SimpleTrait { 
            foo() { return true }
        }
        let p: any = SimpleTrait.prototype
        p.Δmeta = new ObjectDescriptor(p)


        class SimpleObject  {
            bar() { return true }
        }
        let q: any = SimpleObject.prototype
        q.Δmeta = new ObjectDescriptor(q)
        q.Δmeta.include( p )

        let o:any = new SimpleObject()
        expect( o.foo() ).toBeTrue()
        expect( o.bar() ).toBeTrue()

        spyOn(o, 'foo')
        o.foo()
        expect( o.foo ).toHaveBeenCalled();
    })

    it('should include the dynamic methods of another class', () => {

        class SimpleTrait {}
        let p: any = SimpleTrait.prototype
        p.Δmeta = new ObjectDescriptor(p)
        p.Δmeta.method('foo' ).default( o => true )


        class SimpleObject  { }
        let q: any = SimpleObject.prototype
        q.Δmeta = new ObjectDescriptor(q)
        q.Δmeta.include( p )

        let o:any = new SimpleObject()
        expect( o.foo() ).toBeTrue()
        // expect( o.bar() ).toBeTrue()

    })


    it('should include the dynamic properties of another class', () => {

        class SimpleTrait { }
        let p: any = SimpleTrait.prototype
        p.Δmeta = new ObjectDescriptor(p)
        p.Δmeta.property('foo').default(32).lazy()

        class SimpleObject  {}
        let q: any = SimpleObject.prototype
        q.Δmeta = new ObjectDescriptor(q)
        q.Δmeta.include( p )

        let o:any = new SimpleObject()
        expect( o.foo ).toBe(32)

    })

    describe('does', () => {
        it('should find a trait on the same class', () => {
            class ATrait {

            }
            class AClass {

            }
            let q: any = AClass.prototype
            q.Δmeta = new ObjectDescriptor(q)
            q.Δmeta.include( ATrait.prototype )

            expect( q.Δmeta.does(ATrait.prototype) ).toBeTrue()
        })
        it('should find a trait on a parent class', () => {
            class ATrait {

            }
            class AClass {

            }
            class BClass extends AClass {

            }
            let q: any = AClass.prototype
            q.Δmeta = new ObjectDescriptor(q)
            q.Δmeta.include( ATrait )

            let r: any = BClass.prototype
            r.Δmeta = new ObjectDescriptor(r)

            expect( r.Δmeta.does(ATrait) ).toBeTrue()
        })
        it('should find a trait on an ancestor class', () => {
            class ATrait {

            }
            class AClass {

            }
            class BClass extends AClass {

            }
            let q: any = AClass.prototype
            q.Δmeta = new ObjectDescriptor(q)
            q.Δmeta.include( ATrait )

            let r: any = BClass.prototype
            r.Δmeta = new ObjectDescriptor(r)

            let s: any = BClass.prototype
            s.Δmeta = new ObjectDescriptor(s)

            expect( s.Δmeta.does(ATrait) ).toBeTrue()
        })
        it('should not find the trait', () => {
            class ATrait {

            }
            class AClass {

            }
            let q: any = AClass.prototype
            q.Δmeta = new ObjectDescriptor(q)

            expect( q.Δmeta.does(ATrait.prototype) ).toBeFalse()
        })
        it('should find traits included via other traits', () => {
            class ATrait {

            }

            class BTrait {

            }

            class AClass {

            }

            let bt: any = BTrait.prototype
            bt.Δmeta = new ObjectDescriptor(bt)
            bt.Δmeta.include(ATrait)

            let ac: any = AClass.prototype
            ac.Δmeta = new ObjectDescriptor(ac)
            ac.Δmeta.include(BTrait)

            expect( ac.Δmeta.does(ATrait) ).toBeTrue()
        })
    })

    describe('building', () => {
        describe('addBuildProperty', () => {
            it('should add the property to the build properties', () => {
                class AClass {
                    
                }    
                const p = meta(AClass).property('foo')
                meta(AClass).addBuildProperty( p )
                expect( meta(AClass).properties.all() ).toEqual([p])
            })
        })
        describe('performBuild', () => {
            it('should build a property', () => {
                class AClass {
                    
                }    

                const p = meta(AClass).property('foo').default(42)
                meta(AClass).addBuildProperty( p )

                spyOn( meta(AClass), 'performBuild' ).and.callThrough()
                const o = new AClass()
                meta(AClass).performBuild(o)

                expect( meta(AClass).performBuild ).toHaveBeenCalled()
                expect( o['foo'] ).toEqual(42)
            })
        })
    })


    // it('should create a new descriptor from an existing descriptor', () => {

    //     // o = {}
    //     // m = new ObjectDescriptor()
    //     // m.property(o, 'foo').default(32)

    //     // let ʘ = {}
    //     // let n = new ObjectDescriptor(ʘ,m)
    //     // n. 
    //     // expect(c).toBeTruthy()
    // })


} )