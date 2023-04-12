
import readline from 'readline';
readline.emitKeypressEvents(process.stdin);

/**
 * Get a keypress from STDIN
 * @returns 
 */
export function keypress() {
    process.stdin.setRawMode(true); 

    const promise = new Promise<string>( (resolve, reject) => {

        const listener = (str, key) => {
            process.stdin.removeListener('keypress', listener)
            process.stdin.setRawMode(false); 
            resolve(key)
        }

        process.stdin.on('keypress', listener )
    } )
    return promise
}
