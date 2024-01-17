
import { IsArray, IsDate, IsPrimitive, OmitMethods } from '@agape/types';

export type ErrorReport<T> = IsPrimitive<T> extends true ? string
    : IsArray<T> extends true ? ArrayErrors<T>
    : IsDate<T> extends true ? string
    : { [K in keyof OmitMethods<T>]?: ErrorReport<T[K]> };

type ArrayErrors<T> = T extends Array<infer I> ? Array<ErrorReport<I>> : T

