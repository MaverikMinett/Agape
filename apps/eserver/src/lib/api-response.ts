


export class ApiResponse {

    status( code: number ) {
        console.log("==> api response status ", code )
    }

    send( response: any ) {
        console.log("==> api response", response)
    }
}