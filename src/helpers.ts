type Primitive = string | number | boolean | bigint | symbol | undefined | null;

declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
type Memoized<Base, B = Base> = Base & Brand<B>;

export { Primitive, Memoized }