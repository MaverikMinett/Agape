

type FieldType = 'integer'|'decimal'|'number'|'string'|'text'|'date'|'time';
type WidgetType = 'input'|'date'|'number'|'textarea'|'time';

import { IsArray, IsDate, IsDocument, IsMap, IsPrimitive, IsSet, OmitMethods } from '../../../object/src';

export type Flatten<T> = IsPrimitive<T> extends true ? T
    : IsArray<T> extends true ? FlattenArray<T>
    : IsDate<T> extends true ? FlattenDate<T>
    : IsMap<T> extends true ? FlattenMap<T>
    : IsSet<T> extends true ? FlattenSet<T>
    : { [K in keyof OmitMethods<T>]: FlattenValue<T[K]> };

export type FlattenDocument<T> = T extends Document ? string : T;
export type FlattenDate<T>     = T extends Date ? string : T;
export type FlattenArray<T>    = T extends Array<infer I> ? Array<FlattenValue<I>> : T
export type FlattenMap<T>      = T extends Map<infer K, infer V>
    ? Record<
        K extends number ? K : string,
        IsPrimitive<V> extends true ? V : FlattenValue<V> >
    : T
export type FlattenSet<T> = T extends Set<infer X> ? X[] : T;

export type FlattenValue<T>  = IsPrimitive<T> extends true ? T
    : IsDocument<T> extends true ? FlattenDocument<T>
    : Flatten<T>


