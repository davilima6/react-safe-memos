import React, { JSX } from "react";

declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
type Memoized<T> = T & Brand<T>;

type Primitive = string | number | boolean | bigint | symbol | undefined | null;

// TODO: avoid nested wrapping of already memoized values
type NonPrimitivesMemoized<P> = {
  [K in keyof P]: P[K] extends Primitive ? P[K] : Memoized<P[K]>;
};

type MemoizedComponent<C extends React.ComponentType> = (
  Component: NonPrimitivesMemoized<React.ComponentPropsWithRef<C>>
) => JSX.Element;

export { Memoized, Primitive, MemoizedComponent };
