# @agape/templateer

Render templates using over-ridable source directories

## Synopsis

```
o = new Templateer('test/templates')
o.addSource('test/overrides')

data = { 'foo': 'bar' }
o.renderFile( 'foo.md', 'output.md', data )
o.renderPath( 'folder', 'output/folder', data )
```


## Description

Render <a href="https://handlebarsjs.com/" target="_blank">Handlebar</a> templates, 
allowing for multiple source directories and template over-rides.


## Methods

`addSource( sourcePath )`

Add a source directory to use when loading a template. You may call this method multiple
times to specify multiple sources. When rendering a template, templateer while search the
source directories in reverse order that they were added. This has the affect that templates
can be over-ridden.

### Asynchronous


`find( template )`

Accepts a template name and returns the full path to a matching template file. 

`gather( path )`

Return all available templates in a given directory relative to any source

`renderFile( templatePath, outputPath, data )`

Render a single template to an output destination

`renderPath( templatePath, outputPath, data )`

Render an entire directory and subdirectories to an output destination


### Synchronous


`findSync( template )`

Accepts a template name and returns the full path to a matching template file. 


`gatherSync( path )`

Return all available templates in a given directory relative to any source


`renderFileSync( templatePath, outputPath, data )`

Render a single template to an output destination

`renderPathSync( templatePath, outputPath, data )`

Render an entire directory and subdirectories to an output destination


## Default Sources

You can set the default source directories for all `Templateer` objects by modifying the prototype:

```
Templateer.prototype.sources =  [ 'default/templates' ]

o = new Templateer( 'override/templates' )
```


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2020-2021 Maverik Minett


## License

MIT
