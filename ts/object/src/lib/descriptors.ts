import {  } from "jasmine"
import { Serializer } from "./serializer"
import { Class } from "./types"

/**
 * Describes a method and all associated modifiers and provides the
 * method dispatcher.
 */
export class MethodDescriptor {

    ʘafter    : Array< () => void >
    ʘaround   : Array< () => void >
    ʘbefore   : Array< () => void >
    // ʘvalue    : any
    ʘdefault    : any
    ʘoverride   : any
    ʘstack    : Array< () => void >

    /**
     * Add a method to be called after the primary method
     * @param value Function or method to be called
     */
    after( value: () => void ) {
        this.ʘafter || ( this.ʘafter = [] )
        this.ʘafter.push( value )
        return this
    }

    // around( value: (original, ...args) => any ) {
    //     let original = this.ʘvalue
    //     this.ʘvalue  =  function ( ...args:any[] ) {
    //         return value.call(this, original, ...args )
    //     }
    //     return this
    // }

    /**
     * Add a method to be called before the primary method
     * @param value Function or method to be called
     */
    before( value: () => void ) {
        this.ʘbefore || ( this.ʘbefore = [] )
        this.ʘbefore.push( value )
        return this
    }

    /**
     * Set the default value for the primary method. This is the primary
     * method which will be called, unless it has been over-ridden.
     * @param value 
     */
    default( value: () => void ) {
        this.ʘdefault = value
        return this
    }

    /**
     * Set the over-ride value for the primary method. This will be
     * called instead of the default value.
     */
    override( value: () => void ) {
        this.ʘoverride = value
        return this
    }

    /**
     * Add a method to be called after the primary method but before
     * any after methods
     * @param value 
     */
    stack( value: () => void ) {
        this.ʘstack || ( this.ʘstack = [] )
        this.ʘstack.push( value )
        return this
    }

    /**
     * Has a modified been set on the descriptor, returns true or false.
     * @param modifier 
     */
    does ( modifier:string ) {
        return this[`ʘ${modifier}`] ? true : false
    }

    /**
     * Execute the method and all method modifiers
     * @param target The object to call the method on
     * @param args The arguments to pass to the object
     */
    call( target:any, ...args ) {

        this.ʘbefore && this.callStack( 'before', target, ...args )

        /* call the 'primary' function */
        let f = this.ʘoverride || this.ʘdefault || function() {}
        let r = f.call( target, ...args )

        this.ʘstack  && this.callStack( 'stack', target, ...args )

        this.ʘafter  && this.callStack( 'after', target, ...args )

        return r
    }

    /**
     * Call a stack of methods
     * @param modifier The name of the stack to execute
     * @param target The object on which to act
     * @param args The arguments to pass
     */
    callStack( modifier:string, target:any, ...args ) {
        for ( let func of this['ʘ' + modifier] ) {
            func.call( target, ...args )
        }
    }

    /**
     * Include the definitions from another method descriptor into this descriptor,
     * used to merge descriptors when applying traits to a class
     * @param from Descriptor to include
     */
    include( from:MethodDescriptor ) {
        if ( this.ʘdefault === undefined ) this.ʘdefault = from.ʘdefault
        if ( !( from.ʘoverride === undefined ) ) this.ʘoverride = from.ʘoverride

        if ( from.ʘafter ) {
            this.ʘafter || ( this.ʘafter = [] )
            this.ʘafter.push( ...from.ʘafter )
        }
        if ( from.ʘbefore ) {
            this.ʘbefore || ( this.ʘbefore = [] )
            this.ʘbefore.push( ...from.ʘbefore )
        }
        if ( from.ʘstack ) {
            this.ʘstack || ( this.ʘstack = [] )
            this.ʘstack.push( ...from.ʘstack )
        }
    }

    /**
     * Install the method dispatcher which handles calling of any modifiers 
     * into the target object
     * @param target Target object to install the dispatcher
     * @param name Name of the method to replace
     */
    install_dispatcher( target:any, name: string ) {
        let descriptor = this

        let original = Object.getOwnPropertyDescriptor( target, name )?.value

        if ( original ) this.ʘdefault = original

        Object.defineProperty( target, name, {
            value: function( ...args ) {
                return descriptor.call(this, ...args)
            },
            writable: true,
            configurable: true
        } )
    }

}


/**
 * A set containing the managed methods that exist on an object.
 */
export class MethodDescriptorSet {
    private ʘ: { [key: string]: MethodDescriptor  }

    constructor( from?: MethodDescriptorSet ) { 
        this.ʘ = {}
        if ( from ) this.merge( from )
    }

