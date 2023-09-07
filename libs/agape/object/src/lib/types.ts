
export type TypedInterface<T> =  Pick<T, keyof T> & {type: string};
