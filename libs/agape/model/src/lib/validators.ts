export namespace Validators {

    export function required( value: any ) {
        return value === undefined || value === null || value === ""
            ? { required: `This field is required` }
            : null
    }

    export function min( min: number ) {
        return function ( value: number ) {
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
    
}
