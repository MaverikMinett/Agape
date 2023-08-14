



  
type FilterFields<T> = { [K in string & keyof T]:
    T[K] extends number | Date ? [K | `${K}__${"gt" | "gte" | "lt" | "lte"}`, T[K]] :
    T[K] extends object ? [K, string | T[K]] | [`${K}__in`, (string[] | T[K])[]] :
    T[K] extends string ? [K | `${K}__search` | `${K}__searchi`, string ] | [`${K}__in`, string[]] :
    [K, T[K]]
  }[string & keyof T]
  
export type Filter<T> = { [F in FilterFields<T> as F[0]]?: F[1] }
  
