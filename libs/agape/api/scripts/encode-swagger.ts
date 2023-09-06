
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = './libs/agape/api/assets/swagger';

const OUTPUT_DIR = './libs/agape/api/src/lib/swagger-files'

// console.log( fs.readdirSync('.') )

// empty tht output directory
function emptyOutputDirectory() {
    const oldFiles = fs.readdirSync(OUTPUT_DIR)

    for ( let file of oldFiles ) {
        fs.unlinkSync(path.join(OUTPUT_DIR, file) )
    }
}

// create the output directory
function createOutputDirectory() {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

createOutputDirectory()
emptyOutputDirectory()

const files = fs.readdirSync(ASSETS_DIR)
console.log(files)

for ( let file of files ) {
    const fileContent = fs.readFileSync( path.join(ASSETS_DIR, file) ) 
    const outputContent  = `export default \`${fileContent}\` `
    const outputFilename = `${file}.ts`

    console.log(outputFilename)

    fs.writeFileSync( path.join(OUTPUT_DIR, outputFilename), outputContent)
}