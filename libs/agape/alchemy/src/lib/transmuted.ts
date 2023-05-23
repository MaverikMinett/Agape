export type Transmuted<T> = {
    [K in keyof T]: any;
  }