    /**
     * Merge descriptors from another set into this set
     * @param from 
     */
    merge ( from: MethodDescriptorSet ) {
        Object.assign( this.ʘ, from.ʘ )
    }

    /**
     * Does a descriptor with the given name exist in the set
     * @param name 
     */
    public has( name: string ): boolean {
        return name in this.ʘ;
    }

    /**
     * Get a descriptor for the given name, creates a descriptor if 
     * one does not exist.
     * @param name 
     */
    public get( name: string ): MethodDescriptor {
        if ( ! this.has(name) ) this.ʘ[name] = new MethodDescriptor()
        return this.ʘ[name]
    }

    /**
     * Get names of all descriptors which exist in the set.
     */
    get names( ): Array<string> {
        return Object.getOwnPropertyNames(this.ʘ)
    }

    /**
     * Set the descriptor for the given name
     * @param name 
     * @param descriptor 
     */
    public set( name: string, descriptor: MethodDescriptor ) {
        return this.ʘ[name] = descriptor
    }

    /**
     * Execute a function on each item in the set
     * @param callback 
     */
    public forEach( callback: ( methodName:string, definition: MethodDescriptor ) => void ) {
        for ( let methodName in this.ʘ ) {
            callback( methodName, this.ʘ[methodName] )
        }
    }
}


/**
 * Describes an object, holding information about methods, properties, and traits.
 */
export class ObjectDescriptor {

    public methods: MethodDescriptorSet

    public properties: PropertyDescriptorSet
    
    public traits: Array<any>

    constructor( public target: any ) {
        this.properties = new PropertyDescriptorSet( this )
        this.methods = new MethodDescriptorSet()
    }

    public does( trait:any ) {

        // if ( typeof trait === "function" ) trait = trait.prototype
        if ( this.traits?.includes( trait ) ) return true

        let iter = this.target

        while( iter = Object.getPrototypeOf(iter) ) {
            if ( iter === Object ) return false
            if ( iter.Δmeta?.does(trait) ) return true
        }

        return false
    }

    // public get super( ):ObjectDescriptor {

    //     let parent = Object.getPrototypeOf(this.target)

    //     if ( ! parent ) return

    //     if ( ! parent.hasOwnProperty('Δmeta') ) {
    //         Object.defineProperty(parent, 'Δmeta', {
    //             value: new ObjectDescriptor(parent),
    //             writable: false,
    //             enumerable: false
    //         })
    //     }

    //     return parent['Δmeta']
    // }

    /**
     * Returns a PropertyDescriptor for the property with the given name. If
     * a descriptor does not exist for the property, one will be created for it
     * and the dispatcher will be installed to the object.
     * @param name R
     */
    public property( name:string ):PropertyDescriptor {

        let descriptor

        if ( ! this.properties.has(name) ) {

            descriptor = new PropertyDescriptor(this, name);

            this.properties.set(name,descriptor)

            descriptor.install_dispatcher( )

        }

        else {
            descriptor = this.properties.get(name)
        }

        return descriptor
    }


    /** 
     * Returns a MethodDescriptor the method with the given name. If a desriptor
     * does not exist for the method, one will be created for it and the dispatcher
     * will be created for it and the dispatcher will be installed to the object.
     */
    public method( name:string ) {

        let descriptor

        if ( ! this.methods.has(name) ) {
            descriptor = new MethodDescriptor();

            this.methods.set(name,descriptor)

            descriptor.install_dispatcher( this.target, name )

        }

        else {
            descriptor = this.methods.get(name)
        }

        return descriptor
    }


    

