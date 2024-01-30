export namespace Validators {

    export function required( value: any ) {

        return value === undefined 
            || value === null 
            || value === ""
            || ( Array.isArray(value) && value.length === 0 )
            ? { required: `This field is required` }
            : null
    }

    export function min( min: number ) {
        return function ( value: number ) {
            console.log(`Running min validator ${value} < ${min}`)
            return value < min 
                ? { min: `Less than minimum value of ${min}` }
                : null
        }
    }

    export function max( max: number ) {
        return function ( value: number ) {
            return value > max 
                ? { max: `Greater than maximum value of ${max}` }
                : null
        }
    }

    export function minLength( minLength: number ) {
        return function ( value: string ) {
            return value.length < minLength
                ? { minLength: `Does not meet minimum number of characters (${minLength})` }
                : null
        }
    }

    export function maxLength( maxLength: number ) {
        return function ( value: string ) {
            return value.length > maxLength
                ? { maxLength: `Exceeds maximum number of characters (${maxLength})` }
                : null
        }
    }

    export function minElements( minElements: number ) {
        return function ( value: any[] ) {
            if ( ! value ) {
                return { minElements: `Requires at least ${minElements} items`}
            }
            return value.length < minElements 
                ? { minElements: `Requires at least ${minElements} items`}
                : null
        }
    }

    export function maxElements( maxElements: number ) {
        return function ( value: any[] ) {
            if ( ! value ) {
                return null
            }
            return value.length > maxElements 
                ? { minElements: `Exceeds maximum of ${maxElements} items`}
                : null
        }
    }

    export function integer( value: any ) {
        if ( value === undefined || value === null ) {
            return null
        }

        return Number.isInteger(value)
            ? null
            : { integer: `Must be an integer` }
    }
    
}
