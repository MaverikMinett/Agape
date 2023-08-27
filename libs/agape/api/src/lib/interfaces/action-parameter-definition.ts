import { Class } from "@agape/types"

export type ActionParameterName = 'body'|'params'|'query'|'headers'|'request'|'respose'|'auth'

export interface ActionParameterDefinition {
    parameter: ActionParameterName
    designType: Class
}