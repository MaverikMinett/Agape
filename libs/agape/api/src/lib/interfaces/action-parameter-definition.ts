import { Class } from "@agape/types"

export type ActionParameterName = 'body'|'params'|'query'|'request'|'response'|'auth'|'execution-context'

export interface ActionParameterDefinition {
    parameter: ActionParameterName
    designType: Class
}