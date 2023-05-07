
import { MethodDescriptor, MethodDescriptorSet, ObjectDescriptor, PropertyDescriptor, PropertyDescriptorSet  } from './descriptors'


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

        expect( o.called ).toBe(true)
    })

    it('should override the implementation', () => {
        let o = { called: false, overwritten: false }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        d.override(function() { this.overwritten = true })
        d.call(o)

        expect( o.called ).toBe(false)
        expect( o.overwritten ).toBe(true)
    })


    it('should run multiple before modifiers', () => {
        let o = { called: false, before: 0 }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        d.before(function() { this.before += this.called ? 0 : 1 })
        d.before(function() { this.before += this.called ? 0 : 1 })
        d.before(function() { this.before += this.called ? 0 : 1 })
        d.call(o)

        expect( o.called ).toBe(true)
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

        expect( o.called ).toBe(true)
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

        expect( o.called ).toBe(true)
        expect( o.after ).toBe(3)
    })

    it('should run after modifiers after stacked', () => {
        let o = { called: false, after: 0 }

        d = new MethodDescriptor() 
        d.stack(function() { this.called = true })
        d.after(function() { this.after = this.called ? true : false })
        d.call(o)

        expect( o.called ).toBe(true)
        expect( o.after ).toBe(true)
    })


    it('should include another descriptor', () => {
        let o = { called: false, after: 0 }

        d = new MethodDescriptor() 
        d.default(function() { this.called = true })
        

        let e = new MethodDescriptor()
        e.after(function() { this.after = this.called ? true : false })

        e.include(d)

        e.call(o)

        expect( o.called ).toBe(true)
        expect( o.after ).toBe(true)
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

    //     expect( o.called ).toBe(true)
    //     expect( o.after ).toBe(true)
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

    //     expect( o.called ).toBe(true)
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

        expect( o.ʘfoo ).toBe(true)
    })

    it('should should call the getter', () => {
        o = { ʘfoo: true }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo') 

        expect( d.get(o) ).toBe(true)
    })
    
    it('should provide a default value', () => {
        o = {  }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.default(32)

        expect( d.get(o) ).toEqual(32) 
    })

    it('should provide a lazy default value', () => {
        o = {  }
        b = new ObjectDescriptor( o )
        d = new PropertyDescriptor(b, 'foo')
        d.default( o => ['hello'] )

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
        d.default( o => 'bar' ).readonly(true)

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
        d.default(42)
        d.install_dispatcher()

        expect(o.foo).toEqual(42)
        expect(o.ʘfoo).toEqual(42)

        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }


        expect(inheritedEnumerables.includes('foo')).toBe(true)
        expect(inheritedEnumerables.includes('ʘfoo')).toBe(false)
    })


    it('should create non-enumerable property', () => {
        let o: any = { }
        b = new ObjectDescriptor( o )

        d = new PropertyDescriptor(b, 'foo')
        d.default(42).enumerable(false)
        d.install_dispatcher()

        expect(o.foo).toEqual(42)
        expect(JSON.parse(JSON.stringify(o))).toEqual({})
    })

    it('should create a property and then change it to non-enumerable', () => {
        let o: any = { }
        b = new ObjectDescriptor( o )

        d = new PropertyDescriptor(b, 'foo')
        d.install_dispatcher()
        d.default(42).enumerable(false)
        

        expect(o.foo).toEqual(42)
        expect(JSON.parse(JSON.stringify(o))).toEqual({})
    })

    it('should create an ephemeral property', () => {
        let o: any = { }
        b = new ObjectDescriptor( o )

        d = new PropertyDescriptor(b, 'foo')
        d.install_dispatcher()
        d.ephemeral(true)
        

        expect(o.foo).toEqual(true)
        expect(JSON.parse(JSON.stringify(o))).toEqual({foo: true})
    })

    it('should create an shadow property', () => {
        let o: any = { }
        b = new ObjectDescriptor( o )

        d = new PropertyDescriptor(b, 'foo')
        d.install_dispatcher()
        d.shadow(true)
        

        expect(o.foo).toEqual(true)
        expect(o.ʘfoo).toEqual(undefined)
        expect(o.ʘʘfoo).toEqual(true)
        expect(JSON.parse(JSON.stringify(o))).toEqual({foo: true})
    })

    describe('clearShadow', () => {
        it('should clear the shadow value', () => {
            let o: any = { }
            b = new ObjectDescriptor( o )
    
            d = new PropertyDescriptor(b, 'foo')
            d.install_dispatcher()
            d.shadow(true)
            
            expect(o.foo).toEqual(true)
            expect(o.ʘfoo).toEqual(undefined)
            expect(o.ʘʘfoo).toEqual(true)

            d.clearShadow(o)
            expect(o.ʘʘfoo).toEqual(undefined)
        })
    })



    describe('include', () => {

        it('should include the default option', () => {
            o = {  }
            b = new ObjectDescriptor( o )
            d = new PropertyDescriptor(b, 'foo')
            d.default('bar')
    
            o = {  }
            b = new ObjectDescriptor( o )
            let c = new PropertyDescriptor(b, 'foo')
            c.include(d)
    
            /* test that the option is set */
            expect(c.ʘdefault).toBe('bar')

            /* test functionality */
            expect( c.get(o) ).toBe('bar')
        })

        it('should include override definitions', () => {
            o = {  }
            b = new ObjectDescriptor( o )
            d = new PropertyDescriptor(b, 'foo')
            d.default( o => 'bar' ).override(true)
            d.install_dispatcher()
    
            o = {  }
            b = new ObjectDescriptor( o )
            let c = new PropertyDescriptor(b, 'foo')
            c.include(d)
            c.install_dispatcher()
    
            /* test that the option is set */
            expect(c.ʘoverride).toBe(true)
            
            /* test functionality */
            expect( c.get(o) ).toBe('bar')
        })

        it('should include readonly definitions', () => {
            o = {  }
            b = new ObjectDescriptor( o )
            d = new PropertyDescriptor(b, 'foo')
            d.default( o => 'bar' ).readonly(true)
            d.install_dispatcher()

            o = {  }
            b = new ObjectDescriptor( o )
            let c = new PropertyDescriptor(b, 'foo')
            c.include(d)
            c.install_dispatcher()
    
            /* test that the option is set */
            expect(c.ʘreadonly).toBe(true)
            
            /* test functionality */
            expect( c.get(o) ).toBe('bar')
        })

       it('should include the delegate definitions', () => {
            
            const toObject = { foo: 'loco' }
            
            o = {  }
            b = new ObjectDescriptor( o )
            d = new PropertyDescriptor(b, 'foo')

            const d1:PropertyDescriptor = d
            d1.delegate(toObject, 'foo')
            d1.install_dispatcher()
    
            o = {  }
            b = new ObjectDescriptor( o )
            let c = new PropertyDescriptor(b, 'foo')
            c.include(d)
            c.install_dispatcher()
    
            /* test that the option is set */
            expect(c.ʘdelegate).toEqual({ to: toObject , property: 'foo'})
            
            /* test functionality */
            expect( c.get(o) ).toBe('loco')
        })

        it('should include the enumeralble definition', () => {
            let o: any = { }
            b = new ObjectDescriptor( o )
    
            d = new PropertyDescriptor(b, 'foo')
            d.install_dispatcher()
            d.default(42).enumerable(false)
            
            expect(o.foo).toEqual(42)
            expect(JSON.parse(JSON.stringify(o))).toEqual({})

            o = {}
            b = new ObjectDescriptor( o )
            let c = new PropertyDescriptor(b, 'foo')
            c.include(d)
            c.install_dispatcher()

            expect(d.ʘenumerable).toBe(false)
            o.foo = 'hello'

            expect(o.foo).toBe('hello')
            expect( JSON.parse(JSON.stringify(o)) ).toEqual({})
        })

        it('should include ephemeral definitions', () => {
            o = {  }
            b = new ObjectDescriptor( o )
            d = new PropertyDescriptor(b, 'foo')
            d.ephemeral('bar')
            d.install_dispatcher()
    
            o = {  }
            b = new ObjectDescriptor( o )
            let c = new PropertyDescriptor(b, 'foo')
            c.include(d)
    
            /* test that the option is set */
            expect(c.ʘephemeral).toBe('bar')

            /* test functionality */
            expect( c.get(o) ).toBe('bar')
        })

        it('should include shadow definitions', () => {
            o = {  }
            b = new ObjectDescriptor( o )
            d = new PropertyDescriptor(b, 'foo')
            d.shadow('bar')
            d.install_dispatcher()
    
            o = {  }
            b = new ObjectDescriptor( o )
            let c = new PropertyDescriptor(b, 'foo')
            c.include(d)
            c.install_dispatcher()
    
            /* test that the option is set */
            expect(c.ʘshadow).toBe('bar')

            /* test functionality */
            expect( c.get(o) ).toBe('bar')
        })

        it('should include lazy definition', () => {
            o = {  }
            b = new ObjectDescriptor( o )
            d = new PropertyDescriptor(b, 'foo')
            d.lazy('bar')
            d.install_dispatcher()
    
            o = {  }
            b = new ObjectDescriptor( o )
            let c = new PropertyDescriptor(b, 'foo')
            c.include(d)
    
            /* test that the option is set */
            expect(c.ʘlazy).toBe(true)

            /* test functionality */
            expect( c.get(o) ).toBe('bar')
        })

    })
})


