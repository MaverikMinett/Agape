import { ObjectDescriptor } from "./descriptors"

export function unveil<T>( item:T, params?:any ):T
export function unveil( item:Array<any>, params?:any ):Array<any>
export function unveil( item:any, params?:any ) {

    if ( item instanceof Array ) { return unveilArray(item) }

    if ( item instanceof Object ) { return unveilObject( item ) }

    return item
}



function unveilObject<T>( item:T, params?:any ):T
function unveilObject( item:any, params?:any ) {
    let r:any = {}

    let m:ObjectDescriptor = 'Δmeta' in item ? <ObjectDescriptor>item['Δmeta'] : null


    for ( let field in item ) {

        /* if this is property is managed by agape */
        if ( m && m.properties.has(field) ) {
            /* ignore delegated properties */
            if ( m.property(field)['ʘdelegate'] ) continue

            /* ignore inheritied properties */
            if ( m.property(field)['ʘinherit'] ) continue
        }

        let value = item[field]
        if ( typeof value != "function" )  r[field] = unveil( value )
    }
    if ( Object.getPrototypeOf(item).constructor == Object ) {
        return r
    }

    /** black magic **/
    /* create a new anonymous class */
    let psuedo = class { }
    /* set the name of the constructor on the anonymous class, this will be used
    when the object type is displayed, such as in a console or debugger */
    Object.defineProperty(psuedo, 'name', { writable: true, value: Object.getPrototypeOf(item).constructor.name })
    /* create a psuedo-object which is a flattened representation of the object
    being unveiled */
    const p = new psuedo();
    /* assign the properties accumulated above directly on the object */
    Object.assign(p, r);

    return p
}

function unveilArray<T>( items:T[], params?:any ):T[]
function unveilArray( items:any[], params?:any ):any[] {
    return items.map( item => unveil(item) )
}







