import { Module } from "@agape/api";
import { SwaggerFilesController } from "./swagger-files.controller";

import { SwaggerDocument } from "./types";
import { SwaggerModuleDescriptor } from "./swagger.module.descriptor";

import { Controller, Get } from "@agape/api";
import { SwaggerBuilder } from "./swagger.builder";
import { Api } from "../../api";
import { Class } from "@agape/types";


@Controller({ tag: null })
export class SwaggerController {

    constructor( public api: Api ) {

    }

    @Get('swagger.json', { swagger: false })
    swaggerFile() {
        const builder = new SwaggerBuilder( )
        const descriptor: SwaggerModuleDescriptor = 
            Reflect.getMetadata("swagger:descriptor", SwaggerModule.prototype)
        
        builder.configure( descriptor.options )

        let moduleDescriptor = Module.descriptor(this.api.module)

        function processControllers( controllers: Class[], pathSegments: string[] ) {

            for ( let controller of controllers ) {
                let controllerDescriptor = Controller.descriptor(controller)

                if ( controllerDescriptor.tag ) {
                    let tagName = controllerDescriptor.tag
                    let tagDescription = controllerDescriptor.description
                    builder.addTag(tagName, tagDescription)
                }

                for ( let [actionName, actionDescriptor] of controllerDescriptor.actions.entries() ) {
                    const routePath = "/" + [...pathSegments, controllerDescriptor.path, actionDescriptor.ʘroute.path ]
                        .filter( segment => segment !== undefined && segment !== "" && segment !== "/" )
                        .join("/")
    
                    if ( ! actionDescriptor.ʘstaticFiles 
                        && (actionDescriptor.ʘroute.swagger === undefined || actionDescriptor.ʘroute.swagger === true)  ) {

                        const httpMethod = actionDescriptor.ʘroute.method

                        if ( controllerDescriptor.tag ) {
                            builder.addAction(routePath, actionDescriptor, { tags: [controllerDescriptor.tag] })
                        }
                        else {
                            builder.addAction(routePath, actionDescriptor)
                        }
                        
                        
                    }
        
                }
            }
        }

        function processModules( modules: Class[], pathSegments: string[] ) {
            for ( const childModule of modules ) {
                const childModuleDescriptor = Module.descriptor(childModule)
    
                const childSegments = [...pathSegments, childModuleDescriptor.path] 
    
                processControllers( childModuleDescriptor.controllers, childSegments )
                processModules(childModuleDescriptor.modules, childSegments)
            }
        }
    
        processControllers( moduleDescriptor.controllers, [ moduleDescriptor.path ] )
    
        processModules( moduleDescriptor.modules, [ moduleDescriptor.path ] )

        return builder.document 
    }
    
}

@Module({
    controllers: [SwaggerFilesController, SwaggerController]
})
export class SwaggerModule {

    static configure( options: Partial<SwaggerDocument> ) {
        const target = SwaggerModule.prototype

        const descriptor = new SwaggerModuleDescriptor( options )
        Reflect.defineMetadata("swagger:descriptor", descriptor, target)

        return SwaggerModule
    }

}







