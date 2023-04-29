import { Class, Dictionary } from "@agape/types"
import { RouteDefinition } from "../modules/router/route-definition.interface";
import { ComponentDescriptor } from "./component";
import { Injector } from "../injector";
import { ModuleImportDescriptor } from "../interfaces/module-import-descriptor";




export interface ComponentContext {
    module?: Class,
    component: Class
}

export class ModuleDescriptor {
    declares?:  Class[]

    provides?: Class[]

    imports?: Array<Class|ModuleImportDescriptor>

    exports?: Class[]

    routes?: RouteDefinition[]

    selectors: Dictionary<ComponentContext> =  { }

    bootstrap?: Class

    injector: Injector

    constructor( public moduleClass: Class, params?: Partial<Pick<ModuleDescriptor, keyof ModuleDescriptor>> ) {
        if ( params ) Object.assign(this, params)
    }

}