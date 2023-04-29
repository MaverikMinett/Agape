import { Class, Dictionary } from "@agape/types";
import { Injector } from "./injector";
import { Module } from "./decorators/module";
import { Component } from "./decorators/component";
import { ModuleImportDescriptor } from "./interfaces/module-import-descriptor";


export interface ModuleComponentContext {
    moduleContainer?: ModuleContainer<any>,
    module?: Class,
    component: Class
}


export class ModuleContainer<T extends Class> {

    moduleInstance: InstanceType<T>;

    injector: Injector;

    selectors: Dictionary<ModuleComponentContext> =  { }

    constructor( public moduleClass: T, public parent?: ModuleContainer<any> ) {
        const parentModuleInstance = parent?.moduleInstance
        const instance = new moduleClass( parentModuleInstance )
        this.moduleInstance = instance

        const parentInjector = parent?.injector
        const injector = new Injector( parentInjector )
        this.injector = this.injector

        const descriptor = Module.descriptor(this.moduleClass)

        if ( descriptor.declares ) this.processDeclarations( descriptor.declares )

        if ( descriptor.imports ) this.processImports( descriptor.imports )
    }

    processDeclarations( declares: Class[] ) {
        for ( let declaration of declares ) {
            const component = declaration
            const componentDescriptor  = Component.descriptor(component)
            const selector = componentDescriptor.selector
            this.selectors[selector] = { moduleContainer: this, component }
        }
    }

    processImports( imports: Array<Class|ModuleImportDescriptor> ) {
        for ( let module of imports ) {
            this.importModule(module)
        }
    }

    importModule( module: Class|ModuleImportDescriptor ) {
        const moduleClass = module instanceof Function ? module : module.module

        let moduleDescriptor = Module.descriptor( module )

        let moduleContainer = new ModuleContainer(moduleClass, this)

        if ( moduleDescriptor.exports ) {
            for ( let exported of moduleDescriptor.exports ) {
                const componentDescriptor = Component.descriptor(exported)

                /* if there is a component desriptor, the export is a component */
                if ( componentDescriptor ) {
                    const importingComponent = exported
                    const selector = componentDescriptor.selector
                    /* only storing mappings to components with selectors */
                    if ( selector ) {
                        /* don't allow over-writing of selectors */
                        if ( selector in this.selectors ) {
                            const existing = this.selectors[selector]
                            throw new Error(`Cannot import component ${importingComponent.name} into ${this.moduleClass.name} from `
                            + ` from ${moduleClass.name}, selector '${selector}' in use by ${existing.component.name}`)
                        }
                        this.selectors[selector] = { moduleContainer, component: importingComponent }
                    }
                }

                else {
                    const moduleDescriptor = Module.descriptor(exported)

                    /* if there is a module descriptor, the export is a module */
                    this.importModule(exported)
                }

            }
        }
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