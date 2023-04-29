import { Class, Dictionary } from "@agape/types";
import { Injector } from "./injector";
import { Module } from "./decorators/module";
import { Component } from "./decorators/component";
import { ModuleImportDescriptor } from "./interfaces/module-import-descriptor";
import { Router } from "./modules/router/router";
import { RouteDefinition } from "./modules/router/route-definition.interface";
import { Service } from "./decorators/service";


export interface ModuleComponentContext {
    moduleContext?: ModuleContext<any>,
    component: Class
}


export class ModuleContext<T extends Class> {

    moduleInstance: InstanceType<T>;

    injector: Injector;

    selectors: Dictionary<ModuleComponentContext> =  { }


    constructor( public moduleClass: T, public parent?: ModuleContext<any>, injector?: Injector ) {
        // console.log(`Building module context for ${this.moduleClass}` )
        const parentModuleInstance = parent?.moduleInstance
        const instance = new moduleClass( parentModuleInstance )
        this.moduleInstance = instance

        const parentInjector = parent?.injector
        if ( ! injector ) injector = new Injector( parentInjector )
        this.injector = injector

        // TODO: THIS SHOULDN'T BE HERE, NEED TO FIND ISSUE WITH INJECTORS
        // PROVIDING TWO COPIES OF THE ROUTER
        // if ( ! parentInjector ) {
        //     this.injector.provide(Router)
        // }

        const descriptor = Module.descriptor(this.moduleClass)

        if ( descriptor.declares ) this.processDeclarations( descriptor.declares )

        if ( descriptor.provides ) this.processProvides( descriptor.provides )

        if ( descriptor.imports ) this.processImports( descriptor.imports )



        // if ( descriptor.routes ) this.processRoutes( descriptor.routes )
    }



    // processRoutes( routes: RouteDefinition[] ) {
    //     const router = this.injector.get(Router)
    //     console.log("PROCESSING ROUTES")

    // }



    processProvides( provides: Class[] ) {
        for ( let provision of provides ) {
            // TODO: Allow {useClass: }, {use: Value} format of provider, for
            // now it is only expecting a class
            
            const token = provision
            const serviceDescriptor = Service.descriptor(token)

            if ( serviceDescriptor.providedIn === 'root' ) {
                this.injector.root().provide( token )
            }
            else {
                this.injector.provide( token )
            }
            
        }
    }

    processDeclarations( declares: Class[] ) {
        for ( let declaration of declares ) {
            const component = declaration
            const componentDescriptor  = Component.descriptor(component)
            const selector = componentDescriptor.selector
            this.selectors[selector] = { moduleContext: this, component }
        }
    }

    processImports( imports: Array<Class|ModuleImportDescriptor> ) {
        for ( let module of imports ) {
            this.importModule(module)
        }
    }

    importModule( importDeclaration: Class|ModuleImportDescriptor ) {

        // console.log("Importing module", module )

        const moduleClass = importDeclaration instanceof Function ? importDeclaration : importDeclaration.module

        let moduleDescriptor = Module.descriptor( moduleClass )

        let moduleContext = new ModuleContext(moduleClass, this)

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
                        this.selectors[selector] = { moduleContext, component: importingComponent }
                    }
                }

                else {
                    const moduleDescriptor = Module.descriptor(exported)

                    /* if there is a module descriptor, the export is a module */
                    this.importModule(exported)
                }

            }
        }



        // TODO: OR SHOULD IT BE HOISTED HERE
        // if ( ! (importDeclaration instanceof Function) && importDeclaration.provides ) {
        //     for ( let token of importDeclaration.provides ) {
        //         this.injector.provide(token)
        //     }

        // }

        if ( ! (importDeclaration instanceof Function) && importDeclaration.routes ) {
            
            const router = this.injector.get(Router)
            router.addRoutes(this, importDeclaration.routes)
        }
    }

    hasSelector( selector: string ) {
        return selector in this.selectors
    }

    getComponentForSelector( selector: string ) {

        // console.log(this.selectors)

        const componentContext = this.selectors[selector]
        if ( ! componentContext ) {
            throw new Error(`Internal Error: Could not find a component for selector ${selector}`)
        }
        return componentContext

    }
}