import { ObjectDescriptor } from "../descriptors"
import { meta } from "../meta"
import { Class } from "../types"

export class Buildable {

    Δdecorate( target:Class ) {
        const r = {}
        const decorated = class extends target {
            constructor( ...args ) {
                super(...args);

                (<ObjectDescriptor>this['Δmeta']).performBuild(this)

            }   
        }

        Object.defineProperty(decorated, 'name', { writable: true, value: target.name });
        Object.defineProperty(decorated.prototype, 'Δmeta', {writable: false, enumerable: false, value: meta(target) })

        return decorated
    }

}

