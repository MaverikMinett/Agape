import { Class } from "@agape/types"
import { RouteDefinition } from "../modules/router/route-definition.interface";
import { ComponentDescriptor } from "./component";



export interface ModuleImportDescriptor {
    module?: Class;
    routes?: RouteDefinition[]
}

export class ModuleDescriptor {
    // modules: Class[]

    // components?: Class[]
    
    declares?:  Class[]

    provides?: Class[]

    imports?: Array<Class|ModuleImportDescriptor>

    routes?: RouteDefinition[]

    bootstrap?: Class

    constructor( params?: Partial<Pick<ModuleDescriptor, keyof ModuleDescriptor>> ) {
        if ( params ) Object.assign(this, params)

        if ( this.imports ) {
            this.importModules( this.imports )
        }
    }

    private importModules( imports: Array<Class|ModuleImportDescriptor> ) {
        for ( let module of imports ) {
            this.importModule(module)
        }
    }

    private importModule( module: Class|ModuleImportDescriptor ) {

        const moduleClass = module instanceof Function ? module : module.module

        let descriptor: ModuleDescriptor = Reflect.getMetadata('ui:module:descriptor', moduleClass)


    }

    hasSelector( selector: string ) {
        for ( let component of this.declares ) {
            console.log(`Checking componet ${component.name}`)
            const descriptor: ComponentDescriptor = Reflect.getMetadata('ui:component:descriptor', component.prototype)
            console.log(descriptor)
            if ( descriptor?.selector === selector )  return true
        }
        for ( let importDeclaration of this.imports ) {
            const module = importDeclaration instanceof Function ? importDeclaration : importDeclaration.module
            console.log(`Checking child module ${module.name}`)
            if ( module ) {
                const moduleDescriptor: ModuleDescriptor = Reflect.getMetadata('ui:module:descriptor', module.prototype) 
                for ( let component of moduleDescriptor.declares ) {
                    console.log(`Checkong componet ${component.name}`)
                    const descriptor: ComponentDescriptor = Reflect.getMetadata('ui:component:descriptor', component.prototype)
                    console.log(descriptor)
                    if ( descriptor?.selector === selector )  return true
                }
            }
        }
        return false
    }

    getComponentForSelector( selector: string ) {
        for ( let component of this.declares ) {
            const descriptor: ComponentDescriptor = Reflect.getMetadata('ui:component:descriptor', component.prototype)
            if ( descriptor?.selector === selector )  return component
        }
        for ( let importDeclaration of this.imports ) {
            const module = importDeclaration instanceof Function ? importDeclaration : importDeclaration.module
            console.log(`Checking child module ${module.name}`)
            if ( module ) {
                const moduleDescriptor: ModuleDescriptor = Reflect.getMetadata('ui:module:descriptor', module.prototype) 
                for ( let component of moduleDescriptor.declares ) {
                    const descriptor: ComponentDescriptor = Reflect.getMetadata('ui:component:descriptor', component.prototype)
                    if ( descriptor?.selector === selector )  return component
                }
            }
        }
        throw new Error(`Internal Error: Could not find a component for selector ${selector}`)
    }
}