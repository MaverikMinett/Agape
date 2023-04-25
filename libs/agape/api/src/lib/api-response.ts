


export class ApiResponse {

    statusCode: number = 200

    statusText: string

    content: any[] = []

    status( code: number, text?: string ) {
        this.statusCode = code
        if ( text !== undefined ) this.statusText = text
    }

    send( response: any ) {
        this.content.push(response)
    }
}