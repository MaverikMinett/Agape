import { Class, Dictionary } from "@agape/types"
import { RouteDefinition } from "../modules/router/route-definition.interface";
import { ComponentDescriptor } from "./component";



export interface ModuleImportDescriptor {
    module?: Class;
    routes?: RouteDefinition[]
}

export interface ComponentContext {
    module: Class,
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

    constructor( public moduleClass: Class, params?: Partial<Pick<ModuleDescriptor, keyof ModuleDescriptor>> ) {
        if ( params ) Object.assign(this, params)
    }

    finalize() {
        if ( this.declares ) {
            for ( let declaration of this.declares ) {
                const component = declaration
                const componentDescriptor: ComponentDescriptor = Reflect.getMetadata('ui:component:descriptor', component.prototype )
                const selector = componentDescriptor.selector
                this.selectors[selector] = {
                    module: this.moduleClass,
                    component: component
                }
            }
        }

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

        console.log(`Importing module ${moduleClass.name} into ${this.moduleClass.name}` )

        let moduleDescriptor: ModuleDescriptor = Reflect.getMetadata('ui:module:descriptor', moduleClass.prototype)

        if ( moduleDescriptor.exports ) {
            for ( let exported of moduleDescriptor.exports ) {
                const componentDescriptor: ComponentDescriptor = Reflect.getMetadata('ui:component:descriptor', exported.prototype)
                if ( componentDescriptor ) {
                    const importingComponent = exported
                    const selector = componentDescriptor.selector
                    if ( selector ) {
                        if ( selector in this.selectors ) {
                            const existing  = this.selectors[selector]
                            throw new Error(`Cannot import component ${importingComponent.name} into ${this.moduleClass.name} from `
                            + ` from ${moduleClass.name}, selector '${selector}' in use by ${existing.component.name}`)
                        }
                        else {
                            this.selectors[selector] = { module: this.moduleClass, component: importingComponent }
                        }
                    }
                }
                else {
                    const moduleDescriptor: ModuleDescriptor = Reflect.getMetadata('ui:module:descriptor', exported.prototype)
                    if ( moduleDescriptor ) {
                        // TODO: this.importModule(exported)
                    }
                }


            }
        }

        // for ( let exported )

        // for ( let selector of Object.keys(descriptor.selectors) ) {
        //     if ( selector in this.selectors ) {
        //         const duplicate = descriptor.selectors[selector]
        //         const existing  = this.selectors[selector]
        //         throw new Error(`Cannot import component ${duplicate.component.name} into ${this.moduleClass.name} from `
        //         + ` from ${duplicate.module.name}, selector '${selector}' in use by ${existing.component.name}`)
        //     }
        //     else {
        //         this.selectors[selector] = { ...descriptor.selectors[selector] }
        //     }
        // }
    }

    hasSelector( selector: string ) {
        return selector in this.selectors
    }

    getComponentForSelector( selector: string ) {

        console.log(this.selectors)

        const componentContext = this.selectors[selector]
        if ( ! componentContext ) {
            throw new Error(`Internal Error: Could not find a component for selector ${selector}`)
        }
        return componentContext

    }
}