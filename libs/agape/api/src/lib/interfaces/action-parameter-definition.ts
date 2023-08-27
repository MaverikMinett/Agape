import { Class } from "@agape/types"

export type ActionParameterName = 'body'|'params'|'query'|'request'|'response'|'auth'

export interface ActionParameterDefinition {
    parameter: ActionParameterName
    designType: Class
}