
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


// let listeningToKeypresses = false;
process.stdin.setMaxListeners(0)
process.stdout.setMaxListeners(0)
export function keypress() {
    process.stdin.setRawMode(true); 

    const promise = new Promise<KeypressEvent>( (resolve, reject) => {

        const listener = (str, key: KeypressEvent) => {
            process.stdin.removeListener('keypress', listener)
            process.stdin.setRawMode(false); 
            if ( key.ctrl === true && key.name === 'c' ) process.exit()
            resolve(key)
        }
        process.stdin.once('keypress', listener )
    } )
    return promise
}











// let listeningToKeypresses = false;
// let keypressAction:any
// const listener = (str, key: KeypressEvent) => {
//     // process.stdin.removeListener('keypress', listener)
//     process.stdin.setRawMode(false); 
//     if ( key.ctrl === true && key.name === 'c' ) process.exit()
//     keypressAction(key)
// }
// process.stdin.on('keypress', listener )

// export function keypress() {
//     listeningToKeypresses = true
//     process.stdin.setRawMode(true); 

//     const promise = new Promise<KeypressEvent>( (resolve, reject) => {
//         keypressAction = resolve
//     } )
//     return promise
// }












/**
 * Get a keypress from STDIN
 * @returns 
 */

// let listeningToKeypresses = false;

// export function keypress() {
//     listeningToKeypresses = true
//     process.stdin.setRawMode(true); 

//     const promise = new Promise<KeypressEvent>( (resolve, reject) => {

//         const listener = (str, key: KeypressEvent) => {
//             // process.stdin.removeListener('keypress', listener)
//             process.stdin.setRawMode(false); 
//             if ( key.ctrl === true && key.name === 'c' ) process.exit()
//             resolve(key)
//         }
//         process.stdin.once('keypress', listener )
//     } )
//     return promise
// }




// let listeningToKeypresses = false;
// let keypressAction:any
// const listener = (str, key: KeypressEvent) => {
//     // process.stdin.removeListener('keypress', listener)
//     process.stdin.setRawMode(false); 
//     if ( key.ctrl === true && key.name === 'c' ) process.exit()
//     keypressAction(key)
// }
// process.stdin.on('keypress', listener )

// export function keypress() {
//     listeningToKeypresses = true
//     process.stdin.setRawMode(true); 

//     const promise = new Promise<KeypressEvent>( (resolve, reject) => {





//     } )
//     return promise
// }