     /**
     * Include traits the specified traits into the ObjectDescriptor, copying 
     * over default method definitions and merging all property and method 
     * descriptors as applicable.
     * @param traits 
     */
     public include( ...traits ) {
        this.traits || ( this.traits = [ ] )

        let targetConstructor, target
        if ( typeof this.target === "function" ) {
            targetConstructor = this.target
            target = this.target.prototype
        }
        else {
            target = this.target
            targetConstructor = this.target.constructor
        }

        this.traits.push( ...traits )

        for ( let trait of traits ) {

            if ( typeof trait === "function" ) trait  = trait.prototype

            /* copy traits which have been applied to the incoming trait in to
               the applied traits tracking array */
            if( trait.Δmeta?.traits ) this.traits.push(...trait.Δmeta.traits)

            /* copy over default method implementations */
            for ( let propertyName of Object.getOwnPropertyNames( trait ) ) {
                if ( propertyName[0] === "ʘ" ) continue;
                if ( propertyName[0] === "Δ" ) continue;
                if ( propertyName === "constructor" ) continue;

                /* don't over-write existing definitions from the consuming class */
                if ( target.Δmeta?.methods.has(propertyName) ) continue;
                if ( target.Δmeta?.properties.has(propertyName) )  continue;

                /* don't copy anything that is managed by agape meta data */
                if ( trait.Δmeta?.methods.has(propertyName) )  continue;
                if ( trait.Δmeta?.properties.has(propertyName) )  continue;

                /* don't copy over anything that is already defined in the target */
                if ( propertyName in target ) continue;
                
                Object.defineProperty( target, propertyName, { 
                    ...Object.getOwnPropertyDescriptor( trait, propertyName )
                })
            }

            /* copy over managed methods */
            if ( trait.Δmeta?.methods ) {
                for ( let name of trait.Δmeta.methods.names ) {

                    if ( ! target.Δmeta.methods.has(name) ) {
                        target.Δmeta.method( name ).install_dispatcher( target )
                    }

                    target.Δmeta.method( name ).include( trait.Δmeta.method(name) )
                }
            }

            /* copy over managed properties */
            if ( trait.Δmeta?.properties ) {
                for ( let name of trait.Δmeta.properties.names ) {

                    if ( ! target.Δmeta.properties.has(name) ) {
                        target.Δmeta.property( name ).install_dispatcher( target )
                    }
                    target.Δmeta.property( name ).include( trait.Δmeta.property(name) )
                }  
            }

            
            /* apply Δdecorator */
            if ( trait.Δdecorate ) {
                targetConstructor = trait.Δdecorate( targetConstructor )
                target = targetConstructor.prototype
            }
        }

        return targetConstructor
    }



}


/**
 * Describes the property of an object any associated modifiers. Provides
 * the property dispatcher.
 */
export class PropertyDescriptor {

    public ʘcoerce: Class|[Class]|Serializer|[Serializer]

    public ʘdelegate: { to?: Object|Function, property?: string }
    public ʘdefault: any
    public ʘenumerable: boolean
    
    public ʘreadonly: boolean
    public ʘoverride: boolean
    public ʘinherit: { from?: Object|Function, property?: string }

    /**
     * @param progenitor The object to which the property belongs
     * @param name The name of the property
     */
    constructor( public progenitor: ObjectDescriptor, public name:string ) {

    }

    /**
     * Declare the type to coerce to when inflating objects
     * @param to The class to instantiate with the data
     */
    coerce( to:Class|[Class]|Serializer|[Serializer] ) {
        this.ʘcoerce = to
        return this
    }


    /**
     * Delegate getting and setting of the property to that of another object
     * @param to The object to delegate the property to
     * @param property The name of the property to delegate to
     */
    delegate( to:Object, property:string ) {
        this.ʘdelegate || ( this.ʘdelegate = {} )
        this.ʘdelegate.to = to
        if ( property != undefined) this.ʘdelegate.property = property
        return this
    }

    /**
     * Set default value for the property, can be a primitive value or a callback
     * function which returns any value type, such as a data structure or object
     * @param value Default value
     */
    default( value:any ) {
        this['ʘdefault'] === undefined && ( this['ʘdefault'] = value )
        return this
    }

    /**
     * By setting enumerable to false the property will not be included when
     * iterating over the properties of the object. The property will also
     * not be included when printing using console.log()
     * @param value True or false
     */
    enumerable( value:boolean ) {
        if ( this.ʘenumerable != value ) {
            this.ʘenumerable = value
            this.install_dispatcher()
        }
        return this
    }

    /**
     * Readonly properties will throw an exception when attempting to set the value
     * @param value True or false
     */
    readonly( value:boolean=true ) {
        this.ʘreadonly = value
        return this
    }

    /**
     * Override the default value of the property
     * @param value 
     */
    override( value:any ) {
        this.ʘoverride = value
        return this
    }

    /**
     * Include the definitions from another property descriptor into this descriptor,
     * used to merge descriptors when applying traits to a class
     * @param from Descriptor to include
     */
    include( from: PropertyDescriptor ) {
        if ( this.ʘdefault === undefined || from.ʘoverride === true ) this.ʘdefault = from.ʘdefault
        if ( ! ( from.ʘoverride === undefined ) ) this.ʘoverride = from.ʘoverride
        if ( ! ( from.ʘreadonly === undefined ) ) this.ʘreadonly = from.ʘreadonly
        return this
    }

