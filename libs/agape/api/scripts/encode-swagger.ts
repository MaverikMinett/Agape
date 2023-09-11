
import fs from 'fs';
import path from 'path';


const ASSETS_DIR = './apps/_swagger';

const OUTPUT_DIR = './libs/agape/api/src/lib/modules/swagger/swagger-files'

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

/**
 * Get the file mime type from path. No extension required.
 * @param filePath Path to the file
 */
function getMimeType(filePath) {
    const execSync = require('child_process').execSync;
    const mimeType = execSync('file --mime-type -b "' + filePath + '"').toString();
    return mimeType.trim();
}

createOutputDirectory()
emptyOutputDirectory()

const files = fs.readdirSync(ASSETS_DIR)
console.log(files)

for ( let file of files ) {
    if ( file !== "swagger.json") {
        const fileContent = fs.readFileSync( path.join(ASSETS_DIR, file) ) 
        const encodedFileContent = fileContent.toString('base64')
        const outputContent  = `export default \`${encodedFileContent}\` `
        const outputFilename = `${file}.ts`
        const mimeType = getMimeType( path.join(ASSETS_DIR, file) )
        console.log(outputFilename, "\t", mimeType)
    
        fs.writeFileSync( path.join(OUTPUT_DIR, outputFilename), outputContent)
    }

}