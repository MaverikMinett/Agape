
import readline from 'readline';
readline.emitKeypressEvents(process.stdin);


interface KeypressEvent {
    sequence: string;
    name: string;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
    code: string;
}

/**
 * Get a keypress from STDIN
 * @returns 
 */
export function keypress() {
    process.stdin.setRawMode(true); 

    const promise = new Promise<KeypressEvent>( (resolve, reject) => {

        const listener = (str, key: KeypressEvent) => {
            process.stdin.removeListener('keypress', listener)
            process.stdin.setRawMode(false); 
            if ( key.ctrl === true && key.name === 'c' ) process.exit()
            resolve(key)
        }

        process.stdin.on('keypress', listener )
    } )
    return promise
}
