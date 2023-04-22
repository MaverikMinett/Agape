

// export function Action() {
//
// }
//
// Action.descriptor = function( name:string, propertyDescriptor:TypedPropertyDescriptor<Function>, create:boolean=false ) {
//     let actionDescriptor: ActionDescriptor = Reflect.getMetadata( "action:descriptor", propertyDescriptor )
//     if ( ! actionDescriptor && create===true ) {
//         actionDescriptor = new ActionDescriptor( name )
//         Reflect.defineMetadata("action:descriptor", actionDescriptor, propertyDescriptor )
//     }
//     return actionDescriptor
// }
//
// Action.findDescriptor = function( target:Class|Object, name:string ) {
//     if ( target instanceof Function ) {
//         target = Object.getPrototypeOf(target)
//     }
//     if ( target.hasOwnProperty(name) ) {
//         const propertyDescriptor: TypedPropertyDescriptor<Function> = Object.getOwnPropertyDescriptor(target, name)
//
//         const actionDescriptor = Reflect.getMetadata( "action:descriptor", propertyDescriptor )
//
//         return actionDescriptor
//     }
// }
