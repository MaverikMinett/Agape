
/**
 * Returns a string formatted in camel case. 
 * @param string A string to be returned as a class name
 */
export function camelize( string?:string ) {

    string = string === undefined ? this : string

    return string
        .replace(/[-_]/, ' ')
        .replace(/(\w)([a-z]+)/g , (str, left, right) => { return left.toUpperCase() + right } )
        .replace(/[^A-Za-z0-9]/, '')
        .replace(/^([A-Z])/, (str) => { return str.toLowerCase() } )
}


/**
 * Returns a string formatted as a token. Removes all symbols and replaces
 * spaces and punctuation with dashes. AKA snake-case
 * 
 * @param string A string to be returned as a token
 */
export function tokenize( string?:string ) {

    string = string === undefined ? this : string

    return string
        .replace(/[^A-Za-z0-9\s\-_]/g, '')
        .replace(/(.)([A-Z][a-z]+)/g , (str, left, right) => { return left + '-' + right } )
        .replace(/([a-z0-9])([A-Z])/g, (str, left, right) => { return left + '-' + right } )
        .replace(/[_\s]+-?/, '-')
        .toLowerCase()
}

/**
 * Returns a string formatted as spoken words. Adds spaces between words,
 * replacing underscores and hyphens.
 * @param string A string to be returned as spoken words
 */
export function verbalize( string?:string ) {

    string = string === undefined ? this : string

    return string
        .replace(/(.)([A-Z][a-z]+)/g , (str, left, right) => { return left + ' ' + right } )
        .replace(/[-_]/, ' ')
        .replace(/^([a-z])/, (str) => { return str.toUpperCase() } )
}

/**
 * Returns a string formatted as a class name. Removes all spaces and symbols,
 * captializes the first letter of each word.
 * @param string A string to be returned as a class name
 */
export function classify( string?:string ) {

    string = string === undefined ? this : string

    return string
        .replace(/[-_]/, ' ')
        .replace(/(\w)([a-z]+)/g , (str, left, right) => { return left.toUpperCase() + right } )
        .replace(/[^A-Za-z0-9]/, '')
        .replace(/^[0-9]+/, '')

}

/**
 * Formats a string in it's plural form. Most strings a returned
 * with an 's' appended to the end. For strings that end with 'y',
 * the 'y' is replaced with 'ies'. Strings that end with 'us', the
 * 'us' is replaced with 'i'.
 * @param string String to be returned in plural form
 */
export function pluralize( string?:string ) {

    string = string === undefined ? this : string

    
    if ( string.endsWith('y') ) {
        return string.replace(/y$/, 'ies' )
    }

    else if ( string.endsWith('us') ) {
        return string.replace(/us$/, 'i')
    }

    else {
        return string + 's'
    }

}

// define a file-level copy of the pluralize function so that the quanitfy
// function can have a `pluralize` attribute and still use `_pluralize`
const _pluralize = pluralize;

/**
 * Format a number in units, pluralizing the units if there is more or less than
 * one count.
 * @param count Number of units
 * @param unit Label for the value
 * @param plural Set to false to disable pluralization
 * @returns String in `x units` format
 */
export function quanitfy( count: number|string, unit: string, pluralize = true ) {

    const value = typeof count == 'number' ? count : Number(count);
    
    const label = pluralize === false || value === 1 ? unit : _pluralize(unit);
    
    return `${count} ${label}`

}

/**
 * Formats a string in it's plural form. Most strings a returned
 * with an 's' appended to the end. For strings that end with 'y',
 * the 'y' is replaced with 'ies'. Strings that end with 'us', the
 * 'us' is replaced with 'i'.
 * @param string String to be returned in plural form
 */
export function titalize( string?:string ) {

    string = string === undefined ? this : string

    return string
        .replace(/(^|\s)([a-z])/g , (str, left, right) => { return left + right.toUpperCase() } )
        .replace(/(?!^)\b(The)\b/, 'the')
        .replace(/(?!^)\b(Of)\b/, 'of')
        .replace(/(?!^)\b(In)\b/, 'in')
        .replace(/(?!^)\b(On)\b/, 'on')
        .replace(/(?!^)\b(A)\b/, 'a')
        .replace(/(?!^)\b(An)\b/, 'an')
        .replace(/(?!^)\b(And)\b/, 'and')
        .replace(/(?!^)\b(At)\b/, 'at')
        .replace(/(?!^)\b(By)\b/, 'by')
        .replace(/(?!^)\b(Be)\b/, 'be')
        .replace(/(?!^)\b(To)\b/, 'to')
        .replace(/(?!^)\b(But)\b/, 'but')
        .replace(/(?!^)\b(For)\b/, 'for')
}