


import texts from './status-texts'
 

function parseConstructorArgs( ...args:any[] ) {
    let status: number
    let statusText: string
    let message: string
    if ( args.length === 3 ) {
        [status, statusText, message] = args
    }
    else if ( args.length === 2 ) {
        [status, message] = args
    }
    else if ( args.length === 1 ) {
        if ( isNaN(args[0]) ) {
            [message] = args
            status = 400
        }
        else {
            [status] = args
        }
    }

    if ( statusText === undefined  ) 
        statusText = texts[`${status}`]

    if ( message === undefined )
        message = statusText
    
    return { status, statusText, message }
}

export class Exception extends Error {

  constructor( status: number, message: string ) 
  constructor( status: number, statusText: string, message: string )
  constructor( message: string )
  constructor( status: number) 
  constructor( ...args: any[] ){
      const { status, message, statusText } = parseConstructorArgs(...args)
      super(message)
  }

}

