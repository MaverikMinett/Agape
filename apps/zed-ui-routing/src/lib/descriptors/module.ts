import { Class } from "@agape/types"
import { RouteDefinition } from "../modules/route-definition.interface";



export interface ModuleImportDescriptor {
    module?: Class;
    routes?: RouteDefinition[]
}

export class ModuleDescriptor {
    modules: Class[]

    components: Class[]
    
    provides: Class[]

    imports?: Class[]|{ }

    routes?: RouteDefinition[]

    bootstrap?: Class

    constructor( params?: Partial<Pick<ModuleDescriptor, keyof ModuleDescriptor>> ) {
        if ( params ) Object.assign(this, params)
    }
}