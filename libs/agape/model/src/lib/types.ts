
import { Document } from './document';
import { Class, Dictionary, IsArray, IsDate, IsMap, IsPrimitive, IsSet, OmitMethods } from '@agape/types';

/* validator function */
export type ValidatorFunction = (value: any) => Dictionary<string>

/* validation error report */
export type ErrorReport<T> = IsPrimitive<T> extends true ? string
    : IsArray<T> extends true ? ArrayErrors<T>
    : IsDate<T> extends true ? string
    : { [K in keyof OmitMethods<T>]?: ErrorReport<T[K]> } & Dictionary<string>;

type ArrayErrors<T> = T extends Array<infer I> ? Array<ErrorReport<I>> : T



type FieldType = 'integer'|'decimal'|'number'|'string'|'text'|'date'|'time';
type WidgetType = 'input'|'date'|'number'|'textarea'|'time';
// export type DesignType = String|Number|Boolean|Date|Class|[String]|[Number]|[Boolean]|[Date]|[Class]

export interface Choice<T=any>  {
    value: null|undefined|string|number|boolean|object;
    label: string;
    item?: T
}

export interface TextFieldParams {
    autosize?: boolean;
    minRows?: number;
    maxRows?: number;
    rows?: number;
}


export type ChoiceFormatterFunction = (item: any) => Choice

export type IsDocument<T> = T extends Document ? true : false

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


