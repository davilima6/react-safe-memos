type Primitive = string | number | boolean | bigint | symbol | undefined | null;

declare const __brand: unique symbol;
type Brand<T> = { [__brand]: T };
type Memoized<T> = T & Brand<T>;


export { Primitive, Memoized }