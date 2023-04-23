export type Class = { new(...args: any[]): any; };
export type Dictionary = { [key:string]: any };
export type Function = (...args: any[]) => any;
export type Interface<T> = Pick<T, keyof T>;

export type IsPrimitive<T> = T extends string
    | number
    | boolean
    | null
    | undefined
    ? true : false;

export type IsArray<T> = T extends Array<infer I> ? true : false
export type IsDate<T> = T extends Date ? true : false
export type IsFunction<T> = T extends Function ? true : false
export type IsMap<T> = T extends Map<infer K, infer V> ? true : false
export type IsSet<T> = T extends Set<infer X> ? true : false

export type OmitMethods<T> = Pick< T, { [K in keyof T]: IsFunction<T[K]> extends true ? never : K }[keyof T] >
