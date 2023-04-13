



/**
 * Get the cursor position in the terminal
 * @returns Promise
 */
export async function getCursorPosition(): Promise<{rows: number, cols: number}> {
    const termCodeGetCursorPosition =  '\u001b[6n'

    const promise = new Promise<{rows: number, cols: number}>( (resolve) => {
        process.stdin.setEncoding('utf8')
        process.stdin.setRawMode(true)
            const findCursor = function() {
                let position: { rows: number, cols: number }
                const buffer = process.stdin.read();
                const string = JSON.stringify(buffer); // "\u001b[9;1R"
                const regex = /\[(.*)/g;
                const xy = regex.exec(string)[0].replace(/\[|R"/g, '').split(';');
                position = { rows: Number(xy[0]), cols: Number(xy[1]) };
                resolve(position)
            }

            process.stdin.once('readable', findCursor);
            process.stdout.write(termCodeGetCursorPosition);
    })

    return promise
}