describe('PropertyDescriptorSet', () => {

    let o: any
    let s: PropertyDescriptorSet
    let d: ObjectDescriptor
    let p: PropertyDescriptor

    beforeEach( () => { 
        s = undefined
        o = undefined
        d = undefined
        p = undefined
    })

    it('should instantiate', () => {
        o = {}
        d = new ObjectDescriptor(o)
        s = new PropertyDescriptorSet(d)
        expect(s).toBeTruthy()
    })

    it('should have the properties', () => {
        o = {}
        d = new ObjectDescriptor(o)
        s = new PropertyDescriptorSet(d)

        const p1 = new PropertyDescriptor(d, 'foo');
        (s as any).ʘ['foo'] = p1

        expect(s.has('foo')).toBeTruthy()
    })

    describe('all', () => {
        it('should retrieve all properties', () => {
            o = {}
            d = new ObjectDescriptor(o)
            s = new PropertyDescriptorSet(d)
    
            const p1 = new PropertyDescriptor(d, 'foo');
            (s as any).ʘ['foo'] = p1

            const p2 = new PropertyDescriptor(d, 'bar');
            (s as any).ʘ['bar'] = p2

            expect(s.has('foo')).toBeTruthy()
            expect(s.has('bar')).toBeTruthy()
            expect(s.all().length).toBe(2)
            expect(s.all()).toEqual([p1,p2])
        })
    })

    describe('has', () => {
        it('should return true', () => {
            o = {}
            d = new ObjectDescriptor(o)
            s = new PropertyDescriptorSet(d)
    
            const p = new PropertyDescriptor(d, 'foo')
            s.set('foo', p)
            expect(s.has('foo')).toBe(true)
        })
        it('should return false', () => {
            o = {}
            d = new ObjectDescriptor(o)
            s = new PropertyDescriptorSet(d)
            expect(s.has('foo')).toBe(false)
        })
    })

    describe('add', () => {
        it('should return true', () => {
            o = {}
            d = new ObjectDescriptor(o)
            s = new PropertyDescriptorSet(d)
    
            const p = new PropertyDescriptor(d, 'foo')
            s.add(p)
            expect(s.has('foo')).toBe(true)
        })
        it('should return false', () => {
            o = {}
            d = new ObjectDescriptor(o)
            s = new PropertyDescriptorSet(d)
            expect(s.has('foo')).toBe(false)
        })
    })

    describe('merge', () => {
        it('should merge two sets', () => {
            o = {}
            d = new ObjectDescriptor(o)
            const s1 = new PropertyDescriptorSet(d)
            const s2 = new PropertyDescriptorSet(d)
            
        })
    })

    describe('names', () => {
        it('should retrieve all property names', () => {
            o = {}
            d = new ObjectDescriptor(o)
            const p1 = new PropertyDescriptor(d, 'foo')
            const p2 = new PropertyDescriptor(d, 'bar')
            s = new PropertyDescriptorSet(d)
            s.add(p1)
            s.add(p2)
            expect(s.names).toEqual([p1.name, p2.name])
        })
    })

    describe('get', () => {
        it('should get the property descriptor by name', () => {
            o = {}
            d = new ObjectDescriptor(o)
            s = new PropertyDescriptorSet(d)
            const p1 = new PropertyDescriptor(d, 'foo') 
            s.add(p1)
            expect(s.get('foo')).toBe(p1)
        })
    })

    describe('set', () => {
        it('should set the property descriptor by name', () => {
            o = {}
            d = new ObjectDescriptor(o)
            s = new PropertyDescriptorSet(d)
            const p1 = new PropertyDescriptor(d, 'foo') 
            s.add(p1)
            expect(s.get('foo')).toBe(p1)
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

    it('should define a property on an onject', () => {

        class SimpleObject { }

        let p: any = SimpleObject.prototype

        if ( ! p.Δmeta ) p.Δmeta = new ObjectDescriptor(p)

        p.Δmeta.property('foo').default(32)

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
        expect( o.called ).toBe(true)
    })

    it('should allow a spy to be installed on method defined via the descriptor', () => {

        class SimpleObject { called:boolean }

        let p: any = SimpleObject.prototype
        p.Δmeta = new ObjectDescriptor(p)

        p.Δmeta.method('foo').default(function() {
            this.called = true
        })

        let o:any = new SimpleObject()
        jest.spyOn( o, 'foo' )
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
        expect( o.foo() ).toBe(true)
        expect( o.bar() ).toBe(true)
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
        expect( o.foo() ).toBe(true)
        expect( o.bar() ).toBe(true)

        jest.spyOn(o, 'foo')
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
        expect( o.foo() ).toBe(true)
        // expect( o.bar() ).toBe(true)

    })


    it('should include the dynamic properties of another class', () => {

        class SimpleTrait { }
        let p: any = SimpleTrait.prototype
        p.Δmeta = new ObjectDescriptor(p)
        p.Δmeta.property('foo').default(32)

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

            expect( q.Δmeta.does(ATrait.prototype) ).toBe(true)
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

            expect( r.Δmeta.does(ATrait) ).toBe(true)
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

            expect( s.Δmeta.does(ATrait) ).toBe(true)
        })
        it('should not find the trait', () => {
            class ATrait {

            }
            class AClass {

            }
            let q: any = AClass.prototype
            q.Δmeta = new ObjectDescriptor(q)

            expect( q.Δmeta.does(ATrait.prototype) ).toBe(false)
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

            expect( ac.Δmeta.does(ATrait) ).toBe(true)
        })
    })

    describe('clearShadows', () => {
        it('should clear the shadow value of each shadow property', () => {
            let o: any = {}
            let d = new ObjectDescriptor(o)

            const p1 = d.property('foo')
            d.property('foo').shadow('food')
            p1.install_dispatcher()

            let p2 = d.property('bar')
            p2.shadow('bard')
            p2.install_dispatcher()

            let p3 = d.property('baz')

            /* value and shadow value should be unset */
            expect(p1.ʘshadow).toEqual('food')
            expect(o.ʘfoo).toEqual(undefined)
            expect(o.ʘʘfoo).toEqual(undefined)

            /* access the value */
            o.foo;

            /* shadow value should now be set */
            expect(o.ʘfoo).toEqual(undefined)
            expect(o.ʘʘfoo).toEqual('food')

            /* repeat for second property */
            expect(p2.ʘshadow).toEqual('bard')
            expect(o.ʘbar).toEqual(undefined)
            expect(o.ʘʘbar).toEqual(undefined)

            o.bar;

            expect(o.ʘbar).toEqual(undefined)
            expect(o.ʘʘbar).toEqual('bard')

            d.clearShadows(o)
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