import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as util from 'util';

import * as handlebars from 'handlebars'

const writeFile = util.promisify( fs.writeFile )
const lstat     = util.promisify( fs.lstat )

// export Templat

export class Templateer {

	public sources: Array<string>

	constructor( ...sources ) {

		this.sources = [ ...Templateer.prototype.sources ]

		this.sources = this.sources.concat( sources )

	}

	/**
	 * Add a source location to search for templates
	 * @param dirpath Path to directory to search in
	 */
	addSource( dirpath:string ) {
		this.sources.push( dirpath )
	}

	/**
	 * Find a template by path relative to any source directory
	 * @param template Relative path to the template
	 */
	findSync( template:string ):string {
		for ( let source of this.sources.reverse() ) {

			let sourcefile = path.join( source, template ) 

			if ( fs.existsSync(sourcefile) ) return sourcefile

		}
	}

	async find( template:string ):Promise<string> {

		for ( let source of this.sources.reverse() ) {

			let sourcefile = path.join( source, template ) 

			if ( fs.existsSync(sourcefile) ) {
				return sourcefile
			}

		}

		throw new Error(`Could not find template ${template} in any sources`)

	}


	/**
	 * Render an entire directory and subdirectories to an output destination
	 * @param templatePath Path to template directory relative to any source directory
	 * @param outputPath Destination to render files
	 * @param data Template data
	 */
	renderPathSync( templatePath:string, outputPath:string, data:{[key:string]:any} ) {

		const templates = this.gatherSync( templatePath )

		for ( let shortpath in templates ) {

			let outfile = path.join( outputPath, shortpath )
			let dirpath = path.dirname(outfile)

			if ( ! ( fs.existsSync(dirpath) ) ) {
				fs.mkdirSync(dirpath, { recursive: true });
			}

			this.renderFileSync( shortpath, outfile, data )
			
		}

	}


	async renderFile( templatePath:string, outputPath:string, data:{[key:string]:any} ) {

		let sourcePath = await this.find( templatePath )

		if ( ! sourcePath ) {
			throw new Error(`Cannot find template ${templatePath} to render ${outputPath}`)
		}

		const source = fs.readFileSync( sourcePath, "utf-8" );
		const template = handlebars.compile(source);
		return await writeFile( outputPath, template(data) )
	
	}


	/**
	 * Render a single file to an output destination
	 * @param templatePath Path to template to render
	 * @param outputPath Destination to render file
	 * @param data Template data 
	 */
	renderFileSync( templatePath:string, outputPath:string, data:{[key:string]:any} ) {

		let sourcePath = this.findSync( templatePath )
		if ( ! sourcePath ) {
			throw new Error(`Cannot find template ${templatePath} to render ${outputPath}`)
		}


		const source = fs.readFileSync( sourcePath, "utf-8" );
		const template = handlebars.compile(source);

		fs.writeFileSync( outputPath, template(data) );
	}



	/**
	 * Return all available templates in a given directory relative to any source
	 * @param templateDirectory Relative path to return templates for
	 */
	async gather( templateDirectory:string = "." ) {

		var results = {}

		for ( let source of this.sources ) {
			let sourceDir = path.join( source, templateDirectory ) 

			if ( fs.existsSync( sourceDir ) ) {

				let globbed = await glob.sync( sourceDir + '/**/*' )

				for ( let fullPath of globbed ) {
					if ( ( await lstat(fullPath) ).isFile() ) {
						let shortPath = fullPath.substring(sourceDir.length + 1);
						results[shortPath] = fullPath
					}
				}
			}	
		}

		return results

	}



	/**
	 * Return all available templates in a given directory relative to any source
	 * @param templateDirectory Relative path to return templates for
	 */
	gatherSync( templateDirectory:string = "." ) {

		var results = {}

		for ( let source of this.sources ) {
			let sourceDir = path.join( source, templateDirectory ) 

			if ( fs.existsSync( sourceDir ) ) {

				let globbed = glob.sync( sourceDir + '/**/*' )

				for ( let fullPath of globbed ) {
					if ( fs.lstatSync(fullPath).isFile() ) {
						let shortPath = fullPath.substring(sourceDir.length + 1);
						results[shortPath] = fullPath
					}
				}

			}	
		}

		return results

	}



	
}

Templateer.prototype.sources = []