import { Dictionary } from "@lib/types"



export class ApiRequest {

    body: any

    headers: Dictionary

    params: Dictionary

    queryParams: Dictionary

    route: string[]

    context: 'commander'|'rest'|string

}
