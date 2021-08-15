import { deflate, Serializer } from "./serializer"


export function clone ( item:Object, serializer?:Serializer ) {

    const data = serializer ? serializer.deflate( item ) : deflate( item )

    const p = Object.getPrototypeOf( item )

    p.constructor 

}