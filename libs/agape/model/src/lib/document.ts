/**
 * Document objects are models which can be represented as a single
 * individual identifier token on a flattened object. By inheriting from this
 * class, typescript provides type transformations between document objects
 * and document identifiers when using the Flatten<T> utility type.
 */
export class Document<T extends string|number|symbol=string|number> {
    private readonly χ?   // make the Document class typesafe
}
