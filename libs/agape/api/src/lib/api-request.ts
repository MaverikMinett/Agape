import { Dictionary } from "@agape/types"



export class ApiRequest {

    body: any

    headers: Dictionary

    params: Dictionary

    query: Dictionary

    route: string[]

    context: 'commander'|'rest'|string

}
