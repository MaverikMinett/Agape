import { ActionDescriptor, HTTP_STATUS_CODES } from "@agape/api";
import { Model } from '@agape/model'
import { SWAGGER_BASE } from "./swagger.base";
import { SwaggerDocument } from "./types";
import { Exception } from "@agape/exception";
import { Class } from "@agape/types";


export class SwaggerBuilder {

    document: Partial<SwaggerDocument> = JSON.parse(JSON.stringify({ ...SWAGGER_BASE }))

    modelsSchemaUris = new Map<Class,string>()

    configure( options: Partial<SwaggerDocument>) {
        if ( 'title' in options ) this.document.title = options.title
        if ( 'summary' in options ) this.document.summary = options.summary
        if ( 'description' in options ) this.document.description = options.description
        if ( 'contact' in options ) this.document.contact = options.contact
        if ( 'license' in options ) this.document.license = options.license
        if ( 'version' in options ) this.document.version = options.version
        if ( 'servers' in options ) this.document.servers = options.servers
        if ( 'schemes' in options ) this.document.schemes = options.schemes
        if ( 'consumes' in options ) this.document.consumes = options.consumes
        if ( 'produces' in options ) this.document.produces = options.produces
        if ( 'security' in options ) this.document.security = options.security
        if ( 'tags' in options ) this.document.tags.push(...options.tags)
        if ( 'paths' in options ) this.document.paths = { ...this.document.paths, ...options.paths }
        if ( 'components' in options ) {
            if ( 'securitySchemes' in options.components ) {
                this.document.components.securitySchemes = {
                     ...this.document.components.securitySchemes,
                     ...options.components.securitySchemes
                }
                this.document.components.schemas = {
                    ...this.document.components.schemas,
                    ...options.components.schemas
               }
               this.document.components.parameters = {
                ...this.document.components.parameters,
                ...options.components.parameters
           }
           
            }
        }
    }   

    addTag( name: string, description: string ) {
        this.document.tags.push({ name, description })
    }

    addAction( path: string, actionDescriptor: ActionDescriptor, options?: { tags: string[] } ) {
        path = path.replace(/:([a-z][a-z0-9_]*)/gi, "{$1}", )
        const action = actionDescriptor
        const summary = action.ʘdescription
        this.document.paths[path] ??= { }
        this.document.paths[path][action.ʘroute.method] = {
            "summary": summary,
        }
        if ( options?.tags ) {
            this.document.paths[path][action.ʘroute.method]["tags"] = options.tags
        }

        if ( action.ʘresponses && action.ʘresponses.length ) {
            const responses = {}
            this.document.paths[path][action.ʘroute.method]['responses']
            const statusCode = action.ʘstatus
            for ( const responseDescriptor of action.ʘresponses ) {
                if ( responseDescriptor.model instanceof Exception ) {
                    // TODO
                }
                if ( responseDescriptor.model instanceof Array ) {
                    const schemaRef = this.addModelAsSchema(responseDescriptor.model[0])
                    responses[statusCode] = {
                        description: responseDescriptor.description || HTTP_STATUS_CODES[action.ʘstatus],
                        content: {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": schemaRef
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    const schemaRef = this.addModelAsSchema(responseDescriptor.model as Class)
                    responses[statusCode] = {
                        description: responseDescriptor.description || HTTP_STATUS_CODES[action.ʘstatus],
                        content: {
                            "application/json": {
                                "schema": {
                                    "$ref": schemaRef
                                }
                            }
                        }
                    }
                }
            }
            this.document.paths[path][action.ʘroute.method]['responses'] = responses
        }
        else {
            const responses: any = {}
            const statusCode = action.ʘstatus
            responses[statusCode] = {
                description: HTTP_STATUS_CODES[action.ʘstatus],
            }
            this.document.paths[path][action.ʘroute.method]['responses'] = responses
        }

        const parametersDefinition = action.ʘinject.find( i => i.parameter === 'params')
        if ( parametersDefinition ) {
            this.document.paths[path][action.ʘroute.method]['parameters'] = []
            const paramsDesignType = parametersDefinition.designType
            const paramsModelDescriptor = Model.descriptor(paramsDesignType)

            if ( paramsModelDescriptor ) {
                for ( let fieldDescriptor of paramsModelDescriptor.fields.all() ) {
                
                    let type: string = ""
                    if ( fieldDescriptor.designType === String ) {
                        type = 'string'
                    }
                    else if ( fieldDescriptor.designType === Number ) {
                        type = 'number'
                    }
                    else if ( fieldDescriptor.designType === Date ) {
                        type = 'date'
                    }
                    else if ( fieldDescriptor.designType instanceof Function ) {
                        type = 'object'
                    }
                    const routeParamDefinition = {
                        in: 'path',
                        name: fieldDescriptor.name,
                        schema: {
                            type
                        },
                        required: true,
                        example: fieldDescriptor.example
                    }
    
                    this.document.paths[path][action.ʘroute.method]['parameters'].push( routeParamDefinition )
                }
            }

        }

        const bodyDefinition = action.ʘinject.find( i => i.parameter === 'body' ) 
        if ( bodyDefinition ) {
            const requestBody = {}
            this.document.paths[path][action.ʘroute.method]['requestBody'] = requestBody
            const bodyDesignType = bodyDefinition.designType
            const schemaRef = this.addModelAsSchema(bodyDesignType)
            requestBody['required'] = true
            requestBody['content'] = {
                'application/json': {
                    schema: {
                        "$ref": schemaRef
                    }
                    
                }
            }
        }
        

    }

    addModelAsSchema( model: Class ) {
        
        if ( this.modelsSchemaUris.has(model) ) {
            return this.modelsSchemaUris.get(model)
        }

        // TODO: Replace with schema type instead of any
        const schema: any = {}
        this.document.components.schemas[model.name] = schema
        schema.type = "object"
        schema.properties = {}

        const modelDescriptor = Model.descriptor(model)

        if ( ! modelDescriptor ) {
            console.log(`Cannot add ${model.name} as Schema because it is not a Model`)
        }
        

        if ( modelDescriptor ) {
            for ( let fieldDescriptor of modelDescriptor.fields.all() ) {
                let type: string = ""
                if ( fieldDescriptor.designType === String ) {
                    type = 'string'
                    schema.properties[fieldDescriptor.name] = {
                        type,
                        example: fieldDescriptor.example
                    }
                }
                else if ( fieldDescriptor.designType === Number ) {
                    type = 'number'
                    schema.properties[fieldDescriptor.name] = {
                        type,
                        example: fieldDescriptor.example
                    }
                }
                else if ( fieldDescriptor.designType === Date ) {
                    type = 'date'
                    schema.properties[fieldDescriptor.name] = {
                        type,
                        example: fieldDescriptor.example
                    }
                }
                else if ( fieldDescriptor.designType instanceof Function ) {
                    const schemaRef = this.addModelAsSchema(fieldDescriptor.designType)

                    schema.properties[fieldDescriptor.name] = {
                        "$ref": schemaRef
                    }
                }

            }
        }

        const uri = `#/components/schemas/${model.name}`
        this.modelsSchemaUris.set(model, uri)
        return uri
    }

}

export interface SwaggerBuilderPathOptions {
    path: string;
    httpMethod: 'get'|'put'|'post'|'patch'|'delete'
}