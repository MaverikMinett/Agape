


export function determineEnumDesignType( enumInstance: object ) {
    return Object.values(enumInstance).some( value => typeof value === 'number')
        ? Number
        : String
}