import React, { JSX } from "react";

import type { Memoized, Primitive } from "./helpers";

// TODO: avoid nested wrapping of already memoized values
type NonPrimitivesMemoized<P> = {
  [K in keyof P]: P[K] extends Primitive ? P[K] : Memoized<P[K]>;
};

type MemoizedComponent<C extends React.ComponentType> = (
  Component: NonPrimitivesMemoized<React.ComponentPropsWithRef<C>>
) => JSX.Element;

function safeUseCallback<T extends Function>(
  callback: T,
  deps: React.DependencyList
): Memoized<T> {
  return React.useCallback(callback, deps) as Memoized<T>;
}

function safeUseMemo<T>(
  factory: () => T,
  deps: React.DependencyList | undefined
): Memoized<T> {
  return React.useMemo(factory, deps) as Memoized<T>;
}

// TODO: implement React.memo's type overload (NamedExoticComponent and MemoExoticComponent)
function safeReactMemo<T extends React.ComponentType<any>>(
  Component: T,
  propsAreEqual?: (
    prevProps: Readonly<React.ComponentProps<T>>,
    nextProps: Readonly<React.ComponentProps<T>>
  ) => boolean
): MemoizedComponent<T> {
  return React.memo(
    Component,
    propsAreEqual
  ) as unknown as MemoizedComponent<T>;
}

export { safeReactMemo, safeUseCallback, safeUseMemo };
