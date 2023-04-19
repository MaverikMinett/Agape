import { Cli } from "./cli"

export class Clip extends Cli {
    async run( clearScreen: boolean = false) {
        const stash = await super.run( clearScreen )

        for ( const kind of ['menu','form'] ) {
            if ( stash[kind] ) {
                const keys = Object.keys(stash[kind])
                let usedData: any
                if ( keys.length === 1 ) usedData = stash[kind][keys[0]]
                else if ( ' '  in keys ) usedData = stash[kind][' ']
                else usedData = stash[kind][keys[0]]
                stash[kind] = usedData
            }
        }

        return stash
    }
}

let clip = new Clip();
export { clip }