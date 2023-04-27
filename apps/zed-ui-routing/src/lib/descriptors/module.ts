import { Class } from "@agape/types"





export class ModuleDescriptor {
    modules: Class[]

    components: Class[]
    
    provides: Class[]

    constructor( params?: Partial<Pick<ModuleDescriptor, keyof ModuleDescriptor>> ) {
        if ( params ) Object.assign(this, params)
    }
}