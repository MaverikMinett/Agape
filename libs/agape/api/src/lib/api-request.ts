import { Dictionary } from "@agape/types"



export class ApiRequest {

    path: string

    method: 'GET'|'PUT'|'POST'|'PATCH'|'DELETE'

    body: any

    headers: Dictionary

    params: Dictionary

    query: Dictionary

    route: string[]

    context: 'commander'|'rest'|string

}
