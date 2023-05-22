

export interface Serializer {

    inflate: ( value: any ) => any

    deflate: ( value: any ) => any

}