


import { Document } from '@agape/model'
  
type FilterFields<T> = { [K in string & keyof T]:
    T[K] extends number | Date ? [K | `${K}__${"gt" | "gte" | "lt" | "lte" | "ne" }`, T[K]] | [`${K}__${"in" | "nin"}`, (T[K])[] ]:
    T[K] extends Document ? [K | `${K}__ne`, string | T[K]] | [`${K}__${"in" | "nin"}`, (string | T[K])[]] :
    T[K] extends string ? [K, string|RegExp] | [`${K}__${"search" | "searchi" | "gt" | "gte" | "lt" | "lte" | "ne"}`, string ] | [`${K}__${"in" | "nin"}`, string[]] :
    [K, T[K]]
  }[string & keyof T]
  
export type FilterCriteria<T> = { [F in FilterFields<T> as F[0]]?: F[1] }

