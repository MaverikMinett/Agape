import { camelize, pluralize, tokenize, labelize } from "@agape/string";
import { Class, Dictionary } from '@agape/types';
import { Choice, DesignType, ValidatorFunction } from "./types";
import { Document } from "./document";


export type FieldDescriptorParams = Partial<Pick<FieldDescriptor, keyof FieldDescriptor>>;
export type ModelDescriptorParams = Partial<Pick<ModelDescriptor, keyof ModelDescriptor>>;

/**
 * Meta data describing a model.
 */
export class ModelDescriptor {

    target: Class

    name: string;

    label: string;

    plural: string;

    description: string;

    symbol: string;            // the class name

    token: string;

    tokens: string;

    collection?: string

    fields: FieldDescriptorSet = new FieldDescriptorSet()

    readable: boolean 

    writable: boolean

    constructor ( name?:string, params?:Partial<Pick<ModelDescriptor, keyof ModelDescriptor>> )
    constructor ( params?:Partial<Pick<ModelDescriptor, keyof ModelDescriptor>> )
    constructor ( ...args:any[] ) {
        let name: string; 
        let params: Partial<Pick<ModelDescriptor, keyof ModelDescriptor>>
        if ( args.length === 1 && args[0] instanceof Object ) {
            params = {...args[0]}
        }
        else {
            [name, params] = args
            params ??= {}
            params.name = name;
        }
        if ( params ) Object.assign(this, params)
        this.autopopulate()
    }

    public field( name:string ):FieldDescriptor {
        if ( ! this.fields.has(name) ) {
            const descriptor = new FieldDescriptor(name)
            this.fields.set(name, descriptor)
            return descriptor
        }

        return this.fields.get(name)
    }

    public add( field:FieldDescriptor ) {
        if ( this.fields.has(field.name) ) {
            throw new Error(`Field ${field.name} is already defined on ${this.name}`)
        }
        this.fields.set(field.name, field)
    }

    public autopopulate() {
        if ( this.name || this.label ) {
            this.name   ??= camelize(this.label)
            this.label  ??= labelize(this.name)
            this.plural ??= pluralize(this.label)
            this.token  ??= tokenize(this.name)
            this.tokens ??= pluralize(this.token)
            if ( this.target.prototype instanceof Document ) {
                this.collection ??= pluralize(this.name)
            }
            
        }
    }

    get primaryField() {
        const field = this.fields.all().find( field => field.primary === true )
        return field
    }

}

/**
 * Meta data describing a view
 */
export class ViewDescriptor extends ModelDescriptor {

    title?: string;

    model?: Class;

    viewName: string;

    constructor ( target: Class, model?: Class )
    constructor ( target: Class, name?:string, params?:Partial<Pick<ModelDescriptor, keyof ModelDescriptor>> )
    constructor ( target: Class, params?:Partial<Pick<ModelDescriptor, keyof ModelDescriptor>> )
    constructor ( target: Class, ...args:any[] ) {
        if ( args.length === 1 ) {
            const model = args.shift()
            super()
            this.model = model;
        }
        else {
            super(...args)
        }
    }

}


export class FieldDescriptor {
    
    name?: string;            // the name of the field

    label?: string;           // label for the field, autopopulated if unset

    plural?: string;          // plural label for the field, autopoulated if unset

    description?: string;     // description of the field

    length?: number;          // maximum length of the field in characters (used to create database schema)

    link?: string;            // link to another model or view
    // ᚲᚲid: string;          // the id of the linked field

    column?: string;          // property name in the database

    required?: boolean;       // the field is required to have a non empty value

    token?: string;           // kebab-case version of the field name

    tokens?: string;          // plural kebab-case version of the field name

    type?: string;            // string, number, text, date, email, password, phone, decimal, integer

    widget?: string;          // input, date, textarea, does not autopopulate

    readable?: boolean;       // can read value? default to true (set to false on password fields)

    example?: string|number|Date|Dictionary|boolean

    primary?: boolean;

    choices?: Choice[]

    foreignKey?: boolean

    default?: any

    optional?: boolean

    foreignModel?: Class

    designType: DesignType

    min?: number

    max?: number

    trim?: boolean

    decimals?: number

    minLength?: number

    maxLength?: number

    validators?: ValidatorFunction[]

    enum?: object

    constructor()
    constructor( name:string, type?:string, widget?:string ) 
    constructor( params: FieldDescriptorParams )
    constructor( ...args:any[] ) {
        let params: FieldDescriptorParams
        if ( args.length === 1 && ! ( typeof args[0] === 'string' ) ) {
            params = {...args[0]}
        }
        else {
            const [name, type, widget] = args;
            params = { name, type, widget }
        }
        this.assign( params )
        // this.autopopulate()
    }

    assign( params: FieldDescriptorParams ) {
        Object.assign(this, params)
    }

    autopopulate() {
        if ( this.name || this.label ) {
            this.name   ??= camelize(this.label)
            this.label  ??= labelize(this.name)
            this.plural ??= pluralize(this.label)
            this.token  ??= tokenize(this.name)
            this.tokens ??= pluralize(this.token)
        }
        if ( this.designType === String) {
            // this.widget ??= 'input' 
            this.type ??= 'string'
        }
        else if ( this.designType === Number ) {
            // this.widget ??= 'input'
            this.type ??= 'number' 
        }
        if ( this.enum ) {
            this.widget ??= 'select'
        }
        this.widget ??= 'input'
    }

    getValue( instance: any ): any {
        return instance[this.name]
    }

    setValue( instance: any, value: any ) {
        instance[this.name] = value
    }

}


/**
 * A set containing the managed properties that exist on an object.
 */
 export class FieldDescriptorSet {
    private ʘ: { [key: string]: FieldDescriptor  }

    constructor( from?: FieldDescriptorSet ) { 
        this.ʘ = {}
        if ( from ) this.merge( from )
    }

    get length(): number {
        return Object.keys(this.ʘ).length
    }

    all() {
        return Object.values(this.ʘ)
    }


    /**
     * Merge descriptors from another set into this set
     * @param from 
     */
    merge( from: FieldDescriptorSet ) {
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
     * Get the descriptor with the provided name
     * @param name 
     */
    get( name: string ): FieldDescriptor {
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
    set( name: string, descriptor: FieldDescriptor ) {
        return this.ʘ[name] = descriptor
    }

    /**
     * Execute a function on each item in the set
     * @param callback 
     */
    forEach( callback: ( propertyName:string, definition: FieldDescriptor ) => void ) {
        for ( let propertyName in this.ʘ ) {
            callback( propertyName, this.ʘ[propertyName] )
        }
    }
}