    /**
     * Inherit the value from another object
     * @param from 
     * @param property 
     */
    inherit( from: Object|Function, property?:string ) {
        this.ʘinherit || ( this.ʘinherit = {} )
        this.ʘinherit.from = from
        if ( property != undefined) this.ʘinherit.property = property
        return this
    }

    /**
     * Get the value of the property on the given object, delegating or building
     * the property value as necessary
     * @param instance The object on which to act
     */
    get( instance:any ) {

        /* delegate */
        if ( this.ʘdelegate && this.ʘdelegate.to ) {
            return typeof this.ʘdelegate.to === "function"
            ? this.ʘdelegate.to.call(instance, instance)[this.ʘdelegate.property || this.name]
            : this.ʘdelegate.to[this.ʘdelegate.property || this.name]
        }

        if ( ! instance['ʘ' + this.name] ) {

            /* inherit */
            if ( this.ʘinherit ) {
                if ( typeof this.ʘinherit.from === "function" ) {
                    let from = this.ʘinherit.from.call(instance,instance)
                    return from !== undefined ? from[ this.ʘinherit.property || this.name ] : undefined
                }
                else {
                    return this.ʘinherit.from ? this.ʘinherit.from[ this.ʘinherit.property || this.name ] : undefined
                }
            }

            /* default (lazy) */
            let value = typeof this.ʘdefault === "function" 
                ? this.ʘdefault.call(instance, instance)
                : this.ʘdefault

            Object.defineProperty(instance, `ʘ${this.name}`, { value: value, configurable: true, enumerable: false } )
        }

        return instance['ʘ' + this.name]
    }

    /**
     * Set the value of the property on the given instance, delegating if needed
     * @param instance The object on which to act
     * @param value The new value
     */
    set( instance:any, value:any ) {

        /* read only */
        if ( this.ʘreadonly ) throw new Error('Cannot write to read-only value')

        /* delegate */
        if ( this.ʘdelegate && this.ʘdelegate.to ) {
            return typeof this.ʘdelegate.to === "function"
            ? this.ʘdelegate.to.call(instance, instance)[this.ʘdelegate.property || this.name] = value
            : this.ʘdelegate.to[this.ʘdelegate.property || this.name] = value
        }

        Object.defineProperty(instance, `ʘ${this.name}`, { value: value, configurable: true, enumerable: false } )
    }


    /**
     * Install the property dispatcher into the target object. The dispatcher handles
     * any property modifiers which have been applied.
     * @param target Target object to install the dispatcher
     * @param name Name of the method to replace
     */
    install_dispatcher( ) {
        let descriptor = this
        let target = this.progenitor.target
        
        Object.defineProperty( target, descriptor.name, {
            set: function(value:any) { return descriptor.set(this, value) },
            get: function() { return descriptor.get(this) },
            enumerable: this.ʘenumerable === false ? false : true,
            configurable: true
        } )

        Object.defineProperty( target, 'ʘ' + descriptor.name, {
            enumerable: false,
            configurable: true,
            writable: true
        } )
    }


}



/**
 * A set containing the managed properties that exist on an object.
 */
export class PropertyDescriptorSet {
    private ʘ: { [key: string]: PropertyDescriptor  }

    constructor( public progenitor: ObjectDescriptor, from?: PropertyDescriptorSet ) { 
        this.ʘ = {}
        if ( from ) this.merge( from )
    }

    /**
     * Merge descriptors from another set into this set
     * @param from 
     */
    merge ( from: PropertyDescriptorSet ) {
        Object.assign( this.ʘ, from.ʘ )
    }

    /**
     * Does a descriptor with the given name exist in the set
     * @param name 
     */
    has( name: string ): boolean {
        return name in this.ʘ;
    }

    /**
     * Get a descriptor for the given name, creates a descriptor if 
     * one does not exist.
     * @param name 
     */
    get( name: string ): PropertyDescriptor {
        if ( ! this.has(name) ) this.ʘ[name] = new PropertyDescriptor(this.progenitor, name)
        return this.ʘ[name]
    }

    /**
     * Get names of all descriptors which exist in the set.
     */
    get names( ): Array<string> {
        return Object.getOwnPropertyNames(this.ʘ)
    }

    /**
     * Set the descriptor of the given name
     * @param name 
     * @param descriptor 
     */
    set( name: string, descriptor: PropertyDescriptor ) {
        return this.ʘ[name] = descriptor
    }

    /**
     * Execute a function on each item in the set
     * @param callback 
     */
    forEach( callback: ( propertyName:string, definition: PropertyDescriptor ) => void ) {
        for ( let propertyName in this.ʘ ) {
            callback( propertyName, this.ʘ[propertyName] )
        }
    }
}