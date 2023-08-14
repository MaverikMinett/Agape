


import { Document } from '@agape/model'
  
type FilterFields<T> = { [K in string & keyof T]:
    T[K] extends number | Date ? [K | `${K}__${"gt" | "gte" | "lt" | "lte"}`, T[K]] | [`${K}__in`, (T[K])[] ]:
    T[K] extends Document ? [K, string | T[K]] | [`${K}__in`, (string | T[K])[]] :
    T[K] extends string ? [K | `${K}__${"search" | "searchi" | "gt" | "gte" | "lt" | "lte"}`, string ] | [`${K}__in`, string[]] :
    [K, T[K]]
  }[string & keyof T]
  
export type FilterCriteria<T> = { [F in FilterFields<T> as F[0]]?: F[1] }

