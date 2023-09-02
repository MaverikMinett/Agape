import { Module } from "@agape/api";

import { SwaggerDocument } from "./types";
import { SwaggerModuleDescriptor } from "./swagger.module.descriptor";

import { Controller, Get, StaticFiles } from "@agape/api";
import { SwaggerBuilder } from "./swagger.builder";
import { Api } from "libs/agape/api/src/lib/api";
import { Class } from "@agape/types";
import { titalize } from "@agape/string";

@Controller()
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

                let tagName = controllerDescriptor.class.name
                let tagDescription = controllerDescriptor.description
                tagName = titalize(tagName.replace('Controller', ''))
                builder.addTag(tagName, tagDescription)


                for ( let [actionName, actionDescriptor] of controllerDescriptor.actions.entries() ) {
                    const routePath = "/" + [...pathSegments, controllerDescriptor.path, actionDescriptor.ʘroute.path ]
                        .filter( segment => segment !== undefined && segment !== "" && segment !== "/" )
                        .join("/")
    
                    if ( ! actionDescriptor.ʘstaticFiles 
                        && (actionDescriptor.ʘroute.swagger === undefined || actionDescriptor.ʘroute.swagger === true)  ) {

                        const httpMethod = actionDescriptor.ʘroute.method

                        builder.addAction(routePath, actionDescriptor, { tags: [tagName] })
                        
                    }
        
                }
            }
        }

        function processModules( modules: Class[], pathSegments: string[] ) {
            for ( const childModule of modules ) {
                const childModuleDescriptor = Module.descriptor(childModule)
    
                pathSegments.push(childModuleDescriptor.path)
    
                processControllers( childModuleDescriptor.controllers, pathSegments )
                processModules(childModuleDescriptor.modules, pathSegments)
            }
        }
    
        
        processControllers( moduleDescriptor.controllers, [ moduleDescriptor.path ] )
    
        processModules( moduleDescriptor.modules, [ moduleDescriptor.path ] )

        return builder.document 
    }

    @StaticFiles('./apps/_swagger')
    staticFiles() {
        
    }

    
}

@Module({
    controllers: [SwaggerController]
})
export class SwaggerModule {

    static configure( options: Partial<SwaggerDocument> ) {
        const target = SwaggerModule.prototype

        const descriptor = new SwaggerModuleDescriptor( options )
        Reflect.defineMetadata("swagger:descriptor", descriptor, target)
        
        return SwaggerModule
    }

}







