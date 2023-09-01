import { Dictionary } from "@agape/types";

export interface SwaggerDocumentContact {
    name?: string;
    url?: string;
    email?: string;
}

export interface SwaggerDocumentLicense {
    name?: string;
    url?: string;   
}

export interface SwaggerDocumentServer {
    url: string;
    description: string;
}

export type SwaggerDocumentSecurity = Dictionary<string[]>

export interface SwaggerDocumentTag {
    name: string;
    description: string;
}

export interface SwaggerDocumentPath {
    get?: SwaggerDocumentPathMethodDefinition;
    put?: SwaggerDocumentPathMethodDefinition;
    post?: SwaggerDocumentPathMethodDefinition;
    patch?: SwaggerDocumentPathMethodDefinition;
    delete?: SwaggerDocumentPathMethodDefinition;
}

export interface SwaggerDocumentPathMethodDefinition {
    summary?: string;
    tags?: string[]
    responses?: Dictionary<SwaggerDocumentPathResponse>
    // TODO
    parameters?: any
}

export interface SwaggerDocumentPathResponse {
    description: string;
    content?: Dictionary<SwaggerDocumentPathResponseContent>
}

export interface SwaggerDocumentPathResponseContent {
    schema: SwaggerDocumentSchema
}

export type SwaggerDocumentSchema = SwaggerDocumentObjectSchema|SwaggerDocumentStringSchema|SwaggerDocumentSchemaRef

export interface SwaggerDocumentObjectSchema {
    type: "object"
    properties: Dictionary<SwaggerDocumentSchema>
}

export interface SwaggerDocumentArraySchema {
    type: "array"
    items: SwaggerDocumentSchema
}

export interface SwaggerDocumentStringSchema {
    type: "string"
    example: string
}

export interface SwaggerDocumentSchemaRef {
    $ref: string;
}



export interface SwaggerDocument {
    "title": string;
    "summary": string;
    "description": string;
    "termsOfService": string;
    "contact": SwaggerDocumentContact,
    "license": SwaggerDocumentLicense,
    "version": string,
    "openapi": string,
    "servers": SwaggerDocumentServer[],
    "schemes": string[],
    "consumes": string[],
    "produces": string[],
    "security": SwaggerDocumentSecurity[],
    "tags": SwaggerDocumentTag[],
    "paths": Dictionary<SwaggerDocumentPath>,
    "components": any
